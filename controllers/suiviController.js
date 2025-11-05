const suiviController = require('express').Router()

suiviController.get('/', (req, res) => {
    res.render('suivi', {
        title: 'Suivre mon colis',
        page: 'suivi',
        bodyClass: 'suivi-page',
        imageClass: 'img-suivi',

        // SEO dynamique 
        seoTitle: "Suivi de colis universel – 5 outils gratuits et fiables en France et à l’international",
        seoDescription: "Suivez vos colis en France et à l’international avec UniversColis : 5 outils gratuits et fiables pour identifier automatiquement votre transporteur, comme Colissimo, Chronopost, DHL, UPS ou Mondial Relay.",
        seoKeywords: [
            "suivi colis",
            "suivi universel",
            "suivi colis universel",
            "suivi colis France",
            "suivi colis international",
            "outil suivi colis",
            "multi-transporteurs",
            "numéro de suivi",
            "tracking colis",
            "comparateur suivi colis",
            "suivi multi-transporteurs gratuit",
            "détection automatique transporteur",
            "suivre un colis sans connaître le transporteur"
        ],
        canonicalUrl: "https://www.universcolis.fr/suivi",
        robots: "index, follow",
        publishedDate: "2025-08-25",
        modifiedDate: "2025-10-16",

        // Open Graph
        ogType: "website",
        ogTitle: "Suivi universel des colis en France et à l’international – 5 outils de suivi gratuits et fiables",
        ogDescription: "5 outils gratuits et fiables qui identifient automatiquement votre transporteur (Colissimo, Chronopost, DHL, UPS, Mondial Relay). Outil universel, sans compte.",
        ogUrl: "https://www.universcolis.fr/suivi",
        ogImage: "https://www.universcolis.fr/static/img/og-image.png",
        ogLocale: "fr_FR",

        // Twitter
        twitterCard: "summary_large_image",
        twitterTitle: "Suivi universel des colis – 5 outils de suivi gratuits et fiables (FR + international)",
        twitterDescription: "Outil universel sans compte : 5 outils qui identifient automatiquement votre transporteur (Colissimo, Chronopost, DHL, UPS, Mondial Relay).",
        twitterImage: "https://www.universcolis.fr/static/img/og-image.png",

        // JSON-LD structured data
        structuredData: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": "https://www.universcolis.fr/#website",
                    "name": "UniversColis",
                    "url": "https://www.universcolis.fr/",
                    "inLanguage": "fr-FR",
                    "description": "UniversColis : comparateur d’expédition, suivi de colis, conseils et actualités.",
                    "publisher": { "@id": "https://www.universcolis.fr/#org" },
                    // NOTE: potentialAction (SearchAction) removed – pas de /suivi?q=… en prod
                },
                {
                    "@type": "Organization",
                    "@id": "https://www.universcolis.fr/#org",
                    "name": "UniversColis",
                    "url": "https://www.universcolis.fr/",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.universcolis.fr/static/img/logo.png"
                    }
                },
                {
                    "@type": "WebPage",
                    "@id": "https://www.universcolis.fr/suivi#webpage",
                    "name": "Suivi colis universel",
                    "url": "https://www.universcolis.fr/suivi",
                    "inLanguage": "fr-FR",
                    "isPartOf": { "@id": "https://www.universcolis.fr/#website" },
                    "datePublished": "2025-08-25",
                    "dateModified": "2025-10-16",
                    "description": "Suivi universel des colis : 5 outils pour suivre vos envois en France et à l’international. Couverture multi-transporteurs (Colissimo, Chronopost, DHL, UPS, Mondial Relay). Outil gratuit, sans compte."
                },
                {
                    "@type": "Service",
                    "@id": "https://www.universcolis.fr/suivi#service",
                    "name": "Suivi universel des colis",
                    "serviceType": "Suivi de colis multi-transporteurs",
                    "areaServed": [
                        { "@type": "Country", "name": "France" },
                        { "@type": "AdministrativeArea", "name": "Union européenne" },
                        { "@type": "Place", "name": "International" }
                    ],
                    "provider": { "@id": "https://www.universcolis.fr/#org" },
                    "description": "Suivi de colis en France et à l’international avec 5 outils de suivi. Compatible Colissimo, Chronopost, DHL, UPS, Mondial Relay et de nombreux autres transporteurs."
                },
                {
                    "@type": "HowTo",
                    "@id": "https://www.universcolis.fr/suivi#howto",
                    "name": "Comment utiliser le suivi UniversColis ?",
                    "description": "Guide étape par étape pour suivre un colis sur UniversColis.",
                    "inLanguage": "fr-FR",
                    "step": [
                        { "@type": "HowToStep", "text": "Entrez votre numéro de suivi dans le champ prévu." },
                        { "@type": "HowToStep", "text": "Cliquez sur « Suivre »." },
                        { "@type": "HowToStep", "text": "Comparez les résultats des différents outils proposés." }
                    ]
                },
                {
                    "@type": "FAQPage",
                    "@id": "https://www.universcolis.fr/suivi#faq",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Le service fonctionne-t-il en France et à l’international ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Oui. UniversColis centralise le suivi des colis en France et à l’étranger, avec compatibilité Colissimo, Chronopost, DHL, UPS, Mondial Relay et d’autres transporteurs."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Dois-je créer un compte pour utiliser l’outil ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Non, aucun compte n’est nécessaire. Entrez simplement votre numéro de suivi pour accéder aux résultats."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Mes informations sont-elles enregistrées ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Non, le numéro de suivi est transmis uniquement au service de tracking sélectionné. Rien n’est stocké sur UniversColis."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Pourquoi proposer plusieurs outils de suivi (5) ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Chaque outil a ses forces : détection large des transporteurs, rapidité, données officielles. UniversColis permet de choisir l’outil le plus efficace pour votre colis."
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
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                    "description": "Suivi pour plus de 2 400 transporteurs mondiaux, détection automatique, données officielles."
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "ParcelsApp",
                    "operatingSystem": "Web",
                    "applicationCategory": "WebApplication",
                    "url": "https://parcelsapp.com/fr",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                    "description": "Prise en charge UPU et transporteurs internationaux, agrégation de sources officielles."
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "Track.Global",
                    "operatingSystem": "Web",
                    "applicationCategory": "WebApplication",
                    "url": "https://track.global/fr",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                    "description": "Fiable pour commandes en provenance d’Asie et transporteurs peu référencés."
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "Postal Ninja",
                    "operatingSystem": "Web",
                    "applicationCategory": "WebApplication",
                    "url": "https://postal.ninja/fr",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                    "description": "Interface en français, spécialisée Europe/France, faible publicité."
                },
                {
                    "@type": "SoftwareApplication",
                    "name": "Track123",
                    "operatingSystem": "Web",
                    "applicationCategory": "WebApplication",
                    "url": "https://www.track123.com/",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
                    "description": "Optimisé pour expéditions depuis la Chine (AliExpress, Cainiao, Shein)."
                }
            ]
        })

    })
})

module.exports = suiviController


