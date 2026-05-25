# Évaluation Maternelle

Application web de suivi d'évaluation de lecture pour les classes maternelles.  
Elle permet aux enseignants d'évaluer, mot par mot ou image par image, les compétences de chaque élève sur des listes de vocabulaire thématiques.

---

## Fonctionnalités

- **Évaluation mot par mot** — boutons Réussi / Pas réussi, mots mélangés aléatoirement (Fisher-Yates)
- **Évaluation par images** — liste d'images sans texte affiché
- **Historique des sessions** — consultable et filtrable par élève, avec score et détail des mots réussis/échoués
- **Gestion complète** (CRUD) des élèves, niveaux, listes de mots et images
- **Import d'élèves** depuis un fichier `.txt` ou `.csv` (un prénom par ligne)
- **Galerie d'images** — consultation, ajout (JPEG/PNG/GIF/WebP/BMP/SVG) et suppression d'images personnalisées
- **Mode sombre** — activable depuis l'accueil ou les paramètres
- **100 % hors-ligne** — aucune connexion réseau requise, fonctionne en `file://` ou serveur statique

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Structure | HTML5 — fichier unique `index.html` |
| Style | CSS3 custom + Bootstrap 5.3.2 (local) |
| Logique | JavaScript ES6+ vanilla, mode strict |
| DOM / Événements | jQuery 3.7.1 (local) |
| Persistance | `localStorage` uniquement |
| Serveur (optionnel) | WAMP / `python -m http.server` |

> Aucun TypeScript · Aucun framework SPA · Aucun outil de build

---

## Structure des fichiers

```
EvaluationMaternelle/
├── index.html                        # Application complète (HTML + 11 écrans + 3 modales)
├── asset/
│   ├── css/
│   │   ├── style.css                 # Styles custom (thème DeepPurple, responsive, dark mode)
│   │   └── bootstrap.min.css         # Bootstrap 5.3.2 — embarqué hors-ligne
│   ├── js/
│   │   ├── app.js                    # Toute la logique applicative
│   │   ├── bootstrap.bundle.min.js
│   │   └── jquery-3.7.1.min.js
│   └── images/                       # Images PNG intégrées (vocabulaire illustré)
├── CLAUDE.md                         # Documentation technique pour Claude Code
├── Architecture_EvaluationMaternelle.docx
├── .gitignore
└── README.md
```

---

## Lancement

### Option 1 — WAMP (Windows)

Placer le dossier dans `C:\wamp64\www\` puis ouvrir :  
`http://localhost/EvaluationMaternelle/`

### Option 2 — Serveur Python

```bash
cd EvaluationMaternelle
python -m http.server 8080
# puis ouvrir http://localhost:8080
```

### Option 3 — Fichier local

Ouvrir `index.html` directement dans le navigateur (double-clic).

---

## Écrans

| Écran | Rôle |
|-------|------|
| Accueil | Liste des élèves par niveau (onglets) |
| Détail élève | Listes d'activités disponibles |
| Évaluation | Évaluation mot par mot / image par image |
| Résultats | Score et bilan détaillé de la session |
| Paramètres | Accès aux administrations |
| Gestion des Élèves | CRUD élèves groupés par niveau, import fichier, suppression de niveau |
| Gestion des Niveaux | CRUD niveaux (nom, couleur, ordre) |
| Gestion des Listes | CRUD listes de vocabulaire |
| Gestion des Mots | CRUD mots d'une liste avec sélecteur d'image |
| Gestion des Images | Galerie intégrée + images personnalisées (ajout/suppression) |
| Historique | Sessions passées filtrables par élève |

---

## Persistance — clés localStorage

| Clé | Contenu |
|-----|---------|
| `em_niveaux` | Niveaux scolaires |
| `em_eleves` | Élèves avec référence au niveau |
| `em_listes` | Listes de vocabulaire |
| `em_mots` | Mots individuels liés à une liste |
| `em_historique` | Sessions d'évaluation passées |
| `em_custom_images` | Images personnalisées (base64 JPEG) |
| `em_darkmode` | Préférence mode sombre (locale) |

---

## Données par défaut

À la première ouverture, l'application initialise automatiquement :

- **3 niveaux** : Petit (bleu), Moyen (vert), Grand (rose)
- **6 listes thématiques** : Mots 1, Mots 2, Mots 3, Couleur des émotions, Je me sens, Les mots de l'école
- **9 élèves** (3 par niveau) pour une démonstration immédiate

---

## Import d'élèves

Format du fichier (`.txt` ou `.csv`) :

```
# Optionnel : ligne de commentaire ignorée
Prénom1
Prénom2
Prénom3
```

Ou CSV (la première colonne est utilisée, l'en-tête `Nom` est ignoré automatiquement) :

```
Nom,Classe
Alice,CE1
Bob,CE1
```

---

## Gestion des images personnalisées

- **Formats acceptés** : JPEG, PNG, GIF, WebP, BMP, SVG
- **Redimensionnement automatique** : max 400 × 400 px, proportions conservées
- **Stockage** : JPEG 85 % en base64 dans `localStorage` (~5 Mo disponibles)
- Les images personnalisées apparaissent en premier dans le sélecteur d'images

---

## Compatibilité

| Navigateur | Support |
|------------|---------|
| Chrome 90+ (Android) | ✓ Recommandé |
| Firefox 88+ | ✓ |
| Safari 14+ | ✓ |
| Edge 90+ | ✓ |
| Internet Explorer | ✗ (ES6 requis) |

---

## Auteur

Patrick Chautard — patrick.chautard@free.fr
