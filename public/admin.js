(function () {
  const logo = "/assets/sitesnap-logo.png?v=20260629-logo-main";
  const root = document.getElementById("admin-root");
  const statusOptions = ["new", "contacted", "quoted", "won", "closed"];
  const state = {
    authenticated: false,
    loading: true,
    tab: "overview",
    dashboard: null,
    content: null,
    inquiries: [],
    careers: [],
    leadQuery: "",
  };

  const svg = {
    Dashboard: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>',
    Leads: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path></svg>',
    Content: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>',
    Settings: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.5a2 2 0 0 1-1 1.72l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.72v-.5a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    Logout: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path></svg>',
    User: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>',
    Plus: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5v14"></path></svg>',
    Pencil: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>',
    Trash: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="m19 6-1 14H6L5 6"></path></svg>',
    Save: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M17 21v-8H7v8"></path><path d="M7 3v5h8"></path></svg>',
    Phone: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    Mail: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    Check: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"></path></svg>',
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  async function fetchJson(url, options = {}) {
    const response = await fetch(url, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const text = await response.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (_error) {
      data = { message: text.trim().slice(0, 140) };
    }
    if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
    return data;
  }

  function adminItemEndpoint(path, id) {
    return `${path}?id=${encodeURIComponent(id)}`;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not read the selected image."));
      image.src = src;
    });
  }

  async function compressImageFile(file, options) {
    if (!file || !file.size) return "";
    if (!file.type.startsWith("image/")) {
      throw new Error(options.typeError || "Please choose an image file.");
    }

    const objectUrl = URL.createObjectURL(file);
    try {
      const image = await loadImage(objectUrl);
      const maxWidth = options.maxWidth;
      const maxHeight = options.maxHeight;
      const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", options.quality);
      if (dataUrl.length > options.maxLength) {
        throw new Error(options.sizeError || "That image is still too large. Please choose a smaller image.");
      }
      return dataUrl;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  async function compressProjectImage(file) {
    return compressImageFile(file, {
      maxWidth: 1200,
      maxHeight: 760,
      quality: 0.78,
      maxLength: 1100000,
      typeError: "Please choose an image file for the project screenshot.",
      sizeError: "That screenshot is still too large. Please choose a smaller image.",
    });
  }

  async function uploadOptimizedImage(file, folder, compressor) {
    const imageData = await compressor(file);
    if (!imageData) return "";
    const result = await fetchJson("/api/admin/upload-image", {
      method: "POST",
      body: JSON.stringify({ imageData, folder }),
    });
    return result.imageUrl || "";
  }

  async function uploadProjectImage(file) {
    return uploadOptimizedImage(file, "projects", compressProjectImage);
  }

  async function compressProfileImage(file) {
    return compressImageFile(file, {
      maxWidth: 620,
      maxHeight: 620,
      quality: 0.82,
      maxLength: 520000,
      typeError: "Please choose an image file for the team profile.",
      sizeError: "That profile image is still too large. Please choose a smaller image.",
    });
  }

  async function uploadProfileImage(file) {
    return uploadOptimizedImage(file, "team", compressProfileImage);
  }

  function statusPill(status) {
    return `<span class="status-pill status-${escapeHtml(status)}">${escapeHtml(status)}</span>`;
  }

  function emptyState(text) {
    return `<div class="empty-state">${escapeHtml(text)}</div>`;
  }

  async function loadAll() {
    const [dashboard, content, inquiryData, careerData] = await Promise.all([
      fetchJson("/api/admin/dashboard"),
      fetchJson("/api/admin/content"),
      fetchJson("/api/admin/inquiries"),
      fetchJson("/api/admin/careers"),
    ]);
    state.dashboard = dashboard;
    state.content = content;
    state.inquiries = inquiryData.inquiries || [];
    state.careers = careerData.careers || [];
  }

  async function checkAuth() {
    try {
      await fetchJson("/api/admin/me");
      state.authenticated = true;
      await loadAll();
    } catch (_error) {
      state.authenticated = false;
    } finally {
      state.loading = false;
      render();
    }
  }

  function renderLogin(message = "") {
    root.innerHTML = `
      <div class="admin-login">
        <div class="login-panel">
          <img src="${logo}" alt="Sitesnap Web Solutions" />
          <span class="admin-kicker">Private Workspace</span>
          <h1>Sign in to manage Sitesnap.</h1>
          <p>Manage leads, public content, services, projects, and contact settings from one clean dashboard.</p>
          <form id="login-form">
            <label>Username<input name="username" value="admin" autocomplete="username" /></label>
            <label>Password<input name="password" type="password" autocomplete="current-password" required /></label>
            <button class="admin-primary" type="submit">Sign In</button>
            ${message ? `<p class="admin-message error">${escapeHtml(message)}</p>` : ""}
          </form>
        </div>
      </div>
    `;

    document.getElementById("login-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const button = form.querySelector("button");
      button.textContent = "Checking...";
      button.disabled = true;
      try {
        await fetchJson("/api/admin/login", {
          method: "POST",
          body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
        });
        state.authenticated = true;
        await loadAll();
        render();
      } catch (error) {
        renderLogin(error.message);
      }
    });
  }

  function renderOverview() {
    const metrics = state.dashboard?.metrics || {};
    const cards = [
      ["Total Leads", metrics.inquiries || 0, svg.Leads],
      ["New Leads", metrics.newLeads || 0, svg.Mail],
      ["Services", metrics.services || 0, svg.Content],
      ["Projects", metrics.projects || 0, svg.Dashboard],
      ["CV Submissions", metrics.careers || 0, svg.User],
    ];
    const latest = state.dashboard?.latestInquiries || [];
    return `
      <div class="admin-view">
        <div class="admin-heading"><span>Dashboard</span><h2>Business snapshot</h2></div>
        <div class="metric-grid">
          ${cards.map(([label, value, icon]) => `<article class="metric-card">${icon}<strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></article>`).join("")}
        </div>
        <div class="admin-two-col">
          <section class="admin-panel">
            <div class="panel-title"><h3>Latest enquiries</h3><button type="button" data-tab-shortcut="leads">View all</button></div>
            <div class="lead-list compact">
              ${
                latest.length
                  ? latest.map((lead) => `<article><div><strong>${escapeHtml(lead.name)}</strong><span>${escapeHtml(lead.service || "General enquiry")}</span></div>${statusPill(lead.status)}</article>`).join("")
                  : emptyState("No enquiries yet.")
              }
            </div>
          </section>
          <section class="admin-panel">
            <div class="panel-title"><h3>Launch checklist</h3></div>
            <ul class="checklist">
              <li>${svg.Check} Public site content connected</li>
              <li>${svg.Check} Contact form stores leads</li>
              <li>${svg.Check} Admin session protected</li>
              <li>${svg.Check} Services and projects editable</li>
            </ul>
          </section>
        </div>
      </div>
    `;
  }

  function renderLeads() {
    const term = state.leadQuery.toLowerCase();
    const leads = state.inquiries.filter((lead) => [lead.name, lead.phone, lead.email, lead.service, lead.status].join(" ").toLowerCase().includes(term));
    return `
      <div class="admin-view">
        <div class="admin-heading row">
          <div><span>Lead Desk</span><h2>Incoming project requests</h2></div>
          <input class="admin-search" id="lead-search" value="${escapeHtml(state.leadQuery)}" placeholder="Search leads" />
        </div>
        <section class="admin-panel">
          <div class="lead-table">
            <div class="lead-row head"><span>Client</span><span>Service</span><span>Contact</span><span>Status</span></div>
            ${
              leads.length
                ? leads
                    .map(
                      (lead) => `
                        <div class="lead-row">
                          <div><strong>${escapeHtml(lead.name)}</strong><small>${escapeHtml(lead.company || "No company")} · ${new Date(lead.createdAt).toLocaleDateString()}</small><p>${escapeHtml(lead.message)}</p></div>
                          <span>${escapeHtml(lead.service || "General")}</span>
                          <span class="lead-contact"><a href="tel:${escapeHtml(lead.phone)}">${svg.Phone} ${escapeHtml(lead.phone)}</a>${lead.email ? `<a href="mailto:${escapeHtml(lead.email)}">${svg.Mail} ${escapeHtml(lead.email)}</a>` : ""}</span>
                          <select data-status-id="${escapeHtml(lead.id)}">${statusOptions.map((status) => `<option ${status === lead.status ? "selected" : ""}>${status}</option>`).join("")}</select>
                        </div>
                      `
                    )
                    .join("")
                : emptyState("No matching leads.")
            }
          </div>
        </section>
      </div>
    `;
  }

  function renderCareers() {
    const careers = state.careers || [];
    return `
      <div class="admin-view">
        <div class="admin-heading row">
          <div><span>Careers</span><h2>CV submissions</h2></div>
        </div>
        <section class="admin-panel">
          <div class="career-list">
            ${
              careers.length
                ? careers
                    .map(
                      (career) => `
                        <article class="career-row">
                          <div>
                            <strong>${escapeHtml(career.name)}</strong>
                            <small>${escapeHtml(career.role || "Open role")} - ${new Date(career.createdAt).toLocaleDateString()}</small>
                            <p>${escapeHtml(career.message || "No note added.")}</p>
                            <span class="lead-contact">
                              <a href="tel:${escapeHtml(career.phone)}">${svg.Phone} ${escapeHtml(career.phone)}</a>
                              ${career.email ? `<a href="mailto:${escapeHtml(career.email)}">${svg.Mail} ${escapeHtml(career.email)}</a>` : ""}
                            </span>
                          </div>
                          <a class="admin-mini-link" href="${escapeHtml(career.cvData)}" download="${escapeHtml(career.cvName || "sitesnap-cv.pdf")}">${svg.Save} Download CV</a>
                        </article>
                      `
                    )
                    .join("")
                : emptyState("No CV submissions yet.")
            }
          </div>
        </section>
      </div>
    `;
  }

  function renderContent() {
    const services = state.content?.services || [];
    const projects = state.content?.projects || [];
    const settings = state.content?.settings || {};
    return `
      <div class="admin-view">
        <div class="admin-heading"><span>Content</span><h2>Public website services and projects</h2></div>
        <div class="content-control-grid">
          <section class="admin-panel content-manager-panel">
            <div class="panel-title"><h3>Services</h3></div>
            <div class="content-list">
              ${services
                .map(
                  (service) => `
                    <article class="content-service-row">
                      <div><strong>${escapeHtml(service.title)}</strong><p>${escapeHtml(service.summary)}</p></div>
                      <div class="content-actions">
                        <button class="soft-button icon-only" type="button" data-toggle-service-edit="${escapeHtml(service.id)}" aria-label="Edit service">${svg.Pencil}</button>
                        <button class="danger-button" type="button" data-delete-service="${escapeHtml(service.id)}" aria-label="Delete service">${svg.Trash}</button>
                      </div>
                      <form class="admin-form inline-edit-form" data-service-edit-form="${escapeHtml(service.id)}" hidden>
                        <input name="title" value="${escapeHtml(service.title)}" placeholder="Title" required />
                        <textarea name="summary" placeholder="Summary" required>${escapeHtml(service.summary)}</textarea>
                        <input name="features" value="${escapeHtml((service.features || []).join(", "))}" placeholder="Features, comma separated" />
                        <button class="admin-primary" type="submit">${svg.Save} Save service</button>
                      </form>
                    </article>
                  `
                )
                .join("")}
            </div>
            <form class="admin-form" id="service-form">
              <h4>Add service</h4>
              <input name="title" placeholder="Title" required />
              <textarea name="summary" placeholder="Summary" required></textarea>
              <input name="features" placeholder="Features, comma separated" />
              <button class="admin-primary" type="submit">${svg.Plus} Add service</button>
            </form>
          </section>
          <section class="admin-panel content-manager-panel">
            <div class="panel-title"><h3>Projects</h3></div>
            <div class="content-list">
              ${projects
                .map(
                  (project) => `
                    <article class="content-project-row">
                      <div class="project-admin-thumb">${project.imageUrl ? `<img src="${escapeHtml(project.imageUrl)}" alt="" />` : svg.Dashboard}</div>
                      <div>
                        <strong>${escapeHtml(project.name)}</strong>
                        <p>${escapeHtml(project.summary)}</p>
                        <small>${escapeHtml(project.type || "Website")} ${project.websiteUrl ? `- ${escapeHtml(project.websiteUrl)}` : ""}</small>
                      </div>
                      <div class="content-actions">
                        <button class="soft-button icon-only" type="button" data-toggle-project-edit="${escapeHtml(project.id)}" aria-label="Edit project">${svg.Pencil}</button>
                        <button class="danger-button content-delete-button" type="button" data-delete-project="${escapeHtml(project.id)}" data-delete-project-name="${escapeHtml(project.name)}" aria-label="Delete ${escapeHtml(project.name)}">${svg.Trash}<span>Delete</span></button>
                      </div>
                      <form class="admin-form inline-edit-form project-edit-form" data-project-edit-form="${escapeHtml(project.id)}" hidden>
                        <input name="name" value="${escapeHtml(project.name)}" placeholder="Name" required />
                        <input name="type" value="${escapeHtml(project.type || "")}" placeholder="Type" />
                        <textarea name="summary" placeholder="Summary" required>${escapeHtml(project.summary)}</textarea>
                        <input name="result" value="${escapeHtml(project.result || "")}" placeholder="Result" />
                        <input name="websiteUrl" type="url" value="${escapeHtml(project.websiteUrl || "")}" placeholder="Website link (https://example.com)" />
                        <input name="imageUrl" value="${escapeHtml(project.imageUrl || "")}" placeholder="Preview image URL (optional)" />
                        <label class="project-upload-field">
                          <input data-project-edit-file name="imageFile" type="file" accept="image/*" />
                          <span>Replace website screenshot</span>
                          <small data-project-edit-note>PNG, JPG, or WebP. Uploaded to Cloudinary. Leave empty to keep the current image.</small>
                        </label>
                        <button class="admin-primary" type="submit">${svg.Save} Save project</button>
                        <p class="admin-message error" data-project-edit-message hidden></p>
                      </form>
                    </article>
                  `
                )
                .join("")}
            </div>
            <form class="admin-form" id="project-form">
              <h4>Add project</h4>
              <input name="name" placeholder="Name" required />
              <input name="type" placeholder="Type" />
              <textarea name="summary" placeholder="Summary" required></textarea>
              <input name="result" placeholder="Result" />
              <input name="websiteUrl" type="url" placeholder="Website link (https://example.com)" />
              <input name="imageUrl" placeholder="Preview image URL (optional)" />
              <label class="project-upload-field">
                <input id="project-image-file" name="imageFile" type="file" accept="image/*" />
                <span>Upload website screenshot</span>
                <small id="project-file-note">PNG, JPG, or WebP. The image will be optimized and uploaded to Cloudinary.</small>
              </label>
              <button class="admin-primary" type="submit">${svg.Plus} Add project</button>
              <p class="admin-message error" data-project-message hidden></p>
            </form>
          </section>
        </div>
        <section class="admin-panel team-editor-panel">
          <div class="panel-title"><h3>Meet Our Team Lead</h3></div>
          <form class="admin-form team-form" id="team-form">
            <div class="team-editor-layout">
              <div class="team-admin-photo">${settings.teamLeadImageUrl ? `<img src="${escapeHtml(settings.teamLeadImageUrl)}" alt="" />` : svg.User}</div>
              <div class="admin-form-stack">
                <input name="teamLeadName" value="${escapeHtml(settings.teamLeadName || "Sathsara Bandara")}" placeholder="Name" required />
                <input name="teamLeadRole" value="${escapeHtml(settings.teamLeadRole || "Founder / Web Strategist")}" placeholder="Role" />
                <textarea name="teamLeadBio" placeholder="Short bio">${escapeHtml(settings.teamLeadBio || "")}</textarea>
                <input name="teamLeadImageUrl" value="${escapeHtml(settings.teamLeadImageUrl || "")}" placeholder="Profile image URL (optional)" />
                <label class="project-upload-field">
                  <input id="team-image-file" name="teamImageFile" type="file" accept="image/*" />
                  <span>Upload profile image</span>
                  <small id="team-file-note">PNG, JPG, or WebP. The image will be optimized and uploaded to Cloudinary.</small>
                </label>
                <button class="admin-primary" type="submit">${svg.Save} Save team profile</button>
                <p class="admin-message" id="team-message" hidden></p>
              </div>
            </div>
          </form>
        </section>
      </div>
    `;
  }

  function renderSettings() {
    const settings = state.content?.settings || {};
    return `
      <div class="admin-view">
        <div class="admin-heading"><span>Settings</span><h2>Contact and public details</h2></div>
        <section class="admin-panel narrow">
          <form class="admin-form settings-form" id="settings-form">
            <label>Phone<input name="phone" value="${escapeHtml(settings.phone || "")}" /></label>
            <label>WhatsApp international number<input name="whatsapp" value="${escapeHtml(settings.whatsapp || "")}" /></label>
            <label>Email<input name="email" value="${escapeHtml(settings.email || "")}" /></label>
            <label>Location<input name="location" value="${escapeHtml(settings.location || "")}" /></label>
            <label>Facebook URL<input name="facebookUrl" type="url" value="${escapeHtml(settings.facebookUrl || "")}" /></label>
            <label>Instagram URL<input name="instagramUrl" type="url" value="${escapeHtml(settings.instagramUrl || "")}" /></label>
            <label>LinkedIn URL<input name="linkedinUrl" type="url" value="${escapeHtml(settings.linkedinUrl || "")}" /></label>
            <button class="admin-primary" type="submit">${svg.Save} Save settings</button>
            <p class="admin-message" id="settings-message" hidden></p>
          </form>
        </section>
      </div>
    `;
  }

  function currentView() {
    if (state.tab === "leads") return renderLeads();
    if (state.tab === "careers") return renderCareers();
    if (state.tab === "content") return renderContent();
    if (state.tab === "settings") return renderSettings();
    return renderOverview();
  }

  function renderShell() {
    const items = [
      ["overview", "Overview", svg.Dashboard],
      ["leads", "Leads", svg.Leads],
      ["careers", "Careers", svg.User],
      ["content", "Content", svg.Content],
      ["settings", "Settings", svg.Settings],
    ];
    root.innerHTML = `
      <div class="admin-shell">
        <aside class="admin-sidebar">
          <div class="sidebar-logo"><img src="${logo}" alt="Sitesnap Web Solutions" /></div>
          <nav aria-label="Workspace navigation">
            ${items.map(([id, label, icon]) => `<button class="${state.tab === id ? "active" : ""}" type="button" data-tab="${id}">${icon} ${label}</button>`).join("")}
          </nav>
          <button class="logout-button" type="button" id="logout-button">${svg.Logout} Logout</button>
        </aside>
        <main class="admin-main">
          <header class="admin-topbar"><div><span>Sitesnap Console</span><strong>Private admin panel</strong></div><div class="admin-user">${svg.User} admin</div></header>
          ${currentView()}
        </main>
      </div>
    `;
    bindShell();
  }

  function bindShell() {
    document.querySelectorAll("[data-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        state.tab = button.dataset.tab;
        renderShell();
      });
    });

    document.querySelector("[data-tab-shortcut]")?.addEventListener("click", (event) => {
      state.tab = event.currentTarget.dataset.tabShortcut;
      renderShell();
    });

    document.getElementById("logout-button")?.addEventListener("click", async () => {
      await fetchJson("/api/admin/logout", { method: "POST" });
      state.authenticated = false;
      renderLogin();
    });

    document.getElementById("lead-search")?.addEventListener("input", (event) => {
      state.leadQuery = event.target.value;
      renderShell();
    });

    document.querySelectorAll("[data-status-id]").forEach((select) => {
      select.addEventListener("change", async () => {
        await fetchJson(adminItemEndpoint("/api/admin/inquiries", select.dataset.statusId), {
          method: "PATCH",
          body: JSON.stringify({ status: select.value }),
        });
        await loadAll();
        renderShell();
      });
    });

    document.querySelectorAll("[data-delete-service]").forEach((button) => {
      button.addEventListener("click", async () => {
        if (!window.confirm("Delete this service?")) return;
        await fetchJson(adminItemEndpoint("/api/admin/services", button.dataset.deleteService), { method: "DELETE" });
        await loadAll();
        renderShell();
      });
    });

    document.querySelectorAll("[data-delete-project]").forEach((button) => {
      button.addEventListener("click", async () => {
        const projectName = button.dataset.deleteProjectName || "this project";
        if (!window.confirm(`Delete "${projectName}" from your projects?`)) return;
        button.disabled = true;
        button.innerHTML = `${svg.Trash}<span>Deleting...</span>`;
        try {
          await fetchJson(adminItemEndpoint("/api/admin/projects", button.dataset.deleteProject), { method: "DELETE" });
          await loadAll();
          renderShell();
        } catch (error) {
          window.alert(error.message);
          button.disabled = false;
          button.innerHTML = `${svg.Trash}<span>Delete</span>`;
        }
      });
    });

    document.querySelectorAll("[data-toggle-service-edit]").forEach((button) => {
      button.addEventListener("click", () => {
        const form = document.querySelector(`[data-service-edit-form="${CSS.escape(button.dataset.toggleServiceEdit)}"]`);
        if (!form) return;
        form.hidden = !form.hidden;
      });
    });

    document.querySelectorAll("[data-toggle-project-edit]").forEach((button) => {
      button.addEventListener("click", () => {
        const form = document.querySelector(`[data-project-edit-form="${CSS.escape(button.dataset.toggleProjectEdit)}"]`);
        if (!form) return;
        form.hidden = !form.hidden;
      });
    });

    document.querySelectorAll("[data-service-edit-form]").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        const button = form.querySelector("button");
        button.disabled = true;
        button.textContent = "Saving...";
        try {
          await fetchJson(adminItemEndpoint("/api/admin/services", form.dataset.serviceEditForm), {
            method: "PATCH",
            body: JSON.stringify({
              title: data.title,
              summary: data.summary,
              features: String(data.features || "").split(",").map((item) => item.trim()).filter(Boolean),
            }),
          });
          await loadAll();
          renderShell();
        } finally {
          button.disabled = false;
          button.innerHTML = `${svg.Save} Save service`;
        }
      });
    });

    document.querySelectorAll("[data-project-edit-form]").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const message = form.querySelector("[data-project-edit-message]");
        const button = form.querySelector("button");
        button.disabled = true;
        button.textContent = "Saving...";
        message.hidden = true;
        try {
          const uploadedImage = await uploadProjectImage(data.get("imageFile"));
          await fetchJson(adminItemEndpoint("/api/admin/projects", form.dataset.projectEditForm), {
            method: "PATCH",
            body: JSON.stringify({
              name: data.get("name"),
              type: data.get("type"),
              summary: data.get("summary"),
              result: data.get("result"),
              websiteUrl: data.get("websiteUrl"),
              imageUrl: uploadedImage || data.get("imageUrl"),
            }),
          });
          await loadAll();
          renderShell();
        } catch (error) {
          message.textContent = error.message;
          message.hidden = false;
        } finally {
          button.disabled = false;
          button.innerHTML = `${svg.Save} Save project`;
        }
      });
    });

    document.getElementById("service-form")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      await fetchJson("/api/admin/services", {
        method: "POST",
        body: JSON.stringify({
          title: data.title,
          summary: data.summary,
          features: String(data.features || "").split(",").map((item) => item.trim()).filter(Boolean),
        }),
      });
      await loadAll();
      renderShell();
    });

    document.getElementById("project-form")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const message = form.querySelector("[data-project-message]");
      const button = form.querySelector("button");
      const data = new FormData(form);
      button.disabled = true;
      button.textContent = "Saving...";
      message.hidden = true;
      try {
        const uploadedImage = await uploadProjectImage(data.get("imageFile"));
        await fetchJson("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify({
            name: data.get("name"),
            type: data.get("type"),
            summary: data.get("summary"),
            result: data.get("result"),
            websiteUrl: data.get("websiteUrl"),
            imageUrl: uploadedImage || data.get("imageUrl"),
          }),
        });
        await loadAll();
        renderShell();
      } catch (error) {
        message.textContent = error.message;
        message.hidden = false;
      } finally {
        button.disabled = false;
        button.innerHTML = `${svg.Plus} Add project`;
      }
    });

    document.getElementById("project-image-file")?.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      const note = document.getElementById("project-file-note");
      if (!note) return;
      note.textContent = file ? `${file.name} selected - ${(file.size / 1024 / 1024).toFixed(2)} MB` : "PNG, JPG, or WebP. The image will be optimized and uploaded to Cloudinary.";
    });

    document.querySelectorAll("[data-project-edit-file]").forEach((input) => {
      input.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        const note = input.closest("form")?.querySelector("[data-project-edit-note]");
        if (!note) return;
        note.textContent = file ? `${file.name} selected - ${(file.size / 1024 / 1024).toFixed(2)} MB` : "PNG, JPG, or WebP. Uploaded to Cloudinary. Leave empty to keep the current image.";
      });
    });

    document.getElementById("team-form")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const message = document.getElementById("team-message");
      const button = form.querySelector("button");
      button.disabled = true;
      button.textContent = "Saving...";
      message.hidden = true;
      try {
        const uploadedImage = await uploadProfileImage(data.get("teamImageFile"));
        await fetchJson("/api/admin/settings", {
          method: "PATCH",
          body: JSON.stringify({
            teamLeadName: data.get("teamLeadName"),
            teamLeadRole: data.get("teamLeadRole"),
            teamLeadBio: data.get("teamLeadBio"),
            teamLeadImageUrl: uploadedImage || data.get("teamLeadImageUrl"),
          }),
        });
        await loadAll();
        renderShell();
      } catch (error) {
        message.textContent = error.message;
        message.classList.add("error");
        message.hidden = false;
      } finally {
        button.disabled = false;
        button.innerHTML = `${svg.Save} Save team profile`;
      }
    });

    document.getElementById("team-image-file")?.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      const note = document.getElementById("team-file-note");
      if (!note) return;
      note.textContent = file ? `${file.name} selected - ${(file.size / 1024 / 1024).toFixed(2)} MB` : "PNG, JPG, or WebP. The image will be optimized and uploaded to Cloudinary.";
    });

    document.getElementById("settings-form")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = document.getElementById("settings-message");
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      await fetchJson("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      await loadAll();
      message.textContent = "Settings saved.";
      message.hidden = false;
    });
  }

  function render() {
    if (state.loading) {
      root.innerHTML = '<div class="admin-loading">Loading workspace...</div>';
      return;
    }
    if (!state.authenticated) {
      renderLogin();
      return;
    }
    renderShell();
  }

  checkAuth();
})();
