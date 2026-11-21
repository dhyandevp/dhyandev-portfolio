# Dhyandev P — Personal Portfolio & Links Monorepo

> **Unified Single-Repository Architecture** for `dhyandev.sbs` and `links.dhyandev.sbs`.  
> Combining editorial technical systems engineering with cinematic creative direction.

[![Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind%20CSS-blue?style=flat-square)](https://vitejs.dev/)
[![Motion](https://img.shields.io/badge/Motion-v14-purple?style=flat-square)](https://motion.dev/)
[![Deployment](https://img.shields.io/badge/Deploy-Cloudflare%20Workers-orange?style=flat-square)](https://workers.cloudflare.com/)
[![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)

---

## 1. Overview

This repository is the **consolidated single repository** for Dhyandev P's online presence. Previously split across two distinct repositories (`dhyandev-portfolio` and `links`), both the primary portfolio experience and the dedicated interactive Linktree now live together in this codebase under a unified build and Cloudflare Workers deployment pipeline.

- **Primary Site**: [dhyandev.sbs](https://dhyandev.sbs)
- **Links Site**: [dhyandev.sbs/links](https://dhyandev.sbs/links) / [links.dhyandev.sbs](https://links.dhyandev.sbs)
- **Direct Linktree Alias**: `dhyandev.sbs/linktree` (HTTP 301 alias to `/links`)

---

## 2. Architecture & Unification

```
                      +---------------------------------------+
                      |         Incoming Edge Traffic         |
                      +---------------------------------------+
                                          |
                      +---------------------------------------+
                      |     Cloudflare Worker (src/worker.ts) |
                      +---------------------------------------+
                                     /         \
          Host: links.dhyandev.sbs  /           \  Host: dhyandev.sbs
                                   v             v
                    +--------------------+   +--------------------+
                    |  dist/links/       |   |  dist/index.html   |
                    |  Autumn Link Tree  |   |  Portfolio SPA     |
                    +--------------------+   +--------------------+
```

### The Two Integrated Surfaces

1. **Portfolio SPA (`src/`)**:
   - Modern React 18 + TypeScript + Tailwind CSS application.
   - Fast client-side routing (`src/lib/router.tsx`) covering `/`, `/about`, `/projects`, `/specializations`, `/notes`, `/contact`, and `/resume`.
   - Architectural and physical interface components:
     - **3D Thermal Resume Printer**: Hardware-inspired modal receipt animation with direct print and copy actions.
     - **Air-Dispatch Contact Console**: Boeing airliner vector path animation with triple-redundant Google Forms webhook relay (`sendBeacon` fallback).
     - **Floating Photo Collage**: Drag-enabled, parallax stage with authentic SVG brand seals (Google, Claude, F1, Indian flag).
     - **Lenis Smooth Scroll**: Fluid physics with full `prefers-reduced-motion` compliance.
     - **Malayalam Localization**: Dynamic Malayalam typography stack (`ധ്യാനദേവ് പി`).

2. **Autumn Maple Link Tree (`links/`)**:
   - Mathematically generated Japanese autumn maple tree (`scripts/gen-links.mjs`).
   - Pad-first collision layout with Catmull-Rom spline branches and 13 maple leaf link cards.
   - Built with [Motion](https://motion.dev) for branch growth, leaf swaying, wind physics, and falling foliage.
   - Zero-JS fallback: Full pre-rendered static markup so all links are accessible even if JavaScript is disabled.
   - Built-in Dark / Light mode switcher with `localStorage` persistence.

3. **Cloudflare Worker Edge Router (`src/worker.ts`)**:
   - Acts as the single entrypoint for Cloudflare Workers Static Assets.
   - Intercepts requests for `links.dhyandev.sbs` and transparently routes to `/links/`.
   - Directs `/linktree` to `/links/` with an HTTP 301 permanent redirect.
   - Delegates asset serving and single-page fallback to `env.ASSETS`.

---

## 3. Directory Layout

```
.
├── links/                       # Autumn Linktree source & static templates
│   ├── index.html               # Pre-rendered link tree template (generated)
│   └── src/
│       ├── main.js              # Motion animation, wind physics, and theme switcher
│       └── style.css            # Tree styling, leaf layouts, and responsive vines
│
├── public/                      # Static assets served at root
│   ├── _headers                 # Cloudflare security headers (CSP, HSTS, X-Frame)
│   ├── _redirects               # Cloudflare URL rewrite and redirect rules
│   ├── favicon.svg              # SVG branding icon
│   ├── og.png                   # Open Graph preview card
│   ├── og-links.png             # Open Graph preview card for Linktree
│   ├── robots.txt               # Search crawler permissions
│   ├── sitemap.xml              # XML index of canonical routes
│   └── images/                  # AVIF and WebP collage assets
│
├── scripts/                     # Build tools and asset generators
│   ├── gen-links.mjs            # Link tree SVG generator & contrast calculator
│   ├── layout.json              # Pre-calculated leaf coordinates and pads
│   └── export_collage_images.py # Photo compression and responsive image pipeline
│
├── src/                         # Main Portfolio SPA
│   ├── components/              # UI components (Hero, Nav, ContactForm, Printer)
│   ├── data/                    # Profile data, project details, and tokens
│   ├── lib/                     # Lenis scroll, router, and Air-Dispatch logic
│   ├── pages/                   # Route views (Home, About, Projects, Notes, Contact)
│   ├── styles/                  # Global styles and aviation animations
│   ├── App.tsx                  # Root app and transition coordinator
│   ├── main.tsx                 # DOM mount point
│   └── worker.ts                # Edge Worker router for dual custom domains
│
├── DESIGN.md                    # Design tokens, color system, and layout specs
├── PRODUCT.md                   # Brand positioning, principles, and accessibility rules
├── ASSETS.md                    # Asset registry and image attribution
├── index.html                   # Portfolio SPA HTML entry point
├── package.json                 # Unified npm dependencies and scripts
├── tailwind.config.js           # Design tokens, grid patterns, font stacks
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Multi-page Vite build configuration
└── wrangler.jsonc               # Cloudflare Workers configuration with dual domains
```

---

## 4. Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation
```bash
git clone https://github.com/dhyandevp/dhyandev-portfolio.git
cd dhyandev-portfolio
npm install
```

### Development
Starts the local development server with both the main portfolio and the linktree accessible:
```bash
npm run dev
```
- Portfolio SPA: `http://localhost:5173/`
- Links Tree: `http://localhost:5173/links/`

### Production Build
Executes `gen:links` to recalculate spline coordinates, validates TypeScript, and bundles both multi-page entries via Vite:
```bash
npm run build
```
Build outputs are placed in `dist/`:
- `dist/index.html` (Main SPA)
- `dist/links/index.html` (Interactive Link Tree)
- `dist/assets/` (Minified chunks with cache-busting hashes)

### Local Preview
Preview the production build locally:
```bash
npm run preview
```

---

## 5. Deployment (Cloudflare Workers)

This project deploys as a **Cloudflare Worker with Static Assets**.

### Deployment Command
```bash
npm run deploy
```
*(Executes `npm run build && wrangler deploy`)*

### Custom Domain Configuration (`wrangler.jsonc`)
The worker binds two custom domains to the single codebase:
```jsonc
{
  "name": "dhyandev-portfolio",
  "compatibility_date": "2024-11-15",
  "main": "src/worker.ts",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application"
  },
  "routes": [
    {
      "pattern": "dhyandev.sbs",
      "custom_domain": true
    },
    {
      "pattern": "links.dhyandev.sbs",
      "custom_domain": true
    }
  ]
}
```

> [!NOTE]
> Ensure both `dhyandev.sbs` and `links.dhyandev.sbs` DNS records are active in your Cloudflare dashboard on the same zone.

---

## 6. How to Update Content

### Adding or Updating Links in the Maple Tree
1. Open [`scripts/gen-links.mjs`](scripts/gen-links.mjs).
2. Edit the `GROUPS` array containing categories (`Build`, `Me`, `Code`, `Off duty`):
   ```js
   {
     id: 'code', n: '03', label: 'Code',
     leaves: [
       { title: 'GitHub', sub: '@dhyandevp', href: 'https://github.com/dhyandevp' },
       ...
     ]
   }
   ```
3. Run `npm run gen:links` (or `npm run build`), which automatically calculates geometry, contrast ratios, and re-renders `links/index.html`.

### Adding or Updating Portfolio Projects
1. Open [`src/data/portfolioData.ts`](src/data/portfolioData.ts).
2. Modify the `verifiedProjects` array with project specifications, tech stacks, live links, and GitHub repositories.
3. Update `developerProfile` for contact info and social handles.

---

## 7. Design System & Tokens

Derived from [`DESIGN.md`](DESIGN.md):

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Canvas** | `#F7F7F4` | Primary off-white surface |
| **Ink** | `#111111` | Primary typographic foreground |
| **Ink Muted** | `#5A5A55` | Secondary descriptions |
| **Ink Faint** | `#8C8C84` | Coordinates and monospace telemetry |
| **Sage** | `#B5C7AF` | Organic natural accent tone |
| **Burgundy** | `#790F0B` | Critical highlights & interactive active states |
| **Cobalt** | `#315EBD` | Technical bracket indicators and wireframe lines |
| **Hairline** | `#D8D8D2` | 1px crisp layout boundaries |

---

## 8. Note on Retired Repositories

The previous standalone repository **`dhyandevp/links`** has been archived and merged directly into this repository. All future changes to both `dhyandev.sbs` and `links.dhyandev.sbs` should be made directly here.

---

## 9. License

MIT © [Dhyandev P](https://github.com/dhyandevp)
