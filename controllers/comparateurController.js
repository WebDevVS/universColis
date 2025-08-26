const comparateurController = require('express').Router()
const { getCotation, getCotationAvance } = require('../services/boxtalService')
const countryService = require('../services/countryService')
const categoryService = require('../services/categoryService')
const Category = require('../models/Category')

// ✅ SEO à faire
// Page comparateur avec gestion des deux formulaires (rapide et avancé)
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
            "form-type": formType
        } = req.query;

        // Fonction inline pour parser "ville codePostal pays"
        const parseVilleCodePostal = (adresseComplete) => {
            if (!adresseComplete) return { ville: '', code_postal: '', pays: '' };

            // 1. Séparer par virgule d'abord (ville, code postal, pays)
            const parts = adresseComplete.split(',').map(p => p.trim()).filter(p => p !== '');

            if (parts.length < 3) return { ville: '', code_postal: '', pays: '' };

            const ville = parts[0]; // ex: "Athina Proastia"
            const codePostalBrut = parts[1].replace(/\s/g, ''); // supprime les espaces → "10431"
            const pays = parts[2].toUpperCase(); // "GRÈCE" → "GRÈCE"

            return {
                ville,
                code_postal: codePostalBrut,
                pays
            };
        };


        let offres = [];
        let searchSummary = null;

        // Cas 1 : formulaire rapide
        if ((formType === 'rapide' || !formType) && destination && poids) {

            searchSummary = {
                type: 'rapide',
                origine: 'FRANCE',
                destination: getCountryLabel(destination, countries),
                poids
            };

            const boxtalData = await countryService.getFormattedData(destination);
            offres = await getCotation(destination, poids, boxtalData);
        }

        // Cas 2 : formulaire avancé
        else if (formType === 'avance') {
            const origineParsed = parseVilleCodePostal(villeOrigine);
            const destinationParsed = parseVilleCodePostal(villeDestination);

            const selectedCategory = req.query["code-contenu"]; // c’est le nom de la grande catégorie choisie

            // On récupère la catégorie complète depuis MongoDB
            const category = await Category.findOne({ category: selectedCategory });
            // On choisit un sous-produit au hasard
            const randomSub = category.products[Math.floor(Math.random() * category.products.length)];

            if (!category || category.products.length === 0) {
                throw new Error("Catégorie invalide ou vide");
            }


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

            offres = await getCotationAvance(params);
        }

        const filterData = {
            transporteurs: [...new Set(offres.map(o => o.transporteur))].sort(),
            services: [...new Set(offres.map(o => o.service))].sort(),
            prixMax: Math.max(...offres.map(o => parseFloat(o.prix_ttc))),
            delaiMax: Math.max(...offres.map(o => parseInt(o.temps_livraison_jours)))
        };

        res.render('comparateur', {
            title: 'Comparateur des prix',
            bodyClass: 'comparateur-page',
            page: 'comparateur',
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

            seoTitle: "Résultats : Comparez les offres d’envoi de colis – UniversColis",
            seoDescription: "Comparez instantanément les tarifs, délais et services pour l’expédition de colis. Filtrez par transporteur, prix ou rapidité et partagez vos résultats en un clic.",
            seoKeywords: [
                "comparateur colis",
                "frais envoi",
                "livraison rapide",
                "expédition pas cher",
                "transporteur",
                "suivi colis",
                "offre expédition",
                "comparatif livraison",
                "envoi international",
                "partage résultats"
            ],
            canonicalUrl: "https://universcolis.fr/resultats",
            robots: "index, follow",

            publishedDate: "2025-08-25",
            modifiedDate: "2025-08-25",

            ogType: "website",
            ogTitle: "Résultats : Comparateur d’offres d’envoi de colis – UniversColis",
            ogDescription: "Trouvez la meilleure offre d’expédition selon vos critères : prix, délai, transporteur. Comparez et partagez vos résultats facilement.",
            ogUrl: "https://universcolis.fr/resultats",
            ogImage: "https://universcolis.fr/static/img/og-image.png",
            ogLocale: "fr_FR",

            twitterCard: "summary_large_image",
            twitterTitle: "Résultats : Comparateur d’offres d’envoi de colis – UniversColis",
            twitterDescription: "Comparez les tarifs et délais d’expédition de colis en temps réel. Filtrez, partagez et réservez en toute simplicité.",
            twitterImage: "https://universcolis.fr/static/img/og-image.png",

            structuredData: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "SearchResultsPage",
                        "name": "Résultats de comparaison d’envoi de colis",
                        "url": "https://universcolis.fr/resultats",
                        "description": "Page de résultats dynamique affichant les offres d’expédition de colis selon les critères de recherche de l’utilisateur. Filtrage par transporteur, prix, délai et partage des résultats.",
                        "isPartOf": {
                            "@type": "WebSite",
                            "name": "UniversColis",
                            "url": "https://universcolis.fr/"
                        },
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://universcolis.fr/comparateur-des-prix?destination={destination}&poids={poids}",
                            "query-input": [
                                "required name=destination",
                                "required name=poids"
                            ]
                        }
                    },
                    {
                        "@type": "ItemList",
                        "name": "Offres d’expédition de colis",
                        "itemListOrder": "http://schema.org/ItemListOrderAscending",
                        "numberOfItems": offres.length,
                        "itemListElement": offres.map((offre, idx) => ({
                            "@type": "Offer",
                            "position": idx + 1,
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Expédition de colis",
                                "description": "Offre de livraison de colis avec affichage du prix total, délai estimé et options de réservation.",
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
        console.error('Erreur dans comparateurController :', err);
        res.status(500).render('error', { message: "Une erreur est survenue lors de la recherche. Veuillez réessayer plus tard." });
    }
});

function getCountryLabel(isoCode, countries) {
    const found = countries.find(c => c.isoCode === isoCode);
    return found ? found.label : isoCode;
}

module.exports = comparateurController;

