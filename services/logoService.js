// services/logoService.js
// ============================================================================
// SERVICE DE GESTION DES LOGOS TRANSPORTEURS
// ============================================================================
// Centralise la récupération des logos pour Boxtal ET Eurosender
// Utilise le CDN de Boxtal quand possible + fallbacks Wikipedia

const carrierLogos = {
    // -------------------------------------------------------------------------
    // LOGOS BOXTAL (CDN officiel Boxtal - haute qualité)
    // -------------------------------------------------------------------------
    "Chronopost": "https://resource.boxtal.build/images/carriers/chrp.png",
    "Delivengo": "https://resource.boxtal.build/images/carriers/dlvg.png",
    "DHL Express": "https://resource.boxtal.build/images/carriers/dhle.png",
    "DHL": "https://resource.boxtal.build/images/carriers/dhle.png",
    "Happy Post": "https://resource.boxtal.build/images/carriers/imxe.png",
    "La Poste": "https://resource.boxtal.build/images/carriers/pofr.png",
    "Mondial Relay": "https://resource.boxtal.build/images/carriers/monr.png",
    "Sodexi": "https://resource.boxtal.build/images/carriers/sodx.png",
    "Sodexim": "https://resource.boxtal.build/images/carriers/sodx.png",
    "TNT Express": "https://resource.boxtal.build/images/carriers/tnte.png",
    "UPS": "https://resource.boxtal.build/images/carriers/upse.png",

   // -------------------------------------------------------------------------
    // LOGOS CDN - Wikipedia (testés et fonctionnels)
    // -------------------------------------------------------------------------
    "FedEx": "/static/img/logos/fedex.png",
    "GLS": "/static/img/logos/gls.png",
    "DPD": "/static/img/logos/dpd.png",

};

// Mapping des courierId Eurosender vers noms de transporteurs
const courierIdMapping = {
    '3': 'GLS',
    '26': 'DPD',
    '46': 'DHL',
    '117': 'FedEx',
    '118': 'FedEx',
    '123': 'GLS',
    '124': 'Chronopost',
    '127': 'FedEx',
    '131': 'FedEx',
    '136': 'UPS',
    '137': 'UPS',
    '138': 'UPS',
    '140': 'FedEx',
    '144': 'DHL'
};

/**
 * Récupère le logo d'un transporteur par son nom
 * @param {string} carrierName - Nom du transporteur (ex: "DHL", "FedEx")
 * @returns {string} URL du logo ou logo par défaut
 */
function getLogoByCarrierName(carrierName) {
    if (!carrierName) {
        return carrierLogos.Eurosender;
    }

    // Recherche exacte
    if (carrierLogos[carrierName]) {
        return carrierLogos[carrierName];
    }

    // Recherche fuzzy (ignorer la casse et espaces)
    const normalizedName = carrierName.toLowerCase().trim();

    for (const [key, value] of Object.entries(carrierLogos)) {
        if (key.toLowerCase().includes(normalizedName) ||
            normalizedName.includes(key.toLowerCase())) {
            return value;
        }
    }

    // Logo par défaut
    return carrierLogos.Eurosender;
}

/**
 * Récupère le logo d'un transporteur Eurosender par son courierId
 * @param {number|string} courierId - ID du courier Eurosender (ex: 46, 124)
 * @returns {string} URL du logo
 */
function getLogoByEurosenderCourierId(courierId) {
    const carrierName = courierIdMapping[String(courierId)];

    if (carrierName) {
        return getLogoByCarrierName(carrierName);
    }

    // Fallback
    return carrierLogos.Eurosender;
}

/**
 * Récupère le nom du transporteur à partir du courierId Eurosender
 * @param {number|string} courierId - ID du courier Eurosender
 * @returns {string} Nom du transporteur ou "Eurosender"
 */
function getCarrierNameByEurosenderCourierId(courierId) {
    return courierIdMapping[String(courierId)] || 'Eurosender';
}

/**
 * Liste tous les logos disponibles (pour la home page)
 * @returns {Object} Dictionnaire nom → URL logo
 */
function getAllLogos() {
    return carrierLogos;
}

module.exports = {
    getLogoByCarrierName,
    getLogoByEurosenderCourierId,
    getCarrierNameByEurosenderCourierId,
    getAllLogos
};