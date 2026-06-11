/* ============================================================
   RENDU 3D DU CONFIGURATEUR — The Core
   ------------------------------------------------------------
   Ce fichier applique la configuration choisie DIRECTEMENT sur
   le modele 3D (.glb) grace a l'API "scene-graph" de
   <model-viewer>. Tant que le modele n'est pas la, il ne fait
   rien (l'apercu SVG prend le relais).

   QUAND TU AURAS TON MODELE :
   1) Depose ../models/core.glb — l'apercu 3D apparait tout seul.
   2) Ouvre la console du navigateur (F12) : la liste des
      MATERIAUX du modele s'affiche automatiquement.
   3) Mets dans CIBLES_COULEUR les noms des materiaux a recolorer
      (ex. ['Corps', 'Tete']). Liste vide = TOUT recolorer.
   4) Dans appliquerElement(), recopie l'exemple en y mettant le
      nom du materiau de l'element signature (coeur, yeux, jauge…).
   ============================================================ */

const MV = document.getElementById('cfgModel');

/* Noms des materiaux du corps a recolorer ([] = tous) */
const CIBLES_COULEUR = [];

/* Nom du materiau de l'element signature (coeur/yeux/jauge…) */
const CIBLE_ELEMENT = ''; /* ex. 'Coeur' — laisse vide tant que tu ne le connais pas */

let derniereCouleur = null;
let dernierElement = null;

function hexToRgba(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.substr(0,2),16)/255, parseInt(h.substr(2,2),16)/255, parseInt(h.substr(4,2),16)/255, 1];
}

const Render3D = {
  pret: false,

  appliquerCouleur(hex3d) {
    derniereCouleur = hex3d;
    if (!this.pret || !hex3d || !hex3d.startsWith('#')) return;
    MV.model.materials.forEach(mat => {
      if (CIBLES_COULEUR.length && !CIBLES_COULEUR.includes(mat.name)) return;
      if (CIBLE_ELEMENT && mat.name === CIBLE_ELEMENT) return; /* on ne touche pas a l'element signature */
      mat.pbrMetallicRoughness.setBaseColorFactor(hexToRgba(hex3d));
    });
  },

  appliquerElement(valeur) {
    dernierElement = valeur;
    if (!this.pret || !CIBLE_ELEMENT) return;
    const mat = MV.model.materials.find(m => m.name === CIBLE_ELEMENT);
    if (mat && typeof valeur === 'string' && valeur.startsWith('#')) {
      mat.pbrMetallicRoughness.setBaseColorFactor(hexToRgba(valeur));
    }
    /* Pour d'autres types de modification (intensite lumineuse, texture…),
       vois la doc : https://modelviewer.dev/docs/#scene-graph */
  },
};

if (MV) {
  MV.addEventListener('load', () => {
    Render3D.pret = true;
    console.log('[Render3D] Materiaux du modele :', MV.model.materials.map(m => m.name));
    if (derniereCouleur) Render3D.appliquerCouleur(derniereCouleur);
    if (dernierElement !== null) Render3D.appliquerElement(dernierElement);
  });
}
window.Render3D = Render3D;
