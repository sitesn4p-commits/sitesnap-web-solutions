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
      openingHours: "Mon - Sat, 9:00 AM - 6:00 PM",
      heroTitle: "All Your Digital Needs, In One Sharp Place.",
      heroLead: "We craft fast websites, web apps, ecommerce experiences, and search-ready digital systems that help businesses look premium and win better leads.",
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

  const teamMembers = [
    {
      id: "strategy",
      name: "Imesh Piyunal",
      role: "Founder / Web Strategist",
      bio: "Leads project direction, client strategy, and launch quality from the first idea to the live website.",
      initials: "IP",
      x: 49,
      y: 5,
    },
    {
      id: "interface",
      name: "UI Design Lead",
      role: "Interface Designer",
      bio: "Shapes clean layouts, responsive details, and brand energy that makes each business feel premium online.",
      initials: "UI",
      x: 82,
      y: 23,
    },
    {
      id: "engineering",
      name: "Full Stack Developer",
      role: "Frontend & Backend",
      bio: "Builds fast pages, private dashboards, APIs, forms, integrations, and reliable owner workflows.",
      initials: "FS",
      x: 80,
      y: 70,
    },
    {
      id: "growth",
      name: "Growth Specialist",
      role: "SEO & Content",
      bio: "Plans search-ready structure, clear content paths, local SEO basics, and lead generation touchpoints.",
      initials: "GO",
      x: 18,
      y: 70,
    },
    {
      id: "care",
      name: "Care Plan Lead",
      role: "Maintenance & Support",
      bio: "Handles updates, monitoring, backups, improvements, and the calm support every live website needs.",
      initials: "CP",
      x: 16,
      y: 23,
    },
  ];

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

  async function fetchJson(url, options) {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
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

  function renderTeamSection() {
    const profile = teamMembers[0];
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
              <div class="team-ring ring-one"></div>
              <div class="team-ring ring-two"></div>
              <div class="team-ring ring-three"></div>
              <div class="team-core">
                <img src="${logo}" alt="" />
                <span>Sitesnap</span>
              </div>
              ${teamMembers
                .map(
                  (member, index) => `
                    <button class="team-node ${index === 0 ? "is-active" : ""}" type="button" data-team-id="${member.id}" style="left:${member.x}%; top:${member.y}%; --delay:${index * 0.18}s">
                      <span class="team-avatar">${member.initials}</span>
                      <span class="team-node-name">${escapeHtml(member.name)}</span>
                    </button>
                  `
                )
                .join("")}
              <div class="join-node" aria-hidden="true">+</div>
            </div>
            <aside class="team-profile reveal" aria-live="polite">
              <span class="team-profile-kicker">Active role</span>
              <div class="profile-avatar" data-profile-initials>${profile.initials}</div>
              <h3 data-profile-name>${escapeHtml(profile.name)}</h3>
              <strong data-profile-role>${escapeHtml(profile.role)}</strong>
              <p data-profile-bio>${escapeHtml(profile.bio)}</p>
              <a class="ghost-pill large" href="/contact">Work With Us ${icon("ArrowRight")}</a>
            </aside>
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
    return `
      <section id="work" class="section work-section ${options.dark ? "work-section-dark" : ""}">
        <div class="container">
          <div class="section-heading reveal">
            ${sectionTag("Portfolio Direction")}
            <h2>Project styles we can shape around your business.</h2>
            <p>These examples show the type of digital experiences Sitesnap can plan, design, and build for different industries.</p>
          </div>
          <div class="project-grid">
            ${projects
              .map(
                (project) => `
                  <article class="project-card reveal">
                    <div class="project-preview">
                      <span>${escapeHtml(project.type)}</span>
                      <div class="preview-window"><div></div><div></div><div></div></div>
                    </div>
                    <div class="project-body"><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.summary)}</p><strong>${escapeHtml(project.result)}</strong></div>
                  </article>
                `
              )
              .join("")}
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
    return `
      <footer class="site-footer">
        <div class="footer-watermark" aria-hidden="true">
          <span>SITESNAP</span>
          <div class="watermark-glow"><span>SITESNAP</span></div>
        </div>
        <div class="container footer-grid">
          <div><img src="${logo}" alt="Sitesnap Web Solutions" /><p>Premium websites, web apps, private dashboards, ecommerce systems, SEO foundations, and care plans.</p></div>
          <div><h3>Company</h3><a href="/about">About</a><a href="/services">Services</a><a href="/portfolio">Portfolio</a><a href="/contact">Contact</a></div>
          <div><h3>Services</h3><div class="footer-chips">${site.services.slice(0, 6).map((service) => `<a href="/services#${escapeHtml(service.id)}">${escapeHtml(service.title)}</a>`).join("")}</div></div>
          <div><h3>Contact</h3><a href="tel:${escapeHtml(site.settings.phone)}">${escapeHtml(site.settings.phone)}</a><a href="https://wa.me/${escapeHtml(site.settings.whatsapp)}" target="_blank" rel="noreferrer">WhatsApp</a><a href="mailto:${escapeHtml(site.settings.email)}">${escapeHtml(site.settings.email)}</a></div>
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
      ${renderTeamSection()}
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
    });
    document.getElementById("close-menu")?.addEventListener("click", () => {
      menu.hidden = true;
    });
    menu?.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        menu.hidden = true;
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
      initials: section.querySelector("[data-profile-initials]"),
      name: section.querySelector("[data-profile-name]"),
      role: section.querySelector("[data-profile-role]"),
      bio: section.querySelector("[data-profile-bio]"),
    };
    const nodes = [...section.querySelectorAll("[data-team-id]")];
    const selectMember = (id) => {
      const member = teamMembers.find((item) => item.id === id);
      if (!member) return;
      nodes.forEach((node) => node.classList.toggle("is-active", node.dataset.teamId === id));
      profile.initials.textContent = member.initials;
      profile.name.textContent = member.name;
      profile.role.textContent = member.role;
      profile.bio.textContent = member.bio;
      section.querySelector(".team-profile")?.classList.remove("pulse");
      requestAnimationFrame(() => section.querySelector(".team-profile")?.classList.add("pulse"));
    };
    nodes.forEach((node) => {
      node.addEventListener("mouseenter", () => selectMember(node.dataset.teamId));
      node.addEventListener("focus", () => selectMember(node.dataset.teamId));
      node.addEventListener("click", () => selectMember(node.dataset.teamId));
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
    bindContactForm();
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
