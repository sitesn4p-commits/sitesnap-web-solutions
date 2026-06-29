(function () {
  const logo = "/assets/sitesnap-logo.png";
  const root = document.getElementById("admin-root");
  const statusOptions = ["new", "contacted", "quoted", "won", "closed"];
  const state = {
    authenticated: false,
    loading: true,
    tab: "overview",
    dashboard: null,
    content: null,
    inquiries: [],
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
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not read the selected image."));
      image.src = src;
    });
  }

  async function compressProjectImage(file) {
    if (!file || !file.size) return "";
    if (!file.type.startsWith("image/")) {
      throw new Error("Please choose an image file for the project screenshot.");
    }

    const objectUrl = URL.createObjectURL(file);
    try {
      const image = await loadImage(objectUrl);
      const maxWidth = 1200;
      const maxHeight = 760;
      const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.78);
      if (dataUrl.length > 1100000) {
        throw new Error("That screenshot is still too large. Please choose a smaller image.");
      }
      return dataUrl;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  function statusPill(status) {
    return `<span class="status-pill status-${escapeHtml(status)}">${escapeHtml(status)}</span>`;
  }

  function emptyState(text) {
    return `<div class="empty-state">${escapeHtml(text)}</div>`;
  }

  async function loadAll() {
    const [dashboard, content, inquiryData] = await Promise.all([
      fetchJson("/api/admin/dashboard"),
      fetchJson("/api/admin/content"),
      fetchJson("/api/admin/inquiries"),
    ]);
    state.dashboard = dashboard;
    state.content = content;
    state.inquiries = inquiryData.inquiries || [];
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

  function renderContent() {
    const services = state.content?.services || [];
    const projects = state.content?.projects || [];
    return `
      <div class="admin-view">
        <div class="admin-heading"><span>Content</span><h2>Public website services and projects</h2></div>
        <div class="admin-two-col align-start">
          <section class="admin-panel">
            <div class="panel-title"><h3>Services</h3></div>
            <div class="content-list">
              ${services
                .map(
                  (service) => `
                    <article>
                      <div><strong>${escapeHtml(service.title)}</strong><p>${escapeHtml(service.summary)}</p></div>
                      <button class="danger-button" type="button" data-delete-service="${escapeHtml(service.id)}" aria-label="Delete service">${svg.Trash}</button>
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
          <section class="admin-panel">
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
                      <button class="danger-button" type="button" data-delete-project="${escapeHtml(project.id)}" aria-label="Delete project">${svg.Trash}</button>
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
                <small id="project-file-note">PNG, JPG, or WebP. The image will be optimized before saving.</small>
              </label>
              <button class="admin-primary" type="submit">${svg.Plus} Add project</button>
              <p class="admin-message error" data-project-message hidden></p>
            </form>
          </section>
        </div>
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
            <button class="admin-primary" type="submit">${svg.Save} Save settings</button>
            <p class="admin-message" id="settings-message" hidden></p>
          </form>
        </section>
      </div>
    `;
  }

  function currentView() {
    if (state.tab === "leads") return renderLeads();
    if (state.tab === "content") return renderContent();
    if (state.tab === "settings") return renderSettings();
    return renderOverview();
  }

  function renderShell() {
    const items = [
      ["overview", "Overview", svg.Dashboard],
      ["leads", "Leads", svg.Leads],
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
        await fetchJson(`/api/admin/inquiries/${select.dataset.statusId}`, {
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
        await fetchJson(`/api/admin/services/${button.dataset.deleteService}`, { method: "DELETE" });
        await loadAll();
        renderShell();
      });
    });

    document.querySelectorAll("[data-delete-project]").forEach((button) => {
      button.addEventListener("click", async () => {
        if (!window.confirm("Delete this project?")) return;
        await fetchJson(`/api/admin/projects/${button.dataset.deleteProject}`, { method: "DELETE" });
        await loadAll();
        renderShell();
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
        const uploadedImage = await compressProjectImage(data.get("imageFile"));
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
      note.textContent = file ? `${file.name} selected - ${(file.size / 1024 / 1024).toFixed(2)} MB` : "PNG, JPG, or WebP. The image will be optimized before saving.";
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
