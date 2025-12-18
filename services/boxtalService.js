const axios = require('axios');
const xml2js = require('xml2js');
const { getBoxtalAuthHeader } = require('../config/auth');

// ============================================================================
// IMPORT DU SERVICE CENTRALISÉ
// ============================================================================
// On utilise defaultsService pour garantir que les valeurs par défaut sont
// identiques entre Boxtal et Eurosender (comparaison équitable des prix)
const {
    generateRandomDimensions,
    pickRandomOriginCity,
    pickRandomContentType,
    pickRandomDestinationCity
} = require('./defaultsService');

// ============================================================================
// FONCTION : RECHERCHE RAPIDE (formulaire simple)
// ============================================================================
// Cette fonction génère automatiquement toutes les valeurs nécessaires :
// - Ville d'origine française aléatoire
// - Ville de destination aléatoire (depuis boxtalData/MongoDB)
// - Dimensions aléatoires (15 ou 20 cm)
// - Type de contenu aléatoire
// 
// Paramètres :
//   - destinationLabel : Code ISO du pays de destination (ex: "DE", "ES")
//   - poidsKg : Poids du colis en kg
//   - boxtalData : Données MongoDB avec les villes par pays
async function getCotation(destinationLabel, poidsKg, boxtalData) {
    const url = "https://envoimoinscher.com/api/v1/cotation";

    // -------------------------------------------------------------------------
    // GÉNÉRATION DES VALEURS PAR DÉFAUT via defaultsService
    // -------------------------------------------------------------------------
    
    // 1️⃣ Ville d'origine française aléatoire
    const randomOrigin = pickRandomOriginCity();
    const expediteurVille = randomOrigin.city;
    const expediteurPostal = randomOrigin.postal_code;

    // 2️⃣ Ville de destination aléatoire depuis MongoDB
    // Note : Lève une erreur si le pays n'existe pas dans boxtalData
    const randomDestination = pickRandomDestinationCity(boxtalData, destinationLabel);
    const destinataireVille = randomDestination.name;
    const destinatairePostal = randomDestination.postal;

    // 3️⃣ Type de contenu aléatoire (code numérique Boxtal)
    const randomContent = pickRandomContentType();
    const codeContenu = randomContent.code;

    // 4️⃣ Dimensions aléatoires (15 ou 20 cm pour chaque dimension)
    const dimensions = generateRandomDimensions();
    const longueur = dimensions.longueur;
    const largeur = dimensions.largeur;
    const hauteur = dimensions.hauteur;

    // -------------------------------------------------------------------------
    // PRÉPARATION DE LA REQUÊTE BOXTAL
    // -------------------------------------------------------------------------
    
    // Date de collecte = demain
    const collecte = new Date();
    collecte.setDate(collecte.getDate() + 1);
    const collecteFormatted = collecte.toISOString().split('T')[0];

    // Construction des paramètres de la requête
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

    // -------------------------------------------------------------------------
    // APPEL API BOXTAL
    // -------------------------------------------------------------------------
    
    try {
        const response = await axios.get(url, {
            headers: getBoxtalAuthHeader(),
            params: params
        });

        return await parseBoxtalResponse(response.data);

    } catch (error) {
        console.error("❌ Erreur Boxtal (recherche rapide) :", error.message);
        throw error;
    }
}

// ============================================================================
// FONCTION : RECHERCHE AVANCÉE (formulaire complet)
// ============================================================================
// Cette fonction utilise les données fournies par l'utilisateur
// Aucune génération automatique, toutes les valeurs viennent du formulaire
// 
// Paramètres : Objet contenant toutes les données du formulaire avancé
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
    const url = "https://envoimoinscher.com/api/v1/cotation";

    // -------------------------------------------------------------------------
    // VALIDATION DES DONNÉES UTILISATEUR
    // -------------------------------------------------------------------------
    
    if (!poids || !longueur || !largeur || !hauteur || !code_contenu) {
        throw new Error("Données de colis incomplètes");
    }
    if (!expediteur_ville || !expediteur_code_postal) {
        throw new Error("Données expéditeur incomplètes");
    }
    if (!destinataire_ville || !destinataire_code_postal || !destinataire_pays) {
        throw new Error("Données destinataire incomplètes");
    }

    // -------------------------------------------------------------------------
    // PRÉPARATION DE LA REQUÊTE BOXTAL
    // -------------------------------------------------------------------------
    
    // Sélection aléatoire du type (particulier/entreprise)
    const types = ["particulier", "entreprise"];
    const expediteur_type = types[Math.floor(Math.random() * types.length)];
    const destinataire_type = types[Math.floor(Math.random() * types.length)];

    // Date de collecte = demain
    const collecte = new Date();
    collecte.setDate(collecte.getDate() + 1);
    const collecteStr = collecte.toISOString().split('T')[0];

    // Construction des paramètres de la requête
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

    // -------------------------------------------------------------------------
    // APPEL API BOXTAL
    // -------------------------------------------------------------------------
    
    try {
        const response = await axios.get(url, {
            headers: getBoxtalAuthHeader(),
            params: params
        });

        return await parseBoxtalResponse(response.data);

    } catch (error) {
        console.error("❌ Erreur Boxtal (recherche avancée) :", error.message);
        if (error.response) {
            console.error("Réponse Boxtal :", error.response.data);
        }
        throw error;
    }
}

// ============================================================================
// FONCTION UTILITAIRE : PARSER LA RÉPONSE XML BOXTAL
// ============================================================================
// Convertit le XML retourné par Boxtal en tableau d'offres formatées
// Utilisée par getCotation() ET getCotationAvance()
async function parseBoxtalResponse(xmlData) {
    try {
        // -------------------------------------------------------------------------
        // TRANSFORMATION XML → JSON
        // -------------------------------------------------------------------------
        
        const result = await xml2js.parseStringPromise(xmlData, {
            explicitArray: false,
            ignoreAttrs: false
        });

        // Extraction des offres de livraison
        const offers = result?.cotation?.shipment?.offer;
        
        if (!offers) {
            return [];
        }

        // Normaliser en tableau (l'API retourne un objet si une seule offre)
        const offersArray = Array.isArray(offers) ? offers : [offers];

        // -------------------------------------------------------------------------
        // FORMATAGE DES OFFRES POUR LE FRONT-END
        // -------------------------------------------------------------------------
        
        const cleanedOffers = offersArray.map((offer) => {
            // Calcul du prix TTC (HT × 1.20)
            const priceHT = parseFloat(offer.price["tax-exclusive"]);
            const priceTTC = Math.round(priceHT * 1.20 * 100) / 100;

            // Informations de base
            const transporteur = offer.operator.label;
            const logo = offer.operator.logo;
            const service = offer.service.label;
            const modeEnvoi = offer.collection?.type?.label || "Mode inconnu";

            // Calcul du délai de livraison
            let tempsLivraison = null;
            let dateLivraison = "Inconnue";

            const collecteDate = offer.collection?.date;
            const livraisonDate = offer.delivery?.date;

            if (collecteDate && livraisonDate) {
                const d1 = new Date(collecteDate);
                const d2 = new Date(livraisonDate);
                tempsLivraison = Math.round((d2 - d1) / (1000 * 3600 * 24));
                dateLivraison = d2.toLocaleDateString('fr-FR');
            }

            // Caractéristiques du service (normaliser en tableau)
            let characteristics = offer.characteristics?.label || [];
            if (typeof characteristics === 'string') {
                characteristics = [characteristics];
            }

            // Retour au format standardisé
            return {
                provider: 'boxtal', // 🆕 Identifiant du fournisseur
                transporteur,
                logo,
                service,
                prix_ttc: priceTTC,
                livraison_estimee: dateLivraison,
                temps_livraison_jours: tempsLivraison,
                mode_envoi: modeEnvoi,
                characteristics_labels: characteristics
            };
        });

        return cleanedOffers;

    } catch (parseError) {
        console.error("❌ Erreur parsing XML Boxtal :", parseError.message);
        throw new Error("Erreur lors du traitement de la réponse Boxtal");
    }
}

// ============================================================================
// EXPORTS
// ============================================================================
module.exports = {
    getCotation,           // Recherche rapide (génère les valeurs automatiquement)
    getCotationAvance      // Recherche avancée (utilise les données utilisateur)
};