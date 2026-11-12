/* Globe journey: a direct vanilla three.js port of the Nepal Yatra globe (components/globe-journey.tsx),
   followed by an iris that opens onto the portrait. Everything is scrubbed by scroll, so it plays backwards too. */
const section = document.getElementById('globe');
const host = document.getElementById('gjCanvas');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (section && host && !reduce) {
  const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
  const phone = matchMedia('(max-width: 860px)').matches;
  const R = 1;
  const KATHMANDU = { lat: 27.72, lon: 85.36 };

  /** lat/lon in degrees to a point on the sphere, matching three's equirectangular sphere UVs. */
  const toVec = (lat, lon, r = R) => {
    const phi = ((90 - lat) * Math.PI) / 180, theta = ((lon + 180) * Math.PI) / 180;
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  };
  const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.25, ...extra });

  /* ---------- landmarks, built from simple solids and stood upright on the surface ---------- */
  function eiffel() {
    const g = new THREE.Group(), bronze = mat('#8a6a45', { metalness: 0.6 });
    const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.022, 0.05, 4, 1, true), bronze); legs.position.y = 0.025;
    const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.0015, 0.006, 0.05, 4), bronze); mid.position.y = 0.075;
    const deck = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.003, 0.02), bronze); deck.position.y = 0.022;
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.003), mat('#ffd27a', { emissive: '#ffb347', emissiveIntensity: 2 })); tip.position.y = 0.1;
    g.add(legs, mid, deck, tip); return g;
  }
  function stupa() {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.034, 0.008, 24), mat('#f4f1ea')); base.position.y = 0.004;
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.024, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat('#ffffff', { roughness: 0.7 })); dome.position.y = 0.008;
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.01, 0.012), mat('#e8b64c', { metalness: 0.8 })); box.position.y = 0.036;
    const spire = new THREE.Mesh(new THREE.ConeGeometry(0.007, 0.035, 12), mat('#f2b705', { metalness: 0.9, roughness: 0.2, emissive: '#7a4a00', emissiveIntensity: 0.6 })); spire.position.y = 0.058;
    g.add(base, dome, box, spire); return g;
  }
  function burj() {
    const g = new THREE.Group(), glass = mat('#cfd8e6', { metalness: 0.9, roughness: 0.15 });
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.0012, 0.01, 0.12, 6), glass); t.position.y = 0.06;
    g.add(t); return g;
  }
  function pyramid() {
    const g = new THREE.Group(), sand = mat('#d9b36c', { roughness: 0.9, metalness: 0 });
    [[0, 0, 0.035], [0.035, 0.02, 0.022], [-0.03, 0.025, 0.018]].forEach(([x, z, s]) => {
      const p = new THREE.Mesh(new THREE.ConeGeometry(s, s * 1.3, 4), sand); p.position.set(x, (s * 1.3) / 2, z); p.rotation.y = Math.PI / 4; g.add(p);
    });
    return g;
  }
  function tokyoTower() {
    const g = new THREE.Group();
    const a = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.016, 0.05, 4), mat('#e2412d')); a.position.y = 0.025;
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.001, 0.003, 0.04, 4), mat('#ffffff')); b.position.y = 0.07;
    g.add(a, b); return g;
  }
  function liberty() {
    const g = new THREE.Group(), copper = mat('#6fb3a0', { roughness: 0.6 });
    const ped = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.02, 0.014), mat('#b9a98a')); ped.position.y = 0.01;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.006, 0.035, 8), copper); body.position.y = 0.038;
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.0012, 0.0012, 0.018, 6), copper); arm.position.set(0.004, 0.058, 0); arm.rotation.z = -0.3;
    const torch = new THREE.Mesh(new THREE.SphereGeometry(0.003), mat('#ffcc55', { emissive: '#ffaa00', emissiveIntensity: 3 })); torch.position.set(0.007, 0.068, 0);
    g.add(ped, body, arm, torch); return g;
  }
  function bigBen() {
    const g = new THREE.Group(), stone = mat('#c9a86a', { roughness: 0.8 });
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.06, 0.01), stone); t.position.y = 0.03;
    const face = new THREE.Mesh(new THREE.BoxGeometry(0.0115, 0.008, 0.0115), mat('#fff7da', { emissive: '#ffe9a8', emissiveIntensity: 1 })); face.position.y = 0.05;
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.008, 0.02, 4), mat('#2f3b4c')); roof.position.y = 0.07; roof.rotation.y = Math.PI / 4;
    g.add(t, face, roof); return g;
  }
  function opera() {
    const g = new THREE.Group(), white = mat('#fbfbf8', { roughness: 0.3 });
    [0, 0.012, 0.024].forEach((z, i) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.014 - i * 0.002, 16, 8, 0, Math.PI, 0, Math.PI / 2), white);
      s.position.set(0, 0, z - 0.012); s.rotation.x = -0.5; g.add(s);
    });
    return g;
  }
  function marinaBay() {
    const g = new THREE.Group(), glass = mat('#9fb6cc', { metalness: 0.8, roughness: 0.2 });
    [-0.012, 0, 0.012].forEach(x => { const t = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.045, 0.008), glass); t.position.set(x, 0.0225, 0); g.add(t); });
    const deck = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.004, 0.01), mat('#e7eef6')); deck.position.y = 0.047;
    g.add(deck); return g;
  }

  const LANDMARKS = [
    { name: 'Kathmandu', lat: 27.72, lon: 85.36, make: stupa, scale: 1.4 },
    { name: 'Paris', lat: 48.86, lon: 2.29, make: eiffel, scale: 1.2 },
    { name: 'London', lat: 51.5, lon: -0.12, make: bigBen, scale: 1 },
    { name: 'Dubai', lat: 25.2, lon: 55.27, make: burj, scale: 1.1 },
    { name: 'Cairo', lat: 29.98, lon: 31.13, make: pyramid, scale: 1.1 },
    { name: 'Tokyo', lat: 35.66, lon: 139.75, make: tokyoTower, scale: 1.2 },
    { name: 'New York', lat: 40.69, lon: -74.04, make: liberty, scale: 1.2 },
    { name: 'Sydney', lat: -33.86, lon: 151.21, make: opera, scale: 1.4 },
    { name: 'Singapore', lat: 1.28, lon: 103.86, make: marinaBay, scale: 1.2 },
  ];

  /** A cluster of little houses with warm windows, scattered around a city. */
  function houses(seed) {
    const g = new THREE.Group();
    const wall = mat('#e9e2d4', { roughness: 0.9, metalness: 0 }), roof = mat('#b3412e', { roughness: 0.8, metalness: 0 });
    const lit = mat('#ffd27a', { emissive: '#ffb347', emissiveIntensity: 1.6 });
    for (let i = 0; i < 16; i++) {
      const a = Math.sin(seed * 91.7 + i * 12.9898) * 43758.5453, b = Math.sin(seed * 37.1 + i * 78.233) * 12543.1;
      const fx = (a - Math.floor(a) - 0.5) * 0.11, fz = (b - Math.floor(b) - 0.5) * 0.11;
      if (Math.hypot(fx, fz) < 0.03) continue;
      const h = 0.006 + (i % 4) * 0.003;
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.008, h, 0.008), i % 3 ? wall : lit); body.position.set(fx, h / 2, fz);
      const top = new THREE.Mesh(new THREE.ConeGeometry(0.0065, 0.005, 4), roof); top.position.set(fx, h + 0.0025, fz); top.rotation.y = Math.PI / 4;
      g.add(body, top);
    }
    return g;
  }

  /** Text that always faces the camera. */
  function label(text, { height = 0.075, accent = false } = {}) {
    const c = document.createElement('canvas'), ctx = c.getContext('2d');
    const font = '600 56px Inter, system-ui, sans-serif';
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(text).width + 64);
    c.width = w; c.height = 112;
    ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = accent ? 'rgba(208,16,32,0.9)' : 'rgba(11,20,38,0.8)'; ctx.beginPath(); ctx.roundRect(0, 16, w, 80, 40); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.fillText(text, w / 2, 58);
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false, depthTest: false, transparent: true }));
    s.scale.set((height * w) / 112, height, 1); return s;
  }

  /** The red plane: fuselage, swept wings, tailplane and fin. Its nose points along -z. */
  function plane() {
    const g = new THREE.Group(), red = mat('#d01020', { metalness: 0.4, roughness: 0.35 }), white = mat('#a50c19', { metalness: 0.4, roughness: 0.35 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.012, 0.07, 6, 12), red); body.rotation.x = Math.PI / 2;
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.003, 0.026), white); wing.position.z = 0.002;
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.003, 0.014), white); tail.position.z = 0.04;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.024, 0.016), red); fin.position.set(0, 0.013, 0.042);
    g.add(body, wing, tail, fin); return g;
  }

  /* ---------- Nepal close-up and the routes to client cities ---------- */
  const NEPAL_SITES = [
    { name: 'Mount Everest · 8,849 m', lat: 27.988, lon: 86.925, peak: true, side: [0.2, -0.9] },
    { name: 'Nepal', lat: 28.0, lon: 84.0, side: [0.5, 1.4], height: 0.04, noPin: true },
  ];
  const DESTINATIONS = [
    { name: 'London', lat: 51.507, lon: -0.128 },
    { name: 'New York', lat: 40.713, lon: -74.006 },
    { name: 'Sydney', lat: -33.869, lon: 151.209 },
    { name: 'Dubai', lat: 25.205, lon: 55.271 },
    { name: 'Tokyo', lat: 35.676, lon: 139.65 },
    { name: 'Singapore', lat: 1.352, lon: 103.82 },
    { name: 'Kuala Lumpur', lat: 3.139, lon: 101.687 },
    { name: 'Bangkok', lat: 13.756, lon: 100.502 },
    { name: 'Delhi', lat: 28.614, lon: 77.209 },
    { name: 'Paris', lat: 48.857, lon: 2.352 },
  ];

  /** Great-circle distance in km. */
  const kmBetween = (a, b) => {
    const r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
    return Math.round(6371 * 2 * Math.asin(Math.sqrt(h)) / 10) * 10;
  };
  /** Earth rotation (y) and tilt (x) that bring a lat/lon to face the camera. */
  const facing = (lat, lon) => { const v = toVec(lat, lon); return { y: Math.atan2(-v.x, v.z), x: (lat * Math.PI) / 180 }; };

  /** A grey moon with a scatter of soft craters painted onto a canvas. */
  function moon() {
    const c = document.createElement('canvas'), ctx = c.getContext('2d');
    c.width = 512; c.height = 256;
    ctx.fillStyle = '#a9a9a4'; ctx.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * 512, y = Math.random() * 256, r = Math.random() ** 2 * 22 + 2;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(70,70,70,${0.25 + Math.random() * 0.3})`); g.addColorStop(0.8, 'rgba(120,120,120,0.1)'); g.addColorStop(1, 'rgba(220,220,215,0.25)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
    }
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.SphereGeometry(0.26, 48, 48), new THREE.MeshStandardMaterial({ map: tex, bumpMap: tex, bumpScale: 3, roughness: 1 }));
  }
  /** Soft radial glow sprite, additive. */
  function glow(colour, size) {
    const c = document.createElement('canvas'), ctx = c.getContext('2d');
    c.width = c.height = 256;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, colour); g.addColorStop(0.25, colour.replace(/[\d.]+\)$/, '0.35)')); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    s.scale.setScalar(size); return s;
  }
  /** A distant sun: a hot core inside two layers of glow. */
  function sunBody() {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), new THREE.MeshBasicMaterial({ color: '#fff3c4' })));
    g.add(glow('rgba(255,210,120,1)', 6), glow('rgba(255,150,60,0.6)', 14));
    return g;
  }

  /* ---------- scene ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100); camera.position.set(0, 0, 4.2);
  const sun = new THREE.DirectionalLight('#fff8ec', 3.2); sun.position.set(-3, 1.5, 3);
  const sunDisc = sunBody(); sunDisc.position.set(-36, 20, -75); scene.add(sunDisc);
  scene.add(sun, new THREE.AmbientLight('#cfdcff', 0.9));

  // starfield, twinkling by size
  const STARS = phone ? 1500 : 3000, starPos = new Float32Array(STARS * 3);
  for (let i = 0; i < starPos.length; i += 3) { const v = new THREE.Vector3().randomDirection().multiplyScalar(20 + Math.random() * 20); starPos.set([v.x, v.y, v.z], i); }
  const starMat = new THREE.PointsMaterial({ color: '#dfe7ff', size: 0.07, sizeAttenuation: true, transparent: true });
  const stars = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(starPos, 3)), starMat);
  scene.add(stars);
  const DRIFT = phone ? 250 : 500, driftPos = new Float32Array(DRIFT * 3);
  for (let i = 0; i < DRIFT; i++) driftPos.set([(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, -30 + Math.random() * 28], i * 3);
  const driftGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(driftPos, 3));
  scene.add(new THREE.Points(driftGeo, new THREE.PointsMaterial({ color: '#ffffff', size: 0.045, transparent: true, opacity: 0.8 })));

  // a small moon hanging off to one side
  const luna = moon(); luna.position.set(30, 18, -80); luna.scale.setScalar(2.2); scene.add(luna);

  // shooting stars: bright head, tail fading to nothing
  const meteors = Array.from({ length: 7 }, () => {
    const geo = new THREE.BufferGeometry()
      .setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3))
      .setAttribute('color', new THREE.BufferAttribute(new Float32Array([1, 1, 1, 0, 0, 0]), 3));
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending }));
    scene.add(line);
    return { line, geo, life: -Math.random() * 6, head: new THREE.Vector3(), dir: new THREE.Vector3() };
  });

  const load = new THREE.TextureLoader();
  const aniso = Math.min(phone ? 8 : 16, renderer.capabilities.getMaxAnisotropy());
  const tex = (src, srgb = false) => { const t = load.load('media/globe/' + src); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = aniso; return t; };

  const SEG = phone ? 64 : 128;
  const world = new THREE.Group(); scene.add(world);
  const earth = new THREE.Group(); world.add(earth);
  earth.add(new THREE.Mesh(new THREE.SphereGeometry(R, SEG, SEG), new THREE.MeshPhongMaterial({
    map: tex('earth-day.jpg', true), bumpMap: tex('earth-bump.jpg'), bumpScale: 6,
    specularMap: tex('earth-water.jpg'), specular: new THREE.Color('#3a5f99'), shininess: 25,
    emissiveMap: tex('earth-night.jpg', true), emissive: new THREE.Color('#ffc46b'), emissiveIntensity: 0.2,
  })));
  const cloudMat = new THREE.MeshPhongMaterial({ map: tex('clouds.png', true), transparent: true, opacity: 0.28, depthWrite: false });
  const clouds = new THREE.Mesh(new THREE.SphereGeometry(R * 1.012, SEG / 2, SEG / 2), cloudMat);
  earth.add(clouds);

  world.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.14, SEG / 2, SEG / 2), new THREE.ShaderMaterial({
    side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    vertexShader: 'varying vec3 n; void main(){ n = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
    fragmentShader: 'varying vec3 n; void main(){ float i = pow(0.72 - dot(n, vec3(0,0,1.)), 3.); gl_FragColor = vec4(0.35,0.6,1.,1.) * i; }',
  })));

  const up = new THREE.Vector3(0, 1, 0);
  const standOn = (lat, lon, lift = 1.003) => {
    const normal = toVec(lat, lon).normalize(), g = new THREE.Group();
    g.position.copy(normal.clone().multiplyScalar(R * lift)); g.quaternion.setFromUnitVectors(up, normal); return g;
  };

  // world landmarks: shown while the globe is small
  const landmarkLayer = new THREE.Group(); earth.add(landmarkLayer);
  const labels = [];
  LANDMARKS.forEach((l, i) => {
    const site = standOn(l.lat, l.lon);
    const m = l.make(); m.scale.setScalar(l.scale * 1.9); site.add(m, houses(i + 1));
    const tag = label(l.name); tag.position.y = 0.25; site.add(tag); labels.push(tag);
    landmarkLayer.add(site);
  });

  // Nepal sites: tiny pins with labels, shown only in the close-up
  const nepalLayer = new THREE.Group(); earth.add(nepalLayer);
  const nepalLabels = [], pulses = [];
  NEPAL_SITES.forEach((n, i) => {
    const site = standOn(n.lat, n.lon, 1.001);
    if (n.peak) {
      const peak = new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.014, 5), mat('#ffffff', { roughness: 0.6, emissive: '#cfe0ff', emissiveIntensity: 0.4 }));
      peak.position.y = 0.007; site.add(peak);
    }
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.0016, 12, 12), new THREE.MeshBasicMaterial({ color: '#ff2a3a' })); pin.visible = !n.noPin;
    pin.position.y = n.peak ? 0.016 : 0.0016;
    const pulse = new THREE.Mesh(new THREE.RingGeometry(0.002, 0.0028, 32), new THREE.MeshBasicMaterial({ color: '#ff2a3a', transparent: true, side: THREE.DoubleSide }));
    pulse.visible = !n.noPin; pulse.rotation.x = -Math.PI / 2; pulse.position.y = 0.0004; pulse.userData.offset = i * 0.4;
    const tag = label(n.name, { height: n.height || 0.03, accent: !!n.peak });
    tag.position.y = n.peak ? 0.016 : 0.002; tag.center.set(n.side[0], n.side[1]);
    site.add(pin, pulse, tag); nepalLabels.push(tag); pulses.push(pulse);
    nepalLayer.add(site);
  });

  // routes to client cities, each with a distance tag and a little plane flying it
  const kathmandu = toVec(KATHMANDU.lat, KATHMANDU.lon, R * 1.004);
  const routeLayer = new THREE.Group(); earth.add(routeLayer);
  const routeLabels = [];
  const routes = DESTINATIONS.map((d, i) => {
    const to = toVec(d.lat, d.lon, R * 1.004);
    const apex = kathmandu.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(R * (1.08 + kathmandu.distanceTo(to) * 0.16));
    const curve = new THREE.QuadraticBezierCurve3(kathmandu, apex, to);
    const geo = new THREE.TubeGeometry(curve, 80, 0.0032, 6);
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: '#ff2a3a', transparent: true, opacity: 0.9 }));
    const tag = label(`${d.name} · ${kmBetween(KATHMANDU, d).toLocaleString('en')} km`, { height: 0.065 });
    tag.position.copy(to.clone().multiplyScalar(1.06)); routeLabels.push(tag);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.009, 12, 12), new THREE.MeshBasicMaterial({ color: '#ffc46b' })); dot.position.copy(to);
    const jet = plane(); jet.scale.setScalar(0.45);
    routeLayer.add(mesh, tag, dot, jet);
    return { geo, mesh, curve, jet, offset: i * 0.13 };
  });

  // the red plane circling the whole globe
  const orbit = new THREE.Group(); orbit.rotation.set(0.45, 0, 0.25); world.add(orbit);
  const jet = plane(); jet.position.set(R * 1.32, 0, 0); jet.scale.setScalar(1.6); jet.rotation.set(0, 0, -0.35); orbit.add(jet);
  const TRAIL = 90, trailPos = new Float32Array(TRAIL * 3), trailCol = new Float32Array(TRAIL * 3);
  const trailGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(trailPos, 3)).setAttribute('color', new THREE.BufferAttribute(trailCol, 3));
  const trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending }));
  scene.add(trail);
  const history = [];

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.position.z = w < 700 ? 5.6 : 4.2; camera.updateProjectionMatrix();
  };
  resize(); addEventListener('resize', resize);

  const NEPAL = facing(28.3, 84.2), ASIA = facing(12, 98);
  const ss = THREE.MathUtils.smoothstep, lerp = THREE.MathUtils.lerp, clamp = THREE.MathUtils.clamp;
  const near = (from, to) => to + Math.PI * 2 * Math.round((from - to) / (Math.PI * 2));
  const tmp = new THREE.Vector3();
  const fade = (sprites, k) => sprites.forEach(s => {
    const front = s.getWorldPosition(tmp).sub(world.position).normalize().z;
    s.material.opacity = k * clamp((front - 0.15) * 3, 0, 1);
  });

  /* ---------- scroll ---------- */
  // q: progress through the whole pinned section. The first 62% plays the Nepal Yatra journey (p 0..0.9),
  // the rest opens the iris onto the portrait.
  const JOURNEY = 0.62;
  const progress = () => { const r = section.getBoundingClientRect(); return clamp(-r.top / (r.height - innerHeight), 0, 1); };
  const set = (k, v) => section.style.setProperty(k, v);
  const backOut = k => { const c = 1.9; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };

  let raf = 0, last = performance.now(), idle = 2.4, visible = false, clock = 0, shown = progress();
  const frame = t => {
    raf = visible ? requestAnimationFrame(frame) : 0;
    const dt = Math.min(0.05, (t - last) / 1000); last = t; clock += dt;
    shown += (progress() - shown) * Math.min(1, dt * 10);     // a little inertia behind the scroll
    const q = shown;
    const p = clamp(q / JOURNEY, 0, 1) * 0.9;                 // Nepal Yatra's own timeline, stopped before its exit
    const home = ss(q, 0.58, 0.68);                            // after the routes, turn back and dive into Nepal
    const open = ss(q, 0.68, 0.8);                             // the globe swells and dissolves into the iris

    /*
     * Scroll choreography (p, from the original)
     *   0.00-0.12  spiral in       0.12-0.34  fast spin with the world landmarks
     *   0.34-0.48  turn and dive to Nepal      0.48-0.62  hold on the Nepal sites
     *   0.62-0.72  pull back over Asia         0.72-0.90  routes with distances
     */
    const enter = ss(p, 0, 0.12);
    const focus = ss(p, 0.34, 0.48);
    const dive = ss(p, 0.34, 0.48) - ss(p, 0.62, 0.72);
    const toAsia = ss(p, 0.62, 0.72);
    const routesOn = ss(p, 0.68, 0.76) * (1 - ss(q, 0.55, 0.6));

    idle += dt * 0.08 * (1 - focus);
    const spin = idle + p * Math.PI * 5;
    const back = toAsia * (1 - home);
    const target = { y: lerp(NEPAL.y, ASIA.y, back), x: lerp(NEPAL.x, ASIA.x, back) };
    earth.rotation.y = lerp(spin, near(spin, target.y), focus);
    world.rotation.x = lerp(0.25 + (1 - enter) * 0.5, target.x, focus);
    world.rotation.z = (1 - enter) * -1.4;

    const zoom = 1 + dive * 0.7 + back * 0.25 * (1 - dive) + home * 0.9;
    world.scale.setScalar(lerp(0.35, 1, enter) * zoom * (1 + open * 1.6));
    world.position.set(0, (1 - enter) * -0.8, -(zoom - 1) * 0.9);
    world.position.y += dive * 0.25;
    // keep Kathmandu dead centre while we zoom in on it for the reveal
    if (home > 0) { world.updateMatrixWorld(true); const k = kathmandu.clone().applyMatrix4(earth.matrixWorld); world.position.x -= k.x * home; world.position.y -= k.y * home; }
    set('--g-op', (1 - ss(q, 0.74, 0.84) * 0.97).toFixed(3));

    cloudMat.opacity = 0.28 * (1 - dive); clouds.rotation.y += dt * 0.02;
    landmarkLayer.visible = dive < 0.25 && routesOn < 0.5 && home < 0.05;
    fade(labels, (1 - dive * 4) * (1 - routesOn));
    nepalLayer.visible = dive > 0.3 || (home > 0.3 && open < 0.4);
    fade(nepalLabels, Math.max(ss(dive, 0.6, 0.95), home * (1 - ss(q, 0.66, 0.7))));
    pulses.forEach(r => { const k = (clock * 0.8 + r.userData.offset) % 1; r.scale.setScalar(1 + k * 3); r.material.opacity = 1 - k; });
    routeLayer.visible = routesOn > 0.01;
    fade(routeLabels, routesOn);
    routes.forEach(r => {
      const k = ((clock * 0.18 + r.offset) % 1);
      r.geo.setDrawRange(0, Math.floor(ss(routesOn, 0, 1) * r.geo.index.count / 3) * 3);
      r.mesh.material.opacity = 0.85 * routesOn;
      r.curve.getPointAt(k, r.jet.position);
      const n = r.jet.position.clone().normalize(); r.jet.up.copy(n);
      r.jet.lookAt(r.jet.position.clone().sub(r.curve.getTangentAt(k)));
      r.jet.visible = routesOn > 0.6;
    });

    // background: stars drift, the moon turns, a shooting star now and then
    stars.rotation.y = p * 0.8 + clock * 0.004;
    starMat.opacity = 0.75 + Math.sin(clock * 1.7) * 0.2;
    const speed = dt * (0.6 + (1 - focus) * 2.5);
    for (let i = 0; i < DRIFT; i++) { let z = driftPos[i * 3 + 2] + speed; if (z > -2) z = -30; driftPos[i * 3 + 2] = z; }
    driftGeo.attributes.position.needsUpdate = true;
    const squeeze = Math.min(1, camera.aspect / 1.6);
    luna.rotation.y += dt * 0.05; luna.position.x = (30 - p * 2) * squeeze;
    sunDisc.position.x = (-36 + p * 2) * squeeze; sunDisc.position.y = 19;
    meteors.forEach(m => {
      m.life += dt;
      if (m.life > 1.2) {
        m.life = -(1 + Math.random() * 5);
        const a = Math.random() * Math.PI * 2, depth = -6 - Math.random() * 6;
        m.dir.set(Math.cos(a), Math.sin(a), 0);
        m.head.set(-m.dir.x * 6 + (Math.random() - 0.5) * 6, -m.dir.y * 4 + (Math.random() - 0.5) * 4, depth);
      }
      const on = m.life > 0;
      m.line.visible = on;
      if (!on) return;
      const head = m.head.clone().addScaledVector(m.dir, m.life * 9), tail = head.clone().addScaledVector(m.dir, -1.6);
      m.geo.attributes.position.set([head.x, head.y, head.z, tail.x, tail.y, tail.z]); m.geo.attributes.position.needsUpdate = true;
      const k = Math.sin((m.life / 1.2) * Math.PI);
      m.geo.attributes.color.set([k, k, k, 0, 0, 0]); m.geo.attributes.color.needsUpdate = true;
    });

    // the red plane keeps circling, except in the Nepal close-up
    orbit.rotation.y += dt * 0.55;
    orbit.visible = trail.visible = dive < 0.2 && home < 0.2;
    jet.getWorldPosition(tmp); history.unshift(tmp.clone()); if (history.length > TRAIL) history.pop();
    history.forEach((v, i) => { trailPos.set([v.x, v.y, v.z], i * 3); const k = 1 - i / TRAIL; trailCol.set([k, k * 0.1, k * 0.15], i * 3); });
    trailGeo.setDrawRange(0, history.length); trailGeo.attributes.position.needsUpdate = true; trailGeo.attributes.color.needsUpdate = true;

    /* DOM layers: captions, iris, portrait */
    const cap = (n, a, b) => {
      const o = ss(q, a, a + 0.03) * (1 - ss(q, b - 0.03, b));
      set(`--c${n}o`, o.toFixed(3)); set(`--c${n}y`, lerp(40, -40, clamp((q - a) / (b - a), 0, 1)).toFixed(1) + 'px'); set(`--c${n}b`, ((1 - o) * 10).toFixed(1) + 'px');
    };
    cap(2, 0.06, 0.22);   // Clients worldwide, over the landmarks
    cap(1, 0.31, 0.44);   // Based in Nepal, over the close-up
    // the iris and the photo open out of the Kathmandu pin, wherever it is on screen
    world.updateMatrixWorld(true);
    const ks = kathmandu.clone().applyMatrix4(earth.matrixWorld).project(camera);
    const W = host.clientWidth, H = host.clientHeight, kx = (ks.x + 1) / 2 * W, ky = (1 - ks.y) / 2 * H;
    set('--ix', kx.toFixed(1) + 'px'); set('--iy', ky.toFixed(1) + 'px');
    set('--iris', (ss(q, 0.7, 0.86) * 110).toFixed(2) + '%');
    const grow = ss(q, 0.7, 0.88), glide = ss(q, 0.74, 0.9);
    set('--ps', lerp(0.08, 1, grow).toFixed(3)); set('--pb', ((1 - ss(q, 0.7, 0.86)) * 12).toFixed(2) + 'px');
    // start on the pin, then glide to the portrait's resting spot (centre of the frame, a little above middle)
    set('--pdx', ((kx - W / 2) * (1 - glide)).toFixed(1) + 'px'); set('--pdy', ((ky - H * 0.42) * (1 - glide)).toFixed(1) + 'px');
    set('--go', ss(q, 0.8, 0.9).toFixed(3));
    set('--draw', ss(q, 0.78, 0.9).toFixed(3)); set('--oo', ss(q, 0.82, 0.91).toFixed(3));
    [0.84, 0.86, 0.88, 0.9, 0.92, 0.94].forEach((a, i) => set(`--cs${i + 1}`, backOut(clamp((q - a) / 0.05, 0, 1)).toFixed(3)));
    set('--c3o', ss(q, 0.9, 0.96).toFixed(3)); set('--c3y', ((1 - ss(q, 0.9, 0.96)) * 30).toFixed(1) + 'px');

    if (q < 0.88) renderer.render(scene, camera);   // no WebGL work once the portrait owns the screen
  };

  /* only run the render loop while the section is on screen */
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { last = performance.now(); shown = progress(); frame(last); }
  }, { rootMargin: '100px 0px' }).observe(section);
  addEventListener('scroll', () => { if (visible && !raf) { last = performance.now(); frame(last); } }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  });
}
