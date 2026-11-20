/*!
 * Air-Dispatch pack v1.0
 * A contact-form send animation: a Boeing-style airliner waits on a runway under the
 * submit button, takes off, flies a curved route and lands on a printed receipt.
 * Vanilla JS, zero dependencies. Pair with air-dispatch.css.
 *
 *   AirDispatch.init({ form, button, send })  →  { reset(), destroy() }
 *
 * See README.md and AI-INSTRUCTIONS.md for the full contract.
 */
var AirDispatch = (function (root, factory) {
  var res = factory();
  if (typeof module === 'object' && module.exports) module.exports = res;
  if (typeof root !== 'undefined') root.AirDispatch = res;
  return res;
})(typeof self !== 'undefined' ? self : typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   *  Plane artwork — top-down twin-engine widebody (787-style: raked
   *  wingtips, long fuselage, under-wing nacelles). Nose points right.
   *  No manufacturer logos or livery are used.
   * ------------------------------------------------------------------ */
  var PLANE_SVG =
    '<svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg" focusable="false">' +
    '<defs>' +
      '<linearGradient id="adgBody" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#8c9aa8"/><stop offset="14%" stop-color="#c6d1dc"/><stop offset="32%" stop-color="#f3f6f9"/>' +
        '<stop offset="50%" stop-color="#ffffff"/><stop offset="68%" stop-color="#f3f6f9"/><stop offset="86%" stop-color="#c6d1dc"/><stop offset="100%" stop-color="#8c9aa8"/>' +
      '</linearGradient>' +
      '<linearGradient id="adgCrown" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.2"/><stop offset="20%" stop-color="#ffffff" stop-opacity="0.95"/>' +
        '<stop offset="88%" stop-color="#ffffff" stop-opacity="0.95"/><stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.1"/>' +
      '</linearGradient>' +
      '<linearGradient id="adgWing" x1="0.8" y1="1" x2="0.2" y2="0">' +
        '<stop offset="0%" stop-color="#a8b7c6"/><stop offset="22%" stop-color="#cbd6e0"/><stop offset="55%" stop-color="#eff4f8"/><stop offset="88%" stop-color="#ffffff"/><stop offset="100%" stop-color="#d4dde6"/>' +
      '</linearGradient>' +
      '<linearGradient id="adgSlat" x1="1" y1="1" x2="0" y2="0">' +
        '<stop offset="0%" stop-color="#7e8d9d"/><stop offset="45%" stop-color="#e2e8f0"/><stop offset="100%" stop-color="#b0bcc9"/>' +
      '</linearGradient>' +
      '<linearGradient id="adgCanoe" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#718090"/><stop offset="35%" stop-color="#c4d0dc"/><stop offset="70%" stop-color="#e2e8f0"/><stop offset="100%" stop-color="#5a6876"/>' +
      '</linearGradient>' +
      '<linearGradient id="adgNac" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#556475"/><stop offset="20%" stop-color="#c2cdd8"/><stop offset="48%" stop-color="#ffffff"/><stop offset="76%" stop-color="#c2cdd8"/><stop offset="100%" stop-color="#3d4957"/>' +
      '</linearGradient>' +
      '<radialGradient id="adgIntake" cx="62%" cy="50%" r="56%">' +
        '<stop offset="0%" stop-color="#070a0f"/><stop offset="65%" stop-color="#192230"/><stop offset="100%" stop-color="#2d3748"/>' +
      '</radialGradient>' +
      '<linearGradient id="adgExhaust" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0%" stop-color="#161c24"/><stop offset="60%" stop-color="#3e4a59"/><stop offset="100%" stop-color="#8494a5"/>' +
      '</linearGradient>' +
      '<linearGradient id="adgCockpit" x1="1" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#3b4754"/><stop offset="35%" stop-color="#1a222c"/><stop offset="100%" stop-color="#080c12"/>' +
      '</linearGradient>' +
      '<linearGradient id="adgFairing" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#8e9dae"/><stop offset="50%" stop-color="#dde5ed"/><stop offset="100%" stop-color="#8e9dae"/>' +
      '</linearGradient>' +
      '<g id="adPlaneHalf">' +
        /* horizontal stabilizer */
        '<path d="M 38 87.5 L 14 53 L 7 52 L 9 58 L 22 87.5 Z" fill="url(#adgWing)" stroke="#7c8b9a" stroke-width="0.75" stroke-linejoin="round"/>' +
        '<path d="M 36 87.5 L 14 53.5" fill="none" stroke="#687888" stroke-width="0.6"/>' +
        '<path d="M 19 86 L 10 56" fill="none" stroke="#7c8b9a" stroke-width="0.7" stroke-dasharray="10 1 10 1"/>' +
        '<path d="M 15 72 L 12 60" fill="none" stroke="#556575" stroke-width="0.55"/>' +
        /* main wing planform */
        '<path d="M 150 82 L 141 71.5 L 77 11 C 74 8.5 71 8 67 7.5 C 66 7.5 65.5 8.2 66 9 C 68.5 12.5 72 15 73.5 15.5 L 92 56 L 104 82 Z" fill="url(#adgWing)" stroke="#7a8897" stroke-width="0.8" stroke-linejoin="round"/>' +
        /* leading edge slats */
        '<path d="M 148 81 L 140 71 L 76.5 11.2 C 73.5 9 70 8.3 67 7.8 L 68 8.8 C 72 9.5 75 12 77.5 14.5 L 139 72.5 L 146 81 Z" fill="url(#adgSlat)" opacity="0.88"/>' +
        '<path d="M 130 58 L 128 61 M 114 43 L 112 46 M 97 28 L 95 31 M 83 17 L 81 20" fill="none" stroke="#5e6d7d" stroke-width="0.6"/>' +
        /* spoilers / speedbrakes */
        '<g fill="#d4dee7" stroke="#7e8e9e" stroke-width="0.5">' +
          '<rect x="99" y="62" width="6.5" height="15" rx="0.4" transform="rotate(-18 99 62)"/>' +
          '<rect x="94" y="47" width="5.5" height="13" rx="0.4" transform="rotate(-21 94 47)"/>' +
          '<rect x="88.5" y="33" width="5" height="12" rx="0.4" transform="rotate(-24 88.5 33)"/>' +
        '</g>' +
        /* control surface split lines */
        '<path d="M 103 80 L 92 57" fill="none" stroke="#6f7f8f" stroke-width="0.75"/>' +
        '<path d="M 92 56 L 82 35" fill="none" stroke="#6f7f8f" stroke-width="0.75"/>' +
        '<path d="M 81.5 34 L 74 16" fill="none" stroke="#637383" stroke-width="0.8"/>' +
        /* flap track canoes */
        '<path d="M 94 67 C 92 67 91 67.5 91 68 C 91 68.5 92 69 94 69 L 109 68.6 C 111 68.6 111.5 68.3 111.5 68 C 111.5 67.7 111 67.4 109 67.4 Z" fill="url(#adgCanoe)" stroke="#4d5b6a" stroke-width="0.45"/>' +
        '<path d="M 85 49 C 83.5 49 82.5 49.5 82.5 50 C 82.5 50.5 83.5 51 85 51 L 98 50.5 C 99.5 50.5 100 50.3 100 50 C 100 49.7 99.5 49.5 98 49.5 Z" fill="url(#adgCanoe)" stroke="#4d5b6a" stroke-width="0.45"/>' +
        '<path d="M 76 31 C 74.8 31 74 31.4 74 31.8 C 74 32.2 74.8 32.6 76 32.6 L 87 32.2 C 88.2 32.2 88.6 32 88.6 31.8 C 88.6 31.6 88.2 31.4 87 31.4 Z" fill="url(#adgCanoe)" stroke="#4d5b6a" stroke-width="0.45"/>' +
        '<path d="M 141 78 L 135 72 L 102 78" fill="none" stroke="#8da0b3" stroke-width="0.5" stroke-dasharray="2 1" opacity="0.65"/>' +
        /* engine pylon & exhaust */
        '<path d="M 124 41 L 144 41 L 145 42 L 122 42 Z" fill="#505f70" stroke="#374351" stroke-width="0.5"/>' +
        '<path d="M 112 40 L 106 41.5 C 105 41.8 105 42.2 106 42.5 L 112 44 Z" fill="url(#adgExhaust)" stroke="#222c37" stroke-width="0.45"/>' +
        /* nacelle with chevrons */
        '<path d="M 146 35 C 136 34.5 122 35 114 36.5 L 115 37.5 L 113.5 38.5 L 115 39.5 L 113.8 40.5 L 115 41.5 L 113.8 42.5 L 115 43.5 L 113.5 44.5 L 115 45.5 L 114 46.5 C 122 48 136 48.5 146 48 C 147.5 48 148 46 148 41.5 C 148 37 147.5 35 146 35 Z" fill="url(#adgNac)" stroke="#4a5868" stroke-width="0.65"/>' +
        '<path d="M 145 35.2 C 147 35.5 148 38 148 41.5 C 148 45 147 47.5 145 47.8 L 146 48 C 148 47.5 149 45 149 41.5 C 149 38 148 35.5 146 35 Z" fill="#ffffff" opacity="0.85"/>' +
        '<ellipse cx="145.5" cy="41.5" rx="2.5" ry="5.8" fill="url(#adgIntake)"/>' +
        '<path d="M 145.5 40.5 Q 148.2 41.5 145.5 42.5 Z" fill="#8c9aa8"/>' +
        '<path d="M 126 35.2 L 126 47.8 M 134 35 L 134 48" fill="none" stroke="#687787" stroke-width="0.5"/>' +
        '<path d="M 119 36 L 119 47" fill="none" stroke="#687787" stroke-width="0.5" stroke-dasharray="1.5 1"/>' +
        '<circle cx="66.5" cy="8.2" r="1.4" fill="#cbd5e1" opacity="0.85"/>' +
        '<circle cx="66.5" cy="8.2" r="2.8" fill="#e2e8f0" opacity="0.35"/>' +
      '</g>' +
    '</defs>' +
    /* belly fairing */
    '<path d="M 160 90 C 158 82.5 148 79.5 132 79.5 L 104 79.5 C 90 79.5 84 83.5 82 90 C 84 96.5 90 100.5 104 100.5 L 132 100.5 C 148 100.5 158 97.5 160 90 Z" fill="url(#adgFairing)" stroke="#748393" stroke-width="0.6"/>' +
    /* upper wing */
    '<use href="#adPlaneHalf"/>' +
    /* lower wing mirrored */
    '<g transform="translate(0 180) scale(1 -1)">' +
      '<use href="#adPlaneHalf"/>' +
      '<circle cx="66.5" cy="8.2" r="1.4" fill="#cbd5e1" opacity="0.85"/>' +
      '<circle cx="66.5" cy="8.2" r="2.8" fill="#e2e8f0" opacity="0.35"/>' +
    '</g>' +
    /* fuselage */
    '<path d="M 8 90 C 8 88.8 14 87.2 24 86.5 C 40 85.5 68 84.5 90 84.5 L 182 84.5 C 198 84.5 208 86.2 214.5 89 C 215.8 89.5 215.8 90.5 214.5 91 C 208 93.8 198 95.5 182 95.5 L 90 95.5 C 68 95.5 40 94.5 24 93.5 C 14 92.8 8 91.2 8 90 Z" fill="url(#adgBody)" stroke="#6b7a8a" stroke-width="0.85" stroke-linejoin="round"/>' +
    '<path d="M 28 89.2 L 196 89.2 C 204 89.2 208 89.6 212 90 C 208 90.4 204 90.8 196 90.8 L 28 90.8 Z" fill="url(#adgCrown)"/>' +
    '<path d="M 36 88.5 H 188" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.9"/>' +
    '<path d="M 36 91.5 H 180" stroke="#798a9c" stroke-width="0.6" stroke-linecap="round" opacity="0.35"/>' +
    '<path d="M 206 85.5 C 207.5 87 208 88.5 208 90 C 208 91.5 207.5 93 206 94.5" fill="none" stroke="#728394" stroke-width="0.65"/>' +
    '<line x1="211" y1="87.5" x2="213.5" y2="87.5" stroke="#334155" stroke-width="0.5"/>' +
    '<line x1="211" y1="92.5" x2="213.5" y2="92.5" stroke="#334155" stroke-width="0.5"/>' +
    /* cockpit windows */
    '<g stroke="#8da0b3" stroke-width="0.4" stroke-linejoin="round">' +
      '<path d="M 203.5 89.3 L 200.5 86.8 L 196 87.1 L 197.2 89.5 Z" fill="url(#adgCockpit)"/>' +
      '<path d="M 203.5 90.7 L 200.5 93.2 L 196 92.9 L 197.2 90.5 Z" fill="url(#adgCockpit)"/>' +
      '<path d="M 195 86.9 L 191 86.2 L 191.5 88.2 L 195.8 88.8 Z" fill="url(#adgCockpit)"/>' +
      '<path d="M 195 93.1 L 191 93.8 L 191.5 91.8 L 195.8 91.2 Z" fill="url(#adgCockpit)"/>' +
      '<line x1="203.5" y1="89.3" x2="203.5" y2="90.7" stroke="#e2e8f0" stroke-width="0.6"/>' +
      '<path d="M 201 87.2 L 198 89.3" stroke="#ffffff" stroke-width="0.6" stroke-linecap="round" opacity="0.75"/>' +
      '<path d="M 201 92.8 L 198 90.7" stroke="#ffffff" stroke-width="0.6" stroke-linecap="round" opacity="0.75"/>' +
    '</g>' +
    /* cabin windows */
    '<g fill="#1a2533" opacity="0.7">' +
      '<rect x="76" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="80" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="84" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="88" y="84.8" width="1.1" height="1.6" rx="0.4"/>' +
      '<rect x="114" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="118" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="122" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="126" y="84.8" width="1.1" height="1.6" rx="0.4"/>' +
      '<rect x="156" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="160" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="164" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="168" y="84.8" width="1.1" height="1.6" rx="0.4"/><rect x="172" y="84.8" width="1.1" height="1.6" rx="0.4"/>' +
      '<rect x="76" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="80" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="84" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="88" y="93.6" width="1.1" height="1.6" rx="0.4"/>' +
      '<rect x="114" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="118" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="122" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="126" y="93.6" width="1.1" height="1.6" rx="0.4"/>' +
      '<rect x="156" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="160" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="164" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="168" y="93.6" width="1.1" height="1.6" rx="0.4"/><rect x="172" y="93.6" width="1.1" height="1.6" rx="0.4"/>' +
    '</g>' +
    '<path d="M 183 85 L 183 87.5 M 183 92.5 L 183 95" stroke="#667789" stroke-width="0.55"/>' +
    '<path d="M 72 85.5 L 72 87.5 M 72 92.5 L 72 94.5" stroke="#667789" stroke-width="0.55"/>' +
    '<ellipse cx="108" cy="90" rx="6" ry="1.4" fill="#ffffff" stroke="#8da0b3" stroke-width="0.4"/>' +
    '<line x1="140" y1="90" x2="144" y2="90" stroke="#374151" stroke-width="0.9" stroke-linecap="round"/>' +
    '<line x1="62" y1="90" x2="65" y2="90" stroke="#374151" stroke-width="0.8" stroke-linecap="round"/>' +
    '<path d="M 58 90 L 46 88.8 L 11 88.8 L 11 91.2 L 46 91.2 Z" fill="var(--ad-accent,#1E1E1D)" stroke="#090d14" stroke-width="0.5"/>' +
    '<line x1="56" y1="90" x2="11" y2="90" stroke="#cbd5e1" stroke-width="0.5"/>' +
    '<line x1="20" y1="88.8" x2="20" y2="91.2" stroke="#374151" stroke-width="0.6"/>' +
    '<ellipse cx="8" cy="90" rx="0.9" ry="1.6" fill="#090d14" stroke="#3e4c5b" stroke-width="0.4"/>' +
    '<circle cx="148" cy="81.5" r="0.9" fill="#e2e8f0" opacity="0.85"/>' +
    '<circle cx="148" cy="98.5" r="0.9" fill="#e2e8f0" opacity="0.85"/>' +
    '<circle class="ad-strobe" cx="8.5" cy="90" r="1.5" fill="#f8fafc"/>' +
    '<circle class="ad-strobe" cx="8.5" cy="90" r="3.4" fill="#ffffff" opacity="0.4"/>' +
    '</svg>';

  /* ------------------------------------------------------------------ *
   *  Defaults
   * ------------------------------------------------------------------ */
  var DEFAULTS = {
    form: null,                 // selector | Element — required
    button: null,               // selector | Element — required. The plane parks beneath it.
    send: null,                 // (data, form) => Promise — required. Reject = failure.
    apronAfter: null,           // selector | Element after which the runway is inserted (default: the button)
    align: 'button',            // 'button' = runway matches button width · 'full' = full row width
    validate: true,             // call form.reportValidity() before flying
    accent: null,               // CSS colour for the tail fin (default navy)
    fields: {},                 // { name: '#x', email: '#y' } — optional overrides, else matched by name/id
    labels: { idle: null, spool: 'Clearing for takeoff\u2026', flying: 'Airplane in flight\u2026', done: 'Sent \u2713', fail: 'Try again' },
    caption: { idle: 'AIR-DISPATCH \u00B7 STANDING BY', spool: 'CLEARED FOR TAKEOFF', flying: 'IN FLIGHT',
               done: 'FLIGHT COMPLETE', fail: 'RETURN TO GATE' },
    timing: { spool: 800, flight: 3600 },
    receipt: {
      company: 'WAYVE ENTERPRISES',
      destination: '',          // shown as DEST row when set (e.g. 'you@domain.com')
      number: 1,                // first receipt number; auto-increments (localStorage)
      side: 'right',            // 'right' | 'left'
      top: null, offset: null,  // px overrides (otherwise CSS decides, incl. mobile)
      peek: 0,                  // px of receipt visible while idle (0 = hidden until submitted)
      autoDismiss: 3200,        // ms before receipt auto-dismisses out of the screen (0 to disable)
      thanks: 'THANK YOU.',
      stamp: 'DELIVERED',
      stampFail: 'NOT SENT',
      rows: [
        { label: 'NAME',  field: 'name' },
        { label: 'EMAIL', field: 'email' },
        { label: 'PHONE', field: 'phone', fallback: 'N/A' }
      ]
    }
  };

  /* ------------------------------------------------------------------ *
   *  Small helpers
   * ------------------------------------------------------------------ */
  function isObj(v) { return v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Element); }
  function merge(a, b) {
    var out = {}, k;
    for (k in a) out[k] = isObj(a[k]) ? merge(a[k], {}) : a[k];
    for (k in b) out[k] = isObj(b[k]) && isObj(out[k]) ? merge(out[k], b[k]) : b[k];
    return out;
  }
  function $(s, ctx) { return typeof s === 'string' ? (ctx || document).querySelector(s) : s; }
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var angDiff = function (a, b) { return ((b - a + 540) % 360) - 180; };
  var easeInOut = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var easeOut = function (t) { return 1 - (1 - t) * (1 - t); };
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var nextFrame = function () { return new Promise(function (r) { requestAnimationFrame(function () { r(); }); }); };
  var reduceMotion = function () { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; };

  function bez(a, b, c, d, t) {
    var u = 1 - t;
    return { x: u*u*u*a.x + 3*u*u*t*b.x + 3*u*t*t*c.x + t*t*t*d.x,
             y: u*u*u*a.y + 3*u*u*t*b.y + 3*u*t*t*c.y + t*t*t*d.y };
  }
  function bezD(a, b, c, d, t) {
    var u = 1 - t;
    return { x: 3*u*u*(b.x-a.x) + 6*u*t*(c.x-b.x) + 3*t*t*(d.x-c.x),
             y: 3*u*u*(b.y-a.y) + 6*u*t*(c.y-b.y) + 3*t*t*(d.y-c.y) };
  }

  /* ------------------------------------------------------------------ *
   *  The flight: spool → takeoff → cruise & bank → flare → touchdown → dock
   * ------------------------------------------------------------------ */
  var REST = 0.72;   // must match .ad-parked scale in the CSS

  function flyPlane(o) {
    return new Promise(function (resolve) {
      var plane = o.plane, path = o.routePath, p0 = o.from, p3 = o.landing;

      if (reduceMotion()) {
        o.onTakeoff && o.onTakeoff(); o.onTouchdown && o.onTouchdown();
        plane.style.display = 'none'; return resolve();
      }

      var dx = p3.x - p0.x, dy = p3.y - p0.y, dist = Math.hypot(dx, dy);
      var p1 = { x: p0.x + dx * .16, y: p0.y - Math.max(150, dist * .24) };        // climb-out
      var p2 = { x: p3.x - Math.max(190, dist * .32), y: p3.y - Math.max(70, dist * .10) }; // glide slope

      var heading = 0, roll = 0, sc = REST, took = false, touched = false;
      var pts = [], last = performance.now(), t0 = last;

      function place(x, y, h, rl, s, sy, sb, sa) {
        plane.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%) rotate(' + h + 'deg) ' +
          'perspective(620px) rotateX(' + rl + 'deg) scale(' + s + ')';
        plane.style.filter = 'drop-shadow(0 ' + sy + 'px ' + sb + 'px rgba(0,0,0,' + sa + '))';
      }
      place(p0.x, p0.y, 0, 0, REST, 2, 2, .35);          // no jump when leaving the runway

      function frame(now) {
        var dt = Math.min(.05, (now - last) / 1000); last = now;
        var el = now - t0;
        var d0 = bezD(p0, p1, p2, p3, .02);
        var lineUp = Math.atan2(d0.y, d0.x) * 180 / Math.PI;

        /* 1 — engine spool: vibrate while the nose swings onto the departure heading */
        if (el < o.spool) {
          var k = el / o.spool, j = (Math.random() - .5) * 1.4 * k;
          heading += angDiff(heading, lineUp) * (1 - Math.exp(-dt * 4));
          place(p0.x + j, p0.y + j * .6, heading, 0, REST + .02 * k, 2 + 3 * k, 2 + 2 * k, .33);
          return requestAnimationFrame(frame);
        }
        if (!took) { took = true; o.onTakeoff && o.onTakeoff(); }

        /* 2 — flight */
        var raw = clamp((el - o.spool) / o.duration, 0, 1);
        var t = easeInOut(raw);
        var pos = bez(p0, p1, p2, p3, t);
        var d = bezD(p0, p1, p2, p3, Math.max(.001, t));
        var want = Math.atan2(d.y, d.x) * 180 / Math.PI;

        var diff = angDiff(heading, want);                               // heavy, lagged turning
        heading += diff * (1 - Math.exp(-dt * 6));
        var bank = clamp(diff * 1.5, -34, 34) * (1 - Math.pow(raw, 3));   // bank in turns, wings level to land
        roll += (bank - roll) * (1 - Math.exp(-dt * 7));

        var alt = Math.pow(Math.sin(Math.PI * clamp(raw * .96 + .02, 0, 1)), .85);
        sc = lerp(REST + .02, .98, alt) * lerp(1, .5, Math.pow(raw, 2.2));
        place(pos.x, pos.y, heading, roll, sc, 2 + alt * 38, 2 + alt * 16, .36 - alt * .18);

        if (raw > .02) {
          pts.push(pos);
          path.setAttribute('d', 'M' + pts.map(function (p) { return p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join(' L'));
        }
        o.onProgress && o.onProgress(raw);

        if (!touched && raw >= .985) { touched = true; o.onTouchdown && o.onTouchdown(); }
        if (raw < 1) return requestAnimationFrame(frame);

        /* 3 — roll-out, then dock into the paper */
        var rad = heading * Math.PI / 180, s0 = performance.now(), dur = 750;
        (function out(n) {
          var k2 = easeOut(clamp((n - s0) / dur, 0, 1));
          place(p3.x + Math.cos(rad) * 34 * k2, p3.y + Math.sin(rad) * 34 * k2, heading, 0, sc * (1 - .3 * k2), 1, 1, .28 * (1 - k2));
          plane.style.opacity = 1 - k2;
          if (k2 < 1) requestAnimationFrame(out);
          else { plane.style.display = 'none'; path.parentNode.style.opacity = 0; resolve(); }
        })(s0);
      }
      requestAnimationFrame(frame);
    });
  }

  /* ------------------------------------------------------------------ *
   *  init()
   * ------------------------------------------------------------------ */
  function init(userCfg) {
    var cfg = merge(DEFAULTS, userCfg || {});
    var form = $(cfg.form), btn = $(cfg.button);
    if (!form || !btn) throw new Error('[AirDispatch] "form" and "button" must match elements on the page.');
    if (typeof cfg.send !== 'function') throw new Error('[AirDispatch] "send" must be a function that returns a Promise.');

    var busy = false, destroyed = false, planeEl = null, number = cfg.receipt.number;
    var autoDismissTimer = null;
    var created = [];

    function clearDismissTimer() {
      if (autoDismissTimer) {
        clearTimeout(autoDismissTimer);
        autoDismissTimer = null;
      }
    }

    if (cfg.accent) document.documentElement.style.setProperty('--ad-accent', cfg.accent);
    try { var n = parseInt(localStorage.getItem('ad-number'), 10); if (n) number = n; } catch (e) {}

    /* ---- button ---- */
    btn.setAttribute('data-ad-btn', '');
    var label = btn.querySelector('.ad-label');
    if (!label) { btn.innerHTML = '<span class="ad-label">' + btn.innerHTML + '</span>'; label = btn.querySelector('.ad-label'); }
    var L = cfg.labels; L.idle = L.idle || label.textContent.trim();
    function setBtn(text, cls) {
      btn.classList.remove('ad-done', 'ad-fail'); if (cls) btn.classList.add(cls);
      label.textContent = text;
    }

    /* ---- runway (apron) under the button ---- */
    var apron = document.createElement('div');
    apron.className = 'ad-apron';
    apron.innerHTML = '<div class="ad-runway"></div><div class="ad-caption"></div>';
    ($(cfg.apronAfter) || btn).insertAdjacentElement('afterend', apron);
    created.push(apron);
    var caption = apron.querySelector('.ad-caption');
    function setCaption(k) { caption.textContent = cfg.caption[k] || ''; }
    setCaption('idle');

    function align() {
      if (cfg.align !== 'button') return;
      apron.style.marginLeft = '0px'; apron.style.width = 'auto';
      var b = btn.getBoundingClientRect(), a = apron.getBoundingClientRect();
      apron.style.width = b.width + 'px';
      apron.style.marginLeft = (b.left - a.left) + 'px';
    }
    align();
    window.addEventListener('resize', align);
    var ro = window.ResizeObserver ? new ResizeObserver(align) : null;
    if (ro) ro.observe(btn);

    /* ---- plane ---- */
    function park() {
      if (planeEl) planeEl.remove();
      planeEl = document.createElement('div');
      planeEl.className = 'ad-plane ad-parked';
      planeEl.setAttribute('aria-hidden', 'true');
      planeEl.innerHTML = PLANE_SVG;
      apron.appendChild(planeEl);
    }
    park();

    function liftOff() {
      var r = planeEl.getBoundingClientRect();
      var from = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      planeEl.classList.remove('ad-parked'); planeEl.classList.add('ad-flying');
      planeEl.style.transform = ''; planeEl.style.filter = '';
      document.body.appendChild(planeEl);
      return from;
    }

    /* ---- route overlay ---- */
    var routeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    routeSvg.setAttribute('class', 'ad-route'); routeSvg.setAttribute('aria-hidden', 'true');
    var routePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    routeSvg.appendChild(routePath); document.body.appendChild(routeSvg); created.push(routeSvg);

    /* ---- receipt ---- */
    var R = cfg.receipt;
    var rc = document.createElement('aside');
    rc.className = 'ad-receipt' + (R.side === 'left' ? ' ad-left' : '');
    rc.setAttribute('aria-live', 'polite');
    rc.style.setProperty('--ad-peek', R.peek + 'px');
    if (R.top != null) rc.style.setProperty('--ad-top', R.top + 'px');
    if (R.offset != null) rc.style.setProperty('--ad-side', R.offset + 'px');

    var rowsHTML = R.rows.map(function (r, i) {
      return '<div class="ad-row"><span>' + r.label + '</span><b data-row="' + i + '">\u2014</b></div>';
    }).join('');
    if (R.destination) rowsHTML += '<div class="ad-row"><span>DEST</span><b>' + R.destination + '</b></div>';
    var bars = ''; for (var i = 0; i < 34; i++) bars += '<i style="width:' + (1 + Math.floor(Math.random() * 3)) + 'px;transition-delay:' + (i * 14) + 'ms"></i>';

    rc.innerHTML =
      '<button type="button" class="ad-close" aria-label="Close receipt" title="Close receipt">&times;</button>' +
      '<div class="ad-brand">' + R.company + '</div>' +
      '<div class="ad-meta">NO. <span data-no></span> / <span>' +
        new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() + '</span></div>' +
      '<div class="ad-status"><i>BOARDING</i><i>IN FLIGHT</i><i>LANDED</i></div>' +
      rowsHTML +
      '<div class="ad-bars">' + bars + '</div>' +
      '<div class="ad-thanks">' + R.thanks + '</div>' +
      '<div class="ad-stamp"></div>';
    document.body.appendChild(rc); created.push(rc);
    var stamp = rc.querySelector('.ad-stamp'), stages = rc.querySelectorAll('.ad-status i'), noEl = rc.querySelector('[data-no]');
    function showNo() { noEl.textContent = String(number).padStart(4, '0'); }
    showNo();
    function setStage(i) { for (var s = 0; s < stages.length; s++) stages[s].className = s < i ? 'ad-past' : s === i ? 'ad-on' : ''; }
    function resetReceipt() {
      clearDismissTimer();
      rc.classList.remove('ad-open', 'ad-printed', 'ad-thud');
      stamp.className = 'ad-stamp'; stamp.textContent = '';
      rc.querySelectorAll('[data-row]').forEach(function (b) { b.textContent = '\u2014'; });
      setStage(-1);
    }
    rc.addEventListener('click', function (e) {
      if (e.target && e.target.closest && e.target.closest('.ad-close')) {
        clearDismissTimer();
        rc.classList.remove('ad-open');
        emit('dismissed');
        return;
      }
      if (!busy && rc.classList.contains('ad-printed')) {
        clearDismissTimer();
        rc.classList.toggle('ad-open');
      }
    });

    /* ---- data ---- */
    function field(key) {
      var sel = cfg.fields && cfg.fields[key];
      return sel ? $(sel, form) || $(sel) : (form.elements && form.elements[key]);
    }
    function valueOf(row) {
      var f = field(row.field), v = f && f.value ? String(f.value).trim() : '';
      return v || row.fallback || '\u2014';
    }
    function typeInto(elm, text) {
      if (reduceMotion()) { elm.textContent = text; return Promise.resolve(); }
      elm.textContent = ''; var p = Promise.resolve();
      text.split('').forEach(function (ch) { p = p.then(function () { elm.textContent += ch; return sleep(22); }); });
      return p;
    }
    function ring(x, y) {
      var r = document.createElement('div'); r.className = 'ad-ring'; r.style.left = x + 'px'; r.style.top = y + 'px';
      document.body.appendChild(r); setTimeout(function () { r.remove(); }, 1000);
    }
    function emit(name, detail) { form.dispatchEvent(new CustomEvent('airdispatch:' + name, { detail: detail || {}, bubbles: true })); }

    /* ---- the sequence ---- */
    function run() {
      busy = true; btn.disabled = true;
      resetReceipt();
      routeSvg.style.opacity = 1; routePath.setAttribute('d', '');
      setBtn(L.spool); setCaption('spool'); btn.style.setProperty('--ad-p', 0);

      var data = {};
      try { new FormData(form).forEach(function (v, k) { data[k] = v; }); } catch (e) {}
      var sent = Promise.resolve().then(function () { return cfg.send(data, form); });
      sent.catch(function () {});                           // handled below; avoids "unhandled rejection"

      var landing, from;
      return nextFrame().then(function () {
        rc.classList.add('ad-open'); setStage(0);
        var rect = rc.getBoundingClientRect();
        var top = parseFloat(getComputedStyle(rc).top) || 0;
        landing = { x: rect.left + rect.width / 2, y: top + rc.offsetHeight * .5 };
        from = liftOff();
        return flyPlane({
          plane: planeEl, routePath: routePath, from: from, landing: landing,
          spool: cfg.timing.spool, duration: cfg.timing.flight,
          onTakeoff: function () { setBtn(L.flying); setCaption('flying'); setStage(1); emit('takeoff'); },
          onProgress: function (p) { btn.style.setProperty('--ad-p', p); },
          onTouchdown: function () { rc.classList.add('ad-thud'); ring(landing.x, landing.y); setStage(2); btn.style.setProperty('--ad-p', 1); emit('landed'); }
        });
      }).then(function () {
        planeEl.remove(); planeEl = null;
        rc.classList.add('ad-printed');
        return Promise.all(R.rows.map(function (row, i) { return typeInto(rc.querySelector('[data-row="' + i + '"]'), valueOf(row).slice(0, 26)); }));
      }).then(function () { return sent; }).then(function () {
        stamp.textContent = R.stamp; stamp.classList.add('ad-show');
        setBtn(L.done, 'ad-done'); setCaption('done');
        busy = false;
        try { localStorage.setItem('ad-number', String(number + 1)); } catch (e) {}
        emit('delivered', { data: data });

        if (R.autoDismiss && R.autoDismiss > 0) {
          clearDismissTimer();
          autoDismissTimer = setTimeout(function () {
            if (!destroyed && rc) {
              rc.classList.remove('ad-open');
              emit('dismissed');
              setTimeout(function () {
                if (!destroyed && !busy) {
                  btn.disabled = false;
                  setBtn(L.idle);
                  setCaption('idle');
                  btn.style.setProperty('--ad-p', 0);
                  park();
                }
              }, 950);
            }
          }, R.autoDismiss);
        }
      }).catch(function (err) {
        stamp.textContent = R.stampFail; stamp.classList.add('ad-show', 'ad-bad');
        setBtn(L.fail, 'ad-fail'); setCaption('fail'); btn.disabled = false; busy = false;
        park(); emit('failed', { error: err });
      });
    }

    function onSubmit(e) {
      e.preventDefault(); e.stopImmediatePropagation();      // we own the submit flow from here
      if (busy || destroyed) return;
      if (cfg.validate && form.reportValidity && !form.reportValidity()) return;
      run();
    }
    form.addEventListener('submit', onSubmit, true);          // capture: runs before framework handlers

    function reset() {
      busy = false; btn.disabled = false; setBtn(L.idle); setCaption('idle'); btn.style.setProperty('--ad-p', 0);
      resetReceipt(); routePath.setAttribute('d', ''); park();
      try { number = parseInt(localStorage.getItem('ad-number'), 10) || number; } catch (e) {} showNo();
    }
    function destroy() {
      destroyed = true;
      clearDismissTimer();
      form.removeEventListener('submit', onSubmit, true);
      window.removeEventListener('resize', align); if (ro) ro.disconnect();
      if (planeEl) planeEl.remove();
      created.forEach(function (n) { n.remove(); });
      btn.removeAttribute('data-ad-btn'); btn.classList.remove('ad-done', 'ad-fail'); btn.disabled = false;
      label.textContent = L.idle;
    }

    return { reset: reset, destroy: destroy };
  }

  return { init: init, version: '1.0.0' };
});
export default AirDispatch;
