/* ============================================================
   CONFIGURATEUR — The Spark
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
    "id": "blanc",
    "nom": "Blanc original",
    "aperc": "#f2f1ee",
    "svg": "url(#whiteGloss)",
    "hex3d": "#f2f1ee",
    "prix": 0
  },
  {
    "id": "noir",
    "nom": "All Black",
    "aperc": "#0c0c0e",
    "svg": "#0c0c0e",
    "hex3d": "#0c0c0e",
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
    "id": "gold",
    "nom": "Full Gold",
    "aperc": "linear-gradient(135deg,#f4d77a,#b88a2e)",
    "svg": "url(#gold)",
    "hex3d": "#d4a945",
    "prix": 0
  },
  {
    "id": "pearl",
    "nom": "Pearl",
    "aperc": "linear-gradient(135deg,#fff,#ffe1f1,#dcebff)",
    "svg": "url(#pearl)",
    "hex3d": "#f2e6ee",
    "prix": 0
  },
  {
    "id": "translucide",
    "nom": "Translucent",
    "aperc": "#cfeaf5",
    "svg": "#cfeaf5",
    "hex3d": "#cfeaf5",
    "prix": 0
  },
  {
    "id": "ocean",
    "nom": "Ocean",
    "aperc": "#2bb6e8",
    "svg": "#2bb6e8",
    "hex3d": "#2bb6e8",
    "prix": 0
  },
  {
    "id": "love",
    "nom": "Love",
    "aperc": "#ff3b5c",
    "svg": "#ff3b5c",
    "hex3d": "#ff3b5c",
    "prix": 0
  },
  {
    "id": "neon",
    "nom": "Neon",
    "aperc": "#9b4dff",
    "svg": "#9b4dff",
    "hex3d": "#9b4dff",
    "prix": 0
  }
];

const ACCESSOIRES = [
  /* { id: 'voiture', nom: 'Supercar', emoji: '🏎️', prix: 0 }, */
];

const ELEMENTS = [
  {
    "id": "noir",
    "nom": "Noirs",
    "aperc": "#0b0b0d",
    "svg": "#0b0b0d",
    "v3d": "#0b0b0d",
    "prix": 0
  },
  {
    "id": "dore",
    "nom": "Dorés",
    "aperc": "#e8b54e",
    "svg": "#e8b54e",
    "v3d": "#e8b54e",
    "prix": 0
  },
  {
    "id": "bleu",
    "nom": "Bleus",
    "aperc": "#2bb6e8",
    "svg": "#2bb6e8",
    "v3d": "#2bb6e8",
    "prix": 0
  },
  {
    "id": "rouge",
    "nom": "Rouges",
    "aperc": "#ff3b5c",
    "svg": "#ff3b5c",
    "v3d": "#ff3b5c",
    "prix": 0
  },
  {
    "id": "violet",
    "nom": "Violets",
    "aperc": "#9b4dff",
    "svg": "#9b4dff",
    "v3d": "#9b4dff",
    "prix": 0
  }
];

const TAILLES = [
  {
    "id": "10",
    "nom": "10 cm",
    "prix": 0
  },
  {
    "id": "20",
    "nom": "20 cm",
    "prix": 0
  },
  {
    "id": "40",
    "nom": "40 cm",
    "prix": 0
  },
  {
    "id": "80",
    "nom": "80 cm",
    "prix": 0
  },
  {
    "id": "120",
    "nom": "120 cm",
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

function appliquerElementSVG(e){ document.querySelectorAll('#cfgFigure .cfg-eye').forEach(el=>el.setAttribute('fill', e.svg)); }

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
