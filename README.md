# Portfolio — Ragul Jayaraj

Personal portfolio, live at **https://ragul315.github.io/portfolio/**.

Plain HTML, CSS and JavaScript — no framework, no build step. GitHub Pages serves the files as-is.

## Structure

```
index.html            page layout only, plus <head> tags (title, description, link preview)
404.html              GitHub Pages "not found" page (uses absolute /portfolio/ paths on purpose)
assets/
  js/data.js          ALL content: profile/hero, about, architecture diagram, experience, projects, skills, posts, education, contact
  js/main.js          rendering + interactions (diagram, filters, search, animations)
  css/style.css       styles; colors and fonts are CSS variables at the top
  img/                profile photo, company logos, favicon, social preview image
.nojekyll             tells GitHub Pages to skip Jekyll processing
robots.txt, sitemap.xml
```

## Updating content

Everything you'd want to change lives in `assets/js/data.js`:

- **Name, headline, tagline, stack line, intro, email, links** → `profile`. The skills orbiting your photo are `profile.orbit`.
- **About section** → `about` (heading, paragraphs, and the facts card).
- **Architecture diagram** → `architecture`. Each node has an `x`/`y` on a 1000×390 canvas, a color, an icon name and a description; `edges` lists connections as `[from, to]` node ids. Arrows and the Governance box are drawn from these, so moving a node only means changing its coordinates.
- **New job** → add to the top of `experience` (the first entry is marked as current).
- **New project** → add to `projects`. `category` must match an id in `projectFilters`; set `featured: true` for a full-width card.
- **New skill / cert / post** → append to `skills`, `certifications` or `writing`.
- **Inline tech terms** → wrap a tool name in backticks in any text (e.g. ``on `Temporal` ``) and it renders in Geist Mono.
- **Contact section text** → `contact`.

Not in data.js: the `<head>` tags in `index.html` (page title, description, LinkedIn/OG preview image), because link previews read them without running JavaScript. Update those by hand if your headline changes.

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
