/* Motion layer v3: transitions adapted from the Nepal Yatra build. Loaded after main.js. */
(() => {
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
/* piecewise linear map of p (0..1) through [0, .5, 1] stops */
const tri = (p, [a, b, c]) => p < .5 ? lerp(a, b, p / .5) : lerp(b, c, (p - .5) / .5);

/* ---------- prayer flags: one straight string just under the nav ---------- */
(function prayerFlags() {
  const hero = $('header.hero'), nav = $('#nav'); if (!hero) return;
  const colours = ['#2d5bd8', '#e9edf5', '#d01020', '#1f8a4c', '#f2b705'];
  const wrap = document.createElement('div');
  wrap.className = 'prayer-flags'; wrap.setAttribute('aria-hidden', 'true');
  hero.insertBefore(wrap, $('.hero-inner', hero));
  let lastW = 0;
  const build = () => {
    const W = hero.clientWidth; if (W === lastW) return; lastW = W;
    const s = W < 700 ? 0.72 : 1;                       // flag size in px: 28x36 on desktop, ~20x26 on phones
    const top = 3, n = Math.max(8, Math.round(W / (40 * s)));
    let g = '';
    for (let i = 0; i < n; i++) {
      const x = (i + .5) * W / n;
      g += `<g transform="translate(${x.toFixed(1)} ${top}) scale(${s})"><rect x="-14" y="2" width="28" height="36" rx="1.5" fill="${colours[i % 5]}" fill-opacity=".62" style="--fd:${(2.6 + (i % 5) * .35).toFixed(2)}s;--fdl:${((i % 8) * .12).toFixed(2)}s"/></g>`;
    }
    const H = Math.ceil(top + 42 * s);
    wrap.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><line x1="0" y1="${top}" x2="${W}" y2="${top}" stroke="#c9d1e3" stroke-opacity=".4" stroke-width="1.5"/>${g}</svg>`;
  };
  // hang the string right at the bottom edge of the nav
  const place = () => { if (nav) wrap.style.top = (nav.offsetTop + nav.offsetHeight) + 'px'; };   // nav is fixed; the hero starts at the top of the page
  build(); place();
  addEventListener('resize', () => { build(); place(); });
  addEventListener('load', place);
})();

/* ---------- drawn rule under the marquee ---------- */
const marquee = $('.marquee');
if (marquee) { const r = document.createElement('div'); r.className = 'draw-rule'; r.setAttribute('aria-hidden', 'true'); marquee.after(r); }

/* ---------- skill hover wash ---------- */
$$('.skill').forEach(s => s.insertAdjacentHTML('afterbegin', '<span class="wash" aria-hidden="true"></span>'));

/* ---------- one-shot reveals: rule + footer wordmark ---------- */
const footBig = $('.foot-big');
if (footBig && !reduce) footBig.classList.add('spin-wait');
const once = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); e.target.classList.remove('spin-wait'); once.unobserve(e.target);
}), { threshold: .3 });
$$('.draw-rule,.foot-big').forEach(el => once.observe(el));

/* ---------- testimonials: neighbours swing away in 3D ---------- */
(function testimonials3d() {
  const cards = $$('#tTrack .t-card'), dots = $('#tDots'); if (!cards.length || !dots) return;
  const sync = () => {
    const k = Math.max(0, $$('i', dots).findIndex(d => d.classList.contains('on')));
    cards.forEach((c, i) => { c.classList.toggle('side-l', i < k); c.classList.toggle('side-r', i > k); });
  };
  sync(); new MutationObserver(sync).observe(dots, { attributes: true, subtree: true, attributeFilter: ['class'] });
})();

if (reduce) return;

/* ---------- scroll-driven: showreel window + skill shear ---------- */
const reel = $('#reel'), desk = matchMedia('(min-width: 861px)');
const skillsSec = $('#skills'), skills = $$('.skill');
const setReelMode = () => reel && reel.classList.toggle('expand', desk.matches);
setReelMode(); desk.addEventListener('change', () => { setReelMode(); tick(); });

function tick() {
  const vh = innerHeight;
  if (reel && reel.classList.contains('expand')) {
    const r = reel.getBoundingClientRect();
    // 0 when the section's top reaches the top of the viewport, 1 when the sticky part ends
    const p = clamp(-r.top / (r.height - vh), 0, 1), k = clamp(p / .6, 0, 1), e = 1 - Math.pow(1 - k, 3);
    const f = r.top > 0 ? 0 : e; // before the pin, stay as a small window
    reel.style.setProperty('--clip', `inset(${lerp(20, 0, f).toFixed(2)}% ${lerp(26, 0, f).toFixed(2)}% ${lerp(20, 0, f).toFixed(2)}% ${lerp(26, 0, f).toFixed(2)}% round ${lerp(28, 0, f).toFixed(1)}px)`);
    reel.style.setProperty('--uy', `${lerp(-24, 0, f).toFixed(1)}vh`);
    reel.style.setProperty('--mo', clamp((k - .55) / .3, 0, 1).toFixed(2));
  }
  if (skillsSec && desk.matches) {
    const r = skillsSec.getBoundingClientRect();
    const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
    skills.forEach((s, i) => {
      const col = i % 2;
      s.style.setProperty('--shear', tri(p, [[90, 30][col], 0, [-30, -70][col]]).toFixed(1) + 'px');
      s.style.setProperty('--shr', tri(p, [[-3, 2.5][col], 0, [1.5, -2][col]]).toFixed(2) + 'deg');
    });
  } else skills.forEach(s => { s.style.removeProperty('--shear'); s.style.removeProperty('--shr'); });
}
let ticking = false;
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { tick(); ticking = false; }); } }, { passive: true });
addEventListener('resize', tick);
tick();
})();
