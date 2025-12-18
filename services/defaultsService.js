// ============================================================================
// SERVICE CENTRALISÉ POUR LES VALEURS PAR DÉFAUT
// ============================================================================
// Ce service garantit que Boxtal ET Eurosender utilisent les MÊMES valeurs
// par défaut pour le formulaire rapide, assurant ainsi une comparaison 
// équitable des prix (on compare des "pommes avec des pommes")
// ============================================================================

// ----------------------------------------------------------------------------
// VILLES D'ORIGINE EN FRANCE
// ----------------------------------------------------------------------------
// Liste des villes françaises utilisées pour générer une origine aléatoire
// en mode "formulaire rapide"
// Note : Le code postal sera également utilisé comme valeur de "street" 
// pour Eurosender (qui l'exige mais ne l'utilise pas pour calculer le prix)
const frenchOriginCities = [
    { city: "Paris", postal_code: "75001" },
    { city: "Lyon", postal_code: "69001" },
    { city: "Marseille", postal_code: "13001" },
    { city: "Toulouse", postal_code: "31000" },
    { city: "Nice", postal_code: "06000" }
];

// ----------------------------------------------------------------------------
// CODES CONTENU BOXTAL
// ----------------------------------------------------------------------------
// Boxtal exige un code numérique strict pour identifier le type de contenu
// Ces codes sont définis dans leur documentation API
// Eurosender accepte du texte libre, donc on convertira le label en texte simple
const boxtalContentTypes = [
    { code: 10100, label: "Documents sans valeur commerciale" },
    { code: 10120, label: "Effets personnels" },
    { code: 10130, label: "Cadeaux" },
    { code: 10140, label: "Accessoires électroniques" },
    { code: 10150, label: "Vêtements" }
];

// ----------------------------------------------------------------------------
// FONCTION : GÉNÉRER DES DIMENSIONS ALÉATOIRES
// ----------------------------------------------------------------------------
// Génère des dimensions cohérentes pour Boxtal ET Eurosender
// On choisit aléatoirement entre 15cm ou 20cm pour CHAQUE dimension
// Cela permet de varier les tests tout en restant cohérent entre les deux APIs
// 
// Retourne : { longueur: 15|20, largeur: 15|20, hauteur: 15|20 }
function generateRandomDimensions() {
    const dimensionChoices = [15, 20];
    
    return {
        longueur: dimensionChoices[Math.floor(Math.random() * dimensionChoices.length)],
        largeur: dimensionChoices[Math.floor(Math.random() * dimensionChoices.length)],
        hauteur: dimensionChoices[Math.floor(Math.random() * dimensionChoices.length)]
    };
}

// ----------------------------------------------------------------------------
// FONCTION : CHOISIR UNE VILLE D'ORIGINE ALÉATOIRE
// ----------------------------------------------------------------------------
// Sélectionne une ville française au hasard dans notre liste
// Utilisée en mode "formulaire rapide" pour les deux APIs
// 
// Retourne : { city: string, postal_code: string }
function pickRandomOriginCity() {
    return frenchOriginCities[Math.floor(Math.random() * frenchOriginCities.length)];
}

// ----------------------------------------------------------------------------
// FONCTION : CHOISIR UN TYPE DE CONTENU ALÉATOIRE
// ----------------------------------------------------------------------------
// Sélectionne un type de contenu au hasard pour Boxtal
// Le code sera utilisé pour Boxtal, le label sera converti en texte pour Eurosender
// 
// Retourne : { code: number, label: string }
function pickRandomContentType() {
    return boxtalContentTypes[Math.floor(Math.random() * boxtalContentTypes.length)];
}

// ----------------------------------------------------------------------------
// FONCTION : CHOISIR UNE VILLE DE DESTINATION ALÉATOIRE
// ----------------------------------------------------------------------------
// Sélectionne une ville de destination depuis les données MongoDB (boxtalData)
// MongoDB contient ~3 villes par pays, récupérées via countryService
// 
// Paramètres :
//   - boxtalData : Données formatées depuis MongoDB { countryIso: { cities: [...] } }
//   - destinationCountry : Code ISO du pays (ex: "DE", "ES", "IT")
// 
// Retourne : { name: string, postal: string }
// Lève une erreur si le pays n'a pas de villes dans boxtalData
function pickRandomDestinationCity(boxtalData, destinationCountry) {
    // Récupérer les infos du pays depuis boxtalData
    const countryInfo = boxtalData[destinationCountry];
    
    // Vérifier que le pays existe et a des villes
    if (!countryInfo || !countryInfo.cities || countryInfo.cities.length === 0) {
        throw new Error(`Aucune ville trouvée pour le pays : ${destinationCountry}`);
    }
    
    // Choisir une ville au hasard parmi celles disponibles
    return countryInfo.cities[Math.floor(Math.random() * countryInfo.cities.length)];
}

// ----------------------------------------------------------------------------
// MAPPING DES TERRITOIRES VERS CODES ISO OFFICIELS
// ----------------------------------------------------------------------------
// Ces territoires utilisent des codes custom (E1, A1, etc.) dans MongoDB
// pour Boxtal, mais Eurosender n'accepte QUE les codes ISO officiels.
// Ce mapping utilise les VRAIS codes ISO (CW pour Curaçao, BQ pour Bonaire, etc.)
// qui permettent à Eurosender de calculer les BONS PRIX pour ces destinations.
// 
// IMPORTANT : Tests effectués le 06/12/2025 prouvent que :
// - CW (Curaçao) : 188€ ✓ (prix correct Caraïbes)
// - NL (Pays-Bas) : 11€ ✗ (prix faux, ignore la distance)
const territoryMapping = {
    // Antilles néerlandaises (Caraïbes)
    'A1': 'BQ', // Bonaire - Code ISO officiel
    'A2': 'CW', // Curaçao - Code ISO officiel
    'A3': 'BQ', // Saba - Code ISO officiel  
    'A4': 'BQ', // Sint Eustatius - Code ISO officiel
    'A5': 'SX', // Sint Maarten (partie néerlandaise) - Code ISO officiel
    
    // Territoires espagnols
    'E1': 'ES', // Canaries - Fait partie de l'Espagne
    'E2': 'ES', // Ceuta - Enclave espagnole
    'E3': 'ES', // Melilla - Enclave espagnole
    
    // Enclaves allemandes
    'D1': 'DE', // Büsingen am Hochrhein
    'D2': 'DE', // Helgoland
    
    // Grèce
    'G1': 'GR', // Mont Athos - Région autonome
    
    // Enclaves italiennes
    'I1': 'IT', // Campione d'Italia - Enclave en Suisse
    'I2': 'IT', // Livigno - Zone franche
    
    // Îles Vierges américaines
    'V1': 'VI', // Îles Vierges US (St Thomas) - Code ISO officiel
    'V2': 'VI'  // Îles Vierges US (Ste Croix) - Code ISO officiel
};

// ----------------------------------------------------------------------------
// PAYS NON SUPPORTÉS PAR EUROSENDER
// ----------------------------------------------------------------------------
// Liste réduite : seulement les pays vraiment bloqués (15 au lieu de 30)
const eurosenderUnsupportedCountries = [
    // Services suspendus (raisons géopolitiques)
    'AF', // Afghanistan
    'BY', // Belarus
    'CU', // Cuba
    'IR', // Iran
    'KP', // Corée du Nord
    'MC', // Monaco
    'RU', // Russie
    'SY', // Syrie
    'UA', // Ukraine
    
    // Territoires sans route disponible (confirmé par tests API)
    'P1', // Açores (Portugal) - "Route not available"
    'P2', // Madère (Portugal) - "Route not available"
    'BL', // Saint-Barthélemy (France)
    'IM', // Île de Man (UK)
    'MF', // Saint-Martin français
    'PM'  // Saint-Pierre-et-Miquelon (France)
];

// ----------------------------------------------------------------------------
// EXPORTS
// ----------------------------------------------------------------------------
module.exports = {
    // Constantes
    frenchOriginCities,
    boxtalContentTypes,
    territoryMapping,
    eurosenderUnsupportedCountries,
    
    // Fonctions utilitaires
    generateRandomDimensions,
    pickRandomOriginCity,
    pickRandomContentType,
    pickRandomDestinationCity
};
