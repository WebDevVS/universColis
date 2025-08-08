const { getAll, getBySlug } = require('../services/articleService')
const articleController = require('express').Router()

// TODO replace by real controler
articleController.get('/', async (req, res) => {
  try {
    const articles = await getAll()
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": articles.map((article, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://www.comparateurfrais.fr/conseils/${article.slug}`,
        "name": article.cardTitle,
        "image": `https://www.comparateurfrais.fr/static/img/cardImg/${article.cardImg}`,
        "description": article.cardImgDescription
      }))
    };

    res.render('articles-list', {
      title: 'Conseils',
      bodyClass: 'articles-list-page',
      articles,
      structuredData: JSON.stringify(itemList, null, 2),
    })
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





