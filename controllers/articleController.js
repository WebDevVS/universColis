const { getAll, getBySlug } = require('../services/articleService')
const articleController = require('express').Router()

// TODO replace by real controler
articleController.get('/', async (req, res) => {
  try {
    const articles = await getAll();

    // SEO & Open Graph
    const seoTitle = "Conseils d’emballage : 12 guides pratiques pour protéger vos objets | UniversColis";
    const seoDescription = "Trouvez des guides d’emballage détaillés pour objets fragiles, électroniques, bouteilles, livres et plus. Conseils experts pour expédier sans casse.";
    const seoKeywords = [
      "guide emballage par objet",
      "conseils emballage spécialisés",
      "emballer objet fragile expert",
      "techniques emballage sécurisé",
      "guides emballage antiquités électronique",
      "conseils expédition par catégorie",
      "emballage professionnel objets",
      "protection transport fragile"
    ];
    const canonicalUrl = "https://www.universcolis.fr/conseils";
    const ogImage = "https://www.universcolis.fr/static/img/og-image.png";

    // JSON-LD hub (WebPage + CollectionPage + ImageObject)
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://www.universcolis.fr/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Conseils d'emballage"
            }
          ]
        },
        {
          "@type": "WebPage",
          "name": "Guides d'Emballage Sécurisé par Type d'Objet",
          "url": canonicalUrl,
          "description": seoDescription,
          "inLanguage": "fr",
          "isPartOf": {
            "@type": "WebSite",
            "name": "UniversColis",
            "url": "https://www.universcolis.fr"
          }
        },
        {
          "@type": "CollectionPage",
          "name": "Guides d'emballage spécialisés",
          "url": canonicalUrl,
          "about": "Collection complète de 12 guides d'emballage spécialisés pour tous types d'objets fragiles : antiquités, électronique, bouteilles, plantes, instruments, tableaux et plus.",
          "numberOfItems": articles.length,
          "audience": {
            "@type": "Audience",
            "audienceType": "Particuliers et professionnels expédiant des objets fragiles"
          },
          "hasPart": articles.map(article => ({
            "@type": "HowTo",
            "name": `Comment emballer ${article.cardTitle.toLowerCase()}`,
            "url": `https://www.universcolis.fr/conseils/${article.slug}`,
            "image": `https://www.universcolis.fr/static/img/cardImg/${article.cardImg}`,
            "description": article.cardImgDescription,
            "about": `Emballage sécurisé de ${article.cardTitle.toLowerCase()}`
          }))
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Comment choisir la bonne technique d'emballage pour mon objet ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Chaque type d'objet nécessite une technique spécifique. Nos 13 guides spécialisés couvrent antiquités, électronique, bouteilles, plantes, instruments, tableaux et plus. Sélectionnez votre catégorie d'objet pour des conseils experts."
              }
            },
            {
              "@type": "Question",
              "name": "Quels matériaux utiliser pour emballer des objets fragiles ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Les matériaux varient selon l'objet : papier bulle pour l'électronique, mousse prédécoupée pour les antiquités, sachets hermétiques pour les liquides, papier glassine pour les tableaux. Consultez nos guides par catégorie."
              }
            },
            {
              "@type": "Question",
              "name": "Comment éviter la casse lors de l'expédition ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Utilisez un emballage adapté au type d'objet, du calage efficace, des étiquettes 'Fragile' et choisissez un transporteur fiable. Nos guides détaillent les techniques par catégorie d'objet."
              }
            }
          ]
        },
        {
          "@type": "Organization",
          "name": "UniversColis",
          "url": "https://www.universcolis.fr",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.universcolis.fr/static/img/logo.png"
          },
          "expertise": "Comparaison de tarifs d'expédition et conseils d'emballage spécialisés"
        },
        {
          "@type": "ImageObject",
          "contentUrl": ogImage,
          "url": ogImage,
          "width": 1200,
          "height": 630,
          "caption": "Guides d'emballage sécurisé par type d'objet - UniversColis"
        }
      ]
    };

    // ItemList pour Google (déjà présent)
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Guides d'emballage par catégorie d'objet",
      "description": "Liste complète des guides d'emballage spécialisés pour tous types d'objets fragiles",
      "numberOfItems": articles.length,
      "itemListElement": articles.map((article, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "HowTo",
          "name": article.cardTitle,
          "url": `https://www.universcolis.fr/conseils/${article.slug}`,
          "image": `https://www.universcolis.fr/static/img/cardImg/${article.cardImg}`,
          "description": article.cardImgDescription,
          "about": `Techniques d'emballage sécurisé pour ${article.cardTitle.toLowerCase()}`
        }
      }))
    };

    res.render('articles-list', {
      title: 'Conseils d’emballage',
      page: 'article',
      bodyClass: 'articles-list-page',
      imageClass: 'img-articles',
      articles,

      // SEO
      seoTitle,
      seoDescription,
      seoKeywords,
      canonicalUrl,
      robots: "index, follow",

      publishedDate: "2025-08-25",
      modifiedDate: "2025-08-25",

      // Open Graph / Twitter
      ogType: "website",
      ogTitle: seoTitle,
      ogDescription: seoDescription,
      ogUrl: canonicalUrl,
      ogImage,
      ogLocale: "fr_FR",
      ogSiteName: "UniversColis",
      twitterCard: "summary_large_image",
      twitterTitle: seoTitle,
      twitterDescription: seoDescription,
      twitterImage: ogImage,

      // JSON-LD
      structuredData: JSON.stringify(structuredData),
      itemListStructuredData: JSON.stringify(itemList)
    });
  } catch (err) {
    console.error("Erreur lors de l'accès aux articles :", err)
    res.status(500).send('Erreur serveur')
  }
})

// Redirect 301 — ancienne URL vers nouvelle
articleController.get('/comment-emballer-des-antiquites', (req, res) => {
  res.redirect(301, '/conseils/expedier-oeuvre-art-fragile')
})

articleController.get('/:slug', async (req, res) => {
  try {
    const article = await getBySlug(req.params.slug);

    if (!article) {
      return res.status(404).send("Article non trouvé");
    }

        // Choix du template selon la version du guide
    const template = article.version === 'v2' ? 'article' : 'article_old';

    res.render(template, {
      bodyClass: 'article-page',
      page: 'article',
      imageClass: 'img-articles',
      needsGallery: true,
      article,
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
      seoKeywords: article.seoKeywords,
      canonicalUrl: article.canonicalUrl,
      ogType: article.ogType,
      ogTitle: article.ogTitle,
      ogDescription: article.ogDescription,
      ogImage: article.ogImage,
      twitterTitle: article.twitterTitle,
      twitterDescription: article.twitterDescription,
      twitterImage: article.twitterImage,
      author: article.author,
      publishedDate: article.publishedDate,
      modifiedDate: article.modifiedDate,
      structuredData: typeof article.structuredData === 'string'
        ? article.structuredData
        : JSON.stringify(article.structuredData, null, 2)
    });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
})

module.exports = articleController





