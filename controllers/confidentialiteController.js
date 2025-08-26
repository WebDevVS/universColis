const confidentialiteController = require('express').Router();

confidentialiteController.get('/', (req, res) => {
    res.render('confidentialite', {
        title: 'Politique de confidentialité & Cookies',

        // --- SEO DYNAMIQUE ---
        seoTitle: "Politique de confidentialité & cookies | UniversColis",
        seoDescription: "Découvrez comment UniversColis protège vos données personnelles et respecte vos choix de cookies. Plateforme conforme RGPD, transparente et sécurisée.",
        seoKeywords: [
            "politique de confidentialité universcolis",
            "données personnelles colis",
            "cookies universcolis",
            "site conforme RGPD",
            "protection vie privée",
            "droits utilisateur",
            "comparateur colis sécurisé",
            "confidentialité expédition",
            "gestion consentement cookies"
        ],
        canonicalUrl: "https://universcolis.fr/politique-confidentialite",
        author: "UniversColis",
        robots: "index, follow",

        publishedDate: "2025-08-25",
        modifiedDate: "2025-08-25",

        ogType: "website",
        ogTitle: "Politique de confidentialité & cookies | UniversColis",
        ogDescription: "UniversColis protège vos données et respecte vos choix. Consultez notre politique de confidentialité et de gestion des cookies.",
        ogUrl: "https://universcolis.fr/politique-confidentialite",
        ogImage: "https://universcolis.fr/static/img/og-image.png",
        ogLocale: "fr_FR",
        ogSiteName: "UniversColis",

        twitterCard: "summary_large_image",
        twitterTitle: "Politique de confidentialité & cookies | UniversColis",
        twitterDescription: "UniversColis : plateforme conforme RGPD, transparente sur la gestion des données et des cookies.",
        twitterImage: "https://universcolis.fr/static/img/og-image.png",

        // --- JSON-LD STRUCTURED DATA ---
        structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "name": "UniversColis",
                    "url": "https://universcolis.fr",
                    "logo": "https://universcolis.fr/static/img/logo.png",
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "email": "contact@universcolis.fr",
                        "contactType": "service client"
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "FR"
                    }
                },
                {
                    "@type": "WebPage",
                    "name": "Politique de confidentialité & Cookies",
                    "url": "https://universcolis.fr/politique-confidentialite",
                    "description": "Politique de confidentialité et gestion des cookies de UniversColis : protection des données, droits utilisateur, conformité RGPD.",
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
                                "item": "https://universcolis.fr/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Politique de confidentialité",
                                "item": "https://universcolis.fr/politique-confidentialite"
                            }
                        ]
                    }
                }
            ]
        })
    });
});

module.exports = confidentialiteController;

