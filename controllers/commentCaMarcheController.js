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
                {
                    "@type": "HowTo",
                    "name": "Envoyer un colis avec UniversColis",
                    "description": "Guide en 3 étapes pour comparer et expédier un colis facilement, sans inscription.",
                    "image": "https://www.universcolis.fr/static/img/og-image.png",
                    "totalTime": "PT2M",
                    "supply": [],
                    "tool": [],
                    "step": [
                        {
                            "@type": "HowToStep",
                            "position": 1,
                            "name": "Recherche rapide",
                            "text": "Indiquez simplement le pays de destination et le poids du colis. Pas besoin d’adresse complète ni de dimensions."
                        },
                        {
                            "@type": "HowToStep",
                            "position": 2,
                            "name": "Comparez les offres",
                            "text": "Classez les résultats par prix, délai ou mode de livraison (relais, domicile, etc.)."
                        },
                        {
                            "@type": "HowToStep",
                            "position": 3,
                            "name": "Envoyez sans inscription",
                            "text": "Sélectionnez l’offre et finalisez l’envoi directement sur le site du transporteur partenaire, sans créer de compte sur UniversColis."
                        }
                    ]
                }
            ]
        })
    });
});

module.exports = commentCaMarcheController;

