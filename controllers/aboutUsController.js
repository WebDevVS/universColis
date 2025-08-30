const aboutUsController = require('express').Router();

aboutUsController.get('/', (req, res) => {
    res.render('aboutUs', {
        title: 'Qui sommes-nous ?',

        // --- SEO DYNAMIQUE ---
        seoTitle: "Qui sommes-nous ? | UniversColis",
        seoDescription: "Découvrez l’équipe, la mission et les valeurs d’UniversColis, la plateforme indépendante qui simplifie l’envoi de colis pour tous.",
        seoKeywords: [
            "qui sommes-nous universcolis",
            "équipe universcolis",
            "comparateur frais de port",
            "startup logistique",
            "plateforme colis",
            "mission universcolis",
            "envoi colis international",
            "service indépendant",
            "transparence logistique"
        ],
        canonicalUrl: "https://www.universcolis.fr/qui-sommes-nous",
        author: "UniversColis",
        robots: "index, follow",

        publishedDate: "2025-08-25",
        modifiedDate: "2025-08-25",

        ogType: "website",
        ogTitle: "Qui sommes-nous ? | UniversColis",
        ogDescription: "UniversColis, c’est une équipe passionnée qui rend l’expédition de colis plus simple, transparente et accessible à tous.",
        ogUrl: "https://www.universcolis.fr/qui-sommes-nous",
        ogImage: "https://www.universcolis.fr/static/img/og-image.png",
        ogLocale: "fr_FR",
        ogSiteName: "UniversColis",

        twitterCard: "summary_large_image",
        twitterTitle: "Qui sommes-nous ? | UniversColis",
        twitterDescription: "Découvrez l’histoire, l’équipe et la mission d’UniversColis, plateforme indépendante dédiée à l’envoi de colis en toute confiance.",
        twitterImage: "https://www.universcolis.fr/static/img/og-image.png",

        // --- JSON-LD STRUCTURED DATA ---
        structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "name": "UniversColis",
                    "url": "https://www.universcolis.fr",
                    "logo": "https://www.universcolis.fr/static/img/logo.png",
                    "description": "Plateforme indépendante de comparaison et de suivi de colis, fondée par une équipe internationale engagée pour la transparence et l’accessibilité.",
                    "founder": [
                        { "@type": "Person", "name": "L’équipe UniversColis" }
                    ],
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "FR"
                    }
                },
                {
                    "@type": "WebPage",
                    "name": "Qui sommes-nous ?",
                    "url": "https://www.universcolis.fr/qui-sommes-nous",
                    "description": "Présentation de l’équipe, de la mission et des valeurs d’UniversColis, plateforme logistique dédiée à l’envoi de colis pour particuliers et professionnels.",
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
                                "name": "Qui sommes-nous ?",
                                "item": "https://www.universcolis.fr/qui-sommes-nous"
                            }
                        ]
                    }
                }
            ]
        })
    });
});

module.exports = aboutUsController;

