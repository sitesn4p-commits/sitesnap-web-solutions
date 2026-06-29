const crypto = require("crypto");
const fs = require("fs/promises");
const http = require("http");
const path = require("path");
const { readDb, updateDb } = require("./store");

const root = path.join(__dirname, "..");
const port = Number(process.env.PORT || 4000);
const cookieName = "sitesnap_session";
const adminUser = process.env.ADMIN_USER || "admin";
const adminPassword = process.env.ADMIN_PASSWORD || "sitesnap123";
const sessionSecret = process.env.SESSION_SECRET || "dev-sitesnap-secret-change-me";
const defaultSettings = {
  facebookUrl: "https://www.facebook.com/share/1J8YPujnnk/",
  instagramUrl: "https://www.instagram.com/sitesn4p?igsh=MTQzanNubmllemxzNQ==",
  linkedinUrl: "https://lk.linkedin.com/in/site-snap-a2570b3b0",
  teamLeadName: "Sathsara Bandara",
  teamLeadRole: "Founder / Web Strategist",
  teamLeadBio: "Leads project direction, client strategy, and launch quality from the first idea to the live website.",
  teamLeadImageUrl: "",
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function sanitize(value, max = 500) {
  return String(value || "").trim().slice(0, max);
}

function sanitizeUrl(value, max = 360) {
  const text = sanitize(value, max);
  return /^https?:\/\//i.test(text) ? text : "";
}

function sanitizeImage(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^https?:\/\//i.test(text)) return text.slice(0, 1000);
  if (/^data:image\/(png|jpe?g|webp);base64,/i.test(text) && text.length <= 1100000) return text;
  return "";
}

function sanitizeCv(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^data:(application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document);base64,/i.test(text) && text.length <= 2200000) return text;
  return "";
}

function settingsWithDefaults(settings = {}) {
  const merged = { ...settings };
  Object.entries(defaultSettings).forEach(([key, value]) => {
    if (!merged[key]) merged[key] = value;
  });
  return merged;
}

function publicSiteShape(db) {
  const { inquiries, subscribers, careers, ...publicData } = db;
  return {
    ...publicData,
    settings: settingsWithDefaults(publicData.settings),
  };
}

function cloudinaryConfig() {
  const value = process.env.CLOUDINARY_URL;
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "cloudinary:") return null;
    return {
      cloudName: parsed.hostname,
      apiKey: decodeURIComponent(parsed.username),
      apiSecret: decodeURIComponent(parsed.password),
    };
  } catch (_error) {
    return null;
  }
}

function cloudinaryFolder(value) {
  return sanitize(value, 40) === "team" ? "sitesnap/team" : "sitesnap/projects";
}

async function uploadCloudinaryImage(imageData, folder) {
  const config = cloudinaryConfig();
  if (!config?.cloudName || !config.apiKey || !config.apiSecret) {
    const error = new Error("Cloudinary storage is not configured yet.");
    error.status = 503;
    throw error;
  }

  const file = sanitizeImage(imageData);
  if (!file || !file.startsWith("data:image/")) {
    const error = new Error("Please upload a valid optimized image.");
    error.status = 400;
    throw error;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const targetFolder = cloudinaryFolder(folder);
  const signaturePayload = `folder=${targetFolder}&timestamp=${timestamp}${config.apiSecret}`;
  const signature = crypto.createHash("sha1").update(signaturePayload).digest("hex");
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", config.apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", targetFolder);
  form.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.secure_url) {
    const error = new Error(result.error?.message || "Image upload failed.");
    error.status = response.ok ? 502 : response.status;
    throw error;
  }

  return result.secure_url;
}

function sendJson(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers,
  });
  res.end(JSON.stringify(body));
}

function redirect(res, location) {
  res.writeHead(302, { Location: location });
  res.end();
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
    if (Buffer.concat(chunks).length > 3 * 1024 * 1024) {
      throw new Error("Request body is too large.");
    }
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", sessionSecret).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function verifyToken(token) {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", sessionSecret).update(body).digest("base64url");
  const a = Buffer.from(sig || "");
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch (_error) {
    return null;
  }
}

function getAdmin(req) {
  const cookies = parseCookies(req);
  const session = verifyToken(cookies[cookieName]);
  return session?.role === "admin" ? session : null;
}

function requireAdmin(req, res) {
  const admin = getAdmin(req);
  if (!admin) {
    sendJson(res, 401, { message: "Authentication required" });
    return null;
  }
  return admin;
}

function sessionCookie(value, maxAgeSeconds) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${cookieName}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; HttpOnly; SameSite=Lax${secure}`;
}

async function routeApi(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, name: "Sitesnap API" });
  }

  if (req.method === "GET" && pathname === "/api/site") {
    const db = await readDb();
    return sendJson(res, 200, publicSiteShape(db));
  }

  if (req.method === "POST" && pathname === "/api/inquiries") {
    const body = await readBody(req);
    const inquiry = {
      id: crypto.randomUUID(),
      name: sanitize(body.name, 120),
      email: sanitize(body.email, 160),
      phone: sanitize(body.phone, 40),
      company: sanitize(body.company, 120),
      service: sanitize(body.service, 120),
      budget: sanitize(body.budget, 80),
      message: sanitize(body.message, 1200),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    if (!inquiry.name || !inquiry.phone || !inquiry.message) {
      return sendJson(res, 400, { message: "Name, phone, and message are required." });
    }

    await updateDb((db) => {
      db.inquiries.unshift(inquiry);
      return inquiry;
    });

    return sendJson(res, 201, { ok: true, inquiry });
  }

  if (req.method === "POST" && pathname === "/api/newsletter") {
    const body = await readBody(req);
    const email = sanitize(body.email, 180).toLowerCase();
    if (!email || !email.includes("@")) {
      return sendJson(res, 400, { message: "A valid email is required." });
    }

    await updateDb((db) => {
      const exists = db.subscribers.some((item) => item.email === email);
      if (!exists) {
        db.subscribers.unshift({ id: crypto.randomUUID(), email, createdAt: new Date().toISOString() });
      }
      return true;
    });

    return sendJson(res, 201, { ok: true });
  }

  if (req.method === "POST" && pathname === "/api/careers") {
    const body = await readBody(req);
    const cvData = sanitizeCv(body.cvData);
    const career = {
      id: crypto.randomUUID(),
      name: sanitize(body.name, 120),
      email: sanitize(body.email, 160),
      phone: sanitize(body.phone, 40),
      role: sanitize(body.role, 120),
      message: sanitize(body.message, 1000),
      cvName: sanitize(body.cvName, 180),
      cvType: sanitize(body.cvType, 160),
      cvData,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    if (!career.name || !career.phone || !career.cvData) {
      return sendJson(res, 400, { message: "Name, phone, and CV are required." });
    }

    await updateDb((db) => {
      if (!Array.isArray(db.careers)) db.careers = [];
      db.careers.unshift(career);
      return career;
    });

    return sendJson(res, 201, { ok: true });
  }

  if (req.method === "POST" && pathname === "/api/admin/login") {
    const body = await readBody(req);
    const username = sanitize(body.username, 80);
    const password = String(body.password || "");
    if (username !== adminUser || password !== adminPassword) {
      return sendJson(res, 401, { message: "Invalid login details" });
    }

    const token = signToken({
      sub: username,
      role: "admin",
      exp: Date.now() + 1000 * 60 * 60 * 8,
    });

    return sendJson(res, 200, { ok: true, user: { username } }, { "Set-Cookie": sessionCookie(token, 60 * 60 * 8) });
  }

  if (req.method === "POST" && pathname === "/api/admin/logout") {
    return sendJson(res, 200, { ok: true }, { "Set-Cookie": sessionCookie("", 0) });
  }

  if (req.method === "GET" && pathname === "/api/admin/me") {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    return sendJson(res, 200, { user: { username: admin.sub } });
  }

  if (req.method === "GET" && pathname === "/api/admin/dashboard") {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const db = await readDb();
    const inquiries = db.inquiries || [];
    const careers = db.careers || [];
    const newLeads = inquiries.filter((item) => item.status === "new").length;
    return sendJson(res, 200, {
      metrics: {
        inquiries: inquiries.length,
        newLeads,
        services: (db.services || []).length,
        projects: (db.projects || []).length,
        careers: careers.length,
        subscribers: (db.subscribers || []).length,
      },
      latestInquiries: inquiries.slice(0, 6),
      site: publicSiteShape(db),
    });
  }

  if (req.method === "GET" && pathname === "/api/admin/inquiries") {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const db = await readDb();
    return sendJson(res, 200, { inquiries: db.inquiries || [] });
  }

  if (req.method === "GET" && pathname === "/api/admin/careers") {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const db = await readDb();
    return sendJson(res, 200, { careers: db.careers || [] });
  }

  const inquiryMatch = pathname.match(/^\/api\/admin\/inquiries\/([^/]+)$/);
  if (req.method === "PATCH" && inquiryMatch) {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const body = await readBody(req);
    const status = sanitize(body.status, 40);
    const updated = await updateDb((db) => {
      const inquiry = db.inquiries.find((item) => item.id === inquiryMatch[1]);
      if (!inquiry) return null;
      inquiry.status = status || inquiry.status;
      inquiry.updatedAt = new Date().toISOString();
      return inquiry;
    });
    if (!updated) return sendJson(res, 404, { message: "Inquiry not found" });
    return sendJson(res, 200, { inquiry: updated });
  }

  if (req.method === "GET" && pathname === "/api/admin/content") {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const db = await readDb();
    return sendJson(res, 200, publicSiteShape(db));
  }

  if (req.method === "PATCH" && pathname === "/api/admin/settings") {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const body = await readBody(req);
    const settings = await updateDb((db) => {
      db.settings = {
        ...db.settings,
        phone: sanitize(body.phone, 40) || db.settings.phone,
        whatsapp: sanitize(body.whatsapp, 40) || db.settings.whatsapp,
        email: sanitize(body.email, 160) || db.settings.email,
        location: sanitize(body.location, 180) || db.settings.location,
        facebookUrl: sanitizeUrl(body.facebookUrl, 500) || db.settings.facebookUrl || "",
        instagramUrl: sanitizeUrl(body.instagramUrl, 500) || db.settings.instagramUrl || "",
        linkedinUrl: sanitizeUrl(body.linkedinUrl, 500) || db.settings.linkedinUrl || "",
        teamLeadName: sanitize(body.teamLeadName, 120) || db.settings.teamLeadName,
        teamLeadRole: sanitize(body.teamLeadRole, 120) || db.settings.teamLeadRole,
        teamLeadBio: sanitize(body.teamLeadBio, 420) || db.settings.teamLeadBio,
        teamLeadImageUrl: sanitizeImage(body.teamLeadImageUrl) || db.settings.teamLeadImageUrl || "",
      };
      return db.settings;
    });
    return sendJson(res, 200, { settings });
  }

  if (req.method === "POST" && pathname === "/api/admin/upload-image") {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const body = await readBody(req);
    try {
      const imageUrl = await uploadCloudinaryImage(body.imageData, body.folder);
      return sendJson(res, 201, { imageUrl });
    } catch (error) {
      return sendJson(res, error.status || 500, { message: error.message || "Image upload failed." });
    }
  }

  if (req.method === "POST" && pathname === "/api/admin/services") {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const body = await readBody(req);
    const service = {
      id: crypto.randomUUID(),
      title: sanitize(body.title, 120),
      summary: sanitize(body.summary, 240),
      features: Array.isArray(body.features) ? body.features.map((item) => sanitize(item, 80)).filter(Boolean).slice(0, 6) : [],
      icon: sanitize(body.icon, 40) || "Code2",
    };
    if (!service.title || !service.summary) {
      return sendJson(res, 400, { message: "Service title and summary are required." });
    }
    await updateDb((db) => {
      db.services.push(service);
      return service;
    });
    return sendJson(res, 201, { service });
  }

  const serviceMatch = pathname.match(/^\/api\/admin\/services\/([^/]+)$/);
  if (req.method === "PATCH" && serviceMatch) {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const body = await readBody(req);
    const updated = await updateDb((db) => {
      const service = (db.services || []).find((item) => item.id === serviceMatch[1]);
      if (!service) return null;
      service.title = sanitize(body.title, 120) || service.title;
      service.summary = sanitize(body.summary, 240) || service.summary;
      if (Array.isArray(body.features)) {
        service.features = body.features.map((item) => sanitize(item, 80)).filter(Boolean).slice(0, 6);
      }
      service.icon = sanitize(body.icon, 40) || service.icon || "Code2";
      return service;
    });
    if (!updated) return sendJson(res, 404, { message: "Service not found" });
    return sendJson(res, 200, { service: updated });
  }

  if (req.method === "DELETE" && serviceMatch) {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    await updateDb((db) => {
      db.services = db.services.filter((item) => item.id !== serviceMatch[1]);
      return true;
    });
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === "POST" && pathname === "/api/admin/projects") {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const body = await readBody(req);
    const imageUrl = sanitizeImage(body.imageUrl);
    if (body.imageUrl && !imageUrl) {
      return sendJson(res, 400, { message: "Project image must be a valid image URL or optimized image upload." });
    }
    const project = {
      id: crypto.randomUUID(),
      name: sanitize(body.name, 120),
      type: sanitize(body.type, 80),
      summary: sanitize(body.summary, 260),
      result: sanitize(body.result, 120),
      websiteUrl: sanitizeUrl(body.websiteUrl),
      imageUrl,
    };
    if (!project.name || !project.summary) {
      return sendJson(res, 400, { message: "Project name and summary are required." });
    }
    await updateDb((db) => {
      db.projects.push(project);
      return project;
    });
    return sendJson(res, 201, { project });
  }

  const projectMatch = pathname.match(/^\/api\/admin\/projects\/([^/]+)$/);
  if (req.method === "PATCH" && projectMatch) {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    const body = await readBody(req);
    const hasImage = Object.prototype.hasOwnProperty.call(body, "imageUrl");
    const imageUrl = hasImage ? sanitizeImage(body.imageUrl) : "";
    if (hasImage && body.imageUrl && !imageUrl) {
      return sendJson(res, 400, { message: "Project image must be a valid image URL or optimized image upload." });
    }
    const updated = await updateDb((db) => {
      const project = (db.projects || []).find((item) => item.id === projectMatch[1]);
      if (!project) return null;
      project.name = sanitize(body.name, 120) || project.name;
      project.type = sanitize(body.type, 80);
      project.summary = sanitize(body.summary, 260) || project.summary;
      project.result = sanitize(body.result, 120);
      project.websiteUrl = sanitizeUrl(body.websiteUrl);
      if (hasImage) project.imageUrl = imageUrl;
      return project;
    });
    if (!updated) return sendJson(res, 404, { message: "Project not found" });
    return sendJson(res, 200, { project: updated });
  }

  if (req.method === "DELETE" && projectMatch) {
    const admin = requireAdmin(req, res);
    if (!admin) return null;
    await updateDb((db) => {
      db.projects = db.projects.filter((item) => item.id !== projectMatch[1]);
      return true;
    });
    return sendJson(res, 200, { ok: true });
  }

  return sendJson(res, 404, { message: "Not found" });
}

async function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const content = await fs.readFile(filePath);
  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  res.end(content);
}

async function routeStatic(req, res, pathname) {
  if (pathname === "/" || pathname === "/index.html") {
    return sendFile(res, path.join(root, "index.html"));
  }

  if (pathname === "/styles.css") {
    return sendFile(res, path.join(root, "public", "styles.css"));
  }

  if (pathname === "/app.js") {
    return sendFile(res, path.join(root, "public", "app.js"));
  }

  if (pathname === "/admin.js") {
    return sendFile(res, path.join(root, "public", "admin.js"));
  }

  if (pathname === "/console" || pathname.startsWith("/console/")) {
    return sendFile(res, path.join(root, "public", "admin.html"));
  }

  if (pathname.startsWith("/assets/")) {
    const assetPath = path.normalize(path.join(root, "public", pathname));
    const assetRoot = path.join(root, "public", "assets");
    if (!assetPath.startsWith(assetRoot)) {
      return sendJson(res, 403, { message: "Forbidden" });
    }
    return sendFile(res, assetPath);
  }

  if (!pathname.startsWith("/api")) {
    return sendFile(res, path.join(root, "index.html"));
  }

  return sendJson(res, 404, { message: "Not found" });
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
    const pathname = decodeURIComponent(url.pathname);

    if (pathname === "/admin" || pathname === "/admin/") {
      return redirect(res, "/console");
    }

    if (pathname.startsWith("/api/")) {
      return routeApi(req, res, pathname);
    }

    return routeStatic(req, res, pathname);
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { message: "Something went wrong." });
  }
});

server.listen(port, () => {
  console.log(`Sitesnap running on http://127.0.0.1:${port}`);
});
