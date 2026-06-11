/* ============================================================
   CONFIGURATEUR — The Helmet
   ------------------------------------------------------------
   AJOUTER UN ACCESSOIRE (quand tu auras les directives) :
   1) Ajoute une ligne dans ACCESSOIRES ci-dessous, ex. :
        { id: 'moto', nom: 'Moto', emoji: '🏍️', prix: 0 },
   2) C'est tout — le menu, le resume et le prix se mettent a
      jour automatiquement.
   (Pour la version 3D des accessoires, on les branchera ensuite
   dans render3d.js.)

   PRIX : mets les vrais montants dans PRIX_BASE et dans les
   champs "prix" de chaque option (couleurs, tailles, accessoires).
   Tant que le total vaut 0, la page affiche "A definir".
   ============================================================ */

const COULEURS = [
  {
    "id": "noir",
    "nom": "Noir d'origine",
    "aperc": "#1e1e22",
    "svg": "#1e1e22",
    "hex3d": "#1e1e22",
    "prix": 0
  },
  {
    "id": "chrome",
    "nom": "Chrome",
    "aperc": "linear-gradient(135deg,#f7f8fa,#969ca6)",
    "svg": "url(#chrome)",
    "hex3d": "#c8cdd4",
    "prix": 0
  },
  {
    "id": "carbone",
    "nom": "Carbone",
    "aperc": "#2a2c30",
    "svg": "#2a2c30",
    "hex3d": "#2a2c30",
    "prix": 0
  },
  {
    "id": "translucide",
    "nom": "Translucide",
    "aperc": "#bfe2f0",
    "svg": "#bfe2f0",
    "hex3d": "#bfe2f0",
    "prix": 0
  },
  {
    "id": "gold",
    "nom": "Gold",
    "aperc": "linear-gradient(135deg,#f4d77a,#b88a2e)",
    "svg": "url(#gold)",
    "hex3d": "#d4a945",
    "prix": 0
  },
  {
    "id": "mat",
    "nom": "Mat",
    "aperc": "#161616",
    "svg": "#161616",
    "hex3d": "#161616",
    "prix": 0
  },
  {
    "id": "glossy",
    "nom": "Glossy",
    "aperc": "radial-gradient(circle at 30% 25%,#555,#222 70%)",
    "svg": "#303038",
    "hex3d": "#303038",
    "prix": 0
  }
];

const ACCESSOIRES = [
  /* { id: 'voiture', nom: 'Supercar', emoji: '🏎️', prix: 0 }, */
];

const ELEMENTS = [
  {
    "id": "dore",
    "nom": "Doré",
    "aperc": "#f0c869",
    "svg": "url(#hHeart)",
    "v3d": "#f0c869",
    "prix": 0
  },
  {
    "id": "rouge",
    "nom": "Rouge",
    "aperc": "#ff4d5a",
    "svg": "#ff4d5a",
    "v3d": "#ff4d5a",
    "prix": 0
  },
  {
    "id": "bleu",
    "nom": "Bleu",
    "aperc": "#4da6ff",
    "svg": "#4da6ff",
    "v3d": "#4da6ff",
    "prix": 0
  },
  {
    "id": "violet",
    "nom": "Violet",
    "aperc": "#b06cff",
    "svg": "#b06cff",
    "v3d": "#b06cff",
    "prix": 0
  },
  {
    "id": "vert",
    "nom": "Vert",
    "aperc": "#4ade80",
    "svg": "#4ade80",
    "v3d": "#4ade80",
    "prix": 0
  }
];

const TAILLES = [
  {
    "id": "20",
    "nom": "20 cm — Collector",
    "prix": 0
  },
  {
    "id": "50",
    "nom": "50 cm — Premium",
    "prix": 0
  },
  {
    "id": "120",
    "nom": "120 cm — Statue",
    "prix": 0
  }
];

const PRIX_BASE = 0; /* A DEFINIR */

/* -------- etat courant de la configuration -------- */
const config = {
  couleur: COULEURS[0],
  accessoire: null,
  element: ELEMENTS[0],
  taille: TAILLES[0],
};

/* -------- construction des menus -------- */
function menu(contId, items, getSel, onPick, enSwatch) {
  const cont = document.getElementById(contId);
  if (!cont || !items.length) return;
  cont.innerHTML = items.map((it, i) => enSwatch
    ? '<button type="button" class="cfg-swatch' + (it === getSel() ? ' sel' : '') + '" style="background:' + it.aperc + '" title="' + it.nom + '" data-i="' + i + '"></button>'
    : '<button type="button" class="cfg-chip' + (it === getSel() ? ' sel' : '') + '" data-i="' + i + '">' + (it.emoji ? it.emoji + ' ' : '') + it.nom + '</button>'
  ).join('');
  cont.querySelectorAll('button').forEach(b =>
    b.addEventListener('click', () => { onPick(items[+b.dataset.i]); appliquer(); })
  );
}

function rendreMenus() {
  menu('optCouleurs', COULEURS, () => config.couleur, v => config.couleur = v, true);
  menu('optAccessoires', ACCESSOIRES, () => config.accessoire, v => config.accessoire = v, false);
  menu('optElements', ELEMENTS, () => config.element, v => config.element = v, true);
  menu('optTailles', TAILLES, () => config.taille, v => config.taille = v, false);
}

function appliquerElementSVG(e){ const h=document.getElementById('cfgHeart'); if(h) h.setAttribute('fill', e.svg); }

/* -------- application de la configuration -------- */
function appliquer() {
  /* apercu SVG */
  document.querySelectorAll('#cfgFigure .cfg-skin').forEach(el => el.setAttribute('fill', config.couleur.svg));
  appliquerElementSVG(config.element);

  /* apercu 3D (quand le modele sera la) */
  if (window.Render3D) {
    Render3D.appliquerCouleur(config.couleur.hex3d);
    Render3D.appliquerElement(config.element.v3d);
  }

  /* libelles */
  document.getElementById('cfgCouleurNom').textContent = config.couleur.nom;
  document.getElementById('cfgElementNom').textContent = config.element.nom;
  document.getElementById('cfgTailleNom').textContent = config.taille.nom;

  /* prix */
  const total = PRIX_BASE
    + (config.couleur.prix || 0)
    + (config.element.prix || 0)
    + (config.taille.prix || 0)
    + (config.accessoire ? (config.accessoire.prix || 0) : 0);
  document.getElementById('cfgPrix').textContent = total > 0 ? total + ' €' : 'À définir';

  /* resume */
  document.getElementById('cfgResume').textContent = [
    config.couleur.nom, config.element.nom, config.taille.nom,
    config.accessoire ? config.accessoire.nom : null,
  ].filter(Boolean).join(' · ');

  rendreMenus();
}

rendreMenus();
appliquer();
