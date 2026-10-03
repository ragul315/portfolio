# Portfolio — Ragul Jayaraj

Personal portfolio, live at **https://ragul315.github.io/portfolio/**.

Plain HTML, CSS and JavaScript — no framework, no build step. GitHub Pages serves the files as-is.

## Structure

```
index.html            page layout and static sections (hero, about, architecture diagram, contact)
404.html              GitHub Pages "not found" page (uses absolute /portfolio/ paths on purpose)
assets/
  js/data.js          ALL list content: experience, projects, skills, writing, education, certifications
  js/main.js          rendering + interactions (diagram, filters, search, animations)
  css/style.css       styles; colors and fonts are CSS variables at the top
  img/                profile photo, company logos, favicon, social preview image
.nojekyll             tells GitHub Pages to skip Jekyll processing
robots.txt, sitemap.xml
```

## Updating content

Most updates only touch `assets/js/data.js`:

- **New job** → add an object to the top of `experience` (the first entry is marked as current).
- **New project** → add to `projects`. `category` must match an id in `projectFilters`; set `featured: true` for a full-width card.
- **New skill / cert / post** → append to `skills`, `certifications` or `writing`.
- **Inline tech terms** → wrap a tool name in backticks inside experience or project text (e.g. ``Built it on `Temporal` ``) and it renders in Geist Mono as inline code.

The hero text, About paragraphs and the pipeline diagram are written directly in `index.html`.

## Run locally

Serve from the **parent** folder so URLs match production (`/portfolio/...`), which the 404 page depends on:

```
cd ..
python -m http.server 8000 --bind 127.0.0.1
# open http://127.0.0.1:8000/portfolio/
```

## Deploy

Push to `main`. In the repo's **Settings → Pages**, the source should be *Deploy from a branch → `main` → `/ (root)`*.
Changes are live within a minute or two.

## Features

- Design matches the LinkedIn banner: near-black background, faint blue grid, soft blue/purple glows, glass cards
- Fonts: Geist and Geist Mono from Google Fonts
- Interactive architecture diagram (same system as the banner); click a component to see its role
- `Ctrl K` / `⌘ K` search to jump to sections, profiles and project repos
- Filterable projects and experience timeline
- Respects `prefers-reduced-motion`; keyboard accessible; responsive down to small phones
- Open Graph image for link previews on LinkedIn and elsewhere
