/* ---------- data ---------- */
  const COLLECTION = [
    ["Classic","#171717"],["White","#ece9e2"],["Gold","url(#gold)"],["Chrome","url(#chrome)"],
    ["Carbon","#2a2c30"],["Neon","url(#neon)"],["Pearl","url(#pearl)"],["Red","#c92a2a"],
    ["Ice","#bfe2f0"],["Sand","#cdb589"],["Jungle","#4a6b3a"],["Galaxy","url(#galaxy)"]
  ];
  const UNIVERSES = [
    ["Racing","linear-gradient(160deg,#3a0d0d,#a01818 60%,#160606)"],
    ["Dakar","linear-gradient(160deg,#3a2a10,#b58a3a 60%,#1a1308)"],
    ["Ocean","linear-gradient(160deg,#0a2238,#1a6fa0 60%,#04141f)"],
    ["Space","linear-gradient(160deg,#161330,#3a2f6e 60%,#0a0814)"],
    ["Art","linear-gradient(160deg,#3a1030,#c41fa0 60%,#160814)"],
    ["Street","linear-gradient(160deg,#101a3a,#3a4fc4 60%,#0a0e1f)"]
  ];
  const LIFESTYLE = [
    ["Figurines","20 / 80 / 120 cm","M9 21V8a3 3 0 016 0v13M7 21h10"],
    ["Sculptures","Éditions d'art","M12 3l8 6-8 12L4 9z"],
    ["Véhicules","& miniatures","M3 13l2-5h14l2 5v5H3zM6 18a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"],
    ["Casques","Design & sport","M4 14a8 8 0 1116 0v3H4zM4 14h16"],
    ["Lampe","Design & light","M9 18h6M10 22h4M12 2a7 7 0 015 12c-1 1-1 2-1 3H8c0-1 0-2-1-3a7 7 0 015-12z"],
    ["Maroquinerie","& accessoires","M5 9h14v11H5zM8 9V7a4 4 0 018 0v2"],
    ["Objets & déco","Premium","M3 9l9-6 9 6v11H3zM9 20v-7h6v7"],
    ["Bijoux","& collaborations","M6 3h12l3 6-9 12L3 9z"],
    ["Éditions limitées","& artistes","M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z"],
    ["Expériences","& pop up","M3 21V8l9-5 9 5v13M3 21h18M9 21v-6h6v6"]
  ];
  const VALUES = [
    ["Universel","M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"],
    ["Intemporel","M12 3a9 9 0 100 18 9 9 0 000-18zM12 8v5l3 2"],
    ["Neutre","M12 3a9 9 0 100 18 9 9 0 000-18zM8 14h8"],
    ["Émotion","M12 21s-7-4.5-9.5-9C.8 8.6 2.5 5 6 5c2 0 3 1.2 4 2.5C11 6.2 12 5 14 5c3.5 0 5.2 3.6 3.5 7-2.5 4.5-9.5 9-9.5 9z"],
    ["Énergie","M13 2L4 14h6l-1 8 9-12h-6l1-8z"],
    ["Créativité","M9 18h6M10 22h4M12 2a7 7 0 015 12c-1 1-1 2-1 3H8c0-1 0-2-1-3a7 7 0 015-12z"],
    ["Sport","M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c-3 4-3 14 0 18M12 3c3 4 3 14 0 18"],
    ["Luxury","M6 3h12l3 6-9 12L3 9z"],
    ["Art","M12 3l8 6-8 12L4 9z"],
    ["Musique","M9 18V5l10-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm10-2a3 3 0 11-6 0 3 3 0 016 0z"],
    ["Voyage","M2 16l20-7-9 13-2-5z"]
  ];

  /* ---------- render collection ---------- */
  var __collectionGrid = document.getElementById('collectionGrid'); if (__collectionGrid) __collectionGrid.innerHTML = COLLECTION.map(([n,c]) => `
    <div class="col-item" style="--c:${c.startsWith('url')?'var(--gold)':c}">
      <svg class="c-svg" viewBox="0 0 220 330"><use href="#core" ${c.startsWith('url')?`fill="${c}"`:`style="color:${c}"`}/></svg>
      <h4>Core ${n}</h4>
    </div>`).join('');

  /* ---------- render universes ---------- */
  var __universesGrid = document.getElementById('universesGrid'); if (__universesGrid) __universesGrid.innerHTML = UNIVERSES.map(([n,g]) => `
    <div class="uni" style="--u-grad:${g}">
      <div class="u-fig"><svg viewBox="0 0 220 330"><use href="#core" style="color:#141414"/></svg></div>
      <h4>Core ${n}</h4>
    </div>`).join('');

  /* ---------- render lifestyle ---------- */
  var __lifestyleGrid = document.getElementById('lifestyleGrid'); if (__lifestyleGrid) __lifestyleGrid.innerHTML = LIFESTYLE.map(([t,s,d]) => `
    <div class="life-card reveal">
      <svg class="l-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="${d}"/></svg>
      <h4>${t}<br><span style="color:var(--muted);font-weight:400">${s}</span></h4>
    </div>`).join('');

  /* ---------- render values strip ---------- */
  var __valuesStrip = document.getElementById('valuesStrip'); if (__valuesStrip) __valuesStrip.innerHTML = VALUES.map(([t,d]) => `
    <div class="vstrip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${d}"/></svg><span>${t}</span></div>`).join('');

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
    msg.textContent = '✦ Bienvenue dans l\'univers THE CORE : ' + document.getElementById('newsEmail').value;
    form.reset();
  });


/* ===== Modeles 3D : revele le .glb quand il se charge, garde le SVG sinon ===== */
document.querySelectorAll('model-viewer.mv3d').forEach(function (mv) {
  mv.addEventListener('load', function () {
    mv.parentElement.classList.add('model-ready');
  });
});


/* ---------- univers cliquables ---------- */
document.querySelectorAll('.uni-grid .uni').forEach(el => {
  const h = el.querySelector('h4'); if (!h) return;
  const id = h.textContent.replace(/^Core\s+/i, '').trim().toLowerCase();
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => location.href = 'univers-' + id + '.html');
});
