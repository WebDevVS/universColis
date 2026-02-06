const suiviController = require('express').Router()
const actualitesService = require('../services/actualitesService')

suiviController.get('/', async (req, res) => {
    const actualites = await actualitesService.getLatest(3);
    res.render('suivi', {
        title: 'Suivre mon colis',
        page: 'suivi',
        bodyClass: 'suivi-page',
        imageClass: 'img-suivi',
        actualites,

        // SEO dynamique 
        seoTitle: "Suivi de colis universel – 5 outils gratuits et fiables en France et à l’international",
        seoDescription: "Suivez vos colis en France et à l’international avec UniversColis : 5 outils gratuits et fiables pour identifier automatiquement votre transporteur, comme Colissimo, Chronopost, DHL, UPS ou Mondial Relay.",
        seoKeywords: [
            "suivi colis gratuit",
            "tracker colis international",
            "suivi colissimo",
            "suivi chronopost",
            "tracking colis temps réel",
            "suivre colis sans transporteur",
            "17track france",
            "parcelsapp gratuit",
            "suivi colis chine",
            "numero suivi universel",
            "tracker multi-transporteurs",
            "suivi colis aliexpress",
            "postal ninja france",
            "track123 suivi",
            "où est mon colis"
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
                        "url": "https://www.universcolis.fr/static/img/logo.webp"
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
                    "name": "Comment suivre un colis sur UniversColis ?",
                    "description": "Guide étape par étape pour tracker n'importe quel colis en 3 clics",
                    "inLanguage": "fr-FR",
                    "step": [
                        {
                            "@type": "HowToStep",
                            "position": 1,
                            "name": "Entrer le numéro",
                            "text": "Entrez votre numéro de suivi dans le champ prévu (Ex: AB123456789FR)",
                            "url": "https://www.universcolis.fr/suivi#tracking-form"
                        },
                        {
                            "@type": "HowToStep",
                            "position": 2,
                            "name": "Lancer la recherche",
                            "text": "Cliquez sur « Suivre » pour lancer la détection automatique du transporteur",
                            "url": "https://www.universcolis.fr/suivi#tracking-form"
                        },
                        {
                            "@type": "HowToStep",
                            "position": 3,
                            "name": "Comparer les résultats",
                            "text": "Comparez les résultats des 5 trackers disponibles pour obtenir l'information la plus complète",
                            "url": "https://www.universcolis.fr/suivi#manual-selector"
                        }
                    ]
                },
                {
                    "@type": "FAQPage",
                    "@id": "https://www.universcolis.fr/suivi#faq",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Est-ce que le suivi de colis est vraiment gratuit ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Oui, 100% gratuit. UniversColis ne demande ni inscription, ni frais cachés. Vous pouvez suivre autant de colis que nécessaire sans limitation."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Quels transporteurs sont supportés ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Plus de 2400 transporteurs mondiaux incluant Colissimo, Chronopost, DHL, UPS, FedEx, Mondial Relay, La Poste, TNT, GLS, Colis Privé, Cainiao, China Post, USPS, Royal Mail, et bien d'autres."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Comment fonctionne la détection automatique du transporteur ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Les 5 trackers analysent le format de votre numéro de suivi (longueur, préfixes, structure) pour identifier automatiquement le transporteur. Si un tracker ne trouve pas, essayez-en un autre."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Mes données de suivi sont-elles stockées ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Non. Le numéro de suivi est transmis directement aux services de tracking tiers. Aucune donnée n'est conservée sur les serveurs UniversColis."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Pourquoi utiliser 5 trackers différents ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Chaque tracker a ses forces : 17Track excelle en couverture internationale, Track.Global pour l'Asie, ParcelsApp pour les détails, Postal Ninja pour l'Europe francophone, Track123 pour la Chine. Comparer permet d'obtenir l'info la plus complète."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Que faire si je ne connais pas mon transporteur ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "C'est justement l'intérêt des trackers universels. Entrez simplement votre numéro : les outils détecteront automatiquement le transporteur en analysant le format du code."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Mon colis vient de Chine (AliExpress), quel tracker utiliser ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Track123 et Track.Global sont les plus performants pour les colis chinois (Cainiao, Yanwen, SF Express). 17Track fonctionne également très bien pour ce type d'envoi."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Pourquoi mon numéro est 'introuvable' alors que j'ai reçu l'avis d'expédition ?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Le numéro est créé lors de l'impression de l'étiquette, mais le suivi ne s'active qu'après le premier scan physique (prise en charge). Ce délai peut aller de 2 à 24 heures."
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
                },
                {
                    "@type": "ItemList",
                    "name": "Articles recommandés - Suivi de colis",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Questions sur le suivi",
                            "description": "Guides pratiques pour retrouver et suivre vos colis",
                            "url": "https://www.universcolis.fr/questions/suivi"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Colis en retard",
                            "description": "Solutions et recours pour retards de livraison",
                            "url": "https://www.universcolis.fr/questions/livraison"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "International & Douane",
                            "description": "Tout sur les frais de douane et envois internationaux",
                            "url": "https://www.universcolis.fr/questions/international"
                        }
                    ]
                }
            ]
        })

    })
})

module.exports = suiviController


