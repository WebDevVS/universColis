const { getAll } = require('../services/countryService')
const { getAllCategories } = require('../services/categoryService')
const carriers = require('../static/data/carriersLogo.json')
const homeController = require('express').Router()

homeController.get('/', async (req, res) => {
    try {
        const countries = await getAll();
        const categories = await getAllCategories();

        res.render('home', {
            title: 'Accueil',
            bodyClass: 'home-page',
            countries,
            categories,
            carriers,
            hasAutocomplete: true,

            // SEO DYNAMIQUE
            seoTitle: "UniversColis : Comparez instantanément les tarifs d’envoi de colis en France et à l’international",
            seoDescription: "Comparez en temps réel les prix d’expédition de colis avec DHL, UPS, Chronopost, Colissimo… Saisissez destination et poids, obtenez les meilleures offres sans inscription.",
            seoKeywords: [
                "comparateur colis",
                "envoi rapide",
                "tarif expédition",
                "transporteur",
                "suivi colis",
                "livraison internationale",
                "DHL",
                "UPS",
                "Chronopost",
                "Colissimo",
                "emballage"
            ],
            canonicalUrl: "https://universcolis.fr/",
            author: "UniversColis",
            robots: "index, follow",

            ogType: "website",
            ogTitle: "UniversColis : Comparateur d’envoi de colis ultra-rapide",
            ogDescription: "Comparez les tarifs d’expédition en quelques secondes, sans compte. Trouvez la meilleure offre parmi les plus grands transporteurs.",
            ogUrl: "https://universcolis.fr/",
            ogImage: "https://universcolis.fr/static/img/og-image.png",
            ogLocale: "fr_FR",

            twitterCard: "summary_large_image",
            twitterTitle: "UniversColis : Comparateur d’envoi de colis ultra-rapide",
            twitterDescription: "Comparez instantanément les prix d’envoi de colis en France et à l’international. Simple, rapide, sans inscription.",
            twitterImage: "https://universcolis.fr/static/img/og-image.png",

            // JSON-LD STRUCTURED DATA
            structuredData: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebSite",
                        "name": "UniversColis",
                        "url": "https://universcolis.fr/",
                        "potentialAction": [
                            {
                                "@type": "SearchAction",
                                "target": "https://universcolis.fr/comparateur-des-prix?destination={destination}&poids={poids}",
                                "query-input": [
                                    "required name=destination",
                                    "required name=poids"
                                ]
                            },
                            {
                                "@type": "SearchAction",
                                "target": "https://universcolis.fr/comparateur-des-prix?destination={destination}&poids={poids}&longueur={longueur}&largeur={largeur}&hauteur={hauteur}&code-contenu={code-contenu}",
                                "query-input": [
                                    "required name=destination",
                                    "required name=poids",
                                    "optional name=longueur",
                                    "optional name=largeur",
                                    "optional name=hauteur",
                                    "optional name=code-contenu"
                                ]
                            }
                        ]
                    },
                    {
                        "@type": "Organization",
                        "name": "UniversColis",
                        "url": "https://universcolis.fr/",
                        "logo": "https://universcolis.fr/static/img/copie%20poslednologo1.png",
                        "sameAs": [
                            "https://universcolis.fr/"
                        ]
                    },
                    {
                        "@type": "Service",
                        "name": "Comparateur de tarifs d’envoi de colis",
                        "serviceType": "Comparaison de prix d’expédition",
                        "provider": { "@id": "https://universcolis.fr/#organization" },
                        "areaServed": "FR",
                        "description": "Comparez instantanément les offres d’expédition de colis en France et à l’international. Saisissez simplement la destination et le poids pour obtenir les meilleurs tarifs."
                    },
                    {
                        "@type": "Service",
                        "name": "Suivi de colis",
                        "serviceType": "Suivi d’expédition",
                        "provider": { "@id": "https://universcolis.fr/#organization" },
                        "areaServed": "FR",
                        "description": "Suivez votre colis en temps réel auprès des principaux transporteurs."
                    },
                    {
                        "@type": "Service",
                        "name": "Conseils d’emballage",
                        "serviceType": "Guide d’emballage",
                        "provider": { "@id": "https://universcolis.fr/#organization" },
                        "areaServed": "FR",
                        "description": "Bénéficiez de conseils experts pour emballer vos colis en toute sécurité."
                    },
                    {
                        "@type": "OfferCatalog",
                        "name": "Offres de transporteurs partenaires",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": { "@type": "DeliveryMethod", "name": "DHL" }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": { "@type": "DeliveryMethod", "name": "UPS" }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": { "@type": "DeliveryMethod", "name": "Chronopost" }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": { "@type": "DeliveryMethod", "name": "Colissimo" }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": { "@type": "DeliveryMethod", "name": "La Poste" }
                            }
                        ]
                    }
                ]
            })
        });
    } catch (err) {
        console.error('Erreur de récupération des pays', err);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = homeController
