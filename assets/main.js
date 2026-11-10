(() => {
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- data ---------- */
const CAT = {
  web: { n: 'Web Development', c: 'var(--web)' },
  design: { n: 'Graphic Design', c: 'var(--design)' },
  video: { n: 'Video Editing', c: 'var(--video)' },
  ai: { n: 'AI & Machine Learning', c: 'var(--ai)' },
  app: { n: 'App Development', c: 'var(--app)' }
};
const PROJECTS = [
  { id: 'brew-bean', t: 'Himalayan Brew & Khaja', cat: 'web', sub: 'Café & kitchen website with live ordering', c1: '#1a120c', y: 2025, client: 'Café, Lalitpur', vid: 'food-coffee-pour', size: 'wide',
    d: 'A premium website for a Nepali café and kitchen: a cinematic video hero, a photo menu with variants, a slide-out cart with VAT and pickup checkout, a lightbox gallery and table reservations.',
    try: ['Filter the menu and add momo or chiya to the cart', 'Open the cart, change quantities and check out', 'Browse the gallery and reserve a table'],
    stack: ['HTML5 video', 'CSS animations', 'Vanilla JS', 'localStorage'] },
  { id: 'taskflow', t: 'TaskFlow', cat: 'web', sub: 'Drag-and-drop team Kanban board', c1: '#f4f5f8', y: 2025, client: 'SaaS concept',
    d: 'A Trello-style project board for small teams with drag-and-drop columns, priorities, due dates, assignees and live sprint progress. Everything persists in the browser.',
    try: ['Drag cards between columns', 'Click a card to edit it, or press N for a new task', 'Search and filter by tag'],
    stack: ['JavaScript', 'HTML Drag & Drop API', 'Dialog element', 'localStorage'], size: 'narrow' },
  { id: 'finlytics', t: 'Finlytics', cat: 'web', sub: 'Personal finance analytics dashboard', c1: '#0c0f14', y: 2024, client: 'Fintech prototype',
    d: 'A data-rich dashboard with animated canvas charts, KPI cards, category breakdowns and budget tracking. Add or delete transactions and every chart recalculates instantly.',
    try: ['Hover the cash-flow chart for monthly detail', 'Switch between 3M / 6M / 12M', 'Add a transaction and watch the charts update'],
    stack: ['Canvas 2D charts', 'JavaScript', 'Data modelling', 'Responsive grid'], size: 'narrow' },
  { id: 'stride', t: 'Yatra Travel', cat: 'web', sub: 'Trek & tour booking platform', c1: '#0d2b3a', y: 2025, client: 'Travel agency, Kathmandu', vid: 'nature-coast-aerial', size: 'wide',
    d: 'A booking platform for treks and holidays: search and filter packages, explore photo galleries and day-by-day itineraries, price a trip by date and travellers, and book through a two-step checkout.',
    try: ['Search a destination or filter by trip type', 'Open Everest Base Camp and read the itinerary', 'Pick dates and travellers, then book'],
    stack: ['JavaScript', 'Booking flow UX', 'Form validation', 'Responsive design'] },
  { id: 'haven', t: 'Haven Estates', cat: 'web', sub: 'Luxury real-estate listings with video tours', c1: '#fbfaf7', vid: 'house-tour', y: 2024, client: 'Property agency',
    d: 'Property search with live filters, a synced interactive map, saved homes, visit booking with phone validation, and a mortgage (EMI) calculator tuned for Nepali rates.',
    try: ['Search "Lalitpur" or filter by type', 'Hover a card to highlight its map pin', 'Play with the loan calculator'],
    stack: ['JavaScript', 'SVG', 'Form validation', 'Finance maths'], size: 'wide' },
  { id: 'brandforge', t: 'BrandForge', cat: 'design', sub: 'Logo & brand identity builder', c1: '#101012', y: 2025, client: 'Internal tool',
    d: 'The tool I use to sketch brand directions with clients in real time: pick a symbol, palette, typeface and shape, and it generates the logo suite, app icon, business card and type specimen.',
    try: ['Type your own brand name', 'Hit "Surprise me" for random identities', 'Download the logo as SVG'],
    stack: ['SVG generation', 'Typography', 'Colour theory', 'JavaScript'], size: 'narrow' },
  { id: 'posterlab', t: 'PosterLab', cat: 'design', sub: 'Generative poster design studio', c1: '#ecebe6', y: 2025, client: 'Event series',
    d: 'A generative poster editor with Swiss-grid, Bauhaus, halftone, wave and gradient-orb systems. Edit the copy, colours and type, drag the headline, and export print-ready 1080×1440 PNGs.',
    try: ['Pick a template on the left', 'Drag the headline on the poster', 'Remix and export a PNG'],
    stack: ['Canvas 2D', 'Generative design', 'Grid systems', 'Typography'], size: 'wide' },
  { id: 'palette', t: 'Hue Lab', cat: 'design', sub: 'Colour palette generator with WCAG checks', c1: '#fafafa', y: 2023, client: 'Design tool',
    d: 'Generate harmonious palettes (analogous, complementary, triadic, mono), lock favourites, check accessibility contrast, preview them on a live UI, and export CSS variables.',
    try: ['Press Space to generate', 'Lock a colour and regenerate', 'Save a palette and export CSS'],
    stack: ['HSL colour maths', 'WCAG 2.1 contrast', 'JavaScript', 'Clipboard API'], size: 'narrow' },
  { id: 'reelcut', t: 'ReelCut', cat: 'video', sub: 'Browser-based video editor', c1: '#0e0f13', vid: 'travel-market-walk', y: 2025, client: 'Creator tool',
    d: 'A multi-clip video editor that runs entirely in the browser: a media library, timeline with drag-to-reorder, cross-fades, colour looks, text overlays, your own video imports and real .webm export.',
    try: ['Press Play to watch the reel', 'Drag clips to reorder, change a clip\'s look', 'Import your own video, then Export .webm'],
    stack: ['Canvas rendering', 'MediaRecorder API', 'Motion design', 'Timeline UX'], size: 'wide' },
  { id: 'gradebox', t: 'GradeBox', cat: 'video', sub: 'Colour grading for photo & video', c1: '#111', vid: 'city-night-traffic', y: 2024, client: 'Post-production',
    d: 'Real pixel-level colour grading: exposure, contrast, temperature, tint, shadows, highlights, vignette and grain, plus cinematic presets, a split before/after view and a live histogram.',
    try: ['Try the Teal & Orange preset', 'Drag the before/after divider', 'Import your own photo or video'],
    stack: ['ImageData processing', 'Colour science', 'Canvas', 'JavaScript'], size: 'narrow' },
  { id: 'captionly', t: 'Captionly', cat: 'video', sub: 'Subtitle editor with SRT/VTT export', c1: '#111', vid: 'character-street-reporter', y: 2024, client: 'Media agency',
    d: 'A subtitle workflow tool: add captions at the playhead, drag caption edges on the timeline, style the overlay and export .srt or .vtt files ready for YouTube and Premiere.',
    try: ['Play and press Enter to add a caption', 'Drag caption blocks on the timeline', 'Export an .srt file'],
    stack: ['HTML5 video', 'SRT / VTT formats', 'Timeline editing', 'JavaScript'], size: 'wide' },
  { id: 'neuralplay', t: 'NeuralPlay', cat: 'ai', sub: 'Neural network trained live in your browser', c1: '#0b0d12', y: 2025, client: 'Education',
    d: 'A from-scratch neural network with real backpropagation. Pick a dataset, shape the layers, tune the learning rate and watch the decision boundary learn in real time.',
    try: ['Pick the spiral dataset and press Play', 'Add hidden layers and neurons', 'Click to add your own data points'],
    stack: ['Neural networks', 'Backpropagation', 'Canvas', 'SVG'], size: 'wide' },
  { id: 'sentiment', t: 'Sentiment Lens', cat: 'ai', sub: 'NLP text & review analyser', c1: '#fafaf7', y: 2024, client: 'E-commerce analytics',
    d: 'Natural-language analysis that scores sentiment per sentence, highlights the words driving it, detects emotions, extracts keywords and readability, and batch-analyses customer reviews.',
    try: ['Load the "angry tweet" sample', 'Type your own text and watch it update', 'Paste reviews into Batch mode'],
    stack: ['NLP', 'Lexicon scoring', 'Negation handling', 'Data viz'], size: 'narrow' },
  { id: 'khaja', t: 'Khaja Order', cat: 'app', sub: 'Mobile food ordering & delivery app', c1: '#0f0a07', y: 2025, client: 'F&B startup, Kathmandu',
    d: 'A mobile-first food ordering app for local restaurants: browse menus, build a cart, track your order live and re-order favourites in one tap. Built for Nepal\'s fast-growing food delivery market.',
    try: ['Browse the menu and add items to your cart', 'Swipe through order status and tracking', 'Tap a category to filter by cuisine'],
    stack: ['React Native', 'Firebase', 'Real-time DB', 'Mobile UX'], size: 'narrow' },
  { id: 'piano', t: 'Ninja Piano', cat: 'app', sub: 'Interactive browser piano with Web Audio', c1: '#0d0d0d', y: 2024, client: 'Side project',
    d: 'A fully playable piano in the browser: 88 keys, keyboard mapping, sustain and reverb, chord recognition and a visual note-roll recorder. No plugin needed.',
    try: ['Press A–L keys to play the white keys', 'Hold Shift for sustain, record a phrase', 'Try the built-in chord suggestions'],
    stack: ['Web Audio API', 'JavaScript', 'Canvas', 'Music theory'], size: 'narrow' },
  { id: 'dating', t: 'Part-Time Dating', cat: 'app', sub: 'Swipe-to-match dating app for iOS & Android', c1: '#2a1238', y: 2026, client: 'Startup, Kathmandu',
    d: 'A dating app made for Nepal with a light "liquid glass" design: a swipe deck you can drag, instant matches with people who already like you, chat with typing indicators, nearby and interest search, and a profile with live stats. Built with React Native and Expo.',
    try: ['Drag a card right to like or left to pass', 'Like Anu, Anita or Rinu for an instant match', 'Open Chats and send a message'],
    stack: ['React Native', 'Expo Router', 'TypeScript', 'Supabase'] },
  { id: 'realestate', t: 'Ghar Real Estate', cat: 'app', sub: 'Buy, rent & bid on property from your phone', c1: '#0a1f18', y: 2026, client: 'Property agency, Lalitpur',
    d: 'An installable property app (PWA) for iPhone and Android. Buyers search by Buy / Rent, type and distance, save homes and bid on HOT listings with a live countdown. Sellers post listings with photos. An assistant called Ghar Guru answers searches and converts land units.',
    try: ['Filter by Rent or a 5 km radius', 'Open a 🔥 HOT listing and place a bid', 'Ask Ghar Guru "3 bedroom house in Kathmandu"'],
    stack: ['PHP 8', 'SQLite / MySQL', 'PWA', 'OpenStreetMap'] },
  { id: 'travelapp', t: 'Safar Travel App', cat: 'app', sub: 'White-label tour booking app for agencies', c1: '#0b1a3a', y: 2026, client: 'Travel agencies',
    d: 'A mobile-first booking app that travel agencies rebrand as their own. It has tours with galleries, day-by-day itineraries with mapped routes and hotels, private notes for each day, prices that switch between USD and NPR with one tap, and a booking flow with a My trips screen.',
    try: ['Switch prices between USD and NPR', 'Open Incredible Bali and step through the days', 'Book for 3 travellers, then open My trips'],
    stack: ['PHP 8', 'SQLite / MySQL', 'PWA', 'Leaflet maps'] },
  { id: 'restaurants', t: 'Restaurant Websites', cat: 'web', sub: '8 live restaurant sites with online ordering', c1: '#1b0f0a', y: 2026, client: 'Restaurants, UK', url: 'https://cherrytree.techagent247.co.uk', live: 'cherrytree.techagent247.co.uk',
    d: 'Websites for 8 restaurants, including The Cherry Tree, Thè 1971, Cinnamon, Cafe Jeera and Balti Village. Each one connects to the Khaja ordering app, where customers scan a QR code at their table to order. This is the live Cherry Tree site.',
    try: ['Scroll the menu and gallery', 'Tap Order to open the live ordering app', 'Try it on your phone, since it is fully responsive'],
    stack: ['Vite', 'Responsive design', 'QR ordering', 'Hostinger'] },
  { id: 'nova', t: 'Nova Assistant', cat: 'ai', sub: 'AI chatbot that knows my work', c1: '#0b0b14', y: 2025, client: 'Portfolio assistant',
    d: 'A retrieval-based assistant that answers questions about my services, pricing and process using TF-IDF search with cosine similarity, plus built-in maths, time and currency tools.',
    try: ['Ask "How much does a website cost?"', 'Ask "What tools do you use for video?"', 'Try "convert 100 USD to NPR"'],
    stack: ['Information retrieval', 'TF-IDF', 'Conversational UX', 'JavaScript'], size: 'wide' }
];
const SKILLS = [
  { k: 'app', best: true, n: 'App Development', d: 'My best and most requested service. Cross-platform iOS and Android apps from idea to App Store and Play Store launch: food ordering, dating, real estate, travel booking and music apps.',
    bars: [['React Native & Expo', 88], ['Flutter & Dart', 82], ['iOS & Android release', 85]], tools: ['React Native', 'Expo', 'Flutter', 'Firebase', 'Supabase', 'App Store / Play'],
    ic: '<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 18h.01"/>' },
  { k: 'web', n: 'Web Development', d: 'Fast, accessible, SEO-friendly websites and web apps, from landing pages to full dashboards.',
    bars: [['React / Next.js', 92], ['HTML, CSS & JavaScript', 96], ['Node.js & APIs', 84]], tools: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'Firebase', 'WordPress'],
    ic: '<path d="M8 6 2 12l6 6M16 6l6 6-6 6M14 4l-4 16"/>' },
  { k: 'design', n: 'Graphic Design', d: 'Logos, brand identities, social media kits, posters and UI design with a clear visual system.',
    bars: [['Brand identity', 90], ['UI / UX design', 88], ['Print & social', 93]], tools: ['Figma', 'Illustrator', 'Photoshop', 'InDesign', 'Canva', 'Blender'],
    ic: '<path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A5.6 5.6 0 0 0 22 9.8C22 5.5 17.5 2 12 2Z"/><circle cx="7.5" cy="10.5" r="1.2"/><circle cx="11" cy="6.5" r="1.2"/><circle cx="16" cy="7.5" r="1.2"/>' },
  { k: 'video', n: 'Video Editing', d: 'YouTube edits, reels, ads, music videos and motion graphics with cinematic colour grading.',
    bars: [['Editing & storytelling', 95], ['Colour grading', 87], ['Motion graphics', 85]], tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Audition'],
    ic: '<rect x="2" y="5" width="15" height="14" rx="2"/><path d="m17 10 5-3v10l-5-3"/>' },
  { k: 'ai', n: 'AI & Automation', d: 'Chatbots, smart search, content pipelines and ML prototypes that save real hours every week.',
    bars: [['LLM apps & prompting', 90], ['Python & ML basics', 80], ['Workflow automation', 88]], tools: ['OpenAI / Claude APIs', 'Python', 'LangChain', 'n8n', 'Midjourney', 'Runway'],
    ic: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3.5"/>' },
  { k: 'social', c: '#c084fc', n: 'Social Media Management', d: 'Content calendars, reels, captions and community management that grow real followers on Instagram, TikTok, Facebook and YouTube.',
    bars: [['Content planning', 92], ['Reels & short video', 94], ['Community & growth', 88]], tools: ['Meta Business Suite', 'Metricool', 'CapCut', 'Canva', 'TikTok', 'Instagram'],
    ic: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>' },
  { k: 'marketing', c: '#facc15', n: 'Digital Marketing', d: 'Paid ads, funnels and email campaigns that turn clicks into customers, tracked with clear monthly reports.',
    bars: [['Meta & Google Ads', 89], ['Funnels & landing pages', 90], ['Analytics & reporting', 86]], tools: ['Meta Ads', 'Google Ads', 'GA4', 'Mailchimp', 'Tag Manager', 'Hotjar'],
    ic: '<path d="M3 11l18-8v18L3 13z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>' },
  { k: 'seo', c: '#22d3ee', n: 'SEO', d: 'Technical SEO, keyword research, on-page content and local SEO that put your business on page one of Google.',
    bars: [['Technical & on-page SEO', 91], ['Keyword research', 89], ['Local & Google Maps SEO', 93]], tools: ['Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog', 'Yoast', 'PageSpeed'],
    ic: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M8 11h6M11 8v6"/>' }
];
const PROCESS = [
  ['Discover', 'A free 30-minute call to understand your goals, audience and budget. You get a clear written proposal within 48 hours.', 'Day 1–2'],
  ['Design', 'Moodboards, wireframes and polished designs. We iterate together in Figma until it feels exactly right.', 'Week 1'],
  ['Build', 'I develop, edit or train it with weekly progress links, so you always see real work, not promises.', 'Week 2–4'],
  ['Launch & grow', 'Deployment, SEO, analytics and a hand-over session, plus 30 days of free support after launch.', 'Ongoing']
];
const TESTI = [
  ['nin ja rebuilt our café website and online ordering in three weeks. Pickup orders went up 40% in the first month, and the site finally looks like us.', 'Sujata Shrestha', 'Owner, Himalayan Brew House', '#ff5b2e'],
  ['The brand identity and launch video were so consistent it felt like one agency did everything. Turns out it was one very talented person.', 'Rohan Karki', 'Founder, Saathi Rides', '#4f8cff'],
  ['Our support chatbot now answers 70% of customer questions automatically. Setup was smooth and everything was explained clearly.', 'Anjali Gurung', 'Ops lead, Kora Travels', '#38e8b0'],
  ['Fast, reliable and genuinely creative. Our YouTube retention jumped after nin ja took over editing. We have not looked back.', 'Bikash Thapa', 'Creator, 450k subscribers', '#ffb02e']
];
const ROLES = ['Web Developer', 'App Developer', 'Graphic Designer', 'Video Editor', 'AI Builder', 'Social Media Manager', 'Digital Marketer', 'SEO Expert'];
const TOOLS = ['React', 'Next.js', 'Figma', 'After Effects', 'Premiere Pro', 'Illustrator', 'Python', 'DaVinci Resolve', 'Tailwind', 'OpenAI', 'Photoshop', 'Node.js', 'Blender', 'TypeScript', 'Meta Ads', 'Google Ads', 'Search Console', 'Ahrefs'];

/* ---------- render ---------- */
$('#year').textContent = new Date().getFullYear();
$('#marquee').innerHTML = [...TOOLS, ...TOOLS].map(t => `<span>${t}</span>`).join('');

$('#skillsGrid').innerHTML = SKILLS.map((s, i) => `
  <article class="skill${s.best ? ' best-skill' : ''}" style="--c:${s.c || `var(--${s.k})`}">
    <div class="skill-media"><video muted loop playsinline preload="none" poster="media/img/poster-${['city-crosswalk-rush','tech-code-glow','anime-cloud-drift','travel-market-walk','nature-forest-rays','character-music-producer','food-pan-sizzle','travel-beach-stroll'][i]}.jpg"><source src="media/video/${['city-crosswalk-rush','tech-code-glow','anime-cloud-drift','travel-market-walk','nature-forest-rays','character-music-producer','food-pan-sizzle','travel-beach-stroll'][i]}.mp4" type="video/mp4"></video></div>
    <div class="skill-top"><div class="skill-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${s.ic}</svg></div><span class="skill-num">0${i + 1}</span></div>
    ${s.best ? '<span class="best">★ Best service</span>' : ''}<h3>${s.n}</h3><p>${s.d}</p>
    <div class="bars">${s.bars.map(([n, v]) => `<div class="bar-row"><div><span>${n}</span><b>${v}%</b></div><div class="bar-track"><i style="--w:${v}%"></i></div></div>`).join('')}</div>
    <div class="tools">${s.tools.map(t => `<span>${t}</span>`).join('')}</div>
  </article>`).join('');

const counts = { all: PROJECTS.length };
PROJECTS.forEach(p => counts[p.cat] = (counts[p.cat] || 0) + 1);
$('#filters').innerHTML = [['all', 'All'], ['web', 'Web'], ['design', 'Design'], ['video', 'Video'], ['ai', 'AI'], ['app', 'Apps']]
  .map(([k, n], i) => `<button role="tab" data-f="${k}" class="${i ? '' : 'on'}" aria-selected="${!i}">${n}<sup>${counts[k]}</sup></button>`).join('');

$('#workGrid').innerHTML = PROJECTS.map((p, i) => `
  <button class="work-card ${i===PROJECTS.length-1&&PROJECTS.length%2?'full':(Math.floor(i/2)%2?(i%2?'wide':'narrow'):(i%2?'narrow':'wide'))}" data-id="${p.id}" data-cat="${p.cat}" style="--cat:${CAT[p.cat].c};--c1:${p.c1}" aria-label="Open live demo: ${p.t}">
    <div class="wc-media">
      <img src="assets/shots/${p.id}.jpg" alt="${p.t} screenshot" loading="lazy" onerror="this.remove()">
      ${p.vid ? `<video class="wc-vid" muted loop playsinline preload="none" poster="media/img/poster-${p.vid}.jpg"><source src="media/video/${p.vid}.mp4" type="video/mp4"></video><span class="wc-play"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Hover to preview</span>` : ''}
      <span class="wc-badge"><i></i>${CAT[p.cat].n}</span><span class="wc-live">LIVE</span>
    </div>
    <div class="wc-body"><div><h3>${String(i + 1).padStart(2, '0')} · ${p.t}</h3><p>${p.sub}</p><div class="wc-tags">${p.stack.slice(0, 3).map(s => `<span>${s}</span>`).join('')}</div></div><span class="wc-arrow">↗</span></div>
  </button>`).join('');

$('#processList').innerHTML = PROCESS.map(([h, p, t], i) => `<div class="step"><span class="n">0${i + 1}</span><h3>${h}</h3><p>${p}</p><small>${t}</small></div>`).join('');

$('#tTrack').innerHTML = TESTI.map(([q, n, r, c]) => `<div class="t-card"><blockquote>${q}</blockquote><div class="t-who"><span class="t-av" style="background:${c}">${n.split(' ').map(w => w[0]).join('')}</span><div><b>${n}</b><span>${r}</span></div></div></div>`).join('');
$('#tDots').innerHTML = TESTI.map((_, i) => `<i data-i="${i}" class="${i ? '' : 'on'}"></i>`).join('');

/* ---------- loader ---------- */
document.body.classList.add('loading');
let ld = 0;
const ldTimer = setInterval(() => {
  ld = Math.min(100, ld + Math.ceil(Math.random() * 12));
  $('#ldNum').textContent = ld;
  $('#ldBar').style.width = ld + '%';
  if (ld >= 100) { clearInterval(ldTimer); setTimeout(finishLoad, 200); }
}, reduce ? 1 : 45);
function finishLoad() {
  $('#loader').classList.add('done');
  document.body.classList.remove('loading');
  setTimeout(() => $('.hero-title').classList.add('in'), 150);
  setTimeout(() => $('#loader').remove(), 1000);
}

/* ---------- role typing ---------- */
(function typeRoles() {
  const el = $('#role'); let r = 0, i = ROLES[0].length, del = true;
  const tick = () => {
    const word = ROLES[r];
    if (del) { i--; if (i <= 0) { del = false; r = (r + 1) % ROLES.length; } }
    else { i++; if (i >= ROLES[r].length) { del = true; el.textContent = ROLES[r]; return setTimeout(tick, 2000); } }
    el.textContent = (del ? word : ROLES[r]).slice(0, Math.max(i, 0)) || '​';
    setTimeout(tick, del ? 45 : 85);
  };
  setTimeout(tick, 2800);
})();

/* ---------- hero canvas: interactive constellation ---------- */
(function hero() {
  const cv = $('#heroCanvas'), ctx = cv.getContext('2d');
  let w, h, pts = [], mouse = { x: -999, y: -999 }, raf, visible = true;
  const cols = ['255,91,46', '255,46,126', '79,140,255', '56,232,176', '255,176,46'];
  function size() {
    const r = Math.min(devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight; cv.width = w * r; cv.height = h * r; ctx.setTransform(r, 0, 0, r, 0, 0);
    const n = Math.min(110, Math.floor(w * h / 14000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .6, c: cols[Math.random() * cols.length | 0] }));
  }
  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 140) { p.vx += dx / d * .06; p.vy += dy / d * .06; }
      p.vx *= .985; p.vy *= .985;
      p.vx += (Math.random() - .5) * .02; p.vy += (Math.random() - .5) * .02;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) { ctx.strokeStyle = `rgba(${a.c},${(1 - d / 120) * .25})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    for (const p of pts) {
      const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (md < 200) { ctx.strokeStyle = `rgba(${p.c},${(1 - md / 200) * .5})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
      ctx.fillStyle = `rgba(${p.c},.9)`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
    }
    if (visible && !reduce) raf = requestAnimationFrame(frame);
  }
  size(); frame();
  addEventListener('resize', () => { size(); if (reduce) frame(); });
  cv.parentElement.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  cv.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; cancelAnimationFrame(raf); if (visible && !reduce) raf = requestAnimationFrame(frame); }).observe(cv);
})();

/* ---------- split headings into words for staggered reveals ---------- */
$$('.h2').forEach(h => {
  let i = 0;
  const wrap = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
          w.appendChild(inner); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') wrap(n);
    });
  };
  wrap(h);
  h.classList.add('split');
  if (!h.classList.contains('reveal')) h.classList.add('reveal');
});

/* ---------- reveal + counters ---------- */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target;
  const sib = el.parentElement ? [...el.parentElement.children].filter(c => c.matches('.skill,.work-card,.step')) : [];
  const idx = Math.max(0, sib.indexOf(el));
  el.style.transitionDelay = (el.matches('.skill,.work-card,.step') ? (idx % 4) * 90 : 0) + 'ms';
  el.classList.add('in');
  setTimeout(() => el.style.transitionDelay = '', 1200);
  io.unobserve(el);
}), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal,.skill,.work-card,.step').forEach(el => io.observe(el));

const cio = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target, n = +el.dataset.count, t0 = performance.now(), dur = 1600;
  const step = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(step); };
  setTimeout(() => requestAnimationFrame(step), 900);
  cio.unobserve(el);
}));
$$('[data-count]').forEach(el => cio.observe(el));

/* ---------- nav ---------- */
let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY, nav = $('#nav');
  nav.classList.toggle('scrolled', y > 40);
  nav.classList.toggle('hide', y > lastY && y > 400 && !$('#navLinks').classList.contains('open'));
  lastY = y;
  $('#progress').style.width = (y / (document.documentElement.scrollHeight - innerHeight) * 100) + '%';
}, { passive: true });
$('#burger').onclick = () => { const o = $('#navLinks').classList.toggle('open'); $('#burger').setAttribute('aria-expanded', o); };
$$('#navLinks a').forEach(a => a.addEventListener('click', () => { $('#navLinks').classList.remove('open'); $('#burger').setAttribute('aria-expanded', false); }));
const secIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('#navLinks a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
$$('section[id]').forEach(s => secIO.observe(s));

/* ---------- cursor + magnetic + tilt ---------- */
const cur = $('#cursor');
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; });
  (function loop() { cx += (tx - cx) * .2; cy += (ty - cy) * .2; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  document.addEventListener('pointerover', e => {
    const card = e.target.closest('.work-card'), link = e.target.closest('a,button,input,textarea,select');
    cur.classList.toggle('view', !!card); cur.classList.toggle('hover', !card && !!link);
    $('span', cur).textContent = card ? 'Open' : '';
  });
  $$('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
    b.addEventListener('pointerleave', () => b.style.transform = '');
  });
  $$('.skill').forEach(s => {
    s.addEventListener('pointermove', e => { const r = s.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      s.style.setProperty('--mx', x * 100 + '%'); s.style.setProperty('--my', y * 100 + '%');
      s.style.transform = `perspective(900px) rotateX(${(.5 - y) * 4}deg) rotateY(${(x - .5) * 5}deg)`; });
    s.addEventListener('pointerleave', () => s.style.transform = '');
  });
} else cur.remove();

/* ---------- skill media ---------- */
$$('.skill').forEach(c => { const v = $('video', c); c.addEventListener('pointerenter', () => v.play().catch(() => {})); c.addEventListener('pointerleave', () => v.pause()); });

/* ---------- hover video previews ---------- */
$$('.work-card').forEach(c => {
  const v = $('.wc-vid', c); if (!v) return;
  c.addEventListener('pointerenter', () => { c.classList.add('playing'); v.play().catch(() => {}); });
  c.addEventListener('pointerleave', () => { c.classList.remove('playing'); v.pause(); });
});

/* ---------- showreel ---------- */
(function reel() {
  const wrap = $('#reel'); if (!wrap) return;
  const clips = ['nature-coast-aerial', 'travel-market-walk', 'food-coffee-pour', 'city-night-traffic', 'nature-forest-rays', 'food-pan-sizzle', 'tech-code-glow'];
  const labels = ['Travel film · Pokhara coast', 'Documentary · Street market', 'Café promo · Himalayan Brew', 'Music video · City nights', 'Brand film · Into the woods', 'Restaurant ad · Kitchen fire', 'Product teaser · Dev tools'];
  const vids = $$('video', wrap); let i = 0, a = 0;
  const load = (v, k) => { v.poster = `media/img/poster-${clips[k]}.jpg`; v.src = `media/video/${clips[k]}.mp4`; };
  load(vids[0], 0); load(vids[1], 1);
  const setLabel = () => { $('#reelLabel').textContent = labels[i]; $('#reelIdx').textContent = String(i + 1).padStart(2, '0') + ' / ' + String(clips.length).padStart(2, '0'); $('#reelBar').style.animation = 'none'; void $('#reelBar').offsetWidth; $('#reelBar').style.animation = ''; };
  const next = () => {
    const cur = vids[a], nx = vids[1 - a];
    i = (i + 1) % clips.length; try { nx.currentTime = 0; } catch (_) {} nx.play().catch(() => {});
    nx.classList.add('on'); cur.classList.remove('on'); setLabel();
    a = 1 - a; setTimeout(() => { cur.pause(); load(cur, (i + 1) % clips.length); }, 1200);
  };
  setLabel();
  let timer;
  new IntersectionObserver(([en]) => {
    clearInterval(timer);
    if (en.isIntersecting) { vids[a].play().catch(() => {}); timer = setInterval(next, 4200); } else vids.forEach(v => v.pause());
  }, { threshold: .25 }).observe(wrap);
  const frame = $('.reel-frame', wrap);
  if (!reduce) addEventListener('scroll', () => {
    const r = wrap.getBoundingClientRect(), p = Math.min(1, Math.max(0, 1 - r.top / innerHeight));
    frame.style.transform = `scale(${.86 + p * .14})`;
  }, { passive: true });
})();

/* ---------- about media parallax ---------- */
$$('[data-par]').forEach(el => { if (reduce) return; addEventListener('scroll', () => { const r = el.getBoundingClientRect(); el.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * -+el.dataset.par}px) rotate(${el.dataset.rot || 0}deg)`; }, { passive: true }); });

/* ---------- work filter ---------- */
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $$('#filters button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
  const f = b.dataset.f;
  $$('.work-card').forEach(c => {
    const show = f === 'all' || c.dataset.cat === f;
    if (show && c.classList.contains('hidden')) { c.classList.remove('hidden', 'in'); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('in'))); }
    else if (!show) c.classList.add('hidden');
  });
  sizeCards();
});
function sizeCards() {
  const vis = $$('.work-card:not(.hidden)');
  vis.forEach((c, i) => {
    c.classList.remove('wide', 'narrow', 'full');
    c.classList.add(i === vis.length - 1 && vis.length % 2 ? 'full' : (Math.floor(i / 2) % 2 ? (i % 2 ? 'wide' : 'narrow') : (i % 2 ? 'narrow' : 'wide')));
  });
}

/* ---------- modal ---------- */
const modal = $('#modal'), frame = $('#mFrame');
let lastFocus;
function openProject(id) {
  const p = PROJECTS.find(x => x.id === id); if (!p) return;
  lastFocus = document.activeElement;
  const url = p.url || `demos/${p.id}/index.html`;
  $('#mUrl').textContent = p.live || `ninja.com.np/work/${p.id}`;
  $('#mOpen').href = url;
  $('#mCat').textContent = CAT[p.cat].n; $('#mCat').style.color = CAT[p.cat].c;
  $('#mTitle').textContent = p.t;
  $('#mDesc').textContent = p.d;
  $('#mTry').innerHTML = p.try.map(t => `<li>${t}</li>`).join('');
  $('#mStack').innerHTML = p.stack.map(s => `<span>${s}</span>`).join('');
  $('#mMeta').innerHTML = `<div><span>Client</span>${p.client}</div><div><span>Year</span>${p.y}</div><div><span>Role</span>Design &amp; build</div><div><span>Status</span>${p.url ? 'Live site' : 'Live demo'}</div>`;
  $('#frameLoad').classList.remove('off');
  frame.onload = () => $('#frameLoad').classList.add('off');
  frame.src = url;
  modal.hidden = false; document.body.style.overflow = 'hidden';
  history.replaceState(null, '', '#work/' + p.id);
  setTimeout(() => $('.mbtn.x').focus(), 50);
}
function closeModal() {
  if (modal.hidden) return;
  modal.hidden = true; frame.src = 'about:blank'; document.body.style.overflow = '';
  history.replaceState(null, '', '#work');
  lastFocus && lastFocus.focus();
}
$('#workGrid').addEventListener('click', e => { const c = e.target.closest('.work-card'); if (c) openProject(c.dataset.id); });
modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab' && !modal.hidden) {
    const f = $$('a[href],button,iframe', modal).filter(x => x.offsetParent !== null), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
const deep = location.hash.match(/^#work\/([\w-]+)/);
if (deep) setTimeout(() => openProject(deep[1]), 1400);

/* ---------- testimonials ---------- */
let ti = 0, tTimer;
function goT(i) { ti = (i + TESTI.length) % TESTI.length; $('#tTrack').style.transform = `translateX(-${ti * 100}%)`; $$('#tDots i').forEach((d, k) => d.classList.toggle('on', k === ti)); clearInterval(tTimer); tTimer = setInterval(() => goT(ti + 1), 6500); }
$('#tPrev').onclick = () => goT(ti - 1); $('#tNext').onclick = () => goT(ti + 1);
$('#tDots').onclick = e => { if (e.target.dataset.i) goT(+e.target.dataset.i); };
goT(0);

/* ---------- contact form ---------- */
const form = $('#contactForm'), need = new Set(['Website']);
$$('#needChips button').forEach(b => { b.classList.toggle('on', need.has(b.dataset.v)); b.onclick = () => { need.has(b.dataset.v) ? need.delete(b.dataset.v) : need.add(b.dataset.v); b.classList.toggle('on'); }; });
const rules = {
  name: v => v.trim().length >= 2 || 'Please add your name so I know who to reply to.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'That email looks incomplete. Could you check it?',
  msg: v => v.trim().length >= 10 || 'A sentence or two about the project helps me reply properly.'
};
function check(input) {
  const r = rules[input.name]; if (!r) return true;
  const res = r(input.value), f = input.closest('.field');
  f.classList.toggle('err', res !== true); $('small', f).textContent = res === true ? '' : res;
  return res === true;
}
$$('input,textarea', form).forEach(i => { i.addEventListener('blur', () => check(i)); i.addEventListener('input', () => i.closest('.field').classList.contains('err') && check(i)); });
form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = $$('input,textarea', form).map(check).every(Boolean);
  if (!ok) { $('.field.err input,.field.err textarea', form)?.focus(); return; }
  const data = Object.fromEntries(new FormData(form)); data.need = [...need]; data.at = new Date().toISOString();
  try { const l = JSON.parse(localStorage.getItem('nj-messages') || '[]'); l.push(data); localStorage.setItem('nj-messages', JSON.stringify(l)); } catch (_) {}
  const btn = $('#sendBtn'); btn.disabled = true; btn.innerHTML = 'Sending…';
  setTimeout(() => {
    const body = encodeURIComponent(`Hi nin ja,\n\n${data.msg}\n\nNeed: ${data.need.join(', ')}\nBudget: ${data.budget}\n\n${data.name} (${data.email})`);
    $('#formOk').hidden = false;
    $('#formOk').innerHTML = `Thanks ${data.name.split(' ')[0].replace(/</g, '')}! Your message is ready. <a href="mailto:hello@ninja.com.np?subject=${encodeURIComponent('New project: ' + data.need.join(', '))}&body=${body}" style="text-decoration:underline">Click here to send it from your email app</a> and I'll reply within 24 hours.`;
    btn.innerHTML = 'Message ready ✓';
  }, 700);
});
})();
