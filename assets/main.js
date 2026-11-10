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
  { id: 'techagent247', t: 'Tech Agent 247', cat: 'web', sub: 'My UK digital agency: websites, apps, hosting, SEO & marketing', c1: '#0b120a', y: 2026, client: 'My agency, UK', ext: 'https://www.techagent247.co.uk', live: 'techagent247.co.uk',
    d: 'My own UK digital agency. Tech Agent 247 gives small businesses one team for websites, apps, UK hosting, SEO, marketing, design and social media, all on one simple monthly plan, plus AI chat assistants.',
    try: ['Opens techagent247.co.uk in a new tab'], stack: ['Agency site', 'UK hosting', 'AI chat assistants'] },
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
  { id: 'khaja', t: 'Khaja Order', cat: 'app', sub: 'QR table ordering app, live in 8 restaurants', c1: '#1c0b0e', y: 2026, client: '8 restaurants, UK', url: 'https://app.techagent247.co.uk/?r=cherry-tree', live: 'app.techagent247.co.uk',
    d: 'My restaurant ordering app, running live for 8 restaurants including The Cherry Tree, Cinnamon, Cafe Jeera and Balti Village. Customers scan the QR code on their table and browse a photo menu with Veg, Mild and Spicy filters and offers. They build a custom thali plate, ask a menu assistant, order and track it live, then play mini-games or listen to the restaurant\'s music while they wait. Owners get an admin dashboard for orders, tables and QR codes, menus and music.',
    try: ['Type any table number (e.g. 5) and tap Continue to menu', 'Filter by Veg or Spicy and add dishes to your order', 'Open Games and play while you wait'],
    stack: ['Node.js', 'SQLite', 'QR codes', 'Claude menu assistant'] },
  { id: 'piano', t: 'Piano Learners (Ninja Piano)', cat: 'app', sub: 'Learn piano with real sheet music, on Android, iOS & web', c1: '#120d2e', y: 2026, client: 'My own app', url: 'https://320ninja.github.io/ninja-piano/', live: '320ninja.github.io/ninja-piano',
    d: 'My own piano-learning app. It shows real sheet music (treble and bass clef) with the note name under every note, plus a playable keyboard, play-along and guided practice. It has 1,148 songs in 11 categories, practice scores with stars and streaks, USB/Bluetooth MIDI keyboard support, 16 themes and offline use. It is wrapped with Capacitor for Android and iOS.',
    try: ['Tap Explore Songs and pick a Kids or Classical song', 'Press play and watch the notes light up on the sheet and keys', 'Open Practice and play the glowing next note'],
    stack: ['JavaScript (ES modules)', 'VexFlow sheet music', 'Web Audio & Web MIDI', 'Capacitor (Android/iOS)'] },
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
    ic: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M8 11h6M11 8v6"/>' },
  { k: 'brand', c: '#f472b6', n: 'Brand & Business Branding', d: 'Complete brand identities for businesses: name, logo, colours, typography, brand guidelines, packaging and launch kits that make you look established from day one.',
    bars: [['Logo & identity systems', 94], ['Brand strategy & naming', 88], ['Guidelines & launch kits', 91]], tools: ['Illustrator', 'Figma', 'Photoshop', 'InDesign', 'Brand books', 'Mockups'],
    ic: '<path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z"/>' },
  { k: 'saas', c: '#818cf8', n: 'SaaS Development', d: 'Subscription software built end to end: dashboards, user accounts, payments, admin panels and APIs that scale from first customer to thousands.',
    bars: [['Full-stack SaaS builds', 90], ['Auth, billing & subscriptions', 87], ['Admin dashboards & APIs', 91]], tools: ['Next.js', 'Supabase', 'Stripe', 'PostgreSQL', 'Vercel', 'Node.js'],
    ic: '<path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18z"/><path d="M12 12v5M9.5 14.5 12 12l2.5 2.5"/>' },
  { k: 'growth', c: '#34d399', n: 'Business Growth', d: 'One growth plan that ties your brand, website, apps, ads, social media and SEO together, with clear targets and monthly reports so you see what brings in customers.',
    bars: [['Growth strategy & planning', 90], ['Conversion optimisation', 88], ['Reporting & KPIs', 92]], tools: ['GA4', 'Looker Studio', 'HubSpot', 'Hotjar', 'Meta Ads', 'Search Console'],
    ic: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>' }
];
const PROCESS = [
  ['Discover', 'A free 30-minute call to understand your goals, audience and budget. You get a clear written proposal within 48 hours.', 'Day 1–2'],
  ['Design', 'Moodboards, wireframes and polished designs. We iterate together in Figma until it feels exactly right.', 'Week 1'],
  ['Build', 'I develop, edit or train it with weekly progress links, so you always see real work, not promises.', 'Week 2–4'],
  ['Launch & grow', 'Deployment, SEO, analytics and a hand-over session, plus 30 days of free support after launch.', 'Ongoing']
];
const TESTI = [
  ['nin ja rebuilt our café website and online ordering in three weeks. Pickup orders went up 40% in the first month, and the site finally looks like us.', 'Sujata Shrestha', 'Owner, Himalayan Brew House', '#ff5b2e', 48],
  ['The brand identity and launch video were so consistent it felt like one agency did everything. Turns out it was one very talented person.', 'Rohan Karki', 'Founder, Saathi Rides', '#4f8cff', 52],
  ['Our support chatbot now answers 70% of customer questions automatically. Setup was smooth and everything was explained clearly.', 'Anjali Gurung', 'Ops lead, Kora Travels', '#38e8b0', 45],
  ['Fast, reliable and genuinely creative. Our YouTube retention jumped after nin ja took over editing. We have not looked back.', 'Bikash Thapa', 'Creator, 450k subscribers', '#ffb02e', 57]
];
const ROLES = ['App Developer', 'Web Developer', 'SaaS Builder', 'Brand Designer', 'Video Editor', 'AI Builder', 'Social Media Manager', 'Digital Marketer', 'SEO Expert', 'Growth Partner'];
const TOOLS = ['React', 'Next.js', 'Figma', 'After Effects', 'Premiere Pro', 'Illustrator', 'Python', 'DaVinci Resolve', 'Tailwind', 'OpenAI', 'Photoshop', 'Node.js', 'Blender', 'TypeScript', 'Meta Ads', 'Google Ads', 'Search Console', 'Ahrefs', 'Stripe', 'Supabase', 'HubSpot'];

/* ---------- render ---------- */
$('#year').textContent = new Date().getFullYear();
$('#marquee').innerHTML = [...TOOLS, ...TOOLS].map(t => `<span>${t}</span>`).join('');

$('#skillsGrid').innerHTML = SKILLS.map((s, i) => `
  <article class="skill${s.best ? ' best-skill' : ''}" style="--c:${s.c || `var(--${s.k})`}">
    <div class="skill-media"><video muted loop playsinline preload="none" poster="media/img/poster-${['city-crosswalk-rush','tech-code-glow','anime-cloud-drift','travel-market-walk','nature-forest-rays','character-music-producer','food-pan-sizzle','travel-beach-stroll','character-street-reporter','tech-code-glow','city-night-traffic'][i]}.jpg"><source src="media/video/${['city-crosswalk-rush','tech-code-glow','anime-cloud-drift','travel-market-walk','nature-forest-rays','character-music-producer','food-pan-sizzle','travel-beach-stroll','character-street-reporter','tech-code-glow','city-night-traffic'][i]}.mp4" type="video/mp4"></video></div>
    <div class="skill-top"><div class="skill-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${s.ic}</svg></div><span class="skill-num">${String(i + 1).padStart(2, '0')}</span></div>
    ${s.best ? '<span class="best">★ Best service</span>' : ''}<h3>${s.n}</h3><p>${s.d}</p>
    <div class="bars">${s.bars.map(([n, v]) => `<div class="bar-row"><div><span>${n}</span><b>${v}%</b></div><div class="bar-track"><i style="--w:${v}%"></i></div></div>`).join('')}</div>
    <div class="tools">${s.tools.map(t => `<span>${t}</span>`).join('')}</div>
  </article>`).join('');

const counts = { all: PROJECTS.length };
PROJECTS.forEach(p => counts[p.cat] = (counts[p.cat] || 0) + 1);
$('#filters').innerHTML = [['all', 'All'], ['web', 'Web'], ['design', 'Design'], ['video', 'Video'], ['ai', 'AI'], ['app', 'Apps']]
  .map(([k, n], i) => `<button role="tab" data-f="${k}" class="${i ? '' : 'on'}" aria-selected="${!i}">${n}<sup>${counts[k]}</sup></button>`).join('');

$('#workGrid').innerHTML = PROJECTS.map((p, i) => `
  <button class="work-card ${i===PROJECTS.length-1&&PROJECTS.length%2?'full':(Math.floor(i/2)%2?(i%2?'wide':'narrow'):(i%2?'narrow':'wide'))}" data-id="${p.id}" data-cat="${p.cat}" style="--cat:${CAT[p.cat].c};--c1:${p.c1}" aria-label="${p.ext ? 'Visit website' : 'Open live demo'}: ${p.t}">
    <div class="wc-media">
      <img src="assets/shots/${p.id}.jpg" alt="${p.t} screenshot" loading="lazy" onerror="this.remove()">
      ${p.vid ? `<video class="wc-vid" muted loop playsinline preload="none" poster="media/img/poster-${p.vid}.jpg"><source src="media/video/${p.vid}.mp4" type="video/mp4"></video><span class="wc-play"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Hover to preview</span>` : ''}
      <span class="wc-badge"><i></i>${CAT[p.cat].n}</span><span class="wc-live">LIVE</span>
    </div>
    <div class="wc-body"><div><h3>${String(i + 1).padStart(2, '0')} · ${p.t}</h3><p>${p.sub}</p><div class="wc-tags">${p.stack.slice(0, 3).map(s => `<span>${s}</span>`).join('')}</div></div><span class="wc-arrow">↗</span></div>
  </button>`).join('');

$('#processList').innerHTML = PROCESS.map(([h, p, t], i) => `<div class="step"><span class="n">0${i + 1}</span><h3>${h}</h3><p>${p}</p><small>${t}</small></div>`).join('');

$('#tTrack').innerHTML = TESTI.map(([q, n, r, c, av]) => `<div class="t-card"><blockquote>${q}</blockquote><div class="t-who"><span class="t-av" style="background:${c}"><img src="https://i.pravatar.cc/150?img=${av}" alt="${n}" loading="lazy"></span><div><b>${n}</b><span>${r}</span></div></div></div>`).join('');
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
  const ws = h.querySelectorAll('.w>span'); ws.forEach((s, k) => s.style.setProperty('--t', ws.length > 1 ? (k / (ws.length - 1)).toFixed(3) : 0));
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
  $$('.skill,.work-card,.step,.form,.float-card').forEach(s => {
    const k = s.matches('.work-card') ? 6 : s.matches('.form') ? 3 : 7;
    s.addEventListener('pointermove', e => { if (!s.classList.contains('in') && !s.matches('.form,.float-card')) return; const r = s.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      s.style.setProperty('--mx', x * 100 + '%'); s.style.setProperty('--my', y * 100 + '%');
      s.style.transition = 'transform .15s ease-out,border-color .3s,box-shadow .3s';
      s.style.transform = `perspective(1000px) translateY(-8px) rotateX(${(.5 - y) * k}deg) rotateY(${(x - .5) * k * 1.2}deg) scale(1.015)`; });
    s.addEventListener('pointerleave', () => { s.style.transition = 'transform .7s cubic-bezier(.2,.8,.2,1),border-color .3s,box-shadow .3s'; s.style.transform = ''; setTimeout(() => { s.style.transition = ''; }, 750); });
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
  if (p.ext) { window.open(p.ext, '_blank', 'noopener'); return; }
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

/* ---------- full motion: scroll colour, spotlight, ripples, parallax ---------- */
if (!reduce) {
  const root = document.documentElement;
  const PAL = { top: ['#ff5b2e', '#ff2e7e'], about: ['#ff2e7e', '#a855f7'], skills: ['#f97316', '#ff2e7e'], work: ['#4f8cff', '#38e8b0'],
    process: ['#ffb02e', '#ff5b2e'], contact: ['#38e8b0', '#4f8cff'] };
  const tIO = new IntersectionObserver(es => es.forEach(e => {
    e.target.classList.toggle('lit', e.isIntersecting);
    if (!e.isIntersecting) return;
    const p = PAL[e.target.id] || (e.target.classList.contains('testimonials') ? ['#a855f7', '#ff2e7e'] : null);
    if (p) { root.style.setProperty('--acc', p[0]); root.style.setProperty('--acc2', p[1]); }
  }), { rootMargin: '-40% 0px -50% 0px' });
  $$('header.hero,section.section').forEach(s => tIO.observe(s));

  /* pointer spotlight + cursor colour */
  document.addEventListener('pointermove', e => {
    const card = e.target.closest('.skill,.work-card,.step,.t-card,.form,.clink');
    if (card) { const r = card.getBoundingClientRect(); card.style.setProperty('--mx', (e.clientX - r.left) + 'px'); card.style.setProperty('--my', (e.clientY - r.top) + 'px'); }
    if (card && card.matches('.work-card')) { const r = card.getBoundingClientRect(); card.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5).toFixed(3)); card.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5).toFixed(3)); }
    const c = e.target.closest('.work-card,.skill');
    cur.style.setProperty('--cc', c ? getComputedStyle(c).getPropertyValue(c.matches('.skill') ? '--c' : '--cat') : '');
    const sec = e.target.closest('.section'); if (sec) sec.style.setProperty('--sx', (e.clientX / innerWidth * 100) + '%');
  }, { passive: true });
  addEventListener('pointerdown', () => cur.classList.add('down'));
  addEventListener('pointerup', () => cur.classList.remove('down'));

  /* click ripple on buttons, chips, filters and cards */
  document.addEventListener('click', e => {
    const t = e.target.closest('.btn,.filters button,.chips button,.work-card,.mbtn,.tools span');
    if (!t) return;
    const r = t.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2, s = document.createElement('span');
    if (getComputedStyle(t).position === 'static') t.style.position = 'relative';
    t.style.overflow = 'hidden';
    s.className = 'rip'; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px`;
    t.appendChild(s); setTimeout(() => s.remove(), 750);
  });

  /* scroll: heading parallax + marquee skew from scroll speed */
  const heads = $$('.section-head .h2,.about-copy .h2,.contact .h2');
  const boxes = $$('.skill,.work-card,.step,.float-card,.t-wrap,.form');
  $$('.work-card .wc-media').forEach((m, i) => {
    m.insertAdjacentHTML('beforeend', '<span class="wc-curtain" aria-hidden="true"></span><span class="wc-shine" aria-hidden="true"></span><span class="wc-glow" aria-hidden="true"></span><span class="wc-sparks" aria-hidden="true">' + '<i></i>'.repeat(8) + '</span>');
    m.style.setProperty('--d', (i % 6) * .9 + 's');
    m.querySelectorAll('.wc-sparks i').forEach((s, k) => { s.style.left = (8 + Math.random() * 84) + '%'; s.style.animationDelay = (k * .35 + Math.random() * .6).toFixed(2) + 's'; s.style.animationDuration = (2.4 + Math.random() * 1.8).toFixed(2) + 's'; });
  });
  /* animated glowing edge on every box */
  $$('.skill,.work-card,.step,.form,.float-card,.clink,.about-tags span,.hero-meta>div,.t-wrap,.filters').forEach(b => { const e = document.createElement('i'); e.className = 'edge'; e.setAttribute('aria-hidden', 'true'); b.appendChild(e); if (getComputedStyle(b).position === 'static') b.style.position = 'relative'; });
  let lastS = scrollY, skew = 0, ticking = false;
  const onScroll = () => {
    const y = scrollY, v = y - lastS; lastS = y;
    skew += (Math.max(-12, Math.min(12, v * .25)) - skew) * .3;
    $('.marquee').style.setProperty('--skew', skew.toFixed(2) + 'deg');
    boxes.forEach(b => { const r = b.getBoundingClientRect(); if (r.bottom < -100 || r.top > innerHeight + 100) return; const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; b.style.setProperty('--sy', (p * -26).toFixed(1) + 'px'); });
    heads.forEach(h => { const r = h.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; h.style.translate = `0 ${((r.top + r.height / 2 - innerHeight / 2) * -.06).toFixed(1)}px`; });
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  setInterval(() => { if (Math.abs(skew) > .05) { skew *= .8; $('.marquee').style.setProperty('--skew', skew.toFixed(2) + 'deg'); } }, 60);
}

/* ---------- hero portrait: page-in, scroll and pointer motion ---------- */
(function portrait() {
  const pt = $('#portrait'); if (!pt) return;
  const tilt = $('.pt-tilt', pt);
  const show = () => pt.classList.add('in');
  if (reduce) show(); else { const t = setInterval(() => { if (!$('#loader') || $('#loader').classList.contains('done')) { clearInterval(t); setTimeout(show, 350); } }, 100); }
  /* fit the portrait into the free space right of the text so it never overlaps */
  const fit = () => {
    if (innerWidth <= 1000) { pt.style.width = pt.style.right = pt.style.top = ''; pt.classList.remove('pt-compact'); return; }
    const inner = pt.parentElement, ir = inner.getBoundingClientRect();
    let textRight = ir.left;
    [...inner.children].forEach(el => { if (el === pt) return; const r = el.getBoundingClientRect(); textRight = Math.max(textRight, r.right); });
    $$('.hero-title .line>*', inner).forEach(el => { textRight = Math.max(textRight, el.getBoundingClientRect().right); });
    const edge = innerWidth - 24;                                    /* stay on screen */
    const gapL = textRight + 40, gap = edge - gapL;                  /* free space next to the text */
    /* measure the real footprint (ring, orbit text, badges) with the tilt/intro transforms switched off */
    const tilt = $('.pt-tilt', pt), saved = [tilt.style.transform, tilt.style.scale, tilt.style.transition];
    tilt.style.transition = 'none'; tilt.style.transform = 'none'; tilt.style.scale = '1';
    const foot = () => { const pr = pt.getBoundingClientRect(); let l = pr.left, r = pr.right;
      $$('.pt-orbit,.pt-badge,.pt-ring', pt).forEach(e => { if (getComputedStyle(e).display === 'none') return; const b = e.getBoundingClientRect(); l = Math.min(l, b.left); r = Math.max(r, b.right); });
      return { l: l - pr.left, w: r - l, s: pr.width }; };
    let size = 205;
    pt.classList.remove('pt-compact');
    for (let k = 0; k < 3; k++) { pt.style.width = size + 'px'; const f = foot(); if (f.w <= gap) break; size = Math.max(120, size * gap / f.w); }
    if (foot().w > gap) { pt.classList.add('pt-compact'); for (let k = 0; k < 3; k++) { pt.style.width = size + 'px'; const f = foot(); if (f.w <= gap) break; size = Math.max(110, size * gap / f.w); } }
    const f = foot();
    const left = gapL + Math.max(0, (gap - f.w) / 2) - f.l;          /* centre the footprint in the free space */
    pt.style.right = (ir.right - (left + f.s)) + 'px';
    /* line it up with the headline + intro on the left (centre of that block) */
    const h1 = $('.hero-title', inner), sub = $('.hero-sub', inner) || h1;
    const top = h1.getBoundingClientRect().top, bottom = sub.getBoundingClientRect().bottom;
    pt.style.top = ((top + bottom) / 2 - ir.top) + 'px';
    [tilt.style.transform, tilt.style.scale, tilt.style.transition] = saved;
  };
  fit(); addEventListener('resize', fit); addEventListener('load', fit); document.fonts && document.fonts.ready.then(fit);
  if (reduce) return;
  let mx = 0, my = 0, sy = 0;
  const apply = () => { tilt.style.transform = `perspective(900px) rotateY(${mx * 12}deg) rotateX(${-my * 12}deg) translateY(${sy * -0.18}px) rotate(${sy * 0.02}deg)`; pt.style.opacity = Math.max(0, 1 - sy / (innerHeight * .9)); };
  $('.hero').addEventListener('pointermove', e => { const r = pt.getBoundingClientRect(); mx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2))); my = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2))); apply(); });
  $('.hero').addEventListener('pointerleave', () => { mx = my = 0; apply(); });
  addEventListener('scroll', () => { sy = Math.min(scrollY, innerHeight * 1.2); requestAnimationFrame(apply); }, { passive: true });
})();

/* ---------- starfield + shooting stars behind the whole page ---------- */
(function starfield() {
  const cv = document.createElement('canvas');
  cv.id = 'stars'; cv.setAttribute('aria-hidden', 'true');
  document.body.prepend(cv);
  const ctx = cv.getContext('2d');
  let w, h, dpr, stars = [], shots = [], last = 0, nextShot = 800, py = 0;
  const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--acc').trim() || '#ff5b2e';
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(260, Math.floor(w * h / 6000));
    stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + .2, a: Math.random() * .6 + .2, tw: Math.random() * 2 + .5, ph: Math.random() * 6.3, z: Math.random() * .6 + .2 }));
  }
  function shoot() {
    const fromLeft = Math.random() < .5, ang = (fromLeft ? 1 : -1) * (Math.PI / 5 + Math.random() * .35);
    shots.push({ x: fromLeft ? Math.random() * w * .6 : w * .4 + Math.random() * w * .6, y: Math.random() * h * .45 - 40,
      vx: Math.sin(Math.abs(ang)) * (fromLeft ? 1 : -1), vy: Math.cos(Math.abs(ang)) * .55, sp: 9 + Math.random() * 7, len: 140 + Math.random() * 160, life: 1, c: Math.random() < .5 ? '#ffffff' : accent() });
  }
  function frame(t) {
    const dt = Math.min(50, t - last); last = t;
    ctx.clearRect(0, 0, w, h);
    const sy = scrollY;
    for (const s of stars) {
      const y = ((s.y - sy * s.z * .15) % h + h) % h;
      const a = reduce ? s.a : s.a * (.55 + .45 * Math.sin(t / 1000 * s.tw + s.ph));
      ctx.globalAlpha = a; ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, 6.283); ctx.fill();
    }
    if (!reduce) {
      nextShot -= dt;
      if (nextShot <= 0) { shoot(); if (Math.random() < .25) setTimeout(shoot, 250); nextShot = 1600 + Math.random() * 2600; }
      for (const s of shots) {
        s.x += s.vx * s.sp * dt / 16; s.y += s.vy * s.sp * dt / 16; s.life -= dt / 1400;
        const tx = s.x - s.vx * s.len, ty = s.y - s.vy * s.len;
        const g = ctx.createLinearGradient(s.x, s.y, tx, ty);
        g.addColorStop(0, s.c); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.shadowColor = s.c; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.arc(s.x, s.y, 1.8, 0, 6.283); ctx.fill(); ctx.shadowBlur = 0;
      }
      shots = shots.filter(s => s.life > 0 && s.x > -400 && s.x < w + 400 && s.y < h + 400);
    }
    ctx.globalAlpha = 1;
    if (!reduce && !document.hidden) requestAnimationFrame(frame);
  }
  size(); requestAnimationFrame(frame);
  addEventListener('resize', size);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !reduce) { last = performance.now(); requestAnimationFrame(frame); } });
  if (reduce) addEventListener('scroll', () => requestAnimationFrame(frame), { passive: true });
})();
})();
