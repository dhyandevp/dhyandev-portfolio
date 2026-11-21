import { animate, stagger, inView, scroll, hover } from 'motion';

const EASE = [0.22, 1, 0.36, 1];
const SPRING = { type: 'spring', stiffness: 260, damping: 18 };

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const wide = matchMedia('(min-width: 920px)');

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const stage = $('.stage');
const peek = $('#peek');
const live = $('#live');
const slots = $$('.slot');
const themeToggle = $('#theme-toggle');
const themeText = themeToggle ? $('.theme-text', themeToggle) : null;

function getActiveTheme() {
  const currentAttr = document.documentElement.getAttribute('data-theme');
  if (currentAttr) return currentAttr;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateTheme(theme, pop = false) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch {}
  const isDark = theme === 'dark';
  if (themeText) themeText.textContent = isDark ? 'Light' : 'Dark';
  if (themeToggle) themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  if (live) live.textContent = `Theme set to ${isDark ? 'dark' : 'light'} mode`;

  if (pop && !reduce && themeToggle) {
    const icon = isDark ? $('.sun-icon', themeToggle) : $('.moon-icon', themeToggle);
    if (icon) {
      animate(icon, { rotate: [0, 25, -25, 0], scale: [0.8, 1.2, 1] }, { duration: 0.35, ease: EASE });
    }
    animate(themeToggle, { scale: [0.94, 1.04, 1] }, { duration: 0.25, ease: EASE });
  }
}

if (themeToggle) {
  updateTheme(getActiveTheme(), false);
  themeToggle.addEventListener('click', () => {
    const next = getActiveTheme() === 'dark' ? 'light' : 'dark';
    updateTheme(next, true);
  });
}

/* ------------------------------------------------ hover preview */
let typer;
function showPeek(leaf) {
  const slot = leaf.closest('.slot');
  const sub = $('.sub', slot).textContent.trim();
  const href = leaf.getAttribute('href');
  let dest;
  if (href.startsWith('mailto:')) dest = 'CLICK TO COPY';
  else {
    const u = new URL(href);
    dest = (u.host.replace(/^www\./, '') + u.pathname.replace(/\/$/, '')).toUpperCase();
  }
  let text = `${sub.toUpperCase()}  →  ${dest}`;
  if (text.length > 64) text = text.slice(0, 63) + '…';

  const r = leaf.getBoundingClientRect();
  peek.style.left = Math.min(Math.max(r.left + r.width / 2, 130), innerWidth - 130) + 'px';
  peek.style.top = Math.max(r.top - 4, 30) + 'px';
  peek.classList.add('show');
  clearInterval(typer);
  if (reduce) { peek.textContent = text; return; }
  let i = 0;
  peek.textContent = '';
  typer = setInterval(() => {
    peek.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(typer);
  }, 25);
}
function hidePeek() { clearInterval(typer); peek.classList.remove('show'); }

/* ------------------------------------------------ hover / focus: straighten, lift, dim the rest */
function enter(leaf) {
  const r = +leaf.closest('.slot').dataset.r;
  leaf.classList.add('hot');
  stage.classList.add('hovering');
  if (!reduce) {
    animate(leaf, { scale: 1.14, y: -6 }, SPRING);
    animate($('.shape', leaf), { rotate: -r }, SPRING);
  }
  showPeek(leaf);
}
function leave(leaf) {
  leaf.classList.remove('hot');
  stage.classList.remove('hovering');
  if (!reduce) {
    animate(leaf, { scale: 1, y: 0 }, SPRING);
    animate($('.shape', leaf), { rotate: 0 }, SPRING);
  }
  hidePeek();
}
if (wide.matches) {
  $$('.leaf').forEach((leaf) => {
    if (fine.matches) hover(leaf, () => { enter(leaf); return () => leave(leaf); });
    leaf.addEventListener('focus', () => { if (leaf.matches(':focus-visible')) enter(leaf); });
    leaf.addEventListener('blur', () => leave(leaf));
  });
}

/* ------------------------------------------------ click: flutter, leaf burst, email copy */
function burst(leaf) {
  if (reduce) return;
  const r = leaf.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('span');
    p.className = 'spark';
    p.style.setProperty('--c', getComputedStyle(leaf.closest('.slot')).getPropertyValue('--f') || '#c45a1c');
    p.style.left = cx + 'px';
    p.style.top = cy + 'px';
    document.body.append(p);
    const a = (Math.PI * 2 * i) / 6;
    const d = 36 + (i % 3) * 8;
    animate(
      p,
      {
        x: [0, Math.cos(a + 0.8) * d * 0.6, Math.cos(a + 1.6) * d],
        y: [0, Math.sin(a + 0.8) * d * 0.6, Math.sin(a + 1.6) * d],
        rotate: [0, 120, 260],
        scale: [1, 0.9, 0.4],
        opacity: [1, 1, 0],
      },
      { duration: 0.6, ease: EASE }
    ).finished.then(() => p.remove());
  }
}

async function copyEmail(leaf) {
  const addr = leaf.dataset.copy;
  const title = $('.title', leaf);
  const original = title.textContent;
  try { await navigator.clipboard.writeText(addr); }
  catch { location.href = 'mailto:' + addr; return; }   // clipboard blocked: open the mail app
  title.textContent = 'Copied ✓';
  live.textContent = 'Email address copied';
  setTimeout(() => { title.textContent = original; live.textContent = ''; }, 1500);
}

slots.forEach((slot) => {
  const leaf = $('.leaf', slot);
  leaf.addEventListener('click', (e) => {
    burst(leaf);
    if (!reduce && wide.matches) {
      const base = leaf.classList.contains('hot') ? -(+slot.dataset.r) : 0;
      animate($('.shape', leaf), { rotate: [base, base + 12, base - 12, base + 6, base] }, { duration: 0.28, ease: EASE });
    }
    if (leaf.dataset.copy) { e.preventDefault(); copyEmail(leaf); }
  });
});

/* ------------------------------------------------ growth: wide screens (organic tree growth from ground to crown) */
async function growWide() {
  const up = (sel, keyframes, opts) => animate(sel, keyframes, { ease: EASE, ...opts });

  // 1. Atmosphere: soft sun and ground
  up('#sun', { opacity: [0, 1] }, { duration: 1.2 });
  up('#ground', { opacity: [0, 1] }, { duration: 0.8 });

  // 2. Trunk climbs upward from the ground
  up('#grow-rect', { scaleY: [0, 1] }, { duration: 1.8 });

  // 3. Chronological botanical growth as trunk ascends past each branch height
  const branchSequence = [
    {
      id: 'build', // lowest branch (y ~ 628)
      limbDelay: 0.35,
      padDelay: 0.52,
      leavesDelay: 0.68,
      labelDelay: 0.82,
      leafRotate: -24,
    },
    {
      id: 'code', // middle-right branch (y ~ 508)
      limbDelay: 0.75,
      padDelay: 0.92,
      leavesDelay: 1.08,
      labelDelay: 1.22,
      leafRotate: 24,
    },
    {
      id: 'me', // upper-left branch (y ~ 424)
      limbDelay: 1.15,
      padDelay: 1.32,
      leavesDelay: 1.48,
      labelDelay: 1.62,
      leafRotate: -20,
    },
    {
      id: 'off', // tree top crown canopy (y ~ 110-46)
      limbDelay: null,
      padDelay: 1.55,
      leavesDelay: 1.72,
      labelDelay: 1.95,
      leafRotate: -18,
    },
  ];

  for (const b of branchSequence) {
    if (b.limbDelay !== null) {
      const limb = $(`.limb[data-for="${b.id}"]`);
      if (limb) {
        animate(limb, { opacity: [0, 1], scale: [0, 1] }, { duration: 0.55, ease: EASE, delay: b.limbDelay });
      }
    }

    const pad = $(`#pad-${b.id}`);
    if (pad) {
      animate(pad, { opacity: [0, 1], scale: [0, 1] }, { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: b.padDelay });
    }

    const groupSlots = $$(`#g-${b.id} .slot`);
    if (groupSlots.length > 0) {
      animate(groupSlots, { opacity: [0, 1] }, { duration: 0.35, delay: stagger(0.08, { startDelay: b.leavesDelay }) });
      animate(groupSlots, { scale: [0, 1] }, { ...SPRING, delay: stagger(0.08, { startDelay: b.leavesDelay }) });
      animate(
        groupSlots.map((s) => $('.shape', s)),
        { rotate: [b.leafRotate, 0] },
        { ...SPRING, delay: stagger(0.08, { startDelay: b.leavesDelay }) }
      );
    }

    const label = $(`#h-${b.id}`);
    if (label) {
      animate(label, { opacity: [0, 1], scale: [0.85, 1] }, { duration: 0.45, ease: EASE, delay: b.labelDelay });
    }
  }

  // 4. Smooth handoff to ambient wind
  await sleep(2600);
  clearTimeout(window.__failOpen);
  ambient();
}

/* ------------------------------------------------ ambient: wind, breathing pads, gusts, falling leaves, cursor wind */
const loops = [];
function ambient() {
  $$('.swayer').forEach((el, i) => {
    loops.push(animate(el, { rotate: [-3, 3] }, { duration: 5 + (i % 4) * 0.9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: (i % 5) * 0.4 }));
  });
  $$('.pad').forEach((el, i) => {
    loops.push(animate(el, { scale: [1, 1.015] }, { duration: 7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: i * 0.6 }));
  });

  // one slow shared gust that ripples left to right
  const byX = [...slots].sort((a, b) => +getComputedStyle(a).getPropertyValue('--x') - +getComputedStyle(b).getPropertyValue('--x'));
  const shapes = byX.map((s) => $('.shape', s));
  setInterval(() => {
    if (document.hidden) return;
    animate(shapes, { x: [0, 7, 0] }, { duration: 1.3, ease: EASE, delay: stagger(0.07) });
  }, 9000);

  falling();
  if (fine.matches) cursorWind();

  document.addEventListener('visibilitychange', () => {
    loops.forEach((c) => (document.hidden ? c.pause() : c.play()));
  });
}

const AUTUMN = ['#B34A12', '#E0A93B', '#8E2F2A', '#C45A1C', '#A33A2F', '#D49A3A', '#5F6F2E'];
function falling() {
  const box = $('.fall');
  const h = stage.clientHeight;
  for (let i = 0; i < 7; i++) {
    const el = document.createElement('span');
    el.className = 'fl';
    const c = AUTUMN[i % AUTUMN.length];
    el.style.left = 6 + i * 13 + (i % 2) * 4 + '%';
    el.style.cssText += `;--f:${c};--s:${c}`;
    el.innerHTML = '<svg viewBox="0 0 136 102" aria-hidden="true"><use href="#leaf-body"/></svg>';
    box.append(el);
    loops.push(
      animate(
        el,
        {
          y: [-30, h * 0.5, h + 30],
          x: [0, 30, -24, 20, -10],
          rotate: [0, 120, -50, 180, 260],
          opacity: [0, 0.85, 0.85, 0],
        },
        { duration: 13 + i * 1.5, repeat: Infinity, ease: 'linear', delay: i * 2.1 }
      )
    );
  }
}

function cursorWind() {
  let centers = [], raf = 0, mx = 0, my = 0;
  const measure = () => {
    centers = slots.map((s) => {
      const r = s.getBoundingClientRect();
      return [r.left + r.width / 2, r.top + r.height / 2, $('.shape', s)];
    });
  };
  measure();
  let t;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(measure, 150); });
  addEventListener('scroll', measure, { passive: true });
  const apply = () => {
    raf = 0;
    for (const [cx, cy, shape] of centers) {
      const dx = cx - mx, d = Math.hypot(dx, cy - my);
      const k = d < 260 ? 1 - d / 260 : 0;
      shape.style.setProperty('--lean', (Math.sign(dx) * k * 9).toFixed(1) + 'px');
    }
  };
  stage.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(apply); });
  stage.addEventListener('pointerleave', () => centers.forEach(([, , s]) => s.style.setProperty('--lean', '0px')));
}

/* ------------------------------------------------ growth: narrow screens (each group grows into view) */
function growNarrow() {
  $$('.group').forEach((g) => {
    const label = $('.glabel', g);
    const leaves = $$('.slot', g);
    inView(g, () => {
      animate(label, { opacity: [0, 1], x: [-12, 0] }, { duration: 0.5, ease: EASE });
      animate(leaves, { opacity: [0, 1], x: [-18, 0], scale: [0.94, 1] }, { ...SPRING, delay: stagger(0.07, { startDelay: 0.15 }) });
      animate(leaves, { opacity: [0, 1] }, { duration: 0.3, delay: stagger(0.07, { startDelay: 0.15 }) });
    }, { amount: 0.2 });
    scroll(animate($('.vine', g), { scaleY: [0, 1] }, { ease: 'linear' }), { target: g, offset: ['start 90%', 'end 100%'] });
  });
  clearTimeout(window.__failOpen);
}

/* ------------------------------------------------ start */
if (!reduce) {
  if (wide.matches) requestAnimationFrame(() => requestAnimationFrame(growWide));
  else growNarrow();
}
wide.addEventListener('change', () => location.reload());
