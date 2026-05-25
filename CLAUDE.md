**Architecture Technique**
**EvaluationMaternelle**
Document de référence technique

Auteur : Patrick Chautard
Date : 23 mai 2026
Version 1.0

# Table des matières

# 1. Présentation du projet
EvaluationMaternelle est une application web de suivi d'évaluation de lecture pour les classes maternelles. Elle permet aux enseignants d'évaluer, mot par mot ou image par image, les compétences de chaque élève sur des listes de vocabulaire thématiques.
L'application est conçue pour fonctionner 100 % hors-ligne, sans serveur backend ni connexion réseau, directement depuis un navigateur sur tablette Android ou PC. Toutes les données sont persistées localement dans le navigateur.

## 1.1 Cas d'usage principaux
- Créer et gérer des élèves répartis par niveau (PS, MS, GS)
- Constituer des listes de mots ou d'images thématiques
- Lancer une séance d'évaluation mot par mot avec boutons Réussi / Pas réussi
- Consulter les résultats et l'historique de toutes les séances passées
- Administrer les niveaux, élèves, listes et mots via des écrans dédiés

## 1.2 Origine du projet
Ce projet est la réécriture complète d'une application Flutter/Dart (utilisant Hive comme base de données locale) en application web HTML5/CSS3/JavaScript pur, sans outil de build, pour maximiser la portabilité et la maintenabilité.

# 2. Stack Technique
L'application repose sur des technologies web standardisées, disponibles dans tous les navigateurs modernes, sans dépendance à un serveur ou à un outil de compilation.

| Couche | Technologie | Version | Rôle |
| --- | --- | --- | --- |
| Structure | HTML5 | W3C Living Standard | Fichier unique index.html — toutes les pages sont des <div> |
| Style | CSS3 custom | — | Variables CSS, composants, dark mode, responsive |
| Framework CSS | Bootstrap | 5.3.2 (local) | Modales, utilitaires, grille — embarqué hors-ligne |
| Logique | JavaScript | ES6+ strict mode | Toute la logique applicative — vanilla, aucun framework |
| DOM / Événements | jQuery | 3.7.1 (local) | Sélection DOM et gestion d'événements — embarqué hors-ligne |
| Persistance | localStorage | API Web standard | Stockage JSON dans le navigateur — pas de serveur ni de BDD |
| Serveur optionnel | WAMP / Python | Apache 2.x / Python 3.x | Serveur statique local pour le développement (non requis en prod) |

Aucun TypeScript, aucun Tailwind, aucun framework SPA (React/Vue/Angular), aucun outil de build (Webpack/Vite). Le fichier index.html s'ouvre directement depuis le système de fichiers ou via n'importe quel serveur statique.

# 3. Structure des Fichiers
L'arborescence est minimale et plate, pour faciliter le déploiement sur n'importe quel hébergement statique.

EvaluationMaternelle/
├── index.html                  # Application complète (HTML + 10 écrans + 3 modales)
├── asset/
│   ├── css/
│   │   ├── style.css           # Styles custom (thème, composants, responsive, dark mode)
│   │   └── bootstrap.min.css   # Bootstrap 5.3.2 — local, hors-ligne
│   ├── js/
│   │   ├── app.js              # Toute la logique applicative (~700 lignes)
│   │   ├── bootstrap.bundle.min.js
│   │   └── jquery-3.7.1.min.js
│   └── images/                 # 60 images PNG (vocabulaire illustré)
│       ├── animaux/
│       ├── fruits/
│       └── ...

# 4. Architecture Applicative
## 4.1 Patron SPA — Single Page Application
L'application est une SPA sans routeur : toutes les vues coexistent dans index.html sous forme de <div class="screen">. La navigation consiste à afficher un écran et masquer les autres via JavaScript (classe CSS active).
Ce patron évite tout rechargement de page et permet un fonctionnement complet en mode hors-ligne (protocole file://).

## 4.2 Écrans (10 vues)

| ID HTML | Nom | Rôle |
| --- | --- | --- |
| screen-home | Accueil | Liste des élèves par niveau (onglets PS / MS / GS) |
| screen-eleve | Détail élève | Listes d'activités disponibles pour un élève |
| screen-evaluation | Évaluation | Évaluation mot par mot / image par image |
| screen-resultats | Résultats | Score et bilan détaillé après une séance |
| screen-settings | Paramètres | Menu des réglages et accès aux admins |
| screen-historique | Historique | Liste des séances passées filtrables par élève |
| screen-admin-eleves | Admin Élèves | CRUD complet des élèves |
| screen-admin-niveaux | Admin Niveaux | CRUD complet des niveaux |
| screen-admin-listes | Admin Listes | CRUD complet des listes de mots |
| screen-admin-mots | Admin Mots | CRUD des mots d'une liste avec sélecteur d'image |

## 4.3 Modales Bootstrap (3 fenêtres réutilisables)

| ID | Rôle | Utilisation |
| --- | --- | --- |
| modal-form | Formulaire générique ajout/modification | Partagé pour tous les CRUD (élèves, niveaux, listes, mots) |
| modal-img-picker | Sélecteur d'image | Grille de 48 images PNG cliquables — s'ouvre depuis modal-form |
| modal-confirm | Confirmation de suppression | Dialogue de confirmation avant toute suppression |

## 4.4 Objet de Navigation (Nav)
L'objet Nav centralise la navigation et le contexte courant :
const Nav = {
currentScreen: null,   // ID de l'écran actif
currentEleveId: null,  // UUID de l'élève en cours
show(screenId) { ... } // Affiche l'écran, masque les autres
};

# 5. Persistance des Données — localStorage
## 5.1 Principe
Toutes les données sont sérialisées en JSON et stockées dans le localStorage du navigateur. Il n'y a ni base de données relationnelle, ni fichier externe, ni serveur. Les données persistent entre les sessions et survivent aux rechargements de page.
L'objet DB centralise tous les accès au localStorage :
const DB = {
getNiveaux()    { return JSON.parse(localStorage.getItem('em_niveaux') || '[]'); },
saveNiveaux(v)  { localStorage.setItem('em_niveaux', JSON.stringify(v)); },
getEleves()     { /* ... */ },
// idem pour listes, mots, historique, darkMode
};

## 5.2 Clés localStorage (6 entrées)

| Clé | Type | Contenu |
| --- | --- | --- |
| em_niveaux | Array<Niveau> | Niveaux scolaires (PS, MS, GS) |
| em_eleves | Array<Eleve> | Élèves avec leur niveauId de référence |
| em_listes | Array<Liste> | Listes de vocabulaire avec image de couverture |
| em_mots | Array<Mot> | Mots individuels liés à une liste (listeId) |
| em_historique | Array<Session> | Toutes les séances d'évaluation passées |
| em_darkmode | Boolean | Préférence d'affichage sombre (locale, non exportée) |

## 5.3 Modèles de Données (format JSON)
Tous les identifiants sont des UUID v4 générés côté client (fonction generateId()).

**Niveau :**
{ "id": "uuid-v4", "nom": "PS", "couleur": "#8AC5F5" }

**Élève :**
{ "id": "uuid-v4", "prenom": "Léa", "niveauId": "uuid-niveau" }

**Liste :**
{ "id": "uuid-v4", "nom": "Les Animaux", "image": "images/animaux/chat.png", "motsIds": ["uuid-m1", "uuid-m2"] }

**Mot :**
{ "id": "uuid-v4", "listeId": "uuid-liste", "word": "chat", "image": "images/animaux/chat.png" }

**Session d'historique :**
{
"id": "uuid-v4",
"eleveId": "uuid-eleve",
"listeId": "uuid-liste",
"niveauId": "uuid-niveau",
"date": "2026-05-23T10:30:00.000Z",
"score": 7, "total": 10,
"evaluations": [{ "motId": "...", "word": "chat", "reussi": true }, ...]
}

## 5.4 Données par Défaut
À la première ouverture, si aucune donnée n'est trouvée dans le localStorage, la fonction initDefaultData() initialise automatiquement :
- 3 niveaux : PS (Petite Section, bleu clair), MS (Moyenne Section, vert clair), GS (Grande Section, rose clair)
- 6 listes thématiques : Animaux, Fruits, Couleurs, Vêtements, Corps humain, Transport
- 48 mots illustrés (8 par liste) avec images PNG
- 9 élèves (3 par niveau) pour une démo immédiate

# 6. Organisation du Code JavaScript (app.js)
Le fichier app.js (~700 lignes) est organisé en sections fonctionnelles, sans classes ES6, conformément aux conventions du projet.

| Section | Fonctions principales | Rôle |
| --- | --- | --- |
| Utilitaires | generateId() | Génération UUID v4 en pur JS |
| Couche Données | DB.get/save*(), initDefaultData() | Accès localStorage, données initiales |
| Navigation | Nav.show(), applyDarkMode() | Changement d'écran, thème sombre |
| Accueil | renderHome() | Onglets par niveau + grille d'élèves 2 colonnes |
| Détail Élève | renderEleve() | Cartes d'activités par liste |
| Évaluation | renderEvaluation(), renderEvalMot(), recordEval(), finishEvaluation() | Moteur d'évaluation mot par mot, mélange Fisher-Yates |
| Résultats | renderResultats() | Score + liste détaillée ✓/✗ |
| Admin CRUD | render*Admin(), deleteItem() | Gestion complète élèves, niveaux, listes, mots |
| Historique | renderHistorique() | Sessions filtrées par élève |
| Modales | showFormModal(), showImagePicker(), showConfirmModal() | Formulaire générique, picker images, confirmation |
| Initialisation | $(function() { ... }) | Point d'entrée jQuery, tous les écouteurs d'événements |

## 6.1 Moteur d'Évaluation
L'état courant de l'évaluation est stocké dans l'objet evalState (non persisté) :
const evalState = {
eleve: null,         // Objet élève évalué
liste: null,         // Liste de mots
niveau: null,        // Niveau de l'élève
mots: [],            // Mots mélangés (Fisher-Yates)
currentIdx: 0,       // Index du mot courant
evaluations: [],     // Résultats accumulés
isImageList: false   // true si la liste est à base d'images
};

Le mélange des mots utilise l'algorithme de Fisher-Yates pour garantir une distribution uniforme aléatoire.

# 7. Design et Responsive
## 7.1 Thème Visuel — Material Design 3 DeepPurple
L'interface s'inspire du thème Material Design 3 DeepPurple, implémenté via des propriétés CSS custom dans :root :
:root {
--primary:        #6750A4;   /* Violet principal */
--primary-dark:   #4A3780;   /* Variante sombre */
--on-primary:     #FFFFFF;
--surface:        #FFFBFE;
--bg:             #F3EDF7;   /* Fond général */
--card-bg:        #FFFFFF;
--text:           #1C1B1F;
--text-secondary: #49454F;
}

## 7.2 Mode Sombre
Le mode sombre est activé en ajoutant data-bs-theme="dark" sur <html>. Les surcharges CSS sont regroupées sous [data-bs-theme="dark"] dans style.css. Il n'est pas exporté dans les données (préférence locale de l'appareil).

## 7.3 Points de Rupture Responsive

| Breakpoint | Condition CSS | Comportement |
| --- | --- | --- |
| Mobile | < 600px | Grilles 1 colonne, app-bar 56px, boutons compacts |
| Tablette portrait | ≥ 600px | Grilles 2 colonnes, app-bar 64px |
| Tablette paysage | ≥ 900px | Grilles 3 colonnes |
| Évaluation paysage | orientation:landscape + ≥ 600px + ≥ 400px | Image à gauche, mot/boutons à droite (flex-row) |

La propriété touch-action: manipulation est appliquée sur tous les boutons interactifs pour optimiser la réactivité sur écran tactile Android.

# 8. Flux de Navigation
Le flux principal de l'application suit le chemin suivant :

**Accueil → [clic sur un élève] → Détail Élève → [clic sur une liste] → Évaluation → Résultats → [Terminer] → Accueil**

Le flux d'administration est accessible depuis les Paramètres :

**Paramètres → Gérer les élèves / niveaux / listes → Admin correspondante → [listes] → Admin Mots**

| De | Vers | Déclencheur |
| --- | --- | --- |
| Accueil | Détail Élève | Clic sur une carte élève |
| Accueil | Paramètres | Bouton ⚙️ dans l'app-bar |
| Détail Élève | Accueil | Bouton ‹ retour |
| Détail Élève | Évaluation | Clic sur une carte d'activité |
| Évaluation | Résultats | Dernier mot évalué (automatique) |
| Évaluation | Détail Élève | Bouton ‹ abandonner (sans sauvegarder) |
| Résultats | Accueil | Bouton Terminer |
| Paramètres | Admin Élèves / Niveaux / Listes | Entrées du menu |
| Admin Listes | Admin Mots | Bouton ✏ contenu d'une liste |
| Paramètres | Historique | Entrée Consulter l'historique |

# 9. Gestion des Images
Les images sont des fichiers PNG statiques inclus dans le répertoire asset/images/. Elles sont organisées en sous-dossiers thématiques (animaux, fruits, couleurs, etc.).

Le sélecteur d'image (modal-img-picker) affiche les 48 images disponibles dans une grille CSS responsive. Le tableau IMAGE_ASSETS dans app.js liste tous les chemins relatifs :
const IMAGE_ASSETS = [
'images/animaux/chat.png',
'images/animaux/chien.png',
// ... 46 autres
];

Les chemins sont stockés tels quels dans localStorage et utilisés directement comme attribut src des balises <img>. Aucun traitement d'image côté client n'est réalisé.

# 10. Compatibilité Navigateurs et Déploiement
## 10.1 Compatibilité

| Navigateur / Plateforme | Support | Notes |
| --- | --- | --- |
| Chrome 90+ (Android) | ✓ Recommandé | Usage principal — tablettes enseignants |
| Firefox 88+ | ✓ Compatible | localStorage, CSS Grid, CSS custom properties |
| Safari 14+ | ✓ Compatible | iOS et macOS |
| Edge 90+ | ✓ Compatible | Windows 10/11 |
| Internet Explorer | ✗ Non supporté | ES6 requis — IE11 absent de la cible |

## 10.2 Modes de Déploiement

| Mode | Commande / Configuration | Usage |
| --- | --- | --- |
| Fichier local | Ouvrir index.html dans le navigateur | Développement, tests rapides |
| WAMP (Windows) | Dossier dans www/ — accès via localhost | Développement local Windows |
| Python http.server | python -m http.server 8080 | Développement multiplateforme |
| Hébergement statique | Copie du dossier sur tout serveur web | Production (GitHub Pages, Netlify, Apache…) |

Contrainte de déploiement : aucune dépendance réseau. L'application fonctionne intégralement sans connexion internet une fois les fichiers présents localement ou sur le serveur.