(function () {
  "use strict";

  const data = window.PORTFOLIO;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // `backticks` in data.js text render as inline code
  const rich = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");
  const tags = (items) => `<ul class="tags">${items.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>`;
  const initials = (name) => {
    const words = name.split(/\s+/);
    return (words.length === 1 ? name.slice(0, 3) : words.map((w) => w[0]).join("").slice(0, 2)).toUpperCase();
  };
  const githubIcon =
    '<svg viewBox="0 0 24 24" class="fill" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>';
  const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- Render content from data.js ---------- */
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), data);

  // Simple bindings in index.html: data-bind="profile.name" sets text, data-link="github|linkedin|email" sets href
  function renderBindings() {
    $$("[data-bind]").forEach((el) => { el.textContent = get(el.dataset.bind) ?? ""; });
    $$("[data-link]").forEach((el) => {
      const key = el.dataset.link;
      el.href = key === "email" ? `mailto:${data.profile.email}` : data.profile.links[key];
    });
  }

  function renderHero() {
    const p = data.profile;
    $("#hero-title").innerHTML = p.headline.map(esc).join("<br>");
    $("#hero-stack").textContent = p.stack.join(" | ");
    $("#hero-intro").innerHTML = rich(p.intro);
    $("#hero-photo img").alt = p.name;
    $("#hero-photo").insertAdjacentHTML(
      "afterbegin",
      p.orbit
        .map((o, i) => `<div class="ring ring-${i + 1}" aria-hidden="true"><span class="orbit-chip" style="--c:${esc(o.color)}"><span>${esc(o.label)}</span></span></div>`)
        .join("")
    );
  }

  function renderAbout() {
    const a = data.about;
    $("#about-copy").innerHTML = `<h2>${esc(a.heading)}</h2>${a.paragraphs.map((t) => `<p>${rich(t)}</p>`).join("")}`;
    $("#about-facts").innerHTML = a.facts.map(([term, value]) => `<div><dt>${esc(term)}</dt><dd>${esc(value)}</dd></div>`).join("");
  }

  const ICONS = {
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    flag: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v4M12 14.5h.01"/>',
    branch: '<path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    sparkle: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 3v4M17 5h4"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
  };

  // Arrow from node a to node b: straight when on the same row, a curve out of the top/bottom when not
  function edgePath(a, b) {
    const pad = (n) => (n.hub ? 38 : 30);
    if (a.y === b.y) return `M${a.x + pad(a)} ${a.y}H${b.x - pad(b)}`;
    const down = b.y > a.y;
    return `M${a.x + 18} ${a.y + (down ? 32 : -32)}Q${a.x + 40} ${b.y + (down ? -8 : 26)} ${b.x - 28} ${b.y + (down ? -2 : 18)}`;
  }

  function renderArchitecture() {
    const arch = data.architecture;
    const byId = Object.fromEntries(arch.nodes.map((n) => [n.id, n]));
    const groups = arch.groups
      .map((g) => {
        const xs = g.nodes.map((id) => byId[id].x);
        const y = byId[g.nodes[0]].y;
        const x0 = Math.min(...xs) - 42, y0 = y - 52;
        return `<rect class="lane" x="${x0}" y="${y0}" width="${Math.max(...xs) - Math.min(...xs) + 84}" height="118" rx="14"/><text class="lane-label" x="${x0 + 12}" y="${y0 - 8}">${esc(g.label)}</text>`;
      })
      .join("");
    const edges = arch.edges
      .map(([from, to]) => `<path class="edge" style="--c:${byId[from].color}" d="${edgePath(byId[from], byId[to])}" marker-end="url(#arrow)"/>`)
      .join("");
    const nodes = arch.nodes
      .map(
        (n) => `<button class="node${n.hub ? " hub" : ""}" style="--x:${n.x};--y:${n.y};--c:${esc(n.color)}" type="button" data-detail="${esc(n.detail)}">
          <span class="node-box"><svg viewBox="0 0 24 24">${ICONS[n.icon]}</svg></span>
          <span class="node-label">${esc(n.label)}</span>
        </button>`
      )
      .join("");
    const el = $("#arch");
    el.style.setProperty("--vw", arch.width);
    el.style.setProperty("--vh", arch.height);
    el.innerHTML = `<svg class="arch-lines" viewBox="0 0 ${arch.width} ${arch.height}" aria-hidden="true">
        <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="context-stroke"/></marker></defs>
        ${groups}${edges}
      </svg>${nodes}`;
  }

  function renderExperience() {
    $("#timeline").innerHTML = data.experience
      .map((job, i) => {
        const logo = job.logo
          ? `<img src="${esc(job.logo)}" alt="" width="50" height="50" loading="lazy">`
          : esc(initials(job.company));
        return `
        <li class="tl-item reveal${i === 0 ? " current" : ""}">
          <article class="card hover-card tl-card">
            <div class="tl-head">
              <div class="tl-logo">${logo}</div>
              <div>
                <h3 class="tl-title">${esc(job.title)} <span>at ${esc(job.company)}</span></h3>
                <p class="tl-meta">${esc(job.period)} · ${esc(job.location)}<span class="pill">${esc(job.type)}</span></p>
              </div>
            </div>
            <ul class="tl-list">${job.highlights.map((h) => `<li>${rich(h)}</li>`).join("")}</ul>
            ${tags(job.tags)}
          </article>
        </li>`;
      })
      .join("");
  }

  function projectCard(p) {
    const highlights = p.highlights.length
      ? `<ul class="project-highlights">${p.highlights.map((h) => `<li>${rich(h)}</li>`).join("")}</ul>`
      : "";
    const link = p.repo
      ? `<a class="project-link" href="${esc(p.repo)}" target="_blank" rel="noopener">${githubIcon} View source</a>`
      : "";
    const note = p.note ? `<span class="pill">${esc(p.note)}</span>` : "";
    return `
      <article class="card hover-card project${p.featured ? " featured" : ""}" data-category="${esc(p.category)}">
        <div class="project-top"><h3>${esc(p.name)}</h3>${note}</div>
        <p class="project-period">${esc(p.period)}</p>
        <div class="project-body">
          <p class="project-summary">${rich(p.summary)}</p>
          ${highlights}
        </div>
        <div class="project-foot">${tags(p.tech)}${link}</div>
      </article>`;
  }

  function renderProjects() {
    const grid = $("#project-grid");
    grid.innerHTML = data.projects.map(projectCard).join("");

    const counts = data.projects.reduce((acc, p) => ((acc[p.category] = (acc[p.category] || 0) + 1), acc), {});
    $("#project-filters").innerHTML = data.projectFilters
      .filter((f) => f.id === "all" || counts[f.id])
      .map(
        (f) =>
          `<button class="filter" type="button" data-filter="${esc(f.id)}" aria-pressed="${f.id === "all"}">${esc(f.label)}<span class="count">${
            f.id === "all" ? data.projects.length : counts[f.id]
          }</span></button>`
      )
      .join("");

    $("#project-filters").addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      const id = btn.dataset.filter;
      $$(".filter").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      $$(".project", grid).forEach((card) => {
        const show = id === "all" || card.dataset.category === id;
        card.classList.toggle("hide", !show);
        card.classList.remove("enter");
        if (show && !reduceMotion) {
          void card.offsetWidth;
          card.classList.add("enter");
        }
      });
    });
  }

  function renderSkills() {
    $("#skills-grid").innerHTML = data.skills
      .map((s) => `<div class="card hover-card skill-card reveal"><h3>${esc(s.group)}</h3>${tags(s.items)}</div>`)
      .join("");
  }

  function renderWriting() {
    $("#writing-list").innerHTML = data.writing.posts
      .map(
        (w) => `
        <a class="card hover-card post reveal" href="${esc(w.url)}" target="_blank" rel="noopener" aria-label="${esc(w.title)} (opens LinkedIn)">
          <div><span class="post-kind mono">${esc(w.kind)}</span><h3>${esc(w.title)}</h3><p>${rich(w.blurb)}</p></div>
          <span class="post-arrow">${arrowIcon}</span>
        </a>`
      )
      .join("");
  }

  function renderBackground() {
    $("#education-list").innerHTML = data.education
      .map(
        (e) => `<div class="edu-item"><h4>${esc(e.degree)}</h4><p>${esc(e.school)}</p><p class="meta">${esc(e.period)} · ${esc(e.detail)}</p></div>`
      )
      .join("");
    $("#leadership-list").innerHTML = data.leadership
      .map((l) => `<div class="lead-item"><h4>${esc(l.role)}</h4><p>${esc(l.org)}</p><p class="meta">${esc(l.period)}</p></div>`)
      .join("");
    $("#cert-list").innerHTML = data.certifications
      .map(
        (c) =>
          `<li><span><span class="cert-name">${esc(c.name)}</span><span class="cert-issuer">${esc(c.issuer)}</span></span><span class="cert-year">${esc(c.year)}</span></li>`
      )
      .join("");
  }

  /* ---------- Card highlight follows the cursor ---------- */
  function initGlow() {
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest && e.target.closest(".hover-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------- Navigation ---------- */
  function initNav() {
    const menuBtn = $("#menu-toggle");
    const links = $("#nav-links");
    const setMenu = (open) => {
      links.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };
    menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
    links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

    const bar = $(".scroll-progress");
    const header = $(".site-header");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      header.classList.toggle("scrolled", scrollY > 8);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const navMap = new Map($$(".nav-links a").map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navMap.forEach((a) => a.classList.remove("active"));
          const a = navMap.get(entry.target.id);
          if (a) a.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("main section[id]").forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Architecture diagram ---------- */
  function initArchitecture() {
    const nodes = $$(".node");
    const detail = $("#arch-detail");
    const select = (node) => {
      nodes.forEach((n) => n.classList.toggle("active", n === node));
      detail.innerHTML = `<strong>${esc(node.querySelector(".node-label").textContent)}.</strong> ${esc(node.dataset.detail)}`;
    };
    nodes.forEach((s) => {
      s.addEventListener("mouseenter", () => select(s));
      s.addEventListener("focus", () => select(s));
      s.addEventListener("click", () => select(s));
    });
  }

  /* ---------- Toast & copy ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  async function copyEmail() {
    const email = data.profile.email;
    try {
      await navigator.clipboard.writeText(email);
      toast("Email copied");
    } catch (e) {
      toast(email);
    }
  }

  /* ---------- Search palette ---------- */
  function initPalette() {
    const palette = $("#palette");
    const input = $("#palette-input");
    const list = $("#palette-list");
    const go = (hash) => () => { location.hash = hash; };
    const open = (url) => () => window.open(url, "_blank", "noopener");
    const commands = [
      ...$$(".nav-links a").map((a) => ({ label: a.textContent, hint: "Section", run: go(a.getAttribute("href")) })),
      { label: "Writing", hint: "Section", run: go("#writing") },
      { label: "Education and certifications", hint: "Section", run: go("#education") },
      { label: "Copy email address", hint: "Action", run: copyEmail },
      { label: "GitHub profile", hint: "Link", run: open(data.profile.links.github) },
      { label: "LinkedIn profile", hint: "Link", run: open(data.profile.links.linkedin) },
      ...data.projects.filter((p) => p.repo).map((p) => ({ label: `${p.name} source code`, hint: "Repo", run: open(p.repo) })),
    ];
    let filtered = commands;
    let index = 0;
    let lastFocus = null;

    const render = () => {
      if (!filtered.length) {
        list.innerHTML = '<li class="empty">Nothing found</li>';
        return;
      }
      list.innerHTML = filtered
        .map((c, i) => `<li role="option" data-i="${i}" aria-selected="${i === index}" class="${i === index ? "selected" : ""}">${esc(c.label)}<span class="hint">${esc(c.hint)}</span></li>`)
        .join("");
      const sel = list.querySelector(".selected");
      if (sel) sel.scrollIntoView({ block: "nearest" });
    };
    const show = () => {
      lastFocus = document.activeElement;
      palette.hidden = false;
      input.value = "";
      filtered = commands;
      index = 0;
      render();
      input.focus();
    };
    const hide = () => {
      palette.hidden = true;
      if (lastFocus) lastFocus.focus();
    };
    const runAt = (i) => {
      const cmd = filtered[i];
      if (!cmd) return;
      hide();
      cmd.run();
    };

    $$("[data-open-palette]").forEach((b) => b.addEventListener("click", show));
    $$("[data-close-palette]").forEach((b) => b.addEventListener("click", hide));
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      filtered = commands.filter((c) => c.label.toLowerCase().includes(q));
      index = 0;
      render();
    });
    list.addEventListener("click", (e) => {
      const li = e.target.closest("li[data-i]");
      if (li) runAt(Number(li.dataset.i));
    });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        palette.hidden ? show() : hide();
        return;
      }
      if (palette.hidden) return;
      if (e.key === "Escape") hide();
      else if (e.key === "ArrowDown") { e.preventDefault(); index = Math.min(index + 1, filtered.length - 1); render(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); index = Math.max(index - 1, 0); render(); }
      else if (e.key === "Enter") { e.preventDefault(); runAt(index); }
      else if (e.key === "Tab") { e.preventDefault(); input.focus(); }
    });
  }

  /* ---------- Boot ---------- */
  renderBindings();
  renderHero();
  renderAbout();
  renderArchitecture();
  renderExperience();
  renderProjects();
  renderSkills();
  renderWriting();
  renderBackground();
  initGlow();
  initNav();
  initReveal();
  initArchitecture();
  initPalette();
  $("#copy-email").addEventListener("click", copyEmail);
  $("#year").textContent = new Date().getFullYear();
})();
