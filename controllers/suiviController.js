const suiviController = require('express').Router()

suiviController.get('/', (req, res) => {
    res.render('suivi', {
        title: 'Suivre mon colis',
        page: 'suivi',
        bodyClass: 'suivi-page',

        // SEO dynamique
        seoTitle: "Suivi de colis universel : 5 outils de tracking en un clic – UniversColis",
        seoDescription: "Suivez n’importe quel colis, même sans connaître le transporteur. Comparez 5 outils de tracking, sans compte, sur une seule page UniversColis.",
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
            "multi-tracker"
        ],
        canonicalUrl: "https://www.universcolis.fr/suivi",
        robots: "index, follow",

        publishedDate: "2025-08-25",
        modifiedDate: "2025-08-25",

        ogType: "website",
        ogTitle: "Suivi de colis universel : 5 outils de tracking en un clic – UniversColis",
        ogDescription: "Suivez vos colis avec 5 outils de tracking, sans compte ni inscription. Détection automatique du transporteur et comparatif des meilleurs trackers.",
        ogUrl: "https://www.universcolis.fr/suivi",
        ogImage: "https://www.universcolis.fr/static/img/og-image.png",
        ogLocale: "fr_FR",

        twitterCard: "summary_large_image",
        twitterTitle: "Suivi de colis universel : 5 outils de tracking en un clic – UniversColis",
        twitterDescription: "Suivez tous vos colis, même sans connaître le transporteur. Comparez les meilleurs outils de tracking sur UniversColis.",
        twitterImage: "https://www.universcolis.fr/static/img/og-image.png",

        structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebPage",
                    "name": "Suivi de colis universel",
                    "url": "https://www.universcolis.fr/suivi",
                    "description": "Page de suivi de colis permettant d’utiliser 5 outils de tracking différents sans compte, avec détection automatique du transporteur et comparatif des meilleurs trackers.",
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "UniversColis",
                        "url": "https://www.universcolis.fr/"
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://www.universcolis.fr/suivi?tracking={trackingNumber}",
                        "query-input": "required name=trackingNumber"
                    }
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
                }
            ]
        })
    })
})

module.exports = suiviController


