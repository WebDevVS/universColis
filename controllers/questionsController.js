const questionsController = require('express').Router()
const questionsService = require('../services/questionsService');

// TODO replace by real controler
questionsController.get('/', async (req, res) => {
  try {
    // Récupère toutes les questions
    const allQuestions = await questionsService.getAll();
    // Catégories à afficher
    const categories = [
      'tarifs', 'suivi', 'transporteurs', 'livraison', 'dimensions', 'international', 'assurance', 'divers'
    ];
    // Compte le nombre de questions par catégorie
    const questionCounts = {};
    categories.forEach(cat => {
      questionCounts[cat] = allQuestions.filter(q => q.category === cat).length;
    });

    // SEO + structured data for the questions catalogue
    const seoTitle = 'Questions fréquentes sur l\'envoi de colis – UniversColis';
    const seoDescription = 'Retrouvez nos questions/réponses sur l\'envoi de colis : tarifs, suivi, transporteurs, dimensions, livraison, international, assurance et conseils pratiques.';
    const canonicalUrl = 'https://www.universcolis.fr/questions';

    // Build a lightweight FAQ summary from top categories (static for catalogue)
    const faqEntities = [
      {
        "@type": "Question",
        "name": "Comment calculer le prix d\'un envoi ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Consultez notre rubrique Tarifs & Prix pour comprendre les éléments qui composent le coût d\'un envoi." }
      },
      {
        "@type": "Question",
        "name": "Comment suivre un colis sans connaître le transporteur ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Utilisez notre outil de suivi universel : entrez le numéro et testez plusieurs trackers proposés par UniversColis." }
      }
    ];

    const structuredData = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.universcolis.fr/#website",
          "name": "UniversColis",
          "url": "https://www.universcolis.fr/",
          "inLanguage": "fr-FR",
          "description": "UniversColis : comparateur d\'expédition, suivi de colis, conseils et actualités.",
          "publisher": { "@id": "https://www.universcolis.fr/#org" },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.universcolis.fr/questions?q={query}",
            "query-input": "required name=query"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://www.universcolis.fr/#org",
          "name": "UniversColis",
          "url": "https://www.universcolis.fr/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.universcolis.fr/static/img/logo.png"
          }
        },
        {
          "@type": "WebPage",
          "@id": "https://www.universcolis.fr/questions#webpage",
          "name": "Questions - UniversColis",
          "url": "https://www.universcolis.fr/questions",
          "inLanguage": "fr-FR",
          "isPartOf": { "@id": "https://www.universcolis.fr/#website" },
          "description": "Foire aux questions autour de l\'envoi de colis : tarifs, suivi, transporteurs, dimensions, livraison, international et assurance."
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.universcolis.fr/questions#faq",
          "mainEntity": faqEntities
        }
      ]
    });

    res.render('questions-catalogue', {
      title: 'Questions',
      bodyClass: 'questions-page',
      imageClass: 'img-questions',
      questionCounts,
      // SEO fields used by main layout
      seoTitle,
      seoDescription,
      seoKeywords: [
        'questions envoi colis', 'tarifs colis', 'suivi colis', 'transporteurs', 'dimensions colis', 'delai livraison', 'assurance colis'
      ],
      canonicalUrl,
      robots: 'index, follow',
      publishedDate: (new Date()).toISOString().slice(0,10),
      modifiedDate: (new Date()).toISOString().slice(0,10),
      ogType: 'website',
      ogTitle: seoTitle,
      ogDescription: seoDescription,
      ogUrl: canonicalUrl,
      ogImage: 'https://www.universcolis.fr/static/img/og-image.png',
      twitterCard: 'summary_large_image',
      twitterTitle: seoTitle,
      twitterDescription: seoDescription,
      twitterImage: 'https://www.universcolis.fr/static/img/og-image.png',
      structuredData
    });
  } catch (err) {
    console.error("Erreur lors de l'accès aux articles :", err)
    res.status(500).send('Erreur serveur')
  }
})


questionsController.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;

    // Table de correspondance des catégories
    const categoryData = {
      tarifs: {
        label: 'Tarifs & Prix',
        icon: 'fa-solid fa-euro-sign',
        description: "Tout comprendre sur les coûts d'envoi, les méthodes de calcul et les tarifs des transporteurs"
      },
      suivi: {
        label: 'Suivi de colis',
        icon: 'fa-solid fa-map-location-dot',
        description: "Suivre vos colis en temps réel, décrypter les statuts de livraison et résoudre les blocages"
      },
      transporteurs: {
        label: 'Transporteurs',
        icon: 'fa-solid fa-truck',
        description: "Comparez les services, découvrez les spécificités de chaque transporteur et faites le bon choix pour vos envois"
      },
      livraison: {
        label: 'Délais de livraison',
        icon: 'fa-solid fa-clock',
        description: "Comprendre les temps d'acheminement, anticiper les retards et choisir la bonne option d'expédition"
      },
      dimensions: {
        label: 'Dimensions & Poids',
        icon: 'fa-solid fa-ruler-combined',
        description: "Maîtriser les limites de taille, calculer le poids volumétrique et éviter les mauvaises surprises"
      },
      international: {
        label: 'Envoi international',
        icon: 'fa-solid fa-globe',
        description: "Naviguer les procédures douanières, préparer les documents requis et gérer les taxes internationales"
      },
      assurance: {
        label: 'Assurance & Litiges',
        icon: 'fa-solid fa-shield-halved',
        description: "Protéger vos envois, comprendre vos droits et résoudre efficacement les problèmes de livraison"
      },
      divers: {
        label: 'Divers',
        icon: 'fa-solid fa-circle-question',
        description: "Conseils pratiques sur l'emballage, les étiquettes et toutes vos autres questions d'expédition"
      }
    };

    // Récupère les infos de la catégorie
    const data = categoryData[category] || { label: category, icon: '', description: '' };

    // Récupère les questions de la catégorie depuis le service
    const questions = await questionsService.getByCategory(category);
    const questionsCount = questions.length;

    // Tableau des catégories pour la section "Voir aussi"
    const categoriesList = [
      {key: 'tarifs', label: 'Questions sur les tarifs & prix', icon: 'fa-euro-sign', class: 'icon-tarifs'},
      {key: 'suivi', label: 'Questions sur le suivi de colis', icon: 'fa-map-location-dot', class: 'icon-suivi'},
      {key: 'transporteurs', label: 'Questions sur les transporteurs', icon: 'fa-truck', class: 'icon-transporteurs'},
      {key: 'livraison', label: 'Questions sur les délais de livraison', icon: 'fa-clock', class: 'icon-delais'},
      {key: 'dimensions', label: 'Questions sur les dimensions et poids', icon: 'fa-ruler-combined', class: 'icon-dimensions'},
      {key: 'international', label: "Questions sur l'envoi international", icon: 'fa-globe', class: 'icon-international'},
      {key: 'assurance', label: "Questions sur l'assurance & litiges", icon: 'fa-shield-halved', class: 'icon-assurance'},
      {key: 'divers', label: 'Questions diverses', icon: 'fa-circle-question', class: 'icon-divers'}
    ];

    // Build ItemList for structured data
    const itemListElements = questions.map((q, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://www.universcolis.fr/questions/${category}/${q.slug}`,
      "name": q.title
    }));

    // Build FAQ entries if question objects include faq-like fields or resume; fall back to titles
    const faqFromQuestions = questions.slice(0, 10).map(q => ({
      "@type": "Question",
      "name": q.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.quickAnswer || q.excerpt || ''
      }
    }));

    const structuredDataCategory = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.universcolis.fr/#website",
          "name": "UniversColis",
          "url": "https://www.universcolis.fr/",
          "inLanguage": "fr-FR",
          "publisher": { "@id": "https://www.universcolis.fr/#org" }
        },
        {
          "@type": "Organization",
          "@id": "https://www.universcolis.fr/#org",
          "name": "UniversColis",
          "url": "https://www.universcolis.fr/",
          "logo": { "@type": "ImageObject", "url": "https://www.universcolis.fr/static/img/logo.png" }
        },
        {
          "@type": "WebPage",
          "@id": `https://www.universcolis.fr/questions/${category}#webpage`,
          "name": `Questions - ${data.label} - UniversColis`,
          "url": `https://www.universcolis.fr/questions/${category}`,
          "inLanguage": "fr-FR",
          "isPartOf": { "@id": "https://www.universcolis.fr/#website" },
          "description": data.description
        },
        {
          "@type": "ItemList",
          "@id": `https://www.universcolis.fr/questions/${category}#list`,
          "itemListElement": itemListElements
        },
        {
          "@type": "FAQPage",
          "@id": `https://www.universcolis.fr/questions/${category}#faq`,
          "mainEntity": faqFromQuestions
        }
      ]
    });

    const seoTitle = `Questions ${data.label} – UniversColis`;
    const seoDescription = data.description || `Questions et réponses sur ${data.label}`;
    const canonicalUrl = `https://www.universcolis.fr/questions/${category}`;

    res.render('questions-categorie', {
      title: 'Questions ' + data.label,
      bodyClass: 'questions-page',
      imageClass: 'img-questions',
      category,
      categoryLabel: data.label,
      categoryIcon: data.icon,
      categoryDescription: data.description,
      questionsCount,
      questions, // Passe la liste à la vue
      categories: categoriesList, // Pour la section "Voir aussi"
      // SEO fields
      seoTitle,
      seoDescription,
      seoKeywords: [data.label, 'questions envoi colis', 'FAQ', 'universcolis'],
      canonicalUrl,
      robots: 'index, follow',
      publishedDate: (new Date()).toISOString().slice(0,10),
      modifiedDate: (new Date()).toISOString().slice(0,10),
      ogType: 'website',
      ogTitle: seoTitle,
      ogDescription: seoDescription,
      ogUrl: canonicalUrl,
      ogImage: 'https://www.universcolis.fr/static/img/og-image.png',
      twitterCard: 'summary_large_image',
      twitterTitle: seoTitle,
      twitterDescription: seoDescription,
      twitterImage: 'https://www.universcolis.fr/static/img/og-image.png',
      structuredData: structuredDataCategory
    });
  } catch (err) {
    console.error("Erreur lors de l'accès aux questions :", err);
    res.status(500).send('Erreur serveur');
  }
});


// Route dynamique pour chaque question par son slug (à placer AVANT la route catégorie)
questionsController.get('/:category/:slug', async (req, res) => {
  try {
    const { category, slug } = req.params;
    const question = await questionsService.getBySlugAndCategory(slug, category);

    if (!question) {
      return res.status(404).render('404', { title: 'Question non trouvée' });
    }

    // Table de correspondance des catégories pour le label
    const categoryData = {
      tarifs: { label: 'Tarifs & Prix', icon: 'fa-solid fa-euro-sign', colorClass: 'icon-tarifs' },
      suivi: { label: 'Suivi de colis', icon: 'fa-solid fa-map-location-dot', colorClass: 'icon-suivi' },
      transporteurs: { label: 'Transporteurs', icon: 'fa-solid fa-truck', colorClass: 'icon-transporteurs' },
      livraison: { label: 'Délais de livraison', icon: 'fa-solid fa-clock', colorClass: 'icon-delais' },
      dimensions: { label: 'Dimensions & Poids', icon: 'fa-solid fa-ruler-combined', colorClass: 'icon-dimensions' },
      international: { label: 'Envoi international', icon: 'fa-solid fa-globe', colorClass: 'icon-international' },
      assurance: { label: 'Assurance & Litiges', icon: 'fa-solid fa-shield-halved', colorClass: 'icon-assurance' },
      divers: { label: 'Divers', icon: 'fa-solid fa-circle-question', colorClass: 'icon-divers' }
    };

    // Transforme le tableau categoryLabels en [{key, label}]
    let categoryLabels = null;
    if (Array.isArray(question.categoryLabels) && question.categoryLabels.length > 0) {
      categoryLabels = question.categoryLabels.map(catKey => ({
        key: catKey,
        label: categoryData[catKey] ? categoryData[catKey].label : catKey,
        icon: categoryData[catKey] ? categoryData[catKey].icon : '',
        colorClass: categoryData[catKey] ? categoryData[catKey].colorClass : ''
      }));
    }

    // Pour compatibilité, garde categoryLabel unique si besoin
    const categoryLabel = categoryData[category] ? categoryData[category].label : category;

    // Récupère toutes les questions de la catégorie, triées (par date ou par ordre voulu)
    const questionsInCategory = await questionsService.getByCategory(category);

    // Trouve l'index de la question courante
    const index = questionsInCategory.findIndex(q => q.slug === slug);

    // Précédente et suivante
    const prev = index > 0 ? questionsInCategory[index - 1] : null;
    const next = index < questionsInCategory.length - 1 ? questionsInCategory[index + 1] : null;

    res.render('question', {
      ...question,
      page: 'question',
      imageClass: 'img-questions',
      categoryLabels,
      categoryLabel,
      bodyClass: 'questions-page',
      prevSlug: prev ? prev.slug : null,
      nextSlug: next ? next.slug : null,
      category,
      structuredData: question.structuredData
        ? JSON.stringify(question.structuredData, null, 2)
        : null
    });
  } catch (err) {
    console.error("Erreur lors de l'accès à la question :", err);
    res.status(500).send('Erreur serveur');
  }
});


module.exports = questionsController





