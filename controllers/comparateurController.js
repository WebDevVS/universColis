const comparateurController = require('express').Router()
const { getCotation, getCotationAvance } = require('../services/boxtalService')
const countryService = require('../services/countryService')
const categoryService = require('../services/categoryService')
const Category = require('../models/Category')

// Import du service Eurosender pour la comparaison multi-APIs
const { getEurosenderOffers } = require('../services/eurosenderService')

comparateurController.get('/', async (req, res) => {
    try {
        const countries = await countryService.getAll();
        const categories = await categoryService.getAllCategories();

        const {
            origine,
            destination,
            poids,
            "longueur": longueur,
            "largeur": largeur,
            "hauteur": hauteur,
            "code-contenu": codeContenu,
            "ville-origine": villeOrigine,
            "ville-destination": villeDestination,
            formType
        } = req.query;

        // Fonction pour parser "ville, codePostal, pays" depuis l'autocomplete
        const parseVilleCodePostal = (adresseComplete) => {
            if (!adresseComplete) return { ville: '', code_postal: '', pays: '' };
            const parts = adresseComplete
                .split(',')
                .map(p => p.trim())
                .filter(p => p !== '');
            if (parts.length < 3) {
                return { ville: '', code_postal: '', pays: '' };
            }
            const ville = parts[0];
            const codePostalBrut = parts[1].replace(/\s/g, '');
            const pays = parts[2].toUpperCase();
            return {
                ville,
                code_postal: codePostalBrut,
                pays
            };
        };

        let offres = [];
        let searchSummary = null;

        // ============================================================
        // FORMULAIRE RAPIDE
        // ============================================================
        // Les valeurs par defaut (villes, dimensions) sont generees
        // automatiquement par defaultsService pour garantir que
        // Boxtal et Eurosender comparent avec les MEMES parametres
        if ((formType === 'rapide' || !formType) && destination && poids) {
            searchSummary = {
                type: 'rapide',
                origine: 'FRANCE',
                destination: getCountryLabel(destination, countries),
                poids
            };

            // Recuperation des villes depuis MongoDB
            // Ces donnees sont utilisees par les DEUX APIs via defaultsService
            const boxtalData = await countryService.getFormattedData(destination);

            // Appel API Boxtal
            const boxtalOffres = await getCotation(destination, poids, boxtalData);

            // Appel API Eurosender
            // IMPORTANT : boxtalData est passe en 2eme parametre pour garantir
            // que la meme ville de destination est utilisee (coherence)
            let eurosenderOffres = [];
            try {
                if (typeof getEurosenderOffers === 'function') {
                    const searchContextRapide = {
                        formType: 'rapide',
                        origin: {
                            countryIso: 'FR'
                            // city et postalCode seront generes par defaultsService
                        },
                        destination: {
                            countryIso: destination
                            // city et postalCode seront generes par defaultsService
                        },
                        parcel: {
                            weightKg: poids ? Number(poids) : null
                            // dimensions seront generees par defaultsService
                        },
                        category: {
                            selectedCategory: null,
                            boxtalCodeContenu: null
                        },
                        pickupDate: null
                    };

                    eurosenderOffres = await getEurosenderOffers(searchContextRapide, boxtalData);
                } else {
                    console.warn('getEurosenderOffers n\'est pas une fonction');
                }
            } catch (e) {
                console.error('Erreur Eurosender (rapide):', e);
            }

            // Fusion des offres des deux APIs
            offres = [
                ...boxtalOffres,
                ...eurosenderOffres
            ];
        }

        // ============================================================
        // FORMULAIRE AVANCE
        // ============================================================
        // Utilise les donnees saisies par l'utilisateur
        // (villes, dimensions, type de contenu)
        else if (formType === 'avance') {
            const origineParsed = parseVilleCodePostal(villeOrigine);
            const destinationParsed = parseVilleCodePostal(villeDestination);

            // Recuperation de la categorie et selection aleatoire d'un code_contenu
            const selectedCategory = req.query["code-contenu"];
            const category = await Category.findOne({ category: selectedCategory });
            if (!category || !Array.isArray(category.products) || category.products.length === 0) {
                throw new Error("Categorie invalide ou vide");
            }
            const randomSub = category.products[Math.floor(Math.random() * category.products.length)];

            // Parametres pour l'API Boxtal (format XML strict)
            const params = {
                poids,
                longueur,
                largeur,
                hauteur,
                code_contenu: randomSub.code,
                expediteur_ville: origineParsed.ville,
                expediteur_code_postal: origineParsed.code_postal,
                expediteur_pays: origineParsed.pays,
                destinataire_ville: destinationParsed.ville,
                destinataire_code_postal: destinationParsed.code_postal,
                destinataire_pays: destination,
                selectedCategory,
                formType
            };

            searchSummary = {
                type: 'avance',
                origine: `${origineParsed.ville}, ${origineParsed.code_postal}, ${origineParsed.pays}`,
                destination: `${destinationParsed.ville}, ${destinationParsed.code_postal}, ${destinationParsed.pays}`,
                poids,
                dimensions: `${longueur} x ${largeur} x ${hauteur} cm`,
                typeEnvoi: selectedCategory
            };

            // searchContext neutre pour Eurosender (format JSON flexible)
            const searchContext = {
                formType: 'avance',
                origin: {
                    countryIso: 'FR',
                    postalCode: origineParsed.code_postal,
                    city: origineParsed.ville
                },
                destination: {
                    countryIso: destination,
                    postalCode: destinationParsed.code_postal,
                    city: destinationParsed.ville
                },
                parcel: {
                    weightKg: poids ? Number(poids) : null,
                    lengthCm: longueur ? Number(longueur) : null,
                    widthCm: largeur ? Number(largeur) : null,
                    heightCm: hauteur ? Number(hauteur) : null
                },
                category: {
                    selectedCategory,
                    boxtalCodeContenu: randomSub.code
                },
                pickupDate: null
            };

            // Recuperation des donnees MongoDB (pour coherence)
            const boxtalData = await countryService.getFormattedData(destination);

            // Appel des deux APIs
            const boxtalOffres = await getCotationAvance(params);

            let eurosenderOffres = [];
            try {
                if (typeof getEurosenderOffers === 'function') {
                    eurosenderOffres = await getEurosenderOffers(searchContext, boxtalData);
                } else {
                    console.warn('getEurosenderOffers n\'est pas une fonction');
                }
            } catch (e) {
                console.error('Erreur Eurosender (avance):', e);
            }

            // Fusion des offres des deux APIs
            offres = [
                ...boxtalOffres,
                ...eurosenderOffres
            ];
        }

        // Construction des donnees de filtrage (transporteurs, services, prix, delai)
        const hasOffres = Array.isArray(offres) && offres.length > 0;
        const filterData = hasOffres ? {
            transporteurs: [...new Set(offres.map(o => o.transporteur))].sort(),
            services: [...new Set(offres.map(o => o.service))].sort(),
            prixMax: Math.max(...offres.map(o => parseFloat(o.prix_ttc))),
            delaiMax: Math.max(...offres.map(o => parseInt(o.temps_livraison_jours)))
        } : {
            transporteurs: [],
            services: [],
            prixMax: 0,
            delaiMax: 0
        };

        // Rendu de la page avec toutes les offres fusionnees
        res.render('comparateur', {
            title: 'Comparateur des prix',
            bodyClass: 'comparateur-page',
            page: 'comparateur',
            imageClass: 'img-comparateur',
            countries,
            categories,
            destination,
            villeOrigine,
            villeDestination,
            offres,
            filterData,
            poids,
            longueur,
            largeur,
            hauteur,
            codeContenu,
            searchSummary,
            formType,
            hasAutocomplete: true,

            seoTitle: "Resultats : Comparez les offres d'envoi de colis - UniversColis",
            seoDescription: "Comparez instantanement les tarifs, delais et services pour l'expedition de colis. Filtrez par transporteur, prix ou rapidite et partagez vos resultats en un clic.",
            seoKeywords: [
                "comparateur colis",
                "frais envoi",
                "livraison rapide",
                "expedition pas cher",
                "transporteur",
                "suivi colis",
                "offre expedition",
                "comparatif livraison",
                "envoi international",
                "partage resultats"
            ],
            canonicalUrl: "https://www.universcolis.fr/comparateur-des-prix",
            robots: "index, follow",

            publishedDate: "2025-08-25",
            modifiedDate: "2025-08-25",

            ogType: "website",
            ogTitle: "Resultats : Comparateur d'offres d'envoi de colis - UniversColis",
            ogDescription: "Trouvez la meilleure offre d'expedition selon vos criteres : prix, delai, transporteur. Comparez et partagez vos resultats facilement.",
            ogUrl: "https://www.universcolis.fr/comparateur-des-prix",
            ogImage: "https://www.universcolis.fr/static/img/og-image.png",
            ogLocale: "fr_FR",

            twitterCard: "summary_large_image",
            twitterTitle: "Resultats : Comparateur d'offres d'envoi de colis - UniversColis",
            twitterDescription: "Comparez les tarifs et delais d'expedition de colis en temps reel. Filtrez, partagez et reservez en toute simplicite.",
            twitterImage: "https://wwww.universcolis.fr/static/img/og-image.png",

            structuredData: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "SearchResultsPage",
                        "name": "Resultats de comparaison d'envoi de colis",
                        "url": "https://www.universcolis.fr/comparateur-des-prix",
                        "description": "Page de resultats dynamique affichant les offres d'expedition de colis selon les criteres de recherche de l'utilisateur. Filtrage par transporteur, prix, delai et partage des resultats.",
                        "isPartOf": {
                            "@type": "WebSite",
                            "name": "UniversColis",
                            "url": "https://www.universcolis.fr/"
                        },
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://www.universcolis.fr/comparateur-des-prix?destination={destination}&poids={poids}",
                            "query-input": [
                                "required name=destination",
                                "required name=poids"
                            ]
                        }
                    },
                    {
                        "@type": "ItemList",
                        "name": "Offres d'expedition de colis",
                        "itemListOrder": "http://schema.org/ItemListOrderAscending",
                        "numberOfItems": offres.length,
                        "itemListElement": offres.map((offre, idx) => ({
                            "@type": "Offer",
                            "position": idx + 1,
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Expedition de colis",
                                "description": "Offre de livraison de colis avec affichage du prix total, delai estime et options de reservation.",
                                "provider": {
                                    "@type": "Organization",
                                    "name": offre.transporteur
                                }
                            }
                        }))
                    }
                ]
            })
        });

    } catch (err) {
        console.error('Erreur dans comparateurController:', err);
        res.status(500).render('error', { message: "Une erreur est survenue lors de la recherche. Veuillez reessayer plus tard." });
    }
});

function getCountryLabel(isoCode, countries) {
    const found = countries.find(c => c.isoCode === isoCode);
    return found ? found.label : isoCode;
}

module.exports = comparateurController;