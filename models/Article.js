const { Schema, model } = require('mongoose')

const articleSchema = new Schema({

  // ════════════════════════════════════════════════════════
  // CHAMPS COMMUNS — présents en v1 ET v2
  // ════════════════════════════════════════════════════════

  // Identification
  title:              { type: String, required: true },
  slug:               { type: String, required: true, unique: true },
  menuTitle:          { type: String, required: true, unique: true },

  // Routing template — absent sur les docs v1 existants (pas de migration nécessaire)
  // undefined ou absent → article_old / 'v2' → article
  version:            { type: String, enum: ['v1', 'v2'] },

  // Carte sur /conseils
  cardTitle:          { type: String, required: true },
  cardTeaser:         { type: String, required: true },
  cardImg:            { type: String, required: true },
  cardImgAlt:         { type: String, required: true },
  cardImgDescription: { type: String, required: true },
  cardImgName:        { type: String, required: true },
  idCard:             { type: String, required: true },

  // Métadonnées communes
  readingTime:        { type: Number },
  author:             { type: String },
  publishedDate:      { type: Date },
  modifiedDate:       { type: Date },

  // SEO commun
  seoTitle:           { type: String },
  seoDescription:     { type: String },
  seoKeywords:        [{ type: String }],
  headline:           { type: String },
  canonicalUrl:       { type: String },

  // Open Graph commun
  ogType:             { type: String },
  ogTitle:            { type: String },
  ogDescription:      { type: String },
  ogImage:            { type: String },

  // Twitter Card commun
  twitterTitle:       { type: String },
  twitterDescription: { type: String },
  twitterImage:       { type: String },

  // Structured data — Mixed dans les deux versions
  structuredData:     { type: Schema.Types.Mixed },


  // ════════════════════════════════════════════════════════
  // CHAMPS V1 UNIQUEMENT
  // ════════════════════════════════════════════════════════

  introduction:       { type: String },
  summary:            [{ type: String }],
  astuce:             { type: String },
  etapeWord:          { type: String },
  materialsWord:      { type: String },

  // Étapes v1
  steps: [{
    title:            { type: String },
    description:      { type: String },
    image:            { type: String },
    imageAlt:         { type: String },
    figcaption:       { type: String },
    imageDescription: { type: String },
    imageName:        { type: String },
  }],

  // Matériaux v1
  materials: [{
    name:             { type: String },
    description:      { type: String },
    hasSizes:         { type: Boolean, default: false },
    optionsBadge:     { type: String },
    order:            { type: Number },
    links: [{
      label:          { type: String },
      url:            { type: String },
      asin:           { type: String },
      category:       { type: String },
    }],
    sizes: [{
      label:          { type: String },
      dimensions:     { type: String },
      url:            { type: String },
      asin:           { type: String },
      category:       { type: String },
    }],
    sizeGuide:        { type: String },
    sizeNote:         { type: String },
  }],

  // Conseils v1
  packingTips: [{
    mistake:          { type: String },
    solution:         { type: String },
  }],

  // FAQ v1
  faq: [{
    question:         { type: String },
    responses: [{
      type:           { type: String, enum: ['positive', 'negative'] },
      text:           { type: String },
    }],
  }],


  // ════════════════════════════════════════════════════════
  // CHAMPS V2 UNIQUEMENT
  // ════════════════════════════════════════════════════════

  // Hero
  // heroIntro : phrase d'accroche en italique sous le h1
  // heroPills : badges ["⏱ 12 min", "📋 3 parties", "🔗 Sources 2026"]
  heroIntro:          { type: String },
  heroPills:          [{ type: String }],

  // Bloc "En bref" — encadré violet en haut de page
  // text  : paragraphe principal en italique
  // pills : badges résumé ["📌 Emballage = structure"...]
  enBref: {
    text:             { type: String },
    pills:            [{ type: String }],
  },

  // Mention mise à jour — texte affiché en bas de page
  updateNote:         { type: String },

  // Sources — liste cliquable en bas de page
  // name    : texte du lien cliquable  ex: "La Poste"
  // url     : href du lien             ex: "https://laposte.fr/..."
  // article : description de la source ex: "Conditions générales Colissimo 2026"
  sources: [{
    name:             { type: String },
    url:              { type: String },
    article:          { type: String },
  }],

  // ── Corps principal v2 ──────────────────────────────────
  // 3 parties fixes : préparation / emballage / assurance
  //
  // Chaque partie :
  //   id         : ancre HTML                  ex: "preparation"
  //   label      : affiché dans sticky nav     ex: "Préparation"
  //                ET dans le badge coloré du part-header (CSS text-transform)
  //   partNum    : numéro 1/2/3 → génère p1/p2/p3 via HBS {{p{{partNum}}}}
  //   title      : h2 de la partie
  //   intro      : paragraphe sous le h2
  //   transition : phrase italique après la partie (optionnel)
  //
  // Chaque partie contient sections[] :
  //   h3     : titre de sous-section (optionnel)
  //   blocks : tableau ordonné — position dans le tableau = ordre d'affichage
  //
  // ── TYPES DE BLOCS PERMANENTS (tous les guides) ────────
  //
  //  "texte"
  //    { text: String }
  //    → Paragraphe de texte simple
  //
  //  "info-box"
  //    { variant: "info"|"tip"|"warn", icon: String, title: String, text: String }
  //    → Encadré coloré info/conseil/avertissement
  //
  //  "texte-image"
  //    { prose: [String], img: String, imgAlt: String, caption: String }
  //    → Texte + photo côte à côte
  //
  //  "materiaux"
  //    { items: [{ name: String, desc: String, url: String, label: String, dimensions?: String }] }
  //    → Bloc matériel recommandé avec boutons Amazon
  //
  //  "conseils-erreurs"
  //    { pairs: [{ good: String, bad: String }] }
  //    → Tableau À faire / À éviter côte à côte
  //
  //  "faq"
  //    { items: [{ question: String, answer: String }] }
  //    → Accordéon questions/réponses
  //
  //  "info-cas-particulier"
  //    { title: String, text: String }
  //    → Encadré pointillé "cas particulier"
  //
  //  "etapes"
  //    { steps: [{ num: Number, title: String, prose: [String], blocks: [Mixed] }] }
  //    → Liste d'étapes numérotées avec connecteur vertical
  //    → Chaque étape peut contenir ses propres blocs (récursif)
  //
  // ── TYPES DE BLOCS RARES (certains guides seulement) ───
  //
  //  "formula-box"
  //    { items: [{ value?: String, label?: String, operator?: String, color?: String }], footer: String }
  //    → Calcul visuel avec opérateurs (2kg × 23€ = 46€)
  //
  //  "schema-couches"
  //    { layers: [{ label: String, sub?: String, level: Number }], img?: String, imgAlt?: String }
  //    → Schéma en couches empilées (protection couche par couche)
  //
  //  "grid-cartes"
  //    { cards: [{ img: String, imgAlt: String, label: String, sub: String }] }
  //    → Grille de cartes illustrées (bois/métal/verre...)
  //
  //  "tableau"
  //    { headers: [String], rows: [{ level: String, calcul: String, when: String, color: String }] }
  //    → Tableau niveaux de couverture assurance
  //
  //  "tableau-mat"
  //    { rows: [{ material: String, usage: String, limit: String, limitType: "a"|"b" }] }
  //    → Tableau comparatif matériaux de calage
  //
  //  "flow-decision"
  //    { steps: [{ title: String, text: String }] }
  //    → Flow horizontal de décision avec flèches
  //
  //  "timeline-etapes"
  //    { steps: [{ icon: String, stepLabel: String, when: String, action: String, why: String }] }
  //    → Timeline procédure sinistre étape par étape
  //
  //  "grid-cartons"
  //    { cards: [{ img: String, imgAlt: String, type: String, when: String, recommended: Boolean }] }
  //    → Grille comparaison types de cartons avec photos
  //
  //  "procedure"
  //    { steps: [{ n: Number, text: String }] }
  //    → Liste numérotée simple avec bordure colorée
  //
  //  "grid-cout"
  //    { cards: [{ img: String, imgAlt: String, label: String, sub: String }] }
  //    → Grille 3 colonnes coût matériel/transport/assurance

  parts: [{
    id:               { type: String },
    label:            { type: String },
    partNum:          { type: Number },
    title:            { type: String },
    intro:            { type: String },
    heroSub:    { type: String },
    transition:       { type: String },

    sections: [{
      h3:             { type: String },
      blocks:         [{ type: Schema.Types.Mixed }],
    }],
  }],

}, { collection: 'articles' })

const Article = model('Article', articleSchema)
module.exports = Article