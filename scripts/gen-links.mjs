// Generates index.html: links, pad-first layout and the tree art, all as static markup.
// Edit GROUPS below (title, sub-label, href), then run `npm run gen` (dev and build do it for you).
import { writeFileSync } from 'node:fs';

const W = 1000, H = 700;
const LEAF = { w: 136, h: 102 };      // leaf box in stage units
const GAP = 10, PAD_IN = 16;          // gap between leaves, padding inside a canopy

// ---------------------------------------------------------------- data
// `pad` is the canopy's inner rectangle: every leaf of the group lies fully inside it.
// Colours follow kōyō, the turning of the leaves: deep red at the top of the tree,
// rust, amber, then olive and gold near the ground. `wash` tints the soft canopy.
const GROUPS = [
  {
    id: 'build', n: '01', label: 'Build', pad: { x: 15, top: 461, w: 460 },
    wash: '#7A8236', tones: ['#5F6F2E', '#B7AE48', '#8A5A12'],
    leaves: [
      { title: 'VibeCoding Ball Knowledge', sub: 'AI engineering knowledge system', href: 'https://vibecoding-ball-knowledge.vercel.app' },
      { title: 'Drishya Sahayak', sub: 'AI accessibility assistant', href: 'https://drishyasahayakai.vercel.app/#home' },
      { title: 'FaceAttend.AI', sub: 'Attendance recognition', href: 'https://faceattendai.vercel.app' },
    ],
  },
  {
    id: 'me', n: '02', label: 'Me', pad: { x: 15, top: 251, w: 460 },
    wash: '#D9A441', tones: ['#E0A93B', '#D49A3A', '#E7BB57'],
    leaves: [
      { title: 'Portfolio', sub: 'dhyandev.sbs · main site', href: 'https://dhyandev.sbs' },
      { title: 'Google Developer', sub: 'g.dev/DhyandevP', href: 'https://g.dev/DhyandevP' },
      { title: 'Email', sub: 'dhyandevp@proton.me · tap to copy', href: 'mailto:dhyandevp@proton.me', copy: 'dhyandevp@proton.me' },
    ],
  },
  {
    id: 'code', n: '03', label: 'Code', pad: { x: 525, top: 336, w: 460 }, labelSide: 'right',
    wash: '#C0561F', tones: ['#B34A12', '#A8401E', '#C45A1C'],
    leaves: [
      { title: 'GitHub', sub: '@dhyandevp', href: 'https://github.com/dhyandevp' },
      { title: 'LinkedIn', sub: 'dhyandev-p', href: 'https://www.linkedin.com/in/dhyandev-p-20659524a/' },
      { title: 'X', sub: '@Dhyandev_P', href: 'https://x.com/Dhyandev_P' },
    ],
  },
  {
    id: 'off', n: '04', label: 'Off duty', pad: { x: 197, top: 46, w: 606 }, labelSide: 'right',
    wash: '#9B3B32', tones: ['#8E2F2A', '#A33A2F', '#9A3C2B', '#7D2F33'],
    leaves: [
      { title: 'Instagram (main)', sub: '@dhyandev_p', href: 'https://www.instagram.com/dhyandev_p/' },
      { title: 'Instagram (private)', sub: '@dhyandevp_ · request to follow', href: 'https://www.instagram.com/dhyandevp_/' },
      { title: 'Pinterest', sub: '@Dhyandev_p', href: 'https://in.pinterest.com/Dhyandev_p/' },
      { title: 'Spotify', sub: 'Curated sounds', href: 'https://open.spotify.com/user/31dol5iqopcrg7ujnsmidj6lyx7u?si=9360faf7e6d84d58' },
    ],
  },
];
const ROT = [-6, 4, -3, 6, -5, 3, -4, 5, -2, 6, -6, 3, -3]; // deterministic leaf tilt (degrees)

// ---------------------------------------------------------------- colour helpers
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (c) => '#' + c.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => { const A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A.map((v, i) => v + (B[i] - v) * t)); };
const lum = (h) => { const [r, g, b] = hex2rgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const INK_DARK = '#2B1A10', INK_CREAM = '#FFF6E4', DEEP = '#1B0F08';
// Pick cream or dark text per leaf and nudge the fill until contrast is at least 4.8:1.
function fitLeaf(fill) {
  for (let k = 0; k <= 24; k++) {
    const t = k * 0.03;
    const darker = mix(fill, DEEP, t);
    if (contrast(darker, INK_CREAM) >= 4.8) return { fill: darker, ink: INK_CREAM };
    const lighter = mix(fill, '#FFF1D6', t);
    if (contrast(lighter, INK_DARK) >= 4.8) return { fill: lighter, ink: INK_DARK };
  }
  throw new Error('cannot reach contrast for ' + fill);
}
function hoverFill(fill, ink) {                  // brighten on hover, but never below 4.5:1
  for (let t = 0.14; t >= 0; t -= 0.02) {
    const h = mix(fill, '#FFF3DC', t);
    if (contrast(h, ink) >= 4.5) return h;
  }
  return fill;
}

// ---------------------------------------------------------------- layout (pad-first)
const padH = LEAF.h + PAD_IN * 2;
let leafIndex = 0;
for (const g of GROUPS) {
  const p = g.pad;
  p.h = padH;
  p.bottom = p.top + p.h;
  const n = g.leaves.length;
  const rowW = n * LEAF.w + (n - 1) * GAP;
  const start = p.x + (p.w - rowW) / 2;
  g.leaves.forEach((l, i) => {
    l.x = Math.round(start + LEAF.w / 2 + i * (LEAF.w + GAP));
    l.y = p.top + p.h / 2;
    l.r = ROT[leafIndex++ % ROT.length];
    const fit = fitLeaf(g.tones[i % g.tones.length]);
    l.fill = fit.fill; l.ink = fit.ink;
    l.hover = hoverFill(fit.fill, fit.ink);
    l.stroke = mix(fit.fill, DEEP, 0.3);
  });
}

// ---------------------------------------------------------------- art helpers
const f = (n) => +n.toFixed(1);
function rng(seed) { let s = seed >>> 0; return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296; }

function spline(pts, samples = 70) {            // Catmull-Rom through points
  const out = [];
  const P = [pts[0], ...pts, pts[pts.length - 1]];
  const seg = pts.length - 1;
  for (let s = 0; s < seg; s++) {
    const [p0, p1, p2, p3] = [P[s], P[s + 1], P[s + 2], P[s + 3]];
    const steps = Math.ceil(samples / seg);
    for (let i = 0; i < steps; i++) {
      const t = i / steps, t2 = t * t, t3 = t2 * t;
      out.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
      ]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

function taper(pts, w0, w1, ease = 1, seed = 1) {   // filled tapered ribbon with a slightly hand-drawn edge
  const r = rng(seed);
  const c = spline(pts);
  const L = [], R = [];
  c.forEach((p, i) => {
    const a = c[Math.max(0, i - 1)], b = c[Math.min(c.length - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    dx /= len; dy /= len;
    const t = Math.pow(i / (c.length - 1), ease);
    const w = (w0 + (w1 - w0) * t) / 2;
    const jl = (r() - 0.5) * 1.2, jr = (r() - 0.5) * 1.2;
    L.push([p[0] - dy * (w + jl), p[1] + dx * (w + jl)]);
    R.push([p[0] + dy * (w + jr), p[1] - dx * (w + jr)]);
  });
  const all = [...L, ...R.reverse()];
  return 'M' + all.map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + 'Z';
}

// soft, irregular foliage mass: a rounded body plus lumps along the top, sides and bottom
function canopy(p, seed, inflate = 0) {
  const r = rng(seed);
  const { x, w, top, h, bottom } = p;
  const c = (cx, cy, rad) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rad)}"/>`;
  const out = [`<rect x="${x + 8 - inflate}" y="${top + 4 - inflate}" width="${w - 16 + inflate * 2}" height="${h - 8 + inflate * 2}" rx="44"/>`];
  const n = Math.round(w / 50);
  for (let i = 0; i < n; i++) out.push(c(x + (w * (i + 0.5)) / n + (r() - 0.5) * 16, top + 8 - r() * 6, 30 + r() * 20 + inflate));
  for (const side of [0, 1]) for (const k of [0.3, 0.7]) {
    const rad = 24 + r() * 10 + inflate;
    out.push(c(side ? x + w - rad * 0.55 : x + rad * 0.55, top + h * k + (r() - 0.5) * 10, rad));
  }
  const m = Math.round(w / 70);
  for (let i = 0; i < m; i++) out.push(c(x + (w * (i + 0.5)) / m + (r() - 0.5) * 14, bottom - 10, 20 + r() * 8 + inflate));
  return out.join('');
}

// a five-pointed maple leaf drawn from a polar function, in the 136 x 102 leaf box
function leafPaths() {
  const cx = 68, cy = 57, R = 47, XS = 1.3;
  const lobes = [[0, 32], [60, 36], [-60, 36], [118, 36], [-118, 36]];   // [angle from up, half-width] in degrees
  const pts = [];
  for (let a = -180; a < 180; a += 3) {
    let m = 0;
    for (const [c, s] of lobes) {
      const d = Math.abs(((a - c + 540) % 360) - 180);
      m = Math.max(m, Math.pow(Math.max(0, 1 - d / s), 1.1));
    }
    const rad = R * (0.7 + 0.3 * m) * (1 + 0.035 * Math.sin((a * Math.PI) / 180 * 24));
    const t = (a * Math.PI) / 180;
    pts.push([cx + XS * rad * Math.sin(t), cy - rad * Math.cos(t)]);
  }
  const body = 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L') + 'Z';
  const veins = [0, 60, -60, 118, -118].map((c) => {
    const t = (c * Math.PI) / 180;
    const p = (k) => `${f(cx + XS * R * k * Math.sin(t))} ${f(cy - R * k * Math.cos(t))}`;
    return `M${p(0.2)}L${p(0.55)}`;
  }).join('');
  return { body, veins, stem: `M${cx} ${f(cy + R * 0.7)}L${cx} ${f(cy + R * 0.7 + 12)}` };
}
const LEAFP = leafPaths();

// trunk and limbs
const TRUNK = taper([[472, 662], [484, 600], [498, 540], [492, 470], [487, 400], [500, 330], [497, 250], [500, 170], [502, 110]], 40, 9, 0.9, 7);
const LIMBS = [
  { id: 'build', pts: [[486, 628], [432, 614], [352, 606], [285, 598]], from: [486, 628] },
  { id: 'me', pts: [[497, 424], [440, 404], [380, 397], [310, 389]], from: [497, 424] },
  { id: 'code', pts: [[503, 508], [560, 492], [640, 480], [720, 472]], from: [503, 508] },
];

// ---------------------------------------------------------------- html pieces
const art = [];
art.push(`<defs><pattern id="halftone" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.7" fill="var(--sun-dot)"/></pattern></defs>`);
art.push(`<g id="sun"><circle cx="515" cy="300" r="150" fill="var(--sun)" opacity=".55"/><circle cx="515" cy="300" r="150" fill="url(#halftone)" opacity=".5"/></g>`);
art.push(`<clipPath id="grow"><rect id="grow-rect" x="0" y="0" width="${W}" height="${H}" style="transform-box:view-box;transform-origin:0 ${H}px"/></clipPath>`);
art.push(`<g clip-path="url(#grow)"><path id="trunk" d="${TRUNK}" fill="var(--bark)"/>` +
  `<g id="bark" stroke="var(--bark-line)" stroke-width="1.6" stroke-linecap="round" opacity=".6"><path d="M488 600l-3 22M499 520l3 26M492 440l-3 24M493 350l3 22M502 262l-2 20"/></g></g>`);
for (const l of LIMBS) {
  art.push(`<path class="limb" data-for="${l.id}" d="${taper(l.pts, 12, 5, 1, 11)}" fill="var(--bark)" style="transform-box:view-box;transform-origin:${l.from[0]}px ${l.from[1]}px"/>`);
}
GROUPS.forEach((g, gi) => {
  const p = g.pad;
  const ox = p.x + p.w / 2, oy = p.bottom;
  art.push(
    `<g class="pad" id="pad-${g.id}" data-x="${p.x}" data-w="${p.w}" data-top="${p.top}" data-h="${p.h}" style="transform-box:view-box;transform-origin:${ox}px ${oy}px">` +
      `<g fill="${g.wash}" style="opacity:var(--wash-halo)">${canopy(p, 31 + gi * 17, 12)}</g>` +
      `<g fill="${g.wash}" style="opacity:var(--wash)">${canopy(p, 31 + gi * 17, 0)}</g>` +
    `</g>`
  );
});

// ground: a soft mound, a few fallen leaves and a small stone lantern
const fallen = [[352, 676, 28, '#B34A12'], [408, 684, -50, '#E0A93B'], [528, 678, 70, '#8E2F2A'], [586, 686, -20, '#C45A1C'],
                [640, 674, 110, '#5F6F2E'], [696, 683, 30, '#A33A2F'], [246, 686, -70, '#D49A3A'], [884, 684, 15, '#B34A12']];
art.push(
  `<g id="ground"><path d="M0 700C140 668 330 654 480 658C650 662 860 640 1000 700Z" fill="var(--mound)"/>` +
  `<ellipse cx="800" cy="651" rx="48" ry="6" fill="var(--mound-dark)"/>` +
  fallen.map(([x, y, r, c]) => `<use href="#leaf-body" transform="translate(${x} ${y}) rotate(${r}) scale(.17) translate(-68 -51)" style="--f:${c};--s:${mix(c, DEEP, 0.4)}"/>`).join('') +
  `<g fill="var(--stone)"><rect x="774" y="640" width="52" height="8" rx="2"/><rect x="794" y="610" width="12" height="30"/><rect x="780" y="586" width="40" height="24" rx="3"/><path d="M770 586 L800 566 L830 586Z"/><circle cx="800" cy="562" r="4.5"/></g>` +
  `<rect x="789" y="593" width="22" height="11" rx="2" fill="var(--lantern)"/></g>`
);

const groupHTML = [];
for (const g of GROUPS) {
  const p = g.pad;
  const right = g.labelSide === 'right';
  const lx = right ? p.x + p.w - 6 : p.x + 6;
  const ly = p.bottom + 14;
  const items = g.leaves.map((l) => {
    const ext = l.href.startsWith('http');
    const attrs = `href="${l.href}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}${l.copy ? ` data-copy="${l.copy}"` : ''}`;
    return (
      `<li class="slot" style="--x:${l.x};--y:${f(l.y)};--r:${l.r}deg;--f:${l.fill};--fh:${l.hover};--s:${l.stroke};--lt:${l.ink}" data-r="${l.r}">` +
        `<a class="leaf" ${attrs}>` +
          `<span class="swayer"><svg class="shape" viewBox="0 0 136 102" aria-hidden="true" focusable="false"><use href="#leaf-body"/></svg></span>` +
          `<span class="txt"><span class="title">${l.title}</span><span class="sub">${l.sub}</span></span>` +
          `<span class="go" aria-hidden="true">${l.copy ? '⧉' : '↗'}</span>` +
        `</a>` +
      `</li>`
    );
  }).join('\n          ');
  groupHTML.push(
    `<section class="group" id="g-${g.id}" aria-labelledby="h-${g.id}" style="--w:${g.wash}">\n` +
    `        <h2 class="glabel" id="h-${g.id}" style="--x:${lx};--y:${ly};--tx:${right ? '-100%' : '0%'}"><b>${g.n}</b><span>${g.label}</span></h2>\n` +
    `        <span class="vine" aria-hidden="true"></span>\n` +
    `        <ul role="list">\n          ${items}\n        </ul>\n      </section>`
  );
}

const TITLE = 'Dhyandev P | Links';
const DESC = 'Developer. Projects, code, and everywhere else I exist.';

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<link rel="canonical" href="https://links.dhyandev.sbs/">
<meta name="theme-color" content="#F4F1EA" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1A1511" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dhyandev P">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="https://links.dhyandev.sbs/">
<meta property="og:image" content="https://links.dhyandev.sbs/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="An autumn maple tree whose leaves are Dhyandev P's links">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${TITLE}">
<meta name="twitter:description" content="${DESC}">
<meta name="twitter:image" content="https://links.dhyandev.sbs/og.png">
<link rel="dns-prefetch" href="https://github.com">
<link rel="dns-prefetch" href="https://www.linkedin.com">
<link rel="dns-prefetch" href="https://www.instagram.com">
<link rel="dns-prefetch" href="https://dhyandev.sbs">
<script>
  (function() {
    try {
      var saved = localStorage.getItem('theme');
      var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    } catch (e) {}
  })();
  // Hide the pre-growth state only when animation will actually run; fail open after 10s.
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('anim');
    window.__failOpen = setTimeout(function () { document.documentElement.classList.remove('anim'); }, 10000);
  }
</script>
<link rel="stylesheet" href="./src/style.css">
</head>
<body>
<a class="skip" href="#tree">Skip to links</a>

<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <g id="leaf-body">
      <path class="leaf-fill" d="${LEAFP.body}"/>
      <path class="leaf-vein" d="${LEAFP.veins}"/>
      <path class="leaf-stem" d="${LEAFP.stem}"/>
    </g>
  </defs>
</svg>

<header class="top">
  <div class="id">
    <h1>Dhyandev P</h1>
  </div>
  <p class="role">Developer. Projects, code, and everywhere else I exist.</p>
  <div class="top-actions">
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch between light and dark mode">
      <span class="theme-icon sun-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
        </svg>
      </span>
      <span class="theme-icon moon-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </span>
      <span class="theme-text">Dark</span>
    </button>
  </div>
</header>

<main id="tree" class="tree">
  <div class="stage">
    <svg class="art" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">
      ${art.join('\n      ')}
    </svg>
    <div class="fall" aria-hidden="true"></div>
    <div class="groups">
      ${groupHTML.join('\n      ')}
    </div>
  </div>
</main>

<footer class="foot"><p>links.dhyandev.sbs · 紅葉 · © 2026 Dhyandev P</p></footer>

<div id="peek" class="peek" aria-hidden="true"></div>
<div id="live" class="sr" role="status" aria-live="polite"></div>

<!-- Optional Cloudflare Web Analytics (cookieless). Paste your token and uncomment.
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
-->
<script type="module" src="./src/main.js"></script>
</body>
</html>
`;

writeFileSync(new URL('../links/index.html', import.meta.url), html);
writeFileSync(new URL('./layout.json', import.meta.url), JSON.stringify({ W, H, LEAF, GROUPS: GROUPS.map((g) => ({ id: g.id, pad: g.pad, leaves: g.leaves.map((l) => ({ title: l.title, x: l.x, y: l.y, fill: l.fill, ink: l.ink, ratio: +contrast(l.fill, l.ink).toFixed(2) })) })) }, null, 1));
console.log('links/index.html written:', GROUPS.reduce((n, g) => n + g.leaves.length, 0), 'leaves; lowest text contrast',
  Math.min(...GROUPS.flatMap((g) => g.leaves.map((l) => contrast(l.fill, l.ink)))).toFixed(2));
