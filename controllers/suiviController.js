const suiviController = require('express').Router()

suiviController.get('/', (req, res) => {
    res.render('suivi', {
        title: 'Suivre mon colis',
        page: 'suivi',
        bodyClass: 'suivi-page',

        // SEO dynamique
        seoTitle: "Suivi colis universel (5 trackers, auto-détection, couverture monde & France) | UniversColis",
        seoDescription: "Comparez 5 trackers (17TRACK, ParcelsApp, Postal Ninja…) pour un suivi complet. Détection auto du transporteur, outil gratuit et sans compte. Explications et avantages de chaque outil.",
        seoKeywords: [
            "suivi colis",
            "tracking international",
            "outil suivi colis",
            "numéro de suivi",
            "comparateur tracking",
            "suivi sans transporteur",
            "suivi livraison",
            "suivi colis France",
            "suivi colis international",
            "multi-tracker",
            "expédition internationale",
            "colis Chine",
            "colis Amazon",
            "colis Europe"
        ],
        canonicalUrl: "https://www.universcolis.fr/suivi",
        robots: "index, follow",

        publishedDate: "2025-08-25",
        modifiedDate: "2025-08-25",

        ogType: "website",
        ogTitle: "Suivi colis universel (5 trackers, auto-détection, couverture monde & France) | UniversColis",
        ogDescription: "Outil de suivi universel : comparez 5 trackers, auto-détection du transporteur, explications claires, interface multi-boutons, couverture mondiale et France.",
        ogUrl: "https://www.universcolis.fr/suivi",
        ogImage: "https://www.universcolis.fr/static/img/og-image.png",
        ogLocale: "fr_FR",

        twitterCard: "summary_large_image",
        twitterTitle: "Suivi colis universel (5 trackers, auto-détection, couverture monde & France) | UniversColis",
        twitterDescription: "Comparez 5 trackers pour un suivi complet. Outil gratuit, sans compte, explications transparentes et UX optimisée.",
        twitterImage: "https://www.universcolis.fr/static/img/og-image.png",

        structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "name": "UniversColis",
                    "url": "https://www.universcolis.fr/",
                    "description": "UniversColis : comparateur d’expédition, suivi colis universel, conseils et actualités.",
                    "publisher": {
                        "@id": "https://www.universcolis.fr/"
                    }
                },
                {
                    "@type": "WebPage",
                    "name": "Suivi colis universel",
                    "url": "https://www.universcolis.fr/suivi",
                    "description": "Outil de suivi universel fiable et multi-plateforme. Comparez 5 trackers, auto-détection du transporteur, explications claires, interface multi-boutons, couverture mondiale et France.",
                    "mainEntityOfPage": "https://www.universcolis.fr/suivi",
                    "isPartOf": {
                        "@id": "https://www.universcolis.fr/"
                    }
                },
                {
                    "@type": "HowTo",
                    "name": "Comment utiliser le suivi UniversColis ?",
                    "description": "Guide étape par étape pour suivre un colis sur UniversColis.",
                    "step": [
                        { "@type": "HowToStep", "text": "Entrez votre numéro de suivi dans le champ prévu." },
                        { "@type": "HowToStep", "text": "Cliquez sur 'Suivre'." },
                        { "@type": "HowToStep", "text": "Comparez les résultats des différents trackers proposés." }
                    ]
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Est-ce que je dois créer un compte ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Non, aucun compte n'est nécessaire. Entrez simplement votre numéro de suivi pour accéder aux résultats."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Mes informations sont-elles enregistrées ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Non, le numéro de suivi est transmis uniquement au service de tracking sélectionné. Rien n'est stocké sur UniversColis."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Pourquoi proposer plusieurs trackers ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Chaque outil de suivi a ses avantages. Certains détectent plus de transporteurs, d'autres sont plus rapides. UniversColis vous permet de comparer et de choisir le plus efficace pour votre colis."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Est-ce que je dois payer pour utiliser ces outils ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Non, tous les outils de suivi proposés sont gratuits et accessibles sans inscription."
                            }
                        }
                    ]
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "17TRACK",
                    "operatingSystem": "Web",
                    "applicationCategory": "WebApplication",
                    "url": "https://www.17track.net/fr",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "EUR"
                    },
                    "description": "Suivi pour plus de 2 400 transporteurs mondiaux, détection automatique du transporteur, données officielles synchronisées."
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "ParcelsApp",
                    "operatingSystem": "Web",
                    "applicationCategory": "WebApplication",
                    "url": "https://parcelsapp.com/fr",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "EUR"
                    },
                    "description": "Prise en charge des envois UPU et de nombreux transporteurs internationaux, vérifie plusieurs sources officielles."
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "Track.Global",
                    "operatingSystem": "Web",
                    "applicationCategory": "WebApplication",
                    "url": "https://track.global/fr",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "EUR"
                    },
                    "description": "Fiable pour les commandes provenant d’Asie et les transporteurs peu référencés."
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "Postal Ninja",
                    "operatingSystem": "Web",
                    "applicationCategory": "WebApplication",
                    "url": "https://postal.ninja/fr",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "EUR"
                    },
                    "description": "Interface en français, spécialisée dans le suivi Europe / France avec peu de publicité."
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "Track123",
                    "operatingSystem": "Web",
                    "applicationCategory": "WebApplication",
                    "url": "https://www.track123.com/",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "EUR"
                    },
                    "description": "Optimisé pour les expéditions en provenance de la Chine (AliExpress, Cainiao, Shein)."
                }
            ]
        })
    })
})

module.exports = suiviController


