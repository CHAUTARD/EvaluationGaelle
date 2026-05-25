'use strict';

// ============================================================
// UTILITAIRES
// ============================================================

function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ============================================================
// COUCHE PERSISTANCE — localStorage
// ============================================================

const DB = {
  getNiveaux()         { return JSON.parse(localStorage.getItem('em_niveaux') || 'null'); },
  saveNiveaux(v)       { localStorage.setItem('em_niveaux', JSON.stringify(v)); },
  getEleves()          { return JSON.parse(localStorage.getItem('em_eleves')  || 'null'); },
  saveEleves(v)        { localStorage.setItem('em_eleves',  JSON.stringify(v)); },
  getListes()          { return JSON.parse(localStorage.getItem('em_listes')  || 'null'); },
  saveListes(v)        { localStorage.setItem('em_listes',  JSON.stringify(v)); },
  getMots()            { return JSON.parse(localStorage.getItem('em_mots')    || 'null'); },
  saveMots(v)          { localStorage.setItem('em_mots',    JSON.stringify(v)); },
  getHistorique()      { return JSON.parse(localStorage.getItem('em_historique') || '[]'); },
  saveHistorique(v)    { localStorage.setItem('em_historique', JSON.stringify(v)); },
  getCustomImages()    { return JSON.parse(localStorage.getItem('em_custom_images') || '[]'); },
  saveCustomImages(v)  { localStorage.setItem('em_custom_images', JSON.stringify(v)); },
  getDarkMode()        { return localStorage.getItem('em_darkmode') === '1'; },
  saveDarkMode(v)      { localStorage.setItem('em_darkmode', v ? '1' : '0'); },
};

// ============================================================
// INITIALISATION DES DONNÉES PAR DÉFAUT
// ============================================================

function initDefaultData() {
  if (DB.getNiveaux() !== null) return;

  const idPetit = generateId();
  const idMoyen = generateId();
  const idGrand = generateId();

  DB.saveNiveaux([
    { id: idPetit, nom: 'Petit', couleur: '#8AC5F5', ordre: 1 },
    { id: idMoyen, nom: 'Moyen', couleur: '#AEFAB0', ordre: 2 },
    { id: idGrand, nom: 'Grand', couleur: '#F1C5C1', ordre: 3 },
  ]);

  DB.saveEleves([
    { id: generateId(), nom: 'Clément',   niveauId: idPetit },
    { id: generateId(), nom: 'Thibault',  niveauId: idPetit },
    { id: generateId(), nom: 'Valentin',  niveauId: idPetit },
    { id: generateId(), nom: 'Gaëlle',    niveauId: idMoyen },
    { id: generateId(), nom: 'Camille',   niveauId: idMoyen },
    { id: generateId(), nom: 'Coraline',  niveauId: idMoyen },
    { id: generateId(), nom: 'Michèle',   niveauId: idGrand },
    { id: generateId(), nom: 'Patrick',   niveauId: idGrand },
    { id: generateId(), nom: 'Marie-Lou', niveauId: idGrand },
  ]);

  const idL1 = generateId(), idL2 = generateId(), idL3 = generateId();
  const idL4 = generateId(), idL5 = generateId(), idL6 = generateId();

  const listes = [
    { id: idL1, nom: 'Mots 1',                 image: 'asset/images/Mots1.png',   niveauId: idPetit, motsIds: [] },
    { id: idL2, nom: 'Mots 2',                 image: 'asset/images/Mots1.png',   niveauId: idPetit, motsIds: [] },
    { id: idL3, nom: 'Mots 3',                 image: 'asset/images/Mots1.png',   niveauId: idPetit, motsIds: [] },
    { id: idL4, nom: 'Couleur des émotions',   image: 'asset/images/default.png', niveauId: idMoyen, motsIds: [] },
    { id: idL5, nom: 'Je me sens',             image: 'asset/images/default.png', niveauId: idMoyen, motsIds: [] },
    { id: idL6, nom: "Les mots de l'école",    image: 'asset/images/default.png', niveauId: idGrand, motsIds: [] },
  ];

  const mots = [
    // Liste 1 — Mots M
    { id: generateId(), listeId: idL1, word: 'mie',      image: 'asset/images/la_mie.png'    },
    { id: generateId(), listeId: idL1, word: 'mât',      image: 'asset/images/le_mat.png'    },
    { id: generateId(), listeId: idL1, word: 'mot',      image: 'asset/images/le_mot.png'    },
    { id: generateId(), listeId: idL1, word: 'ami',      image: 'asset/images/un_ami.png'    },
    { id: generateId(), listeId: idL1, word: 'mur',      image: 'asset/images/le_mur.png'    },
    { id: generateId(), listeId: idL1, word: 'mémé',     image: 'asset/images/la_meme.png'   },
    { id: generateId(), listeId: idL1, word: 'fumée',    image: 'asset/images/la_fumee.png'  },
    { id: generateId(), listeId: idL1, word: 'momie',    image: 'asset/images/la_momie.png'  },
    // Liste 2 — Mots O/S
    { id: generateId(), listeId: idL2, word: 'os',       image: 'asset/images/un_os.png'     },
    { id: generateId(), listeId: idL2, word: 'as',       image: 'asset/images/un_as.png'     },
    { id: generateId(), listeId: idL2, word: 'sofa',     image: 'asset/images/le_sofa.png'   },
    { id: generateId(), listeId: idL2, word: 'mât',      image: 'asset/images/le_mat.png'    },
    { id: generateId(), listeId: idL2, word: 'sumo',     image: 'asset/images/le_sumo.png'   },
    { id: generateId(), listeId: idL2, word: 'fumée',    image: 'asset/images/la_fumee.png'  },
    { id: generateId(), listeId: idL2, word: 'riz',      image: 'asset/images/le_riz.png'    },
    { id: generateId(), listeId: idL2, word: 'semé',     image: 'asset/images/il_a_seme.png' },
    { id: generateId(), listeId: idL2, word: 'mamie',    image: 'asset/images/la_meme.png'   },
    // Liste 3 — Mots R
    { id: generateId(), listeId: idL3, word: 'rue',      image: 'asset/images/la_rue.png'    },
    { id: generateId(), listeId: idL3, word: 'roi',      image: 'asset/images/le_roi.png'    },
    { id: generateId(), listeId: idL3, word: 'rat',      image: 'asset/images/le_rat.png'    },
    { id: generateId(), listeId: idL3, word: 'riz',      image: 'asset/images/le_riz.png'    },
    { id: generateId(), listeId: idL3, word: 'rit',      image: 'asset/images/il_rit.png'    },
    { id: generateId(), listeId: idL3, word: 'mur',      image: 'asset/images/le_mur.png'    },
    { id: generateId(), listeId: idL3, word: 'rame',     image: 'asset/images/la_rame.png'   },
    { id: generateId(), listeId: idL3, word: 'Mari',     image: 'asset/images/le_mari.png'   },
    { id: generateId(), listeId: idL3, word: 'murmure',  image: 'asset/images/il_murmure.png'},
    // Liste 4 — Émotions (noms)
    { id: generateId(), listeId: idL4, word: 'Amour',    image: 'asset/images/amour.png'     },
    { id: generateId(), listeId: idL4, word: 'Colère',   image: 'asset/images/colere.png'    },
    { id: generateId(), listeId: idL4, word: 'Joie',     image: 'asset/images/joie.png'      },
    { id: generateId(), listeId: idL4, word: 'Peur',     image: 'asset/images/peur.png'      },
    { id: generateId(), listeId: idL4, word: 'Sérénité', image: 'asset/images/serenite.png'  },
    { id: generateId(), listeId: idL4, word: 'Tristesse',image: 'asset/images/tristesse.png' },
    // Liste 5 — Émotions (adjectifs)
    { id: generateId(), listeId: idL5, word: 'joyeux',   image: 'asset/images/joyeux.png'    },
    { id: generateId(), listeId: idL5, word: 'triste',   image: 'asset/images/triste.png'    },
    { id: generateId(), listeId: idL5, word: 'effrayé',  image: 'asset/images/effraye.png'   },
    { id: generateId(), listeId: idL5, word: 'serein',   image: 'asset/images/serein.png'    },
    { id: generateId(), listeId: idL5, word: 'énervé',   image: 'asset/images/enerve.png'    },
    { id: generateId(), listeId: idL5, word: 'surpris',  image: 'asset/images/surpris.png'   },
    // Liste 6 — Mots de l'école
    { id: generateId(), listeId: idL6, word: 'Crayon',   image: 'asset/images/crayon.png'    },
    { id: generateId(), listeId: idL6, word: 'Gomme',    image: 'asset/images/gomme.png'     },
    { id: generateId(), listeId: idL6, word: 'Feutres',  image: 'asset/images/feutres.png'   },
    { id: generateId(), listeId: idL6, word: 'Colorier', image: 'asset/images/colorier.png'  },
    { id: generateId(), listeId: idL6, word: 'Ciseaux',  image: 'asset/images/ciseaux.png'   },
    { id: generateId(), listeId: idL6, word: 'Découper', image: 'asset/images/decouper.png'  },
    { id: generateId(), listeId: idL6, word: 'Table',    image: 'asset/images/table.png'     },
    { id: generateId(), listeId: idL6, word: 'Cartable', image: 'asset/images/cartable.png'  },
    { id: generateId(), listeId: idL6, word: 'Pinceau',  image: 'asset/images/pinceau.png'   },
    { id: generateId(), listeId: idL6, word: 'Tablier',  image: 'asset/images/tablier.png'   },
    { id: generateId(), listeId: idL6, word: 'Rouleau',  image: 'asset/images/rouleau.png'   },
    { id: generateId(), listeId: idL6, word: 'Banc',     image: 'asset/images/banc.png'      },
  ];

  mots.forEach(mot => {
    const liste = listes.find(l => l.id === mot.listeId);
    if (liste) liste.motsIds.push(mot.id);
  });

  DB.saveListes(listes);
  DB.saveMots(mots);
}

// ============================================================
// NAVIGATION
// ============================================================

const Nav = {
  currentScreen: 'screen-home',
  currentEleveId: null,

  show(screenId) {
    $('.screen').removeClass('active');
    $('#' + screenId).addClass('active');
    this.currentScreen = screenId;
  },
};

// ============================================================
// DARK MODE
// ============================================================

function applyDarkMode(dark) {
  $('html').attr('data-bs-theme', dark ? 'dark' : 'light');
  $('#btn-darkmode').text(dark ? '☀️' : '🌙');
  DB.saveDarkMode(dark);
}

// ============================================================
// ÉCRAN ACCUEIL
// ============================================================

let activeTabIdx = 0;

function renderHome() {
  const niveaux = (DB.getNiveaux() || []).sort((a, b) => a.ordre - b.ordre);
  const eleves  = DB.getEleves() || [];

  // --- Onglets ---
  const $tabBar = $('#tab-bar').empty();

  if (niveaux.length === 0) {
    $('#tab-content').html('<div class="empty-msg">Aucun niveau trouvé.<br>Ajoutez des niveaux dans les paramètres.</div>');
    return;
  }

  // S'assurer que l'index actif est valide
  if (activeTabIdx >= niveaux.length) activeTabIdx = 0;

  niveaux.forEach((niveau, idx) => {
    const $tab = $('<button class="tab-btn">')
      .attr('data-idx', idx)
      .html(`<span class="tab-dot" style="background:${niveau.couleur}"></span>
             <span class="tab-label" style="color:${niveau.couleur}">${niveau.nom}</span>`);
    if (idx === activeTabIdx) $tab.addClass('active');
    $tab.on('click', function () {
      activeTabIdx = idx;
      renderHome();
    });
    $tabBar.append($tab);
  });

  // --- Liste des élèves de l'onglet actif ---
  const niveau      = niveaux[activeTabIdx];
  const niveauEleves = eleves.filter(e => e.niveauId === niveau.id);
  const $content    = $('#tab-content').empty();

  if (niveauEleves.length === 0) {
    $content.html('<div class="empty-msg">Aucun élève dans ce niveau.</div>');
    return;
  }

  const $list = $('<ul class="eleve-list">');
  niveauEleves.forEach(eleve => {
    const initiale = eleve.nom.charAt(0).toUpperCase();
    const $item = $(`
      <li class="eleve-item" data-id="${eleve.id}">
        <div class="eleve-avatar" style="background:${niveau.couleur}">
          <span class="eleve-initiale">${initiale}</span>
        </div>
        <span class="eleve-nom">${eleve.nom}</span>
        <span class="eleve-chevron">›</span>
      </li>`);
    $item.on('click', function () {
      Nav.currentEleveId = eleve.id;
      renderEleve(eleve, niveau);
      Nav.show('screen-eleve');
    });
    $list.append($item);
  });
  $content.append($list);
}

// ============================================================
// ÉCRAN ÉLÈVE — liste des activités du niveau
// ============================================================

let currentListeId = null;

function renderEleve(eleve, niveau) {
  $('#eleve-titre').text(`${eleve.nom} (${niveau.nom})`);

  const listes = (DB.getListes() || []).filter(l => l.niveauId === eleve.niveauId);
  const $content = $('#eleve-content').empty();

  if (listes.length === 0) {
    $content.html('<div class="empty-msg">Aucune activité trouvée pour ce niveau.</div>');
    return;
  }

  listes.forEach(liste => {
    const isImageList = !liste.motsIds || liste.motsIds.length === 0;
    const typeLabel   = isImageList ? 'Images uniquement' : `${liste.motsIds.length} mot(s)`;

    const imgHtml = liste.image
      ? `<img src="${liste.image}" alt="${liste.nom}" onerror="this.parentElement.innerHTML='<span class=activite-img-placeholder>📋</span>'">`
      : `<span class="activite-img-placeholder">📋</span>`;

    const $card = $(`
      <div class="activite-card" data-liste-id="${liste.id}">
        <div class="activite-img-wrap">${imgHtml}</div>
        <div class="activite-info">
          <div class="activite-nom">${liste.nom}</div>
          <div class="activite-type">${typeLabel}</div>
        </div>
        <span class="activite-arrow">›</span>
      </div>`);

    $card.on('click', function () {
      currentListeId = liste.id;
      // Navigation vers l'écran d'évaluation (à implémenter)
      Nav.show('screen-evaluation');
      renderEvaluation(eleve, liste, niveau);
    });

    $content.append($card);
  });
}

// ============================================================
// ÉCRAN ÉVALUATION
// ============================================================

const evalState = {
  eleve:       null,
  liste:       null,
  niveau:      null,
  mots:        [],
  currentIdx:  0,
  evaluations: [],   // [{mot, isCorrect}]
  isImageList: false,
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatDate(isoStr) {
  const d = new Date(isoStr);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

function renderEvaluation(eleve, liste, niveau) {
  evalState.eleve       = eleve;
  evalState.liste       = liste;
  evalState.niveau      = niveau;
  evalState.currentIdx  = 0;
  evalState.evaluations = [];
  evalState.isImageList = !liste.motsIds || liste.motsIds.length === 0;

  // Charger et mélanger les mots
  const tousLesMots = DB.getMots() || [];
  const motsListe   = tousLesMots.filter(m => liste.motsIds && liste.motsIds.includes(m.id));
  evalState.mots    = shuffle(motsListe);

  // Titre
  $('#evaluation-titre').text(liste.nom);

  // Infos : dernier historique pour cet élève + cette liste
  const historique    = DB.getHistorique();
  const entrees       = historique
    .filter(h => h.eleveId === eleve.id && h.listeId === liste.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const lastEntry     = entrees[0] || null;

  if (lastEntry) {
    const total = lastEntry.motsReussis.length + lastEntry.motsEchoues.length;
    $('#eval-info-bar').html(
      `${eleve.nom} (${niveau.nom}) &nbsp;·&nbsp; Dernière session : ${formatDate(lastEntry.date)} &nbsp;·&nbsp; Score : ${lastEntry.motsReussis.length} / ${total}`
    ).show();
  } else {
    $('#eval-info-bar').html(`${eleve.nom} (${niveau.nom})`).show();
  }

  if (evalState.mots.length === 0) {
    $('#eval-zone').html('<div class="empty-msg">Aucun mot dans cette liste.</div>');
    $('#eval-btn-bar, .eval-progress-bar-wrap').hide();
    return;
  }

  $('.eval-btn-bar, .eval-progress-bar-wrap').show();
  renderEvalMot();
}

function renderEvalMot() {
  const { mots, currentIdx, isImageList } = evalState;
  const mot    = mots[currentIdx];
  const total  = mots.length;
  const pct    = Math.round((currentIdx / total) * 100);

  // Compteur dans l'app bar
  $('#eval-compteur').text(`${currentIdx + 1} / ${total}`);

  // Barre de progression
  $('#eval-progress-bar').css('width', pct + '%');

  // Image
  if (mot.image) {
    $('#eval-img').attr('src', mot.image).attr('alt', mot.word).show();
  } else {
    $('#eval-img').hide();
  }

  // Mot (masqué si liste images seules)
  if (isImageList) {
    $('#eval-mot').hide();
  } else {
    $('#eval-mot').text(mot.word).show();
  }
}

function recordEval(isCorrect) {
  const { mots, currentIdx } = evalState;
  evalState.evaluations.push({ mot: mots[currentIdx], isCorrect });

  if (currentIdx < mots.length - 1) {
    evalState.currentIdx++;
    renderEvalMot();
  } else {
    finishEvaluation();
  }
}

function finishEvaluation() {
  const { eleve, liste, evaluations, isImageList } = evalState;

  // Sauvegarder en historique
  const entry = {
    id:           generateId(),
    eleveId:      eleve.id,
    listeId:      liste.id,
    motsReussis:  evaluations.filter(e =>  e.isCorrect).map(e => e.mot.word),
    motsEchoues:  evaluations.filter(e => !e.isCorrect).map(e => e.mot.word),
    date:         new Date().toISOString(),
  };
  const historique = DB.getHistorique();
  historique.push(entry);
  DB.saveHistorique(historique);

  if (isImageList) {
    // Listes images : retour direct à l'écran élève
    Nav.show('screen-eleve');
  } else {
    renderResultats(evaluations);
    Nav.show('screen-resultats');
  }
}

// ============================================================
// ÉCRAN RÉSULTATS
// ============================================================

function renderResultats(evaluations) {
  const reussis = evaluations.filter(e =>  e.isCorrect).length;
  const total   = evaluations.length;
  const pct     = total > 0 ? Math.round((reussis / total) * 100) : 0;
  const couleur = reussis === total ? '#43a047' : reussis >= total / 2 ? '#fb8c00' : '#e53935';

  $('#resultats-score').html(`
    <div class="resultats-score-chiffre" style="color:${couleur}">${reussis} / ${total}</div>
    <div class="resultats-score-label">${pct} % de réussite</div>
  `);

  const $liste = $('#resultats-liste').empty();
  evaluations.forEach(({ mot, isCorrect }) => {
    const imgHtml = mot.image
      ? `<img src="${mot.image}" alt="${mot.word}" onerror="this.style.display='none'">`
      : '';
    $liste.append(`
      <div class="result-card">
        <div class="result-img-wrap">${imgHtml}</div>
        <span class="result-mot">${mot.word}</span>
        <span class="result-badge ${isCorrect ? 'ok' : 'fail'}">${isCorrect ? '✓' : '✗'}</span>
      </div>`);
  });
}

// ============================================================
// ÉCRAN PARAMÈTRES
// ============================================================

function renderSettings() {
  const dark = DB.getDarkMode();
  $('#settings-darkmode-label').text(dark ? 'Mode sombre : activé' : 'Mode sombre : désactivé');
}

// ============================================================
// IMAGES DISPONIBLES (assets copiés depuis Flutter)
// ============================================================

const IMAGE_ASSETS = [
  'asset/images/Mots1.png','asset/images/default.png',
  'asset/images/la_mie.png','asset/images/le_mat.png','asset/images/le_mot.png',
  'asset/images/un_ami.png','asset/images/le_mur.png','asset/images/la_meme.png',
  'asset/images/la_fumee.png','asset/images/la_momie.png',
  'asset/images/un_os.png','asset/images/un_as.png','asset/images/le_sofa.png',
  'asset/images/le_sumo.png','asset/images/le_riz.png','asset/images/il_a_seme.png',
  'asset/images/la_rue.png','asset/images/le_roi.png','asset/images/le_rat.png',
  'asset/images/il_rit.png','asset/images/la_rame.png','asset/images/il_rame.png',
  'asset/images/le_mari.png','asset/images/il_murmure.png',
  'asset/images/amour.png','asset/images/colere.png','asset/images/joie.png',
  'asset/images/peur.png','asset/images/serenite.png','asset/images/tristesse.png',
  'asset/images/joyeux.png','asset/images/triste.png','asset/images/effraye.png',
  'asset/images/serein.png','asset/images/enerve.png','asset/images/surpris.png',
  'asset/images/crayon.png','asset/images/gomme.png','asset/images/feutres.png',
  'asset/images/colorier.png','asset/images/ciseaux.png','asset/images/decouper.png',
  'asset/images/table.png','asset/images/cartable.png','asset/images/pinceau.png',
  'asset/images/tablier.png','asset/images/rouleau.png','asset/images/banc.png',
];

// ============================================================
// MODALES UTILITAIRES
// ============================================================

let formModal    = null;
let imgModal     = null;
let confirmModal = null;

function initModals() {
  formModal    = new bootstrap.Modal(document.getElementById('modal-form'));
  imgModal     = new bootstrap.Modal(document.getElementById('modal-img-picker'));
  confirmModal = new bootstrap.Modal(document.getElementById('modal-confirm'));
}

function showFormModal(title, bodyHtml, saveCallback, dialogClass = '') {
  const $dlg = $('#modal-form .modal-dialog');
  $dlg.removeClass('modal-sm modal-lg modal-xl');
  if (dialogClass) $dlg.addClass(dialogClass);
  $('#modal-form-title').text(title);
  $('#modal-form-body').html(bodyHtml);
  $('#btn-modal-save').off('click').on('click', saveCallback);
  formModal.show();
}

function showConfirmModal(message, okCallback) {
  $('#modal-confirm-msg').text(message);
  $('#btn-confirm-ok').off('click').on('click', function () {
    confirmModal.hide();
    okCallback();
  });
  confirmModal.show();
}

let imgPickerCallback = null;
function showImagePicker(currentSrc, callback) {
  imgPickerCallback = callback;
  const $grid = $('#img-picker-grid').empty();

  // Images personnalisées en premier
  (DB.getCustomImages() || []).forEach(img => {
    const $item = $('<div class="img-picker-item">').append(
      $('<img>').attr({ src: img.src, alt: img.name })
    );
    if (img.src === currentSrc) $item.addClass('selected');
    $item.on('click', function () { imgModal.hide(); callback(img.src); });
    $grid.append($item);
  });

  // Puis images intégrées
  IMAGE_ASSETS.forEach(src => {
    const $item = $('<div class="img-picker-item">').append(
      $('<img>').attr({ src, alt: src.split('/').pop() })
    );
    if (src === currentSrc) $item.addClass('selected');
    $item.on('click', function () { imgModal.hide(); callback(src); });
    $grid.append($item);
  });

  imgModal.show();
}

// ============================================================
// ADMIN — ÉLÈVES
// ============================================================

function renderAdminEleves() {
  const niveaux = (DB.getNiveaux() || []).sort((a, b) => a.ordre - b.ordre);
  const eleves  = DB.getEleves()  || [];
  const $c      = $('#admin-eleves-list').empty();

  if (!niveaux.length) {
    $c.html('<div class="admin-empty">Aucun niveau. Créez des niveaux dans « Gérer les niveaux ».</div>');
    return;
  }

  niveaux.forEach(niveau => {
    const niveauEleves = eleves
      .filter(e => e.niveauId === niveau.id)
      .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));

    const nb = niveauEleves.length;
    const $header = $(`
      <div class="admin-niveau-header">
        <div class="niveau-swatch" style="background:${niveau.couleur}"></div>
        <div class="admin-niveau-nom">
          ${niveau.nom}
          <span class="admin-niveau-count">${nb} élève${nb !== 1 ? 's' : ''}</span>
        </div>
        <div class="admin-item-actions">
          <button class="admin-action-btn import" title="Importer des élèves depuis un fichier (.txt ou .csv, un prénom par ligne)">📥</button>
          <button class="admin-action-btn del-niveau" title="Supprimer ce niveau et ses élèves">🗑️</button>
        </div>
      </div>`);

    $header.find('.import').on('click',     () => triggerImportEleves(niveau.id));
    $header.find('.del-niveau').on('click', () => confirmDeleteNiveauAvecEleves(niveau, nb));
    $c.append($header);

    if (!nb) {
      $c.append('<div class="admin-empty-niveau">Aucun élève dans ce niveau.</div>');
    } else {
      niveauEleves.forEach(eleve => {
        const initiale = eleve.nom.charAt(0).toUpperCase();
        const $item = $(`
          <div class="admin-item">
            <div class="admin-item-thumb" style="background:${niveau.couleur}">${initiale}</div>
            <div class="admin-item-info">
              <div class="admin-item-nom">${eleve.nom}</div>
            </div>
            <div class="admin-item-actions">
              <button class="admin-action-btn edit" title="Modifier">✏️</button>
              <button class="admin-action-btn del"  title="Supprimer">🗑️</button>
            </div>
          </div>`);
        $item.find('.edit').on('click', () => showEleveForm(eleve));
        $item.find('.del').on('click',  () => confirmDeleteEleve(eleve));
        $c.append($item);
      });
    }
  });
}

// Suppression d'un niveau depuis Admin Élèves (cascade : élèves + listes + mots)
function confirmDeleteNiveauAvecEleves(niveau, nbEleves) {
  const listes   = (DB.getListes() || []).filter(l => l.niveauId === niveau.id);
  const nbListes = listes.length;
  let msg = `Supprimer le niveau "${niveau.nom}"`;
  if (nbEleves > 0) msg += `, ses ${nbEleves} élève(s)`;
  if (nbListes > 0) msg += ` et ses ${nbListes} liste(s)`;
  msg += ' ?';

  showConfirmModal(msg, function () {
    const mots    = DB.getMots() || [];
    const motsIds = listes.flatMap(l => l.motsIds || []);
    DB.saveNiveaux((DB.getNiveaux() || []).filter(n => n.id !== niveau.id));
    DB.saveEleves((DB.getEleves()   || []).filter(e => e.niveauId !== niveau.id));
    DB.saveListes((DB.getListes()   || []).filter(l => l.niveauId !== niveau.id));
    DB.saveMots(mots.filter(m => !motsIds.includes(m.id)));
    renderAdminEleves();
  });
}

// Import d'élèves depuis un fichier texte ou CSV
let importNiveauId = null;

function triggerImportEleves(niveauId) {
  importNiveauId = niveauId;
  $('#import-eleves-input').val('').trigger('click');
}

function handleImportEleves(file) {
  if (!file || !importNiveauId) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'));

    let noms = [];
    if (lines.length > 0) {
      // Ignorer une éventuelle ligne d'en-tête "nom" (CSV ou texte)
      const firstLower = lines[0].toLowerCase();
      const isHeader = firstLower === 'nom'
        || firstLower.startsWith('nom,')
        || firstLower.startsWith('nom;');
      const dataLines = isHeader ? lines.slice(1) : lines;
      // Prendre la première colonne (virgule ou point-virgule)
      noms = dataLines.map(l => l.split(/[,;]/)[0].trim()).filter(Boolean);
    }

    if (!noms.length) {
      alert('Aucun nom trouvé.\nFormat attendu : un prénom par ligne (.txt ou .csv).');
      return;
    }

    const eleves = DB.getEleves() || [];
    noms.forEach(nom => eleves.push({ id: generateId(), nom, niveauId: importNiveauId }));
    DB.saveEleves(eleves);
    renderAdminEleves();
    alert(`${noms.length} élève(s) importé(s) avec succès.`);
  };
  reader.readAsText(file, 'UTF-8');
}

function showEleveForm(eleve = null) {
  const niveaux = (DB.getNiveaux() || []).sort((a, b) => a.ordre - b.ordre);
  const opts    = niveaux.map(n =>
    `<option value="${n.id}"${eleve && eleve.niveauId === n.id ? ' selected' : ''}>${n.nom}</option>`
  ).join('');
  showFormModal(
    eleve ? "Modifier l'élève" : 'Ajouter un élève',
    `<div class="mb-3">
       <label class="form-label">Nom</label>
       <input id="f-eleve-nom" class="form-control" value="${eleve ? eleve.nom : ''}">
     </div>
     <div class="mb-3">
       <label class="form-label">Niveau</label>
       <select id="f-eleve-niveau" class="form-select">${opts}</select>
     </div>`,
    function () {
      const nom      = $('#f-eleve-nom').val().trim();
      const niveauId = $('#f-eleve-niveau').val();
      if (!nom)      { alert('Le nom est requis.');    return; }
      if (!niveauId) { alert('Le niveau est requis.'); return; }
      const eleves = DB.getEleves() || [];
      if (eleve) {
        const i = eleves.findIndex(e => e.id === eleve.id);
        if (i >= 0) Object.assign(eleves[i], { nom, niveauId });
      } else {
        eleves.push({ id: generateId(), nom, niveauId });
      }
      DB.saveEleves(eleves);
      formModal.hide();
      renderAdminEleves();
    }
  );
}

function confirmDeleteEleve(eleve) {
  showConfirmModal(`Supprimer l'élève "${eleve.nom}" ?`, function () {
    DB.saveEleves((DB.getEleves() || []).filter(e => e.id !== eleve.id));
    renderAdminEleves();
  });
}

// ============================================================
// ADMIN — NIVEAUX
// ============================================================

function renderAdminNiveaux() {
  const niveaux = (DB.getNiveaux() || []).sort((a, b) => a.ordre - b.ordre);
  const eleves  = DB.getEleves()  || [];
  const listes  = DB.getListes()  || [];
  const $c      = $('#admin-niveaux-list').empty();

  if (!niveaux.length) {
    $c.html('<div class="admin-empty">Aucun niveau.</div>');
    return;
  }
  niveaux.forEach(niveau => {
    const nbEleves = eleves.filter(e => e.niveauId === niveau.id).length;
    const nbListes = listes.filter(l => l.niveauId === niveau.id).length;
    const $item    = $(`
      <div class="admin-item">
        <div class="niveau-swatch" style="background:${niveau.couleur}"></div>
        <div class="admin-item-info">
          <div class="admin-item-nom">${niveau.nom}</div>
          <div class="admin-item-sub">Ordre ${niveau.ordre} &nbsp;·&nbsp; ${nbEleves} élève(s) &nbsp;·&nbsp; ${nbListes} liste(s)</div>
        </div>
        <div class="admin-item-actions">
          <button class="admin-action-btn edit" title="Modifier">✏️</button>
          <button class="admin-action-btn del"  title="Supprimer">🗑️</button>
        </div>
      </div>`);
    $item.find('.edit').on('click', () => showNiveauForm(niveau));
    $item.find('.del').on('click',  () => confirmDeleteNiveau(niveau));
    $c.append($item);
  });
}

function showNiveauForm(niveau = null) {
  const niveaux      = DB.getNiveaux() || [];
  const defaultOrdre = niveau ? niveau.ordre : niveaux.length + 1;
  const defaultColor = niveau ? niveau.couleur : '#8AC5F5';
  showFormModal(
    niveau ? 'Modifier le niveau' : 'Ajouter un niveau',
    `<div class="mb-3">
       <label class="form-label">Nom</label>
       <input id="f-niveau-nom" class="form-control" value="${niveau ? niveau.nom : ''}">
     </div>
     <div class="mb-3">
       <label class="form-label">Couleur</label>
       <input type="color" id="f-niveau-couleur" class="form-control form-control-color w-100" value="${defaultColor}">
     </div>
     <div class="mb-3">
       <label class="form-label">Ordre d'affichage</label>
       <input type="number" id="f-niveau-ordre" class="form-control" value="${defaultOrdre}" min="1">
     </div>`,
    function () {
      const nom    = $('#f-niveau-nom').val().trim();
      const couleur= $('#f-niveau-couleur').val();
      const ordre  = parseInt($('#f-niveau-ordre').val()) || 1;
      if (!nom) { alert('Le nom est requis.'); return; }
      const niveaux = DB.getNiveaux() || [];
      if (niveau) {
        const i = niveaux.findIndex(n => n.id === niveau.id);
        if (i >= 0) Object.assign(niveaux[i], { nom, couleur, ordre });
      } else {
        niveaux.push({ id: generateId(), nom, couleur, ordre });
      }
      DB.saveNiveaux(niveaux);
      formModal.hide();
      renderAdminNiveaux();
    }
  );
}

function confirmDeleteNiveau(niveau) {
  const nbEleves = (DB.getEleves() || []).filter(e => e.niveauId === niveau.id).length;
  if (nbEleves > 0) {
    alert(`Impossible de supprimer : ${nbEleves} élève(s) appartiennent à ce niveau.\nRetirez-les d'abord.`);
    return;
  }
  showConfirmModal(`Supprimer le niveau "${niveau.nom}" et toutes ses listes ?`, function () {
    const listes    = DB.getListes() || [];
    const mots      = DB.getMots()   || [];
    const listesIds = listes.filter(l => l.niveauId === niveau.id).flatMap(l => [l.id]);
    const motsSuppr = mots.filter(m => listes.some(l => listesIds.includes(l.id) && l.motsIds.includes(m.id)));
    DB.saveNiveaux((DB.getNiveaux() || []).filter(n => n.id !== niveau.id));
    DB.saveListes(listes.filter(l => !listesIds.includes(l.id)));
    DB.saveMots(mots.filter(m => !motsSuppr.some(ms => ms.id === m.id)));
    renderAdminNiveaux();
  });
}

// ============================================================
// ADMIN — LISTES
// ============================================================

let adminListeCurrentId = null;

function renderAdminListes() {
  const listes  = (DB.getListes()  || []).sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
  const niveaux = DB.getNiveaux()  || [];
  const $c      = $('#admin-listes-list').empty();

  if (!listes.length) {
    $c.html('<div class="admin-empty">Aucune liste.</div>');
    return;
  }
  listes.forEach(liste => {
    const niveau  = niveaux.find(n => n.id === liste.niveauId);
    const nbMots  = liste.motsIds ? liste.motsIds.length : 0;
    const imgHtml = liste.image
      ? `<img src="${liste.image}" alt="" onerror="this.style.display='none'">`
      : '📋';
    const $item   = $(`
      <div class="admin-item">
        <div class="admin-item-thumb">${imgHtml}</div>
        <div class="admin-item-info">
          <div class="admin-item-nom">${liste.nom}</div>
          <div class="admin-item-sub">${niveau ? niveau.nom : 'Sans niveau'} &nbsp;·&nbsp; ${nbMots} mot(s)</div>
        </div>
        <div class="admin-item-actions">
          <button class="admin-action-btn nav"  title="Gérer les mots">📝</button>
          <button class="admin-action-btn edit" title="Modifier">✏️</button>
          <button class="admin-action-btn del"  title="Supprimer">🗑️</button>
        </div>
      </div>`);
    $item.find('.nav').on('click',  () => { adminListeCurrentId = liste.id; renderAdminMots(liste); Nav.show('screen-admin-mots'); });
    $item.find('.edit').on('click', () => showListeForm(liste));
    $item.find('.del').on('click',  () => confirmDeleteListe(liste));
    $c.append($item);
  });
}

function showListeForm(liste = null) {
  let selectedImg = liste ? liste.image : '';
  const niveaux   = (DB.getNiveaux() || []).sort((a, b) => a.ordre - b.ordre);
  const opts      = niveaux.map(n =>
    `<option value="${n.id}"${liste && liste.niveauId === n.id ? ' selected' : ''}>${n.nom}</option>`
  ).join('');

  const bodyHtml = `
    <div class="mb-3">
      <label class="form-label">Nom de la liste</label>
      <input id="f-liste-nom" class="form-control" value="${liste ? liste.nom : ''}">
    </div>
    <div class="mb-3">
      <label class="form-label">Niveau</label>
      <select id="f-liste-niveau" class="form-select">${opts}</select>
    </div>
    <div class="mb-3">
      <label class="form-label">Image de couverture</label>
      <div id="f-liste-img-preview" class="form-img-preview">
        ${selectedImg ? `<img src="${selectedImg}" alt="">` : '<span class="img-placeholder-icon">🖼️</span>'}
      </div>
    </div>`;

  showFormModal(
    liste ? 'Modifier la liste' : 'Ajouter une liste',
    bodyHtml,
    function () {
      const nom      = $('#f-liste-nom').val().trim();
      const niveauId = $('#f-liste-niveau').val();
      if (!nom)      { alert('Le nom est requis.'); return; }
      if (!niveauId) { alert('Le niveau est requis.'); return; }
      const listes = DB.getListes() || [];
      if (liste) {
        const i = listes.findIndex(l => l.id === liste.id);
        if (i >= 0) Object.assign(listes[i], { nom, niveauId, image: selectedImg });
      } else {
        listes.push({ id: generateId(), nom, niveauId, image: selectedImg, motsIds: [] });
      }
      DB.saveListes(listes);
      formModal.hide();
      renderAdminListes();
    }
  );

  // Ouvrir le sélecteur d'image au clic sur la prévisualisation
  $(document).off('click.listepicker').on('click.listepicker', '#f-liste-img-preview', function () {
    showImagePicker(selectedImg, function (src) {
      selectedImg = src;
      $('#f-liste-img-preview').html(`<img src="${src}" alt="">`);
      formModal.show();
    });
  });
}

function confirmDeleteListe(liste) {
  showConfirmModal(`Supprimer la liste "${liste.nom}" et ses ${liste.motsIds ? liste.motsIds.length : 0} mot(s) ?`, function () {
    const motsIds = liste.motsIds || [];
    DB.saveListes((DB.getListes() || []).filter(l => l.id !== liste.id));
    DB.saveMots((DB.getMots() || []).filter(m => !motsIds.includes(m.id)));
    renderAdminListes();
  });
}

// ============================================================
// ADMIN — MOTS
// ============================================================

function renderAdminMots(liste) {
  $('#admin-mots-titre').text(`Mots : ${liste.nom}`);
  const tousLesMots = DB.getMots() || [];
  const mots        = tousLesMots.filter(m => liste.motsIds && liste.motsIds.includes(m.id));
  const $c          = $('#admin-mots-list').empty();

  if (!mots.length) {
    $c.html('<div class="admin-empty">Aucun mot. Appuyez sur ＋ pour en ajouter.</div>');
    return;
  }
  mots.forEach(mot => {
    const imgHtml = mot.image
      ? `<img src="${mot.image}" alt="" onerror="this.style.display='none'">`
      : '🔤';
    const $item   = $(`
      <div class="admin-item">
        <div class="admin-item-thumb">${imgHtml}</div>
        <div class="admin-item-info">
          <div class="admin-item-nom">${mot.word}</div>
        </div>
        <div class="admin-item-actions">
          <button class="admin-action-btn edit" title="Modifier">✏️</button>
          <button class="admin-action-btn del"  title="Supprimer">🗑️</button>
        </div>
      </div>`);
    $item.find('.edit').on('click', () => showMotForm(liste, mot));
    $item.find('.del').on('click',  () => confirmDeleteMot(liste, mot));
    $c.append($item);
  });
}

function showMotForm(liste, mot = null) {
  let selectedImg = mot ? mot.image : '';
  const bodyHtml  = `
    <div class="mb-3">
      <label class="form-label">Mot ou texte</label>
      <input id="f-mot-word" class="form-control" value="${mot ? mot.word : ''}">
    </div>
    <div class="mb-3">
      <label class="form-label">Image</label>
      <div id="f-mot-img-preview" class="form-img-preview form-img-preview-large">
        ${selectedImg ? `<img src="${selectedImg}" alt="">` : '<span class="img-placeholder-icon">🖼️</span>'}
      </div>
    </div>`;

  showFormModal(
    mot ? 'Modifier le mot' : 'Ajouter un mot',
    bodyHtml,
    function () {
      const word = $('#f-mot-word').val().trim();
      if (!word) { alert('Le texte est requis.'); return; }

      const mots   = DB.getMots()   || [];
      const listes = DB.getListes() || [];
      if (mot) {
        const i = mots.findIndex(m => m.id === mot.id);
        if (i >= 0) Object.assign(mots[i], { word, image: selectedImg });
      } else {
        const newId = generateId();
        mots.push({ id: newId, listeId: liste.id, word, image: selectedImg });
        const li = listes.findIndex(l => l.id === liste.id);
        if (li >= 0) { listes[li].motsIds = listes[li].motsIds || []; listes[li].motsIds.push(newId); }
        DB.saveListes(listes);
      }
      DB.saveMots(mots);
      formModal.hide();
      // Recharger la liste depuis le DB pour avoir les motIds à jour
      const listeActuelle = (DB.getListes() || []).find(l => l.id === liste.id);
      if (listeActuelle) renderAdminMots(listeActuelle);
    },
    'modal-lg'
  );

  $(document).off('click.motpicker').on('click.motpicker', '#f-mot-img-preview', function () {
    showImagePicker(selectedImg, function (src) {
      selectedImg = src;
      $('#f-mot-img-preview').html(`<img src="${src}" alt="">`);
      formModal.show();
    });
  });
}

function confirmDeleteMot(liste, mot) {
  showConfirmModal(`Supprimer le mot "${mot.word}" ?`, function () {
    DB.saveMots((DB.getMots() || []).filter(m => m.id !== mot.id));
    const listes = DB.getListes() || [];
    const li     = listes.findIndex(l => l.id === liste.id);
    if (li >= 0) listes[li].motsIds = (listes[li].motsIds || []).filter(id => id !== mot.id);
    DB.saveListes(listes);
    const listeActuelle = listes[li];
    if (listeActuelle) renderAdminMots(listeActuelle);
  });
}

// ============================================================
// ADMIN — IMAGES
// ============================================================

function renderAdminImages() {
  const customImages = DB.getCustomImages() || [];
  const $c = $('#admin-images-content').empty();

  // Section images personnalisées
  const $secCustom = $('<div class="admin-img-section">');
  const nbCustom = customImages.length;
  $secCustom.append(`
    <div class="admin-img-section-title">
      Images personnalisées
      <span class="admin-niveau-count">${nbCustom} image${nbCustom !== 1 ? 's' : ''}</span>
    </div>`);

  if (!nbCustom) {
    $secCustom.append('<div class="admin-empty-niveau" style="padding-left:0">Aucune image personnalisée. Appuyez sur ＋ pour en ajouter.</div>');
  } else {
    const $grid = $('<div class="admin-img-grid">');
    customImages.forEach(img => {
      const $card = $(`
        <div class="admin-img-card">
          <div class="admin-img-thumb-wrap">
            <img src="${img.src}" alt="${img.name}">
            <button class="admin-img-del-btn" title="Supprimer">🗑️</button>
          </div>
          <div class="admin-img-name">${img.name}</div>
        </div>`);
      $card.find('.admin-img-del-btn').on('click', () => confirmDeleteImage(img));
      $grid.append($card);
    });
    $secCustom.append($grid);
  }
  $c.append($secCustom);

  // Section images intégrées
  const $secBuiltin = $('<div class="admin-img-section">');
  const nbBuiltin = IMAGE_ASSETS.length;
  $secBuiltin.append(`
    <div class="admin-img-section-title">
      Images intégrées
      <span class="admin-niveau-count">${nbBuiltin} images</span>
    </div>`);

  const $gridBuiltin = $('<div class="admin-img-grid">');
  IMAGE_ASSETS.forEach(src => {
    const name = src.split('/').pop().replace(/\.[^.]+$/, '').replace(/_/g, ' ');
    $gridBuiltin.append(`
      <div class="admin-img-card">
        <div class="admin-img-thumb-wrap">
          <img src="${src}" alt="${name}" onerror="this.style.opacity='.3'">
        </div>
        <div class="admin-img-name">${name}</div>
      </div>`);
  });
  $secBuiltin.append($gridBuiltin);
  $c.append($secBuiltin);
}

function handleAddImage(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const tmpImg = new Image();
    tmpImg.onload = function () {
      const maxSize = 400;
      let w = tmpImg.width, h = tmpImg.height;
      if (w > maxSize || h > maxSize) {
        const ratio = Math.min(maxSize / w, maxSize / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width  = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(tmpImg, 0, 0, w, h);
      const src  = canvas.toDataURL('image/jpeg', 0.85);
      const name = file.name.replace(/\.[^.]+$/, '');
      const customImages = DB.getCustomImages() || [];
      customImages.push({ id: generateId(), name, src });
      DB.saveCustomImages(customImages);
      renderAdminImages();
    };
    tmpImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function confirmDeleteImage(img) {
  const nbMots   = (DB.getMots()   || []).filter(m => m.image   === img.src).length;
  const nbListes = (DB.getListes() || []).filter(l => l.image   === img.src).length;
  const utilise  = nbMots + nbListes;
  let msg = `Supprimer l'image "${img.name}" de la galerie ?`;
  if (utilise > 0) msg += ` (utilisée par ${utilise} élément(s) — elle restera affichée dans ceux-ci)`;
  showConfirmModal(msg, function () {
    DB.saveCustomImages((DB.getCustomImages() || []).filter(i => i.id !== img.id));
    renderAdminImages();
  });
}

// ============================================================
// ÉCRAN HISTORIQUE
// ============================================================

function renderHistorique(filtreEleveId = '') {
  const historique = DB.getHistorique() || [];
  const eleves     = (DB.getEleves()    || []).sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
  const listes     = DB.getListes()     || [];

  // Remplir le filtre élève (uniquement au premier chargement ou si vide)
  const $select = $('#histo-filtre-eleve');
  if ($select.find('option').length <= 1) {
    $select.find('option:not(:first)').remove();
    eleves.forEach(e => $select.append(`<option value="${e.id}">${e.nom}</option>`));
  }
  $select.val(filtreEleveId);

  // Filtrer + trier (plus récent en premier)
  let sessions = filtreEleveId
    ? historique.filter(h => h.eleveId === filtreEleveId)
    : historique;
  sessions = [...sessions].sort((a, b) => new Date(b.date) - new Date(a.date));

  const $list = $('#histo-list').empty();

  if (!sessions.length) {
    $list.html('<div class="admin-empty">Aucune session enregistrée.</div>');
    return;
  }

  sessions.forEach((entry, idx) => {
    const eleve  = eleves.find(e => e.id === entry.eleveId);
    const liste  = listes.find(l => l.id === entry.listeId);
    const total  = entry.motsReussis.length + entry.motsEchoues.length;
    const score  = total > 0 ? Math.round((entry.motsReussis.length / total) * 100) : 0;
    const couleur = score >= 80 ? '#43a047' : score >= 50 ? '#fb8c00' : '#e53935';

    const reussisHtml = entry.motsReussis.length
      ? entry.motsReussis.map(m => `<em>${m}</em>`).join(', ')
      : `<span class="histo-mots-vide">—</span>`;
    const echouesHtml = entry.motsEchoues.length
      ? entry.motsEchoues.map(m => `<em>${m}</em>`).join(', ')
      : `<span class="histo-mots-vide">—</span>`;

    const $card = $(`
      <div class="histo-card">
        <div class="histo-score-badge" style="background:${couleur}">${score}%</div>
        <div class="histo-body">
          <div class="histo-titre">${eleve ? eleve.nom : 'N/A'} — ${liste ? liste.nom : 'N/A'}</div>
          <div class="histo-date">${formatDate(entry.date)} &nbsp;·&nbsp; ${entry.motsReussis.length} / ${total}</div>
          <div class="histo-mots-ligne"><span class="label-ok">✓ Réussis :</span> ${reussisHtml}</div>
          <div class="histo-mots-ligne"><span class="label-fail">✗ Échoués :</span> ${echouesHtml}</div>
        </div>
        <button class="histo-del-btn" data-idx="${idx}" title="Supprimer">🗑️</button>
      </div>`);

    $card.find('.histo-del-btn').on('click', function () {
      showConfirmModal('Supprimer cette session ?', function () {
        const histo = DB.getHistorique() || [];
        // Retrouver par id ou par correspondance date+eleveId
        const i = histo.findIndex(h =>
          h.eleveId === entry.eleveId &&
          h.listeId === entry.listeId &&
          h.date    === entry.date
        );
        if (i >= 0) histo.splice(i, 1);
        DB.saveHistorique(histo);
        renderHistorique($('#histo-filtre-eleve').val());
      });
    });

    $list.append($card);
  });
}

// ============================================================
// INITIALISATION
// ============================================================

$(function () {
  initDefaultData();
  initModals();
  applyDarkMode(DB.getDarkMode());
  renderHome();

  // --- Accueil ---
  $('#btn-settings').on('click', function () { renderSettings(); Nav.show('screen-settings'); });
  $('#btn-darkmode').on('click', function () { applyDarkMode(!DB.getDarkMode()); renderSettings(); });

  // --- Élève ---
  $('#btn-back-eleve').on('click', function () { Nav.show('screen-home'); renderHome(); });

  // --- Évaluation ---
  $('#btn-back-evaluation').on('click', function () {
    if (evalState.eleve && evalState.niveau) renderEleve(evalState.eleve, evalState.niveau);
    Nav.show('screen-eleve');
  });
  $('#btn-reussi').on('click',     function () { recordEval(true);  });
  $('#btn-pas-reussi').on('click', function () { recordEval(false); });

  // --- Résultats ---
  $('#btn-terminer').on('click', function () { activeTabIdx = 0; renderHome(); Nav.show('screen-home'); });

  // --- Paramètres ---
  $('#btn-back-settings').on('click', function () { Nav.show('screen-home'); renderHome(); });
  $('#settings-darkmode').on('click', function () { applyDarkMode(!DB.getDarkMode()); renderSettings(); });
  $('#settings-go-eleves').on('click',    function () { renderAdminEleves();  Nav.show('screen-admin-eleves');  });
  $('#settings-go-niveaux').on('click',   function () { renderAdminNiveaux(); Nav.show('screen-admin-niveaux'); });
  $('#settings-go-listes').on('click',    function () { renderAdminListes();  Nav.show('screen-admin-listes');  });
  $('#settings-go-images').on('click',    function () { renderAdminImages();  Nav.show('screen-admin-images');  });
  $('#settings-go-historique').on('click',function () { renderHistorique();   Nav.show('screen-historique');    });

  // --- Admin images ---
  $('#btn-back-admin-images').on('click', function () { Nav.show('screen-settings'); });
  $('#btn-add-image').on('click',         function () { $('#add-image-input').val('').trigger('click'); });
  $('#add-image-input').on('change',      function () { handleAddImage(this.files[0]); });

  // --- Historique ---
  $('#btn-back-historique').on('click', function () { Nav.show('screen-settings'); });
  $('#histo-filtre-eleve').on('change', function () { renderHistorique($(this).val()); });

  // --- Admin élèves ---
  $('#btn-back-admin-eleves').on('click', function () { Nav.show('screen-settings'); });
  $('#btn-add-eleve').on('click',         function () { showEleveForm(); });
  $('#import-eleves-input').on('change',  function () { handleImportEleves(this.files[0]); });

  // --- Admin niveaux ---
  $('#btn-back-admin-niveaux').on('click', function () { Nav.show('screen-settings'); });
  $('#btn-add-niveau').on('click',         function () { showNiveauForm(); });

  // --- Admin listes ---
  $('#btn-back-admin-listes').on('click', function () { Nav.show('screen-settings'); });
  $('#btn-add-liste').on('click',         function () { showListeForm(); });

  // --- Admin mots ---
  $('#btn-back-admin-mots').on('click', function () {
    renderAdminListes();
    Nav.show('screen-admin-listes');
  });
  $('#btn-add-mot').on('click', function () {
    const liste = (DB.getListes() || []).find(l => l.id === adminListeCurrentId);
    if (liste) showMotForm(liste);
  });
});
