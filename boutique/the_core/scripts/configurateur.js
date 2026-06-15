/* ============================================================
   CONFIGURATEUR — The Core
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
    "id": "classic",
    "nom": "Classic",
    "aperc": "#171717",
    "svg": "#171717",
    "hex3d": "#171717",
    "prix": 0
  },
  {
    "id": "white",
    "nom": "White",
    "aperc": "#ece9e2",
    "svg": "#ece9e2",
    "hex3d": "#ece9e2",
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
    "id": "chrome",
    "nom": "Chrome",
    "aperc": "linear-gradient(135deg,#f7f8fa,#969ca6)",
    "svg": "url(#chrome)",
    "hex3d": "#c8cdd4",
    "prix": 0
  },
  {
    "id": "carbon",
    "nom": "Carbon",
    "aperc": "#2a2c30",
    "svg": "#2a2c30",
    "hex3d": "#2a2c30",
    "prix": 0
  },
  {
    "id": "neon",
    "nom": "Neon",
    "aperc": "linear-gradient(135deg,#ff3b6b,#ffd23b,#3bff8a,#3bc4ff,#b03bff)",
    "svg": "url(#neon)",
    "hex3d": "#c44dd0",
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
    "id": "red",
    "nom": "Red",
    "aperc": "#c92a2a",
    "svg": "#c92a2a",
    "hex3d": "#c92a2a",
    "prix": 0
  },
  {
    "id": "ice",
    "nom": "Ice",
    "aperc": "#bfe2f0",
    "svg": "#bfe2f0",
    "hex3d": "#bfe2f0",
    "prix": 0
  },
  {
    "id": "galaxy",
    "nom": "Galaxy",
    "aperc": "linear-gradient(135deg,#2a1d52,#5a3a9e)",
    "svg": "url(#galaxy)",
    "hex3d": "#46307a",
    "prix": 0
  }
];

const ACCESSOIRES = [
  /* { id: 'voiture', nom: 'Supercar', emoji: '🏎️', prix: 0 }, */
];

const ELEMENTS = [
  {
    "id": "neutre",
    "nom": "Neutre",
    "svg": ".6",
    "v3d": ".6",
    "prix": 0
  },
  {
    "id": "energie",
    "nom": "Énergie",
    "svg": "1",
    "v3d": "1",
    "prix": 0
  },
  {
    "id": "focus",
    "nom": "Focus",
    "svg": ".85",
    "v3d": ".85",
    "prix": 0
  }
];

const TAILLES = [
  {
    "id": "20",
    "nom": "20 cm",
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
  menu('optElements', ELEMENTS, () => config.element, v => config.element = v, false);
  menu('optTailles', TAILLES, () => config.taille, v => config.taille = v, false);
}

function appliquerElementSVG(e){ const g=document.getElementById('cfgGlow'); if(g) g.style.opacity = e.svg; }

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
