const axios = require('axios');
const xml2js = require('xml2js');
const { getAuthHeader } = require('../config/auth');
const { getFormattedData } = require('../services/countryService')

// Liste des villes d'origine possibles (France)
const frenchOriginCities = [
    { city: "Paris", postal_code: "75001" },
    { city: "Lyon", postal_code: "69001" },
    { city: "Marseille", postal_code: "13001" },
    { city: "Toulouse", postal_code: "31000" },
    { city: "Nice", postal_code: "06000" }
];

// Liste des types de contenu disponibles
const contentTypes = [
    { code: 10100, label: "Documents sans valeur commerciale" },
    { code: 10120, label: "Effets personnels" },
    { code: 10130, label: "Cadeaux" },
    { code: 10140, label: "Accessoires électroniques" },
    { code: 10150, label: "Vêtements" }
];

// FONCTION EXISTANTE - Recherche rapide avec données aléatoires
async function getCotation(destinationLabel, poidsKg, boxtalData) {
    const url = "https://www.envoimoinscher.com/api/v1/cotation";

    // Sélectionner aléatoirement une ville française d'origine
    const randomFrenchOrigin = frenchOriginCities[Math.floor(Math.random() * frenchOriginCities.length)];
    const expediteurVille = randomFrenchOrigin.city;
    const expediteurPostal = randomFrenchOrigin.postal_code;

    const countryInfo = boxtalData[destinationLabel];

    if (!countryInfo || !countryInfo.cities || countryInfo.cities.length === 0) {
        throw new Error(`Aucune ville trouvée pour le pays : ${destinationLabel}`);
    }

    // Choisir aléatoirement une ville de destination
    const randomDestinationCity = countryInfo.cities[Math.floor(Math.random() * countryInfo.cities.length)];
    const destinataireVille = randomDestinationCity.name;
    const destinatairePostal = randomDestinationCity.postal;

    // Choisir aléatoirement un type de contenu
    const randomContent = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    const codeContenu = randomContent.code;
    const contenuLabel = randomContent.label;

    // Date de collecte (lendemain)
    const collecte = new Date();
    collecte.setDate(collecte.getDate() + 1);
    const collecteFormatted = collecte.toISOString().split('T')[0];

    // 📦 Choisir des dimensions aléatoires : 15 cm ou 20 cm
    const dimensionChoices = [15, 20];
    const longueur = dimensionChoices[Math.floor(Math.random() * dimensionChoices.length)];
    const largeur = dimensionChoices[Math.floor(Math.random() * dimensionChoices.length)];
    const hauteur = dimensionChoices[Math.floor(Math.random() * dimensionChoices.length)];

    // Construire les paramètres pour l'appel API
    const params = new URLSearchParams({
        "colis_1.poids": poidsKg,
        "colis_1.longueur": longueur,
        "colis_1.largeur": largeur,
        "colis_1.hauteur": hauteur,
        "code_contenu": codeContenu,
        "expediteur.type": "particulier",
        "expediteur.pays": "FR",
        "expediteur.code_postal": expediteurPostal,
        "expediteur.ville": expediteurVille,
        "destinataire.type": "particulier",
        "destinataire.pays": destinationLabel,
        "destinataire.code_postal": destinatairePostal,
        "destinataire.ville": destinataireVille,
        "collecte": collecteFormatted
    });


    try {
        // Appel API Boxtal
        const response = await axios.get(url, {
            headers: getAuthHeader(),
            params: params
        });

        return await parseBoxtalResponse(response.data);

    } catch (error) {
        console.error("Erreur lors de la cotation :", error.message);
        throw error;
    }
}

// NOUVELLE FONCTION - Recherche avancée avec données utilisateur
async function getCotationAvance({
    poids,
    longueur,
    largeur,
    hauteur,
    code_contenu,
    expediteur_ville,
    expediteur_code_postal,
    destinataire_ville,
    destinataire_code_postal,
    destinataire_pays
}) {
    const url = "https://www.envoimoinscher.com/api/v1/cotation"; 

    // Validation des données d'entrée
    if (!poids || !longueur || !largeur || !hauteur || !code_contenu) {
        throw new Error("Données de colis incomplètes");
    }
    if (!expediteur_ville || !expediteur_code_postal) {
        throw new Error("Données expéditeur incomplètes");
    }
    if (!destinataire_ville || !destinataire_code_postal || !destinataire_pays) {
        throw new Error("Données destinataire incomplètes");
    }

    // Sélection aléatoire du type d'expéditeur et destinataire (comme dans le code original)
    const types = ["particulier", "entreprise"];
    const expediteur_type = types[Math.floor(Math.random() * types.length)];
    const destinataire_type = types[Math.floor(Math.random() * types.length)];

    // Date de collecte = demain
    const collecte = new Date();
    collecte.setDate(collecte.getDate() + 1);
    const collecteStr = collecte.toISOString().split('T')[0];

    // Construction des paramètres de la requête à Boxtal
    const params = new URLSearchParams({
        "colis_1.poids": poids,
        "colis_1.longueur": longueur,
        "colis_1.largeur": largeur,
        "colis_1.hauteur": hauteur,
        "code_contenu": code_contenu,
        "expediteur.type": expediteur_type,
        "expediteur.pays": "FR",
        "expediteur.code_postal": expediteur_code_postal,
        "expediteur.ville": expediteur_ville,
        "destinataire.type": destinataire_type,
        "destinataire.pays": destinataire_pays,
        "destinataire.code_postal": destinataire_code_postal,
        "destinataire.ville": destinataire_ville,
        "collecte": collecteStr
    });

    try {
        // Envoi de la requête HTTP GET vers l'API Boxtal
        const response = await axios.get(url, {
            headers: getAuthHeader(),
            params: params
        });

        return await parseBoxtalResponse(response.data);

    } catch (error) {
        console.error("Erreur lors de la cotation avancée :", error.message);
        if (error.response) {
            console.error("Contenu retourné par Boxtal :", error.response.data);
        }
        throw error;
    }
}

// FONCTION UTILITAIRE - Parser la réponse XML Boxtal (commune aux deux fonctions)
async function parseBoxtalResponse(xmlData) {
    try {
        // Transformation XML → JSON
        const result = await xml2js.parseStringPromise(xmlData, {
            explicitArray: false,
            ignoreAttrs: false
        });

        // Extraction des offres de livraison
        const offers = result?.cotation?.shipment?.offer;
        const offersArray = Array.isArray(offers) ? offers : [offers];

        if (!offers) {
            return [];
        }

        // Nettoyage et formatage des offres pour le front-end
        const cleanedOffers = offersArray.map((offer) => {
            const price = parseFloat(offer.price["tax-inclusive"]);
            const transporteur = offer.operator.label;
            const logo = offer.operator.logo;
            const service = offer.service.label;
            const collecteDate = offer.collection?.date;
            const livraisonDate = offer.delivery?.date;

            let tempsLivraison = null;
            let dateLivraison = "Inconnue";

            if (collecteDate && livraisonDate) {
                const d1 = new Date(collecteDate);
                const d2 = new Date(livraisonDate);
                tempsLivraison = Math.round((d2 - d1) / (1000 * 3600 * 24));
                dateLivraison = d2.toLocaleDateString('fr-FR');
            }

            const modeEnvoi = offer.collection?.type?.label || "Mode inconnu";

            let characteristics = offer.characteristics?.label || [];
            if (typeof characteristics === 'string') {
                characteristics = [characteristics];
            }

            return {
                transporteur,
                logo,
                service,
                prix_ttc: price,
                livraison_estimee: dateLivraison,
                temps_livraison_jours: tempsLivraison,
                mode_envoi: modeEnvoi,
                characteristics_labels: characteristics
            };
        });

        return cleanedOffers;

    } catch (parseError) {
        console.error("Erreur lors du parsing XML :", parseError.message);
        throw new Error("Erreur lors du traitement de la réponse Boxtal");
    }
}

// Exporter les deux fonctions
module.exports = {
    getCotation,           // Fonction existante (recherche rapide)
    getCotationAvance      // Nouvelle fonction (recherche avancée)
};
