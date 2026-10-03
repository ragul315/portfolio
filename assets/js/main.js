(function () {
  "use strict";

  const data = window.PORTFOLIO;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tags = (items) => `<ul class="tags">${items.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>`;
  const initials = (name) => {
    const words = name.split(/\s+/);
    return (words.length === 1 ? name.slice(0, 3) : words.map((w) => w[0]).join("").slice(0, 2)).toUpperCase();
  };
  const githubIcon =
    '<svg viewBox="0 0 24 24" class="fill" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>';
  const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- Render content from data.js ---------- */
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
            <ul class="tl-list">${job.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
            ${tags(job.tags)}
          </article>
        </li>`;
      })
      .join("");
  }

  function projectCard(p) {
    const highlights = p.highlights.length
      ? `<ul class="project-highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>`
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
          <p class="project-summary">${esc(p.summary)}</p>
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
    $("#writing-list").innerHTML = data.writing
      .map(
        (w) => `
        <a class="card hover-card post reveal" href="${esc(w.url)}" target="_blank" rel="noopener" aria-label="${esc(w.title)} (opens LinkedIn)">
          <div><h3>${esc(w.title)}</h3><p>${esc(w.blurb)}</p></div>
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
