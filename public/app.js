(function () {
  const logo = "/assets/sitesnap-logo.png";
  const root = document.getElementById("app");

  const fallbackSite = {
    settings: {
      companyName: "Sitesnap Web Solutions",
      tagline: "Build. Launch. Grow.",
      phone: "0703720132",
      whatsapp: "94703720132",
      email: "hello@sitesnap.lk",
      location: "Sri Lanka",
      facebookUrl: "https://www.facebook.com/share/1J8YPujnnk/",
      instagramUrl: "https://www.instagram.com/sitesn4p?igsh=MTQzanNubmllemxzNQ==",
      linkedinUrl: "https://lk.linkedin.com/in/site-snap-a2570b3b0",
      openingHours: "Mon - Sat, 9:00 AM - 6:00 PM",
      heroTitle: "All Your Digital Needs, In One Sharp Place.",
      heroLead: "We craft fast websites, web apps, ecommerce experiences, and search-ready digital systems that help businesses look premium and win better leads.",
      teamLeadName: "Sathsara Bandara",
      teamLeadRole: "Founder / Web Strategist",
      teamLeadBio: "Leads project direction, client strategy, and launch quality from the first idea to the live website.",
      teamLeadImageUrl: "",
    },
    stats: [
      { label: "Projects Delivered", value: "28+" },
      { label: "Happy Clients", value: "18+" },
      { label: "Launch Support", value: "24/7" },
    ],
    services: [],
    process: [],
    projects: [],
    industries: [],
    testimonials: [],
    faqs: [],
  };

  function initialsFor(name) {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    return (parts[0]?.[0] || "S") + (parts[1]?.[0] || "B");
  }

  function teamMembersFor(site) {
    const settings = site.settings || {};
    return [
      {
        id: "strategy",
        name: settings.teamLeadName || "Sathsara Bandara",
        role: settings.teamLeadRole || "Founder / Web Strategist",
        bio: settings.teamLeadBio || "Leads project direction, client strategy, and launch quality from the first idea to the live website.",
        initials: initialsFor(settings.teamLeadName || "Sathsara Bandara").toUpperCase(),
        imageUrl: settings.teamLeadImageUrl || "",
        x: 50,
        y: 9,
      },
      {
        id: "interface",
        name: "UI Design Lead",
        role: "Interface Designer",
        bio: "Shapes clean layouts, responsive details, and brand energy that makes each business feel premium online.",
        initials: "UI",
        x: 82,
        y: 27,
      },
      {
        id: "engineering",
        name: "Full Stack Developer",
        role: "Frontend & Backend",
        bio: "Builds fast pages, private dashboards, APIs, forms, integrations, and reliable owner workflows.",
        initials: "FS",
        x: 78,
        y: 72,
      },
      {
        id: "join",
        name: "Join Our Team",
        role: "Open CV Submission",
        bio: "Want to work with Sitesnap? Send your CV and tell us what you are good at. We will review it from the private workspace.",
        initials: "?",
        isJoin: true,
        x: 50,
        y: 89,
      },
      {
        id: "growth",
        name: "Growth Specialist",
        role: "SEO & Content",
        bio: "Plans search-ready structure, clear content paths, local SEO basics, and lead generation touchpoints.",
        initials: "GO",
        x: 22,
        y: 72,
      },
      {
        id: "care",
        name: "Care Plan Lead",
        role: "Maintenance & Support",
        bio: "Handles updates, monitoring, backups, improvements, and the calm support every live website needs.",
        initials: "CP",
        x: 18,
        y: 27,
      },
    ];
  }

  const svg = {
    Search: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>',
    Phone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    Menu: '<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>',
    X: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"></path></svg>',
    Check: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"></path></svg>',
    ArrowRight: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',
    ArrowUpRight: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>',
    Mail: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    MessageCircle: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>',
    Facebook: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M14 8.5h2.3V5h-2.8C10.7 5 9 6.7 9 9.5V12H6.8v3.5H9V22h3.8v-6.5h3l.5-3.5h-3.5V9.8c0-.8.4-1.3 1.2-1.3Z"></path></svg>',
    Instagram: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.4"></circle><circle cx="17.4" cy="6.7" r="0.8" fill="currentColor" stroke="none"></circle></svg>',
    Linkedin: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M6.8 8.8H3.2V21h3.6V8.8ZM5 3a2.1 2.1 0 1 0 0 4.2A2.1 2.1 0 0 0 5 3Zm16 11.2c0-3.6-1.9-5.7-4.8-5.7-1.8 0-2.9.9-3.4 1.7V8.8H9.4V21H13v-6.6c0-1.7.8-2.7 2.2-2.7 1.3 0 2.1.9 2.1 2.7V21H21v-6.8Z"></path></svg>',
    Rocket: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2z"></path></svg>',
    MonitorSmartphone: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="10" x="3" y="4" rx="2"></rect><rect width="7" height="12" x="14" y="8" rx="2"></rect><path d="M8 18h4"></path></svg>',
    Code2: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>',
    ShoppingBag: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',
    Sparkles: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.9 10.8 8 16l-1.9-5.2L1 9l5.1-1.8L8 2l1.9 5.2L15 9Z"></path><path d="m19 22-1.3-3.7L14 17l3.7-1.3L19 12l1.3 3.7L24 17l-3.7 1.3Z"></path></svg>',
    ShieldCheck: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>',
    Globe: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    Layers: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 2 10 5-10 5L2 7Z"></path><path d="m2 17 10 5 10-5"></path><path d="m2 12 10 5 10-5"></path></svg>',
  };

  const pageTitles = {
    "/": "Sitesnap Web Solutions",
    "/about": "About | Sitesnap Web Solutions",
    "/services": "Services | Sitesnap Web Solutions",
    "/portfolio": "Portfolio | Sitesnap Web Solutions",
    "/contact": "Contact | Sitesnap Web Solutions",
  };

  function icon(name) {
    return svg[name] || svg.Code2;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function sectionTag(text) {
    return `<span class="section-tag">${escapeHtml(text)}</span>`;
  }

  function isExternalUrl(value) {
    return /^https?:\/\//i.test(String(value || "").trim());
  }

  function projectHref(project) {
    return isExternalUrl(project.websiteUrl) ? project.websiteUrl : "/contact";
  }

  function fallbackPreviewMarkup(project) {
    const bars = [72, 48, 86, 62];
    return `
      <div class="generated-screen">
        <div class="generated-top"><span></span><span></span><span></span></div>
        <strong>${escapeHtml(project.name)}</strong>
        <small>${escapeHtml(project.type || "Website")}</small>
        <div class="generated-lines">${bars.map((bar) => `<i style="width:${bar}%"></i>`).join("")}</div>
      </div>
    `;
  }

  async function fetchJson(url, options) {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
  }

  function readFileAsDataUrl(file, allowedTypes, maxBytes) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("Please upload your CV."));
        return;
      }
      const fileType = file.type || mimeTypeForFile(file.name);
      if (!allowedTypes.includes(fileType)) {
        reject(new Error("Please upload a PDF, DOC, or DOCX CV."));
        return;
      }
      if (file.size > maxBytes) {
        reject(new Error("Your CV is too large. Please keep it under 1.5 MB."));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const base64 = result.includes(",") ? result.split(",").slice(1).join(",") : result;
        resolve(result.startsWith(`data:${fileType};base64,`) ? result : `data:${fileType};base64,${base64}`);
      };
      reader.onerror = () => reject(new Error("Could not read the selected file."));
      reader.readAsDataURL(file);
    });
  }

  function mimeTypeForFile(name) {
    const lower = String(name || "").toLowerCase();
    if (lower.endsWith(".pdf")) return "application/pdf";
    if (lower.endsWith(".doc")) return "application/msword";
    if (lower.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    return "";
  }

  function normalizeSite(site) {
    return {
      ...fallbackSite,
      ...site,
      settings: { ...fallbackSite.settings, ...(site.settings || {}) },
      stats: site.stats?.length ? site.stats : fallbackSite.stats,
      services: site.services?.length ? site.services : fallbackSite.services,
      process: site.process?.length ? site.process : fallbackSite.process,
      projects: site.projects?.length ? site.projects : fallbackSite.projects,
      industries: site.industries?.length ? site.industries : fallbackSite.industries,
      testimonials: site.testimonials?.length ? site.testimonials : fallbackSite.testimonials,
      faqs: site.faqs?.length ? site.faqs : fallbackSite.faqs,
    };
  }

  function currentRoute() {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    if (path === "/index.html") return "/";
    return pageTitles[path] ? path : "/404";
  }

  function renderHeader(site, route) {
    const links = [
      ["Home", "/"],
      ["About", "/about"],
      ["Services", "/services"],
      ["Portfolio", "/portfolio"],
      ["Contact", "/contact"],
    ];
    const nav = links
      .map(([label, href]) => `<a class="${route === href ? "is-active" : ""}" href="${href}">${label}</a>`)
      .join("");
    return `
      <header class="site-header">
        <div class="nav-shell">
          <a class="brand-mark" href="/" aria-label="Sitesnap Web Solutions home"><img src="${logo}" alt="Sitesnap Web Solutions" /></a>
          <nav class="desktop-nav" aria-label="Main navigation">${nav}</nav>
          <div class="nav-actions">
            <form class="mini-search service-search" action="/services">${icon("Search")}<input name="search" aria-label="Search services" placeholder="Search services" /></form>
            <a class="phone-link" href="tel:${escapeHtml(site.settings.phone)}" aria-label="Call Sitesnap">${icon("Phone")}<span>${escapeHtml(site.settings.phone)}</span></a>
            <a class="primary-pill" href="/contact">Get a Quote</a>
          </div>
          <button class="icon-button menu-button" type="button" id="open-menu" aria-label="Open menu">${icon("Menu")}</button>
        </div>
        <div class="mobile-menu" id="mobile-menu" hidden>
          <div class="mobile-menu-panel">
            <div class="mobile-menu-top">
              <img src="${logo}" alt="Sitesnap Web Solutions" />
              <button class="icon-button" type="button" id="close-menu" aria-label="Close menu">${icon("X")}</button>
            </div>
            <form class="mobile-search service-search" action="/services">${icon("Search")}<input name="search" aria-label="Search services" placeholder="Search services" /></form>
            <nav aria-label="Mobile navigation">${nav}</nav>
            <a class="primary-pill wide" href="/contact">Start a Project</a>
          </div>
        </div>
      </header>
    `;
  }

  function renderHomeHero(site) {
    const title = escapeHtml(site.settings.heroTitle).replace("In One", "<span>In One</span>");
    const chips = ["Web Design", "Apps", "SEO", "E-Commerce", "Branding", "Care Plans"];
    return `
      <section class="hero-section" aria-label="Hero">
        <div class="hero-grid"></div>
        <div class="container hero-layout">
          <div class="hero-copy reveal">
            ${sectionTag(site.settings.tagline)}
            <h1>${title}</h1>
            <p>${escapeHtml(site.settings.heroLead)}</p>
            <div class="hero-buttons">
              <a class="primary-pill large" href="/contact">Get a Quotation ${icon("ArrowRight")}</a>
              <a class="ghost-pill large" href="/portfolio">View Our Work</a>
            </div>
            <div class="stat-row">
              ${site.stats.map((item) => `<div class="stat-item"><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`).join("")}
            </div>
          </div>
          <div class="hero-visual reveal">
            <div class="orbit-stage" aria-hidden="true">
              <div class="orbit orbit-one"></div>
              <div class="orbit orbit-two"></div>
              <div class="orbit orbit-three"></div>
              <img src="${logo}" alt="" class="hero-logo" />
              ${chips.map((chip, index) => `<span class="orbit-chip orbit-chip-${index}">${escapeHtml(chip)}</span>`).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderPageHero(kicker, title, text, actions = "") {
    return `
      <section class="page-hero">
        <div class="page-hero-grid"></div>
        <div class="container page-hero-layout">
          <div class="reveal">
            ${sectionTag(kicker)}
            <h1>${title}</h1>
            <p>${text}</p>
            ${actions ? `<div class="hero-buttons">${actions}</div>` : ""}
          </div>
          <div class="page-hero-mark reveal" aria-hidden="true">
            <img src="${logo}" alt="" />
            <span>Sitesnap</span>
          </div>
        </div>
      </section>
    `;
  }

  function renderServices(services, options = {}) {
    const limit = options.limit || services.length;
    return `
      <section id="services" class="section dark-band ${options.compact ? "compact-services" : ""}">
        <div class="container">
          <div class="section-heading reveal">
            ${sectionTag("What We Build")}
            <h2>Digital services shaped for launches, leads, and long-term growth.</h2>
            <p>Every service is structured to look polished, load fast, and help your customer take the next step without friction.</p>
          </div>
          <div class="service-grid">
            ${services
              .slice(0, limit)
              .map(
                (service) => `
                  <article id="${escapeHtml(service.id)}" class="service-card reveal" data-service-card data-service-title="${escapeHtml(service.title)} ${escapeHtml(service.summary)}">
                    <span class="icon-box">${icon(service.icon)}</span>
                    <h3>${escapeHtml(service.title)}</h3>
                    <p>${escapeHtml(service.summary)}</p>
                    <ul>${(service.features || []).map((feature) => `<li>${icon("Check")} ${escapeHtml(feature)}</li>`).join("")}</ul>
                    ${options.showAction ? `<a class="text-link" href="/contact?service=${encodeURIComponent(service.title)}">Start ${icon("ArrowUpRight")}</a>` : ""}
                  </article>
                `
              )
              .join("")}
          </div>
          ${options.compact ? `<div class="section-action reveal"><a class="primary-pill large" href="/services">Explore All Services ${icon("ArrowRight")}</a></div>` : `<p class="service-empty" id="service-empty" hidden>No matching service found.</p>`}
        </div>
      </section>
    `;
  }

  function renderAboutIntro(site) {
    return `
      <section class="section about-section">
        <div class="container about-layout">
          <div class="reveal">
            ${sectionTag("About Sitesnap")}
            <h2>Clean design, practical backend thinking, and a launch process that stays calm.</h2>
            <p>Sitesnap Web Solutions focuses on websites that are easy to understand, easy to manage, and strong enough to support real business growth. We keep the public experience polished and the owner tools useful.</p>
            <div class="feature-list">
              <span>${icon("Rocket")} Fast loading pages</span>
              <span>${icon("Code2")} Maintainable systems</span>
              <span>${icon("ShieldCheck")} Private owner workflow</span>
            </div>
          </div>
          <div class="build-board reveal">
            <div class="board-top"><span></span><span></span><span></span></div>
            <div class="board-line wide"></div>
            <div class="board-line"></div>
            <div class="board-columns">
              <div><strong>Design</strong><span>Premium interface</span></div>
              <div><strong>Backend</strong><span>Lead storage</span></div>
              <div><strong>Workflow</strong><span>Content control</span></div>
            </div>
            <div class="board-terminal"><span>status</span><strong>ready for launch</strong></div>
          </div>
        </div>
      </section>
    `;
  }

  function renderStorySection(site) {
    return `
      <section class="section story-section">
        <div class="container story-layout">
          <div class="story-copy reveal">
            ${sectionTag("Why Sitesnap")}
            <h2>We build the digital parts your business actually needs.</h2>
            <p>From a first website to a custom web application, our work is planned around customer clarity, speed, mobile polish, and simple day-to-day management.</p>
            <p>That means strong visual direction on the front, useful workflows behind the scenes, and enough flexibility to grow after launch.</p>
          </div>
          <div class="story-panel reveal">
            <span>Core focus</span>
            <h3>Design that sells. Systems that stay useful.</h3>
            <div class="metric-grid slim">
              ${site.stats.map((item) => `<div><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderValues() {
    const values = [
      ["Clarity First", "Navigation, content, and page flow stay easy for real customers."],
      ["Fast By Design", "Layouts, assets, and sections are shaped with performance in mind."],
      ["Built To Manage", "Owner workflows are planned so the website stays useful after launch."],
      ["Launch With Care", "Forms, links, mobile views, SEO basics, and details are checked before go-live."],
    ];
    return `
      <section class="section values-section">
        <div class="container">
          <div class="section-heading reveal">
            ${sectionTag("Our Standards")}
            <h2>Small details, strong outcomes.</h2>
            <p>Every Sitesnap project follows a clear set of standards so the final website feels polished and practical.</p>
          </div>
          <div class="values-grid">
            ${values.map(([title, text], index) => `<article class="value-card reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderTeamAvatar(member, extraClass = "team-avatar") {
    return member.imageUrl
      ? `<span class="${extraClass} has-photo"><img src="${escapeHtml(member.imageUrl)}" alt="" /></span>`
      : `<span class="${extraClass}">${escapeHtml(member.initials)}</span>`;
  }

  function renderTeamSection(site) {
    const members = teamMembersFor(site);
    const profile = members[0];
    return `
      <section class="section team-orbit-section" data-team-section>
        <div class="container">
          <div class="section-heading reveal">
            ${sectionTag("The People")}
            <h2>Meet Our Team</h2>
            <p>Strategy, design, development, growth, and support working around one goal: a website that helps your business move.</p>
          </div>
          <div class="team-orbit-layout">
            <div class="team-constellation reveal" aria-label="Sitesnap team">
              <div class="team-orbit-glow"></div>
              <div class="team-ring ring-one"></div>
              <div class="team-ring ring-two"></div>
              <div class="team-ring ring-three"></div>
              <div class="team-core">
                <img src="${logo}" alt="" />
                <span>Sitesnap</span>
              </div>
              ${members
                .map(
                  (member, index) => `
                    <button
                      class="team-node ${index === 0 ? "is-active" : ""} ${member.isJoin ? "is-join-node" : ""}"
                      type="button"
                      data-team-id="${escapeHtml(member.id)}"
                      data-member-name="${escapeHtml(member.name)}"
                      data-member-role="${escapeHtml(member.role)}"
                      data-member-bio="${escapeHtml(member.bio)}"
                      data-member-initials="${escapeHtml(member.initials)}"
                      data-member-image="${escapeHtml(member.imageUrl || "")}"
                      data-member-join="${member.isJoin ? "true" : "false"}"
                      style="left:${member.x}%; top:${member.y}%; --delay:${index * 0.18}s"
                    >
                      ${renderTeamAvatar(member)}
                      <span class="team-node-name">${escapeHtml(member.name)}</span>
                    </button>
                  `
                )
                .join("")}
            </div>
            <aside class="team-profile reveal" aria-live="polite">
              <div class="team-profile-media ${profile.imageUrl ? "has-photo" : ""}" data-profile-media>${profile.imageUrl ? `<img src="${escapeHtml(profile.imageUrl)}" alt="" />` : `<span>${escapeHtml(profile.initials)}</span>`}</div>
              <span class="team-profile-kicker">Active role</span>
              <h3 data-profile-name>${escapeHtml(profile.name)}</h3>
              <strong data-profile-role>${escapeHtml(profile.role)}</strong>
              <p data-profile-bio>${escapeHtml(profile.bio)}</p>
              <a class="ghost-pill large" href="/contact" data-profile-action>Work With Us ${icon("ArrowRight")}</a>
            </aside>
          </div>
          <div class="career-apply-panel reveal" id="career-apply">
            <div>
              ${sectionTag("Join Sitesnap")}
              <h3>Send your CV to join our team.</h3>
              <p>Upload your CV and tell us the role you are interested in. We will review it inside the private workspace.</p>
            </div>
            <form class="career-form" id="career-form">
              <div class="field-grid">
                <label>Name<input name="name" required /></label>
                <label>Phone<input name="phone" required /></label>
              </div>
              <div class="field-grid">
                <label>Email<input name="email" type="email" /></label>
                <label>Interested role<input name="role" placeholder="Designer, developer, SEO..." /></label>
              </div>
              <label>Short note<textarea name="message" rows="4" placeholder="Tell us about your skills"></textarea></label>
              <label class="cv-upload-field">
                <input id="career-cv-file" name="cvFile" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
                <span>Upload CV</span>
                <small id="career-file-note">PDF, DOC, or DOCX up to 1.5 MB.</small>
              </label>
              <button class="primary-pill large full" type="submit">Submit CV ${icon("ArrowRight")}</button>
              <p class="form-note" id="career-form-note" hidden></p>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  function renderProcess(process) {
    return `
      <section id="process" class="section process-section">
        <div class="container">
          <div class="section-heading left reveal">
            ${sectionTag("Workflow")}
            <h2>From idea to launch without losing the important details.</h2>
          </div>
          <div class="process-grid">
            ${process.map((item) => `<article class="process-card reveal"><span>${escapeHtml(item.step)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderWork(projects, industries, options = {}) {
    const strip = industries.concat(industries);
    const categories = [...new Set(projects.map((project) => project.type).filter(Boolean))].slice(0, 5);
    return `
      <section id="work" class="section work-section ${options.dark ? "work-section-dark" : ""}">
        <div class="container">
          <div class="section-heading reveal">
            ${sectionTag("Portfolio Direction")}
            <h2>Project styles we can shape around your business.</h2>
            <p>These examples show the type of digital experiences Sitesnap can plan, design, and build for different industries.</p>
          </div>
          <div class="work-filter-strip reveal" aria-label="Project filters">
            <button class="is-active" type="button" data-work-filter="all">All <span>${projects.length}</span></button>
            ${categories.map((category) => `<button type="button" data-work-filter="${escapeHtml(category)}">${escapeHtml(category)} <span>${projects.filter((project) => project.type === category).length}</span></button>`).join("")}
          </div>
          <div class="work-list">
            ${projects
              .map((project, index) => {
                const href = projectHref(project);
                const external = isExternalUrl(href);
                return `
                  <article
                    class="work-row reveal"
                    data-work-card
                    data-work-type="${escapeHtml(project.type || "Website")}"
                    data-preview-src="${escapeHtml(project.imageUrl || "")}"
                    data-preview-title="${escapeHtml(project.name)}"
                    data-preview-type="${escapeHtml(project.type || "Website")}"
                    data-preview-link="${escapeHtml(href)}"
                  >
                    <span class="work-index">${String(index + 1).padStart(2, "0")}</span>
                    <a class="work-title" href="${escapeHtml(href)}" ${external ? 'target="_blank" rel="noreferrer"' : ""}>${escapeHtml(project.name)}</a>
                    <p>${escapeHtml(project.summary)}</p>
                    <span class="work-meta">${escapeHtml(project.type || "Website")}</span>
                    <strong>${escapeHtml(project.result || "Launch-ready")}</strong>
                    <span class="work-arrow" aria-hidden="true">${icon("ArrowUpRight")}</span>
                    <div class="work-inline-preview" aria-hidden="true">
                      ${project.imageUrl ? `<img src="${escapeHtml(project.imageUrl)}" alt="" loading="lazy" />` : fallbackPreviewMarkup(project)}
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
          <div class="work-hover-preview" aria-hidden="true">
            <span class="work-hover-cursor"></span>
            <div class="work-hover-card">
              <div class="work-hover-screen">
                <img data-hover-image alt="" />
                <div class="generated-screen">
                  <div class="generated-top"><span></span><span></span><span></span></div>
                  <strong data-hover-generated-title>Sitesnap Work</strong>
                  <small data-hover-generated-type>Website</small>
                  <div class="generated-lines"><i style="width:72%"></i><i style="width:48%"></i><i style="width:86%"></i><i style="width:62%"></i></div>
                </div>
              </div>
              <div class="work-hover-caption"><span data-hover-type>Website</span><strong data-hover-title>Selected Work</strong></div>
            </div>
          </div>
          <div class="industry-strip" aria-label="Industries">${strip.map((industry) => `<span>${escapeHtml(industry)}</span>`).join("")}</div>
          ${options.compact ? `<div class="section-action reveal"><a class="primary-pill large" href="/portfolio">View Portfolio ${icon("ArrowRight")}</a></div>` : ""}
        </div>
      </section>
    `;
  }

  function renderCapabilities() {
    const capabilities = [
      ["Discovery", "Goals, audience, content, offer, and conversion path."],
      ["Interface", "Responsive pages with premium visual direction."],
      ["Build", "Frontend, backend, APIs, forms, and integrations."],
      ["Launch", "SEO basics, mobile checks, performance, and support."],
    ];
    return `
      <section class="section capabilities-section">
        <div class="container capability-grid">
          ${capabilities.map(([title, text]) => `<article class="capability-card reveal"><span>${icon("Layers")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}
        </div>
      </section>
    `;
  }

  function renderTestimonials(testimonials) {
    return `
      <section class="section testimonial-section">
        <div class="container testimonial-grid">
          <div class="reveal">${sectionTag("Client Notes")}<h2>Built to feel premium for visitors and practical for owners.</h2></div>
          <div class="testimonial-list">
            ${testimonials.map((item) => `<blockquote class="reveal"><p>"${escapeHtml(item.quote)}"</p><cite><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.role)}</span></cite></blockquote>`).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderFaq(faqs) {
    return `
      <section class="section faq-section">
        <div class="container faq-layout">
          <div class="reveal">${sectionTag("FAQ")}<h2>Questions before we start?</h2><p>Here are the usual answers. For a custom backend or database setup, the details can be planned project by project.</p></div>
          <div class="faq-list">
            ${faqs
              .map(
                (item, index) => `
                  <button class="faq-item ${index === 0 ? "open" : ""}" type="button" data-faq="${index}">
                    <span><strong>${escapeHtml(item.question)}</strong><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"></path></svg></span>
                    <p ${index === 0 ? "" : "hidden"}>${escapeHtml(item.answer)}</p>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderContact(site) {
    const serviceOptions = site.services.map((service) => `<option value="${escapeHtml(service.title)}">${escapeHtml(service.title)}</option>`).join("");
    return `
      <section id="contact" class="section contact-section">
        <div class="container contact-layout">
          <div class="contact-copy reveal">
            ${sectionTag("Let's Build Together")}
            <h2>Ready to grow your business online?</h2>
            <p>Send a quick brief. We will help shape the right website, backend, private dashboard, or growth system around your goals.</p>
            <div class="contact-actions">
              <a href="tel:${escapeHtml(site.settings.phone)}">${icon("Phone")} ${escapeHtml(site.settings.phone)}</a>
              <a href="https://wa.me/${escapeHtml(site.settings.whatsapp)}" target="_blank" rel="noreferrer">${icon("MessageCircle")} WhatsApp</a>
              <a href="mailto:${escapeHtml(site.settings.email)}">${icon("Mail")} ${escapeHtml(site.settings.email)}</a>
            </div>
            <div class="contact-mini-panel">
              <span>${icon("Globe")} ${escapeHtml(site.settings.location || "Sri Lanka")}</span>
              <span>${icon("ShieldCheck")} ${escapeHtml(site.settings.openingHours || "Mon - Sat")}</span>
            </div>
          </div>
          <form class="contact-form reveal" id="contact-form">
            <div class="field-grid">
              <label>Name<input name="name" required /></label>
              <label>Phone<input name="phone" required /></label>
            </div>
            <div class="field-grid">
              <label>Email<input name="email" type="email" /></label>
              <label>Company<input name="company" /></label>
            </div>
            <div class="field-grid">
              <label>Service<select name="service"><option value="">Select service</option>${serviceOptions}</select></label>
              <label>Budget<select name="budget"><option value="">Select range</option><option>LKR 50,000 - 100,000</option><option>LKR 100,000 - 250,000</option><option>LKR 250,000+</option></select></label>
            </div>
            <label>Project brief<textarea name="message" rows="5" required></textarea></label>
            <button class="primary-pill large full" type="submit">Send Project Request ${icon("Rocket")}</button>
            <p class="form-note" id="form-note" hidden></p>
          </form>
        </div>
      </section>
    `;
  }

  function renderFooter(site) {
    const settings = site.settings || {};
    const socialLinks = [
      ["Facebook", settings.facebookUrl, "Facebook"],
      ["Instagram", settings.instagramUrl, "Instagram"],
      ["LinkedIn", settings.linkedinUrl, "Linkedin"],
      ["WhatsApp", settings.whatsapp ? `https://wa.me/${settings.whatsapp}` : "", "MessageCircle"],
    ].filter((item) => item[1]);
    return `
      <footer class="site-footer">
        <div class="footer-watermark" aria-hidden="true">
          <span>SITESNAP</span>
          <div class="watermark-glow"><span>SITESNAP</span></div>
        </div>
        <div class="container footer-grid">
          <div>
            <img src="${logo}" alt="Sitesnap Web Solutions" />
            <p>Premium websites, web apps, private dashboards, ecommerce systems, SEO foundations, and care plans.</p>
            <div class="footer-social" aria-label="Sitesnap social links">
              ${socialLinks.map(([label, href, iconName]) => `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer" aria-label="${escapeHtml(label)}">${icon(iconName)}<span>${escapeHtml(label)}</span></a>`).join("")}
            </div>
          </div>
          <div><h3>Company</h3><a href="/about">About</a><a href="/services">Services</a><a href="/portfolio">Portfolio</a><a href="/contact">Contact</a></div>
          <div><h3>Services</h3><div class="footer-chips">${site.services.slice(0, 6).map((service) => `<a href="/services#${escapeHtml(service.id)}">${escapeHtml(service.title)}</a>`).join("")}</div></div>
          <div><h3>Contact</h3><a href="tel:${escapeHtml(settings.phone)}">${escapeHtml(settings.phone)}</a><a href="https://wa.me/${escapeHtml(settings.whatsapp)}" target="_blank" rel="noreferrer">WhatsApp</a><a href="mailto:${escapeHtml(settings.email)}">${escapeHtml(settings.email)}</a></div>
        </div>
        <div class="footer-bottom"><span>&copy; 2026 Sitesnap Web Solutions. All rights reserved.</span><span>Designed for fast launches and clean growth.</span></div>
      </footer>
    `;
  }

  function renderHome(site) {
    return `
      ${renderHomeHero(site)}
      ${renderServices(site.services, { compact: true, limit: 3 })}
      ${renderAboutIntro(site)}
      ${renderProcess(site.process)}
      ${renderWork(site.projects.slice(0, 3), site.industries, { compact: true })}
      ${renderTestimonials(site.testimonials)}
    `;
  }

  function renderAboutPage(site) {
    return `
      ${renderPageHero("About Sitesnap", "A web design company built for clean launches.", "We combine sharp design, practical engineering, and growth-focused structure to help businesses move online with confidence.", `<a class="primary-pill large" href="/contact">Start a Project ${icon("ArrowRight")}</a><a class="ghost-pill large" href="/services">Our Services</a>`)}
      ${renderStorySection(site)}
      ${renderValues()}
      ${renderTeamSection(site)}
      ${renderProcess(site.process)}
    `;
  }

  function renderServicesPage(site) {
    return `
      ${renderPageHero("Services", "Websites, web apps, ecommerce, SEO, and digital systems.", "Choose the service direction your business needs now. Each one can be shaped into a focused launch or a larger custom build.", `<a class="primary-pill large" href="/contact">Request a Quote ${icon("ArrowRight")}</a>`)}
      ${renderServices(site.services, { showAction: true })}
      ${renderCapabilities()}
      ${renderFaq(site.faqs)}
    `;
  }

  function renderPortfolioPage(site) {
    return `
      ${renderPageHero("Portfolio", "Project directions for businesses ready to look premium online.", "These examples show how Sitesnap can shape conversion-focused websites, stores, booking experiences, and digital workflows.", `<a class="primary-pill large" href="/contact">Plan Your Build ${icon("ArrowRight")}</a>`)}
      ${renderWork(site.projects, site.industries)}
      ${renderTestimonials(site.testimonials)}
    `;
  }

  function renderContactPage(site) {
    return `
      ${renderPageHero("Contact", "Tell us what you want to build.", "Share the basics and we will help you turn the idea into a clean website, practical system, or launch-ready digital experience.")}
      ${renderContact(site)}
      ${renderFaq(site.faqs)}
    `;
  }

  function renderNotFound(site) {
    return `
      ${renderPageHero("404", "This page is not available.", "The page may have moved. Use the main navigation to continue browsing Sitesnap Web Solutions.", `<a class="primary-pill large" href="/">Back Home ${icon("ArrowRight")}</a>`)}
      ${renderServices(site.services, { compact: true, limit: 3 })}
    `;
  }

  function bindHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const syncHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });

    const menu = document.getElementById("mobile-menu");
    document.getElementById("open-menu")?.addEventListener("click", () => {
      menu.hidden = false;
      document.body.classList.add("menu-open");
    });
    document.getElementById("close-menu")?.addEventListener("click", () => {
      menu.hidden = true;
      document.body.classList.remove("menu-open");
    });
    menu?.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        menu.hidden = true;
        document.body.classList.remove("menu-open");
      })
    );
  }

  function bindServiceSearch(site) {
    document.querySelectorAll(".service-search").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector("input");
        const query = input.value.trim();
        if (!query) {
          window.location.href = "/services";
          return;
        }
        const match = site.services.find((service) => service.title.toLowerCase().includes(query.toLowerCase()));
        window.location.href = match ? `/services#${encodeURIComponent(match.id)}` : `/services?search=${encodeURIComponent(query)}`;
      });
    });

    const searchTerm = new URLSearchParams(window.location.search).get("search");
    if (!searchTerm) return;
    const cards = [...document.querySelectorAll("[data-service-card]")];
    if (!cards.length) return;
    let visibleCount = 0;
    cards.forEach((card) => {
      const match = card.dataset.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase());
      card.hidden = !match;
      visibleCount += match ? 1 : 0;
    });
    const empty = document.getElementById("service-empty");
    if (empty) empty.hidden = visibleCount !== 0;
  }

  function bindFaq() {
    document.querySelectorAll(".faq-item").forEach((button) => {
      button.addEventListener("click", () => {
        const paragraph = button.querySelector("p");
        const isOpen = button.classList.toggle("open");
        paragraph.hidden = !isOpen;
      });
    });
  }

  function bindReveal() {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
  }

  function bindTeamOrbit() {
    const section = document.querySelector("[data-team-section]");
    if (!section) return;
    const profile = {
      media: section.querySelector("[data-profile-media]"),
      name: section.querySelector("[data-profile-name]"),
      role: section.querySelector("[data-profile-role]"),
      bio: section.querySelector("[data-profile-bio]"),
      action: section.querySelector("[data-profile-action]"),
    };
    const nodes = [...section.querySelectorAll("[data-team-id]")];
    const updateAvatar = (node) => {
      const imageUrl = node.dataset.memberImage;
      profile.media.classList.toggle("has-photo", Boolean(imageUrl));
      profile.media.textContent = "";
      if (imageUrl) {
        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = "";
        profile.media.appendChild(image);
      } else {
        const initials = document.createElement("span");
        initials.textContent = node.dataset.memberInitials || "?";
        profile.media.appendChild(initials);
      }
    };
    const selectMember = (node) => {
      if (!node) return;
      const isJoin = node.dataset.memberJoin === "true";
      nodes.forEach((item) => item.classList.toggle("is-active", item === node));
      updateAvatar(node);
      profile.name.textContent = node.dataset.memberName || "Sitesnap Team";
      profile.role.textContent = node.dataset.memberRole || "Digital team";
      profile.bio.textContent = node.dataset.memberBio || "";
      profile.action.href = isJoin ? "#career-apply" : "/contact";
      profile.action.innerHTML = isJoin ? `Send Your CV ${icon("ArrowRight")}` : `Work With Us ${icon("ArrowRight")}`;
      section.querySelector(".team-profile")?.classList.remove("pulse");
      requestAnimationFrame(() => section.querySelector(".team-profile")?.classList.add("pulse"));
    };
    nodes.forEach((node) => {
      node.addEventListener("mouseenter", () => selectMember(node));
      node.addEventListener("focus", () => selectMember(node));
      node.addEventListener("click", () => selectMember(node));
    });
  }

  function bindFooterWatermark() {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;
    footer.addEventListener("pointermove", (event) => {
      const rect = footer.getBoundingClientRect();
      footer.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      footer.style.setProperty("--my", `${event.clientY - rect.top}px`);
      footer.classList.add("is-watermark-active");
    });
    footer.addEventListener("pointerleave", () => footer.classList.remove("is-watermark-active"));
  }

  function bindWorkPreview() {
    const preview = document.querySelector(".work-hover-preview");
    const rows = [...document.querySelectorAll("[data-work-card]")];
    if (!preview || !rows.length) return;

    const image = preview.querySelector("[data-hover-image]");
    const title = preview.querySelector("[data-hover-title]");
    const type = preview.querySelector("[data-hover-type]");
    const generatedTitle = preview.querySelector("[data-hover-generated-title]");
    const generatedType = preview.querySelector("[data-hover-generated-type]");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const setPosition = (event, row) => {
      const previewWidth = 350;
      const sideOffset = window.innerWidth - event.clientX < previewWidth + 46 ? -previewWidth - 28 : 28;
      const y = Math.min(window.innerHeight - 140, Math.max(150, event.clientY));
      const rect = row.getBoundingClientRect();
      const progress = rect.width ? Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)) : 0.5;
      const lean = (progress - 0.5) * 44;
      const tilt = (progress - 0.5) * 14;
      const depth = (progress - 0.5) * -9;
      preview.style.setProperty("--x", `${event.clientX}px`);
      preview.style.setProperty("--y", `${y}px`);
      preview.style.setProperty("--dx", `${sideOffset}px`);
      preview.style.setProperty("--lean", `${lean}px`);
      preview.style.setProperty("--tilt", `${tilt}deg`);
      preview.style.setProperty("--depth", `${depth}deg`);
      preview.style.setProperty("--origin-x", `${Math.round(progress * 100)}%`);
    };

    const showPreview = (row, event) => {
      const hasImage = Boolean(row.dataset.previewSrc);
      title.textContent = row.dataset.previewTitle || "Selected Work";
      type.textContent = row.dataset.previewType || "Website";
      generatedTitle.textContent = row.dataset.previewTitle || "Selected Work";
      generatedType.textContent = row.dataset.previewType || "Website";
      preview.classList.toggle("has-image", hasImage);
      if (hasImage) image.src = row.dataset.previewSrc;
      rows.forEach((item) => item.classList.toggle("is-active", item === row));
      preview.classList.add("is-visible");
      setPosition(event, row);
    };

    rows.forEach((row) => {
      row.addEventListener("pointerenter", (event) => {
        if (!finePointer.matches) return;
        showPreview(row, event);
      });
      row.addEventListener("pointermove", (event) => {
        if (!finePointer.matches) return;
        if (!preview.classList.contains("is-visible") || !row.classList.contains("is-active")) {
          showPreview(row, event);
          return;
        }
        setPosition(event, row);
      });
      row.addEventListener("pointerleave", () => {
        row.classList.remove("is-active");
        preview.classList.remove("is-visible");
      });
    });
  }

  function bindWorkFilters() {
    const buttons = [...document.querySelectorAll("[data-work-filter]")];
    const rows = [...document.querySelectorAll("[data-work-card]")];
    if (!buttons.length || !rows.length) return;
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.workFilter;
        buttons.forEach((item) => item.classList.toggle("is-active", item === button));
        rows.forEach((row) => {
          row.hidden = filter !== "all" && row.dataset.workType !== filter;
        });
      });
    });
  }

  function bindContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const selectedService = new URLSearchParams(window.location.search).get("service");
    if (selectedService) {
      const select = form.querySelector('select[name="service"]');
      if (select) select.value = selectedService;
    }
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const note = document.getElementById("form-note");
      const button = form.querySelector("button");
      button.disabled = true;
      button.textContent = "Sending...";
      note.hidden = true;
      try {
        const data = Object.fromEntries(new FormData(form).entries());
        await fetchJson("/api/inquiries", { method: "POST", body: JSON.stringify(data) });
        form.reset();
        note.textContent = "Thanks. Your project request was saved successfully.";
        note.hidden = false;
      } catch (error) {
        note.textContent = error.message;
        note.hidden = false;
      } finally {
        button.disabled = false;
        button.innerHTML = `Send Project Request ${icon("Rocket")}`;
      }
    });
  }

  function bindCareerForm() {
    const form = document.getElementById("career-form");
    if (!form) return;
    const fileInput = document.getElementById("career-cv-file");
    const fileNote = document.getElementById("career-file-note");
    fileInput?.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      fileNote.textContent = file ? `${file.name} selected - ${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF, DOC, or DOCX up to 1.5 MB.";
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const note = document.getElementById("career-form-note");
      const button = form.querySelector("button");
      const data = new FormData(form);
      button.disabled = true;
      button.textContent = "Uploading...";
      note.hidden = true;
      try {
        const file = data.get("cvFile");
        const cvData = await readFileAsDataUrl(
          file,
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ],
          1.5 * 1024 * 1024
        );
        await fetchJson("/api/careers", {
          method: "POST",
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            phone: data.get("phone"),
            role: data.get("role"),
            message: data.get("message"),
            cvName: file.name,
            cvType: file.type || mimeTypeForFile(file.name),
            cvData,
          }),
        });
        form.reset();
        fileNote.textContent = "PDF, DOC, or DOCX up to 1.5 MB.";
        note.textContent = "Thanks. Your CV was submitted successfully.";
        note.hidden = false;
      } catch (error) {
        note.textContent = error.message;
        note.hidden = false;
      } finally {
        button.disabled = false;
        button.innerHTML = `Submit CV ${icon("ArrowRight")}`;
      }
    });
  }

  function scrollToHash() {
    if (!window.location.hash) return;
    requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function afterRender(site) {
    bindHeader();
    bindServiceSearch(site);
    bindFaq();
    bindReveal();
    bindTeamOrbit();
    bindFooterWatermark();
    bindWorkPreview();
    bindWorkFilters();
    bindContactForm();
    bindCareerForm();
    scrollToHash();
  }

  function render(site) {
    const normalizedSite = normalizeSite(site);
    const route = currentRoute();
    const page =
      route === "/"
        ? renderHome(normalizedSite)
        : route === "/about"
          ? renderAboutPage(normalizedSite)
          : route === "/services"
            ? renderServicesPage(normalizedSite)
            : route === "/portfolio"
              ? renderPortfolioPage(normalizedSite)
              : route === "/contact"
                ? renderContactPage(normalizedSite)
                : renderNotFound(normalizedSite);

    document.title = pageTitles[route] || "Page Not Found | Sitesnap Web Solutions";
    root.innerHTML = `
      <div class="public-site">
        ${renderHeader(normalizedSite, route)}
        <main class="page-main">${page}</main>
        ${renderFooter(normalizedSite)}
      </div>
    `;
    afterRender(normalizedSite);
  }

  fetchJson("/api/site")
    .then((site) => render(site))
    .catch(() => render(fallbackSite));
})();
