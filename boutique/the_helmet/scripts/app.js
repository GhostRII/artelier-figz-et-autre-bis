/* ---------- navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---------- burger menu ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );

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
    msg.textContent = '✦ Merci ! Tu fais désormais partie de l\'aventure : ' + email;
    form.reset();
  });


/* ===== Modeles 3D : revele le .glb quand il se charge, garde le SVG sinon ===== */
document.querySelectorAll('model-viewer.mv3d').forEach(function (mv) {
  mv.addEventListener('load', function () {
    mv.parentElement.classList.add('model-ready');
  });
});


/* ---------- univers cliquables ---------- */
const UNIV_LIENS = {'VELOCITY':'velocity','DUNE':'dune','SUMMIT':'summit','WAVE':'wave','ORBIT':'orbit','PULSE':'pulse','STORM':'storm','FLOW':'flow'};
document.querySelectorAll('.worlds-grid .world').forEach(el => {
  const h = el.querySelector('h3'); if (!h) return;
  const id = UNIV_LIENS[h.textContent.trim()]; if (!id) return;
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => location.href = 'univers-' + id + '.html');
});
