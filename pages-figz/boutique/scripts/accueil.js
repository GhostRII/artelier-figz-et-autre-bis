/* ===== Modeles 3D : revele le .glb quand il se charge, garde le SVG sinon ===== */
document.querySelectorAll('model-viewer.mv3d').forEach(function (mv) {
  mv.addEventListener('load', function () {
    mv.parentElement.classList.add('model-ready');
  });
});
