const commentCaMarcheController = require('express').Router();

commentCaMarcheController.get('/', (req, res) => {
    res.render('commentCaMarche', {
        title: 'Comment ça marche ?',

        // --- SEO DYNAMIQUE ---
        seoTitle: "Comment envoyer un colis facilement ? | UniversColis",
        seoDescription: "Découvrez comment expédier un colis en 3 étapes simples : comparez les tarifs, choisissez le service, envoyez sans inscription. UniversColis, la solution rapide.",
        seoKeywords: [
            "envoyer un colis",
            "comparateur livraison",
            "frais d'expédition",
            "service colis rapide",
            "expédition internationale",
            "sans inscription",
            "transporteur colis",
            "livraison pas cher"
        ],
        canonicalUrl: "https://www.universcolis.fr/comment-ca-marche",
        author: "UniversColis",
        robots: "index, follow",

        publishedDate: "2025-08-25",
        modifiedDate: "2025-08-25",

        ogType: "article",
        ogTitle: "Comment envoyer un colis facilement ? | UniversColis",
        ogDescription: "Expédiez vos colis en France ou à l’international en 3 étapes : recherche rapide, comparaison, envoi direct. UniversColis simplifie l’expédition pour tous.",
        ogUrl: "https://www.universcolis.fr/comment-ca-marche",
        ogImage: "https://www.universcolis.fr/static/img/og-image.png",
        ogLocale: "fr_FR",

        twitterCard: "summary_large_image",
        twitterTitle: "Comment envoyer un colis facilement ? | UniversColis",
        twitterDescription: "UniversColis : expédiez vos colis en 3 étapes simples, sans inscription. Comparez prix, délais et modes de livraison.",
        twitterImage: "https://www.universcolis.fr/static/img/og-image.png",

        // --- JSON-LD STRUCTURED DATA ---
        structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "name": "UniversColis",
                    "url": "https://www.universcolis.fr",
                    "logo": "https://www.universcolis.fr/static/img/logo.png"
                },
                {
                    "@type": "WebPage",
                    "name": "Comment ça marche",
                    "url": "https://www.universcolis.fr/comment-ca-marche",
                    "description": "Expédiez un colis en 3 étapes simples avec UniversColis : recherche rapide, comparaison des offres, envoi direct sans inscription.",
                    "inLanguage": "fr",
                    "datePublished": "2025-08-25",
                    "dateModified": "2025-08-25",
                    "breadcrumb": {
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
                                "name": "Comment ça marche",
                                "item": "https://www.universcolis.fr/comment-ca-marche"
                            }
                        ]
                    }
                },
            ]
        })
    });
});

module.exports = commentCaMarcheController;

