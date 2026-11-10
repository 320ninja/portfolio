(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.documentElement;

const PALETTE = {
  top: ['#ff5b2e', '#ff2e7e'], about: ['#4f8cff', '#8b5cf6'], skills: ['#38e8b0', '#22d3ee'],
  work: ['#ffb02e', '#ff5b2e'], process: ['#c084fc', '#ff2e7e'], contact: ['#4ade80', '#22d3ee']
};
const paint = id => { const p = PALETTE[id]; if (!p) return; root.style.setProperty('--acc', p[0]); root.style.setProperty('--acc2', p[1]); };
const secIO = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && paint(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
$$('header[id],section[id]').forEach(s => secIO.observe(s));

function splitWords(el, wrapCls, wordCls) {
  let i = 0;
  const walk = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span'); w.className = wordCls; w.style.setProperty('--i', i++); w.textContent = part;
          if (wrapCls) { const m = document.createElement('span'); m.className = wrapCls; m.appendChild(w); frag.appendChild(m); } else frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
  };
  walk(el);
}

if (!reduce) {
  $$('.h2, .reel-title').forEach(h => { splitWords(h, 'nj-wm', 'nj-wd'); h.classList.add('nj-split'); });
  const rio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }), { threshold: .2 });
  $$('.reel-title').forEach(h => rio.observe(h));

  const scrubs = $$('.about-copy p.reveal');
  scrubs.forEach(p => { splitWords(p, null, 'nj-sw'); p.classList.add('nj-scrub'); });
  const scrub = () => scrubs.forEach(p => {
    const r = p.getBoundingClientRect(), words = p._w || (p._w = $$('.nj-sw', p));
    const prog = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
    const n = Math.round(prog * words.length);
    words.forEach((w, k) => w.classList.toggle('lit', k < n));
  });

  const mq = document.querySelector('.marquee-track');
  const heads = $$('.section-head');
  let lastY = scrollY, vel = 0, ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY; vel = vel * .8 + (y - lastY) * .2; lastY = y;
      if (mq) mq.parentElement.style.transform = `skewX(${Math.max(-12, Math.min(12, -vel * .35))}deg)`;
      heads.forEach(h => { const r = h.getBoundingClientRect(); h.style.transform = `translateY(${(r.top - innerHeight / 2) * -.06}px)`; });
      scrub();
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  scrub();

  $$('.float-card').forEach(c => c.classList.add('nj-float'));
}

if (fine && !reduce) {
  const spot = document.createElement('div'); spot.className = 'nj-spot'; document.body.appendChild(spot);
  addEventListener('pointermove', e => {
    spot.style.setProperty('--sx', e.clientX + 'px'); spot.style.setProperty('--sy', e.clientY + 'px');
    document.body.classList.add('nj-on');
  }, { passive: true });
  document.addEventListener('pointerleave', () => document.body.classList.remove('nj-on'));

  const bindTilt = c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
      c.style.transform = `perspective(1100px) rotateX(${(.5 - y) * 5}deg) rotateY(${(x - .5) * 6}deg) translateY(-6px)`;
    });
    c.addEventListener('pointerleave', () => { c.style.transform = ''; });
  };
  $$('.work-card').forEach(bindTilt);
}

document.addEventListener('pointerdown', e => {
  const b = e.target.closest('.btn'); if (!b || reduce) return;
  const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), d = document.createElement('span');
  d.className = 'nj-ripple'; d.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  b.appendChild(d); setTimeout(() => d.remove(), 700);
});
})();
