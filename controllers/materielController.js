const { getAll } = require('../services/materielService')
const meterielController = require('express').Router()

meterielController.get('/', async (req, res) => {
  try {
    const materiels = await getAll()
    res.render('materiel', {
      title: 'Matériel d’emballage',
      page: 'materiel',
      bodyClass: 'materiel-page',
      imageClass: 'img-materiel',
      materiels,

      // SEO dynamique
      seoTitle: "Matériel d’emballage : guide complet des fournitures – UniversColis",
      seoDescription: "Découvrez tous les types de matériel d’emballage pour expédier vos colis en toute sécurité : boîtes, protections, rubans, étiquettes, outils et plus.",
      seoKeywords: [
        "matériel d'emballage",
        "fournitures colis",
        "types emballage",
        "protection colis",
        "boîtes expédition",
        "ruban adhésif",
        "étiquetage",
        "outils emballage",
        "emballage e-commerce",
        "liste emballage"
      ],
      canonicalUrl: "https://www.universcolis.fr/mon-materiel",
      robots: "index, follow",

      publishedDate: "2025-08-25",
      modifiedDate: "2025-08-25",

      ogType: "website",
      ogTitle: "Matériel d’emballage : guide complet des fournitures – UniversColis",
      ogDescription: "Référence des matériaux d’emballage pour colis : boîtes, protections, adhésifs, étiquettes, outils, essentiels pour expédier en toute confiance.",
      ogUrl: "https://www.universcolis.fr/mon-materiel",
      ogImage: "https://www.universcolis.fr/static/img/og-image.png",
      ogLocale: "fr_FR",

      twitterCard: "summary_large_image",
      twitterTitle: "Matériel d’emballage : guide complet des fournitures – UniversColis",
      twitterDescription: "Tout pour choisir le bon matériel d’emballage et expédier vos colis en toute sécurité.",
      twitterImage: "https://www.universcolis.fr/static/img/og-image.png",

      structuredData: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "name": "Matériel d’emballage",
            "url": "https://www.universcolis.fr/mon-materiel",
            "description": "Répertoire complet des matériaux et fournitures d’emballage pour colis : boîtes, protections, rubans, étiquettes, outils, essentiels pour expédier en toute sécurité.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "UniversColis",
              "url": "https://www.universcolis.fr/"
            }
          },
          {
            "@type": "ItemList",
            "name": "Catégories de matériel d’emballage",
            "itemListOrder": "http://schema.org/ItemListOrderAscending",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Boîtes & Contenants" },
              { "@type": "ListItem", "position": 2, "name": "Matériaux de Protection" },
              { "@type": "ListItem", "position": 3, "name": "Adhésifs & Rubans" },
              { "@type": "ListItem", "position": 4, "name": "Étiquetage & Identification" },
              { "@type": "ListItem", "position": 5, "name": "Outils de Coupe" },
              { "@type": "ListItem", "position": 6, "name": "Fournitures pour Cadeaux" },
              { "@type": "ListItem", "position": 7, "name": "Emballage E-commerce" },
              { "@type": "ListItem", "position": 8, "name": "Outils de Pesée & Mesure" },
              { "@type": "ListItem", "position": 9, "name": "Essentiels pour l'envoi" }
            ]
          }
        ]
      })
    })
  } catch (err) {
    console.error("Erreur lors de l'accès aux articles :", err)
    res.status(500).send('Erreur serveur')
  }
})

module.exports = meterielController
