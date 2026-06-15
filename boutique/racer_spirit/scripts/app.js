/* ---------- data ---------- */
  const FAMILY = [
    ["Racing Red","Iconic",       "#c92a2a"],
    ["Arctic White","Pure",       "#ece9e2"],
    ["Stealth Black","Origin",    "#1a1a1d"],
    ["Rose Pulse","Bold",         "#e8889e"],
    ["Chrome","Mirror",           "url(#chrome)"],
    ["Iridescent","Shifting",     "url(#irid)"]
  ];
  const FINISHES = [
    ["Carbon Fiber","Tech",       "#2a2c30"],
    ["Matte Black","Stealth",     "#161616"],
    ["Glossy Paint","Deep",       "#22232a"],
    ["Chrome","Mirror",           "url(#chrome)"],
    ["Translucent","Crystal",     "#bfe2f0"],
    ["Gold Plated","Luxe",        "url(#rgold)"]
  ];
  const WORLDS = [
    ["Rally Spirit","linear-gradient(160deg,#3a2a10,#a9802f 60%,#1a1308)"],
    ["Drift Spirit","linear-gradient(160deg,#2a103a,#8a2fb0 60%,#140820)"],
    ["Desert Spirit","linear-gradient(160deg,#3a2e14,#cbab64 60%,#1a1408)"],
    ["Ocean Spirit","linear-gradient(160deg,#0a2a3a,#1f8aa0 60%,#04161f)"],
    ["Space Spirit","linear-gradient(160deg,#14132a,#3a3f7e 60%,#0a0814)"]
  ];
  const SCALES = [
    ["8",34],["20",52],["35",72],["50",96],["80",126],["120",160]
  ];
  const LIFESTYLE = [
    ["🚗","Automotive","Dans l'habitacle"],
    ["👜","Fashion","Accessoire de style"],
    ["🏬","Retail","Pièce de vitrine"],
    ["🔦","Collector","Sous cloche"],
    ["🖼️","Art","Installation murale"]
  ];
  const POSS = [
    ["Art Toys","M9 18V5l10-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm10-2a3 3 0 11-6 0 3 3 0 016 0z"],
    ["Fashion","M8 3l4 3 4-3 4 4-3 3v11H7V10L4 7z"],
    ["Accessories","M5 9h14v11H5zM8 9V7a4 4 0 018 0v2"],
    ["Vehicles","M3 13l2-5h14l2 5v5H3zM6 18a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"],
    ["Home Décor","M9 18h6M10 22h4M12 2a7 7 0 015 12c-1 1-1 2-1 3H8c0-1 0-2-1-3a7 7 0 015-12z"],
    ["Art Installation","M3 21V8l9-5 9 5v13M3 21h18M9 21v-6h6v6"]
  ];

  /* ---------- helpers ---------- */
  const figUse = (c) => c.startsWith('url') ? `fill="${c}"` : `style="color:${c}"`;

  var __familyGrid = document.getElementById('familyGrid'); if (__familyGrid) __familyGrid.innerHTML = FAMILY.map(([n,s,c]) => `
    <div class="fig-card" style="--c:${c.startsWith('url')?'var(--gold)':c}">
      <svg class="f-svg" viewBox="0 0 220 340"><use href="#racer" ${figUse(c)}/></svg>
      <h4>${n}<small>${s}</small></h4>
    </div>`).join('');

  var __finishesGrid = document.getElementById('finishesGrid'); if (__finishesGrid) __finishesGrid.innerHTML = FINISHES.map(([n,s,c]) => `
    <div class="fig-card" style="--c:${c.startsWith('url')?'var(--gold)':c}">
      <svg class="f-svg" viewBox="0 0 220 340"><use href="#racer" ${figUse(c)}/></svg>
      <h4>${n}<small>${s}</small></h4>
    </div>`).join('');

  var __worldsGrid = document.getElementById('worldsGrid'); if (__worldsGrid) __worldsGrid.innerHTML = WORLDS.map(([n,g]) => `
    <div class="world" style="--w-grad:${g}">
      <div class="w-fig"><svg viewBox="0 0 220 340"><use href="#racer" style="color:#141310"/></svg></div>
      <h4>${n}</h4>
    </div>`).join('');

  var __scalesRow = document.getElementById('scalesRow'); if (__scalesRow) __scalesRow.innerHTML = SCALES.map(([cm,h]) => `
    <div class="scale-item">
      <svg width="${h*0.64}" height="${h}" viewBox="0 0 220 340"><use href="#racer" style="color:#17150f"/></svg>
      <div class="cm">${cm} cm</div>
    </div>`).join('');

  var __lifestyleGrid = document.getElementById('lifestyleGrid'); if (__lifestyleGrid) __lifestyleGrid.innerHTML = LIFESTYLE.map(([e,t,s]) => `
    <div class="life-card reveal"><div class="l-emoji">${e}</div><h4>${t}</h4><span>${s}</span></div>`).join('');

  var __possStrip = document.getElementById('possStrip'); if (__possStrip) __possStrip.innerHTML = POSS.map(([t,d]) => `
    <div class="poss"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="${d}"/></svg><span>${t}</span></div>`).join('');

  /* ---------- navbar / burger / reveal / newsletter ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));
  const burger = document.getElementById('burger'), navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const form = document.getElementById('newsForm'), msg = document.getElementById('newsMsg');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = '✦ Bienvenue dans l\'esprit RACER SPIRIT : ' + document.getElementById('newsEmail').value;
    form.reset();
  });


/* ===== Modeles 3D : revele le .glb quand il se charge, garde le SVG sinon ===== */
document.querySelectorAll('model-viewer.mv3d').forEach(function (mv) {
  mv.addEventListener('load', function () {
    mv.parentElement.classList.add('model-ready');
  });
});


/* ---------- univers cliquables ---------- */
document.querySelectorAll('.worlds-grid .world').forEach(el => {
  const h = el.querySelector('h4'); if (!h) return;
  const id = h.textContent.trim().split(/\s+/)[0].toLowerCase();
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => location.href = 'univers-' + id + '.html');
});
