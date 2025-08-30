const { getAll, getBySlug } = require('../services/articleService')
const articleController = require('express').Router()

// TODO replace by real controler
articleController.get('/', async (req, res) => {
  try {
    const articles = await getAll();

    // SEO & Open Graph
    const seoTitle = "Conseils d’emballage : guides pratiques pour protéger vos objets | UniversColis";
    const seoDescription = "Trouvez des guides d’emballage détaillés pour objets fragiles, électroniques, bouteilles, livres et plus. Conseils experts pour expédier sans casse.";
    const seoKeywords = [
      "conseils emballage",
      "guide emballer colis",
      "protéger objet fragile",
      "emballer bouteille",
      "emballage électronique",
      "astuces colis",
      "sécurité expédition",
      "préparer envoi",
      "emballer livre",
      "emballer œuvre d’art"
    ];
    const canonicalUrl = "https://www.universcolis.fr/conseils";
    const ogImage = "https://www.universcolis.fr/static/img/og-image.png";

    // JSON-LD hub (WebPage + CollectionPage + ImageObject)
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "Conseils d’emballage",
          "url": canonicalUrl,
          "description": seoDescription,
          "inLanguage": "fr"
        },
        {
          "@type": "CollectionPage",
          "name": "Guides d’emballage",
          "url": canonicalUrl,
          "about": "Conseils pratiques pour emballer et protéger tout type d’objet avant expédition.",
          "hasPart": articles.map(article => ({
            "@type": "CreativeWork",
            "name": article.cardTitle,
            "url": `https://www.universcolis.fr/conseils/${article.slug}`,
            "image": `https://www.universcolis.fr/static/img/cardImg/${article.cardImg}`,
            "description": article.cardImgDescription
          }))
        },
        {
          "@type": "ImageObject",
          "contentUrl": ogImage,
          "url": ogImage,
          "width": 1200,
          "height": 630,
          "caption": "Conseils d’emballage UniversColis"
        }
      ]
    };

    // ItemList pour Google (déjà présent)
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": articles.map((article, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://www.universcolis.fr/conseils/${article.slug}`,
        "name": article.cardTitle,
        "image": `https://www.universcolis.fr/static/img/cardImg/${article.cardImg}`,
        "description": article.cardImgDescription
      }))
    };

    res.render('articles-list', {
      title: 'Conseils d’emballage',
      bodyClass: 'articles-list-page',
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

articleController.get('/:slug', async (req, res) => {
  try {
    const article = await getBySlug(req.params.slug);

    if (!article) {
      return res.status(404).send("Article non trouvé");
    }

    res.render('article', {
      bodyClass: 'article-page',
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





