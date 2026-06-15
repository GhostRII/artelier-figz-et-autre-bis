/* ---------- data ---------- */
  const VARIANTS = [
    ["Racing","Spark","#ff6a2b"],["CT","Spark","#9aa0aa"],["Carbon","Spark","#2f2f35"],["Ocean","Spark","#2bb6e8"],
    ["Ice","Spark","#bfe6f5"],["Lava","Spark","#e8392b"],["Desert","Spark","#cbb27e"],["Jungle","Spark","#5fae3a"],
    ["Bloom","Spark","#f2a0c5"],["Love","Spark","#ff3b5c"],["Neon","Spark","#9b4dff"],["Space","Spark","#3a3a78"],
    ["Storm","Spark","#6b7480"],["Sunset","Spark","#ff8a3d"],["Arctic","Spark","#9fd6e0"],["Aurora","Spark","#3ad6a0"]
  ];
  const EDITIONS = [
    ["01","All Black","Noir profond et glossy.","url(#allBlack)",""],
    ["02","Chrome","Métal miroir poli.","url(#chrome)",""],
    ["03","Full Gold","Or massif, finition luxe.","url(#gold)",""],
    ["04","Matte White","Blanc mat, pur et net.","#f2f1ee",""],
    ["05","Translucent","Translucide, presque liquide.","#cfeaf5","opacity:.55"],
    ["06","Pearl","Nacre irisée changeante.","url(#pearl)",""]
  ];
  const SIZES = [
    ["10","cm","Pocket",46],["20","cm","Collector",70],["40","cm","Premium",104],
    ["80","cm","Grand",150],["120","cm","Statue",200]
  ];

  /* ---------- render variants ---------- */
  const vg = document.getElementById('variantsGrid');
  if (vg) vg.innerHTML = VARIANTS.map(([n,s,c]) => `
    <div class="variant" style="--c:${c}">
      <svg class="v-svg" viewBox="0 0 200 290"><use class="body" href="#spark-body"/><use href="#spark-eyes"/></svg>
      <h4>${n}<small>${s}</small></h4>
    </div>`).join('');

  /* ---------- render editions ---------- */
  const eg = document.getElementById('editionsGrid');
  if (eg) eg.innerHTML = EDITIONS.map(([num,name,desc,fill,extra]) => `
    <div class="edition">
      <span class="e-num">${num}</span>
      <svg class="e-svg" viewBox="0 0 200 290"><use href="#spark-body" style="fill:${fill};${extra}"/><use href="#spark-eyes"/></svg>
      <div><h4>${name}</h4><p>${desc}</p></div>
    </div>`).join('');

  /* ---------- render sizes ---------- */
  const sr = document.getElementById('sizesRow');
  if (sr) sr.innerHTML = SIZES.map(([cm,u,tier,h]) => `
    <div class="size-item">
      <svg class="s-svg" width="${h*0.7}" height="${h}" viewBox="0 0 200 290"><use href="#spark-body" fill="url(#whiteGloss)"/></svg>
      <div class="s-cm">${cm} ${u}</div>
      <div class="s-tier">${tier}</div>
    </div>`).join('');

  /* ---------- navbar scroll ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));

  /* ---------- burger ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- newsletter ---------- */
  const form = document.getElementById('newsForm');
  const msg = document.getElementById('newsMsg');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsEmail').value;
    msg.textContent = '✦ Merci ! Tu rejoins l\'aventure THE SPARK : ' + email;
    form.reset();
  });


/* ===== Modeles 3D : revele le .glb quand il se charge, garde le SVG sinon ===== */
document.querySelectorAll('model-viewer.mv3d').forEach(function (mv) {
  mv.addEventListener('load', function () {
    mv.parentElement.classList.add('model-ready');
  });
});
