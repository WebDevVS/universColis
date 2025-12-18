// services/eurosenderService.js
// --------------------------------------------------
// Intégration Eurosender (SANDBOX, QUOTES UNIQUEMENT)
// --------------------------------------------------
// Rôle de ce fichier :
// - Prendre un "searchContext" neutre venant du contrôleur
// - Construire le payload pour /v1/quotes
// - Appeler l'API Eurosender (sandbox)
// - Normaliser chaque serviceType en structure compatible
//   avec Boxtal (transporteur, service, prix_ttc, etc.)
// - Ajouter un bloc "details" pour le panneau de détails
//
// ⚠️ IMPORTANT
// - L'API key est dans process.env.EUROSENDER_API_KEY
//   ou config/auth.js pour le DEV
// --------------------------------------------------

const axios = require('axios');
const { getEurosenderAuthHeader } = require('../config/auth');

// ============================================================================
// IMPORT DU SERVICE CENTRALISÉ
// ============================================================================
// On utilise defaultsService pour garantir que les valeurs par défaut sont
// IDENTIQUES à celles de Boxtal (comparaison équitable des prix)
const {
    generateRandomDimensions,
    pickRandomOriginCity,
    pickRandomDestinationCity,
    territoryMapping,
    eurosenderUnsupportedCountries
} = require('./defaultsService');

// EN HAUT avec les autres imports
const {
    getLogoByEurosenderCourierId,
    getCarrierNameByEurosenderCourierId
} = require('./logoService');

const BASE_URL = 'https://api.eurosender.com';
const API_KEY = process.env.EUROSENDER_API_KEY || 'A_REMPLACER_PAR_VOTRE_CLE_SANDBOX';

function ensureApiKey() {
    if (!API_KEY || API_KEY === 'A_REMPLACER_PAR_VOTRE_CLE_SANDBOX') {
        console.warn('⚠️ eurosenderService: API_KEY manquante ou placeholder. Aucune offre Eurosender ne sera retournée.');
        return false;
    }
    return true;
}

// --------------------------------------------------
// MAPPING COURIER ID → TRANSPORTEUR (hardcodé pour l'instant)
// --------------------------------------------------
// Dérivé de tous les scans que tu as faits (3kg, 30kg, 500g, etc.)
const COURIER_MAP = {
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

// --------------------------------------------------
// RESOLUTION DES ADRESSES SELON searchContext
// --------------------------------------------------
// Ces fonctions utilisent désormais defaultsService pour garantir
// que les valeurs générées sont IDENTIQUES à celles de Boxtal

function resolveOrigin(searchContext, boxtalData) {
    const formType = searchContext?.formType;

    // -------------------------------------------------------------------------
    // CAS FORMULAIRE AVANCÉ : Utiliser les données utilisateur
    // -------------------------------------------------------------------------
    if (formType === 'avance') {
        const origin = searchContext.origin || {};
        return {
            country: origin.countryIso || 'FR',
            postalCode: origin.postalCode || '75001',
            city: origin.city || 'Paris',
            // 🔑 IMPORTANT : street est requis par Eurosender, on utilise le CP
            street: origin.postalCode || '75001'
        };
    }

    // -------------------------------------------------------------------------
    // CAS FORMULAIRE RAPIDE : Utiliser defaultsService (MÊME LOGIQUE QUE BOXTAL)
    // -------------------------------------------------------------------------
    const randomOrigin = pickRandomOriginCity();
    return {
        country: 'FR',
        postalCode: randomOrigin.postal_code,
        city: randomOrigin.city,
        // 🔑 IMPORTANT : street requis par Eurosender, on utilise le CP
        street: randomOrigin.postal_code
    };
}

function resolveDestination(searchContext, boxtalData) {
    const formType = searchContext?.formType;
    const dest = searchContext.destination || {};
    let countryIsoOriginal = (dest.countryIso || 'FR').toUpperCase();

    // Mapper les territoires vers leur code ISO officiel pour Eurosender
    // Ex: A2 (Curaçao Boxtal) → CW (code ISO officiel Curaçao)
    // Cela permet à Eurosender de calculer les bons prix (189€ au lieu de 11€)
    let countryIsoForEurosender = territoryMapping[countryIsoOriginal] || countryIsoOriginal;

    if (formType === 'avance' && dest.city && dest.postalCode) {
        return {
            country: countryIsoForEurosender, // CW au lieu de A2
            postalCode: dest.postalCode,
            city: dest.city,
            street: dest.postalCode
        };
    }

    try {
        // IMPORTANT : On récupère la ville depuis boxtalData avec le code ORIGINAL (A2)
        const randomDestination = pickRandomDestinationCity(boxtalData, countryIsoOriginal);
        return {
            country: countryIsoForEurosender, // CW au lieu de A2
            postalCode: randomDestination.postal,
            city: randomDestination.name,
            street: randomDestination.postal
        };
    } catch (error) {
        console.error(`Erreur destination Eurosender: ${error.message}`);
        throw error;
    }
}

// --------------------------------------------------
// CONSTRUCTION DU PAYLOAD POUR /v1/quotes
// --------------------------------------------------

function buildShipmentOptionsPayload(searchContext, boxtalData) {
    const formType = searchContext?.formType;

    // Résolution des adresses (utilise defaultsService en mode rapide)
    const origin = resolveOrigin(searchContext, boxtalData);
    const destination = resolveDestination(searchContext, boxtalData);

    // -------------------------------------------------------------------------
    // POIDS : Depuis searchContext ou 1kg par défaut
    // -------------------------------------------------------------------------
    const weightKg = searchContext?.parcel?.weightKg
        ? Number(searchContext.parcel.weightKg)
        : 1;

    // -------------------------------------------------------------------------
    // DIMENSIONS : Utiliser defaultsService en mode rapide (COHÉRENCE BOXTAL)
    // -------------------------------------------------------------------------
    let lengthCm, widthCm, heightCm;

    if (formType === 'avance' && searchContext?.parcel?.lengthCm) {
        // Formulaire avancé : utiliser les données utilisateur
        lengthCm = Number(searchContext.parcel.lengthCm);
        widthCm = Number(searchContext.parcel.widthCm);
        heightCm = Number(searchContext.parcel.heightCm);
    } else {
        // Formulaire rapide : utiliser defaultsService (MÊMES dimensions que Boxtal)
        const dimensions = generateRandomDimensions();
        lengthCm = dimensions.longueur;
        widthCm = dimensions.largeur;
        heightCm = dimensions.hauteur;
    }

    // -------------------------------------------------------------------------
    // DATE DE COLLECTE : J+1 par défaut
    // -------------------------------------------------------------------------
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const pickupDate =
        searchContext?.pickupDate || today.toISOString().split('T')[0];

    // -------------------------------------------------------------------------
    // CONSTRUCTION DU PAYLOAD EUROSENDER
    // -------------------------------------------------------------------------
    return {
        shipment: {
            pickupAddress: {
                country: origin.country,
                zip: origin.postalCode,
                city: origin.city,
                street: origin.street // 🔑 Requis par Eurosender
            },
            deliveryAddress: {
                country: destination.country,
                zip: destination.postalCode,
                city: destination.city,
                street: destination.street // 🔑 Requis par Eurosender
            },
            pickupDate,
            independentPickup: false
        },
        parcels: {
            packages: [
                {
                    parcelId: 'PKG1',
                    quantity: 1,
                    width: widthCm,
                    height: heightCm,
                    length: lengthCm,
                    weight: weightKg,
                    content: 'test box', // Eurosender accepte texte libre
                    value: 20
                }
            ]
        },
        paymentMethod: 'credit',
        labelFormat: 'pdf'
    };
}

// --------------------------------------------------
// NORMALISATION D'UNE OFFRETE (serviceType → format interne)
// --------------------------------------------------

// Traduction du type de service (name) en label FR
function translateServiceName(name) {
    switch (name) {
        case 'selection':
            return 'Service recommandé';
        case 'regular_plus':
            return 'Standard';
        case 'express':
            return 'Express';
        default:
            return name || 'Service';
    }
}

// Traduction du serviceSubtype en "mode_envoi" + label FR
function translateServiceSubtype(serviceSubtype) {
    switch (serviceSubtype) {
        case 'door_to_door':
            return {
                modeEnvoi: 'Domicile à domicile',
                label: 'Domicile → domicile'
            };
        case 'shop_to_shop':
            return {
                modeEnvoi: 'Point relais à point relais',
                label: 'Point relais → point relais'
            };
        case 'door_to_shop':
            return {
                modeEnvoi: 'Domicile à point relais',
                label: 'Domicile → point relais'
            };
        case 'shop_to_door':
            return {
                modeEnvoi: 'Point relais à domicile',
                label: 'Point relais → domicile'
            };
        default:
            return {
                modeEnvoi: 'Mode de livraison non spécifié',
                label: 'Mode inconnu'
            };
    }
}

// Convertit edt ("1", "2-3", etc.) en { joursMax, labelFR }
function normaliseEdt(edt) {
    if (!edt) {
        return {
            joursMax: null,
            label: 'Délai non spécifié'
        };
    }

    const parts = String(edt).split('-').map(p => p.trim());
    let minJours = null;
    let maxJours = null;

    if (parts.length === 1) {
        const val = parseInt(parts[0], 10);
        if (!isNaN(val)) {
            minJours = val;
            maxJours = val;
        }
    } else {
        const v1 = parseInt(parts[0], 10);
        const v2 = parseInt(parts[1], 10);
        if (!isNaN(v1)) minJours = v1;
        if (!isNaN(v2)) maxJours = v2;
    }

    const joursMax = maxJours || minJours;

    let label;
    if (minJours !== null && maxJours !== null && minJours !== maxJours) {
        label = `Sous ${minJours}–${maxJours} jours ouvrés`;
    } else if (joursMax !== null) {
        label = `Sous ${joursMax} jour${joursMax > 1 ? 's' : ''} ouvré${joursMax > 1 ? 's' : ''}`;
    } else {
        label = 'Délai non spécifié';
    }

    return { joursMax, label };
}

function buildCharacteristicsLabels(serviceType, serviceSubtypeInfo, edtInfo) {
    const labels = [];

    labels.push('Offre via Eurosender');

    // Mode d'envoi (FR)
    labels.push(serviceSubtypeInfo.modeEnvoi);

    // Etiquette obligatoire ou non
    if (serviceType.isLabelRequired) {
        labels.push('Étiquette à imprimer obligatoire');
    } else {
        labels.push('Sans étiquette à imprimer');
    }

    // Créneau d'enlèvement
    if (serviceType.pickupTimeFrameSelectionPossible) {
        labels.push("Créneau d'enlèvement sélectionnable");
    }

    // Appel requis
    if (serviceType.isCallRequired) {
        labels.push("Appel de confirmation requis");
    }

    // Délai indicatif
    if (edtInfo.label) {
        labels.push(edtInfo.label);
    }

    return labels;
}

/**
 * Génère les détails enrichis pour l'affichage dans la modale
 * @param {Object} st - Service type de la réponse API Eurosender
 * @param {string} transporteurNom - Nom du transporteur (depuis logoService)
 * @param {number} prixTTC - Prix TTC de l'offre
 * @returns {Object} Détails enrichis
 */
function genererDetailsEnrichis(st, transporteurNom, prixTTC) {
    // -------------------------------------------------------------------------
    // SERVICES INCLUS (pour la section avec checkmarks)
    // -------------------------------------------------------------------------
    const servicesInclus = [
        {
            texte: "Offre via Eurosender",
            tooltip: "Partenaire d'UniversColis qui gère la réservation et l'expédition"
        }
    ];

    // Mode d'envoi (door-to-door vs door-to-shop)
    if (st.serviceSubtype === 'door_to_door') {
        servicesInclus.push({
            texte: "Enlèvement à domicile (9h-18h)",
            tooltip: "Un chauffeur récupère votre colis à l'adresse indiquée"
        });
    } else if (st.serviceSubtype === 'door_to_shop') {
        servicesInclus.push({
            texte: "Livraison en point relais",
            tooltip: "Vous déposez le colis dans un point relais proche"
        });
    }

    // Étiquette
    if (st.isLabelRequired) {
        servicesInclus.push({
            texte: "Étiquette à imprimer",
            tooltip: "Vous recevrez un PDF par email à imprimer et coller sur le colis"
        });
    } else {
        servicesInclus.push({
            texte: "Étiquette fournie par le chauffeur",
            tooltip: "Le chauffeur apporte l'étiquette lors de l'enlèvement"
        });
    }

    // Délai (déjà affiché ailleurs mais on peut l'inclure)
    const edtInfo = normaliseEdt(st.edt);
    if (edtInfo.label) {
        servicesInclus.push({
            texte: edtInfo.label,
            tooltip: null
        });
    }

    // Assurance de base
    const assuranceBase = st.insurances && st.insurances[0]
        ? st.insurances[0].coverage
        : 150;

    servicesInclus.push({
        texte: `Assurance de base : ${assuranceBase}€`,
        tooltip: "Couvre les dommages durant le transport. Options supplémentaires disponibles lors de la réservation."
    });

    // Suivi
    servicesInclus.push({
        texte: "Suivi en ligne",
        tooltip: "Numéro de suivi fourni par email après réservation"
    });

    // -------------------------------------------------------------------------
    // PROCESSUS DE RÉSERVATION (texte formaté)
    // -------------------------------------------------------------------------
    const processusTexte = `
Cette offre est proposée via Eurosender, plateforme partenaire travaillant avec ${transporteurNom} et d'autres grands transporteurs.

**Comment ça marche :**

<span class="badge-numero">1</span> **Réservation** : Cliquez sur Réserver → vous êtes redirigé(e) vers Eurosender

<span class="badge-numero">2</span> **Formulaire** : Remplissez les informations d'expédition et procédez au paiement en ligne

<i class="fa-solid fa-lightbulb icon-warning-inline"></i> **Important** : Sur le site d'Eurosender, plusieurs offres peuvent apparaître pour le même envoi. Choisissez celle dont le prix correspond à celui affiché ici (${prixTTC.toFixed(2)}€).

<span class="badge-numero">3</span> <strong>Instructions</strong> : Vous recevez par email :
• ${st.isLabelRequired ? "L'étiquette d'expédition à imprimer" : "La confirmation (étiquette apportée par le chauffeur)"}
• Votre numéro de suivi
• Les détails de collecte

<span class="badge-numero">4</span> **Envoi** : ${st.serviceSubtype === 'door_to_door'
            ? "Un chauffeur récupère le colis à votre adresse (généralement entre 9h et 18h)"
            : "Vous déposez le colis dans un point relais"}

<i class="fa-solid fa-circle-info icon-info-inline"></i> UniversColis compare les prix. L'expédition est gérée par Eurosender et ses partenaires transporteurs.
    `.trim();

    // -------------------------------------------------------------------------
    // ASSURANCES & OPTIONS (pour section dédiée si besoin)
    // -------------------------------------------------------------------------
    const optionsAssurance = [];
    if (st.insurances && st.insurances.length > 1) {
        // Sauter la première (c'est l'assurance de base déjà mentionnée)
        for (let i = 1; i < st.insurances.length; i++) {
            const ins = st.insurances[i];
            optionsAssurance.push({
                couverture: ins.coverage,
                texte: ins.text,
                prixTTC: ins.price?.original?.gross || 0
            });
        }
    }

    // -------------------------------------------------------------------------
    // LIENS
    // -------------------------------------------------------------------------
    const liens = {
        cgvTransporteur: st.courierTermsAndConditionsLink || null,
        cgvEurosender: null // Sera fourni par generalTCLink
    };

    return {
        servicesInclus,
        processusTexte,
        optionsAssurance,
        liens
    };
}

// --------------------------------------------------
// FONCTION PRINCIPALE : getEurosenderOffers(searchContext, boxtalData)
// --------------------------------------------------
// 🆕 IMPORTANT : Maintenant on passe boxtalData pour garantir la cohérence

async function getEurosenderOffers(searchContext, boxtalData) {

    if (!ensureApiKey()) { return []; }

    // Vérifier si le pays est blacklisté
    const destination = searchContext?.destination?.countryIso;
    if (eurosenderUnsupportedCountries.includes(destination)) {
        // Pays non supporté : retourner silencieusement aucune offre
        // L'utilisateur verra quand même les offres Boxtal
        return [];
    }

    const payload = buildShipmentOptionsPayload(searchContext, boxtalData);
    const endpoint = `${BASE_URL}/v1/quotes`;
    try {
        const res = await axios.post(endpoint, payload, {
            headers: {
                ...getEurosenderAuthHeader() // => { 'x-api-key': <key>, JSON }
            },
            timeout: 15000
        });

        const data = res.data || {};
        const options = data.options || {};
        const serviceTypes = Array.isArray(options.serviceTypes) ? options.serviceTypes : [];
        const generalTC = options.generalTermsAndConditionsLink || null;

        if (serviceTypes.length === 0) return [];

        return serviceTypes
            .map(st => normalizeServiceTypeToOffer(st, generalTC))
            .filter(Boolean);

    } catch (err) {
        console.error('❌ Eurosender /v1/quotes FAILED:');
        if (err.response) {
            console.error('   Status:', err.response.status, err.response.statusText || '');
            console.error('   Body:', JSON.stringify(err.response.data, null, 2));
        } else {
            console.error(err);
        }
        return [];
    }
}

// Normalise un serviceType Eurosender vers le format interne + bloc details
function normalizeServiceTypeToOffer(st, generalTCLink) {
    if (!st || !st.price || !st.price.original) {
        return null;
    }

    // Prix TTC
    const prixTTC = Number(st.price.original.gross);
    const currency = st.price.original.currencyCode || 'EUR';

    // Transporteur depuis courierId → logoService
    const courierId = st.courierId != null ? String(st.courierId) : null;
    const transporteur = getCarrierNameByEurosenderCourierId(courierId);
    const logoUrl = getLogoByEurosenderCourierId(courierId);

    // Type de service + mode d'envoi
    const serviceNameFR = translateServiceName(st.name);
    const subtypeInfo = translateServiceSubtype(st.serviceSubtype);
    const edtInfo = normaliseEdt(st.edt);

    // Label de service pour l'affichage
    const serviceLabel = `${serviceNameFR} (${subtypeInfo.modeEnvoi})`;

    // Caractéristiques (liste de labels pour le front)
    const characteristics_labels = buildCharacteristicsLabels(st, subtypeInfo, edtInfo);

    // Délai max en jours (pour filtrage)
    const temps_livraison_jours = edtInfo.joursMax;

    // ✅ NOUVEAU : Générer les détails enrichis
    const detailsEnrichis = genererDetailsEnrichis(st, transporteur, prixTTC);

    // Bloc details (pour panneau "Détails")
    const details = {
        // Anciennes infos (gardées pour compatibilité)
        etiquette_obligatoire: !!st.isLabelRequired,
        appel_requis: !!st.isCallRequired,
        creneau_enlevement: !!st.pickupTimeFrameSelectionPossible,
        assurances: Array.isArray(st.insurances)
            ? st.insurances.map(ins => ({
                id: ins.id,
                couverture: ins.coverage,
                texte: ins.text,
                prix_ttc: ins.price?.original?.gross ?? 0,
                devise: ins.price?.original?.currencyCode || currency
            }))
            : [],
        addOns: Array.isArray(st.addOns)
            ? st.addOns.map(a => ({
                code: a.code || null,
                nom: a.name || null,
                description: a.description || null
            }))
            : [],
        tc_transporteur_url: st.courierTermsAndConditionsLink || null,
        tc_eurosender_url: generalTCLink || null,

        // ✅ NOUVEAU : Détails enrichis
        enrichis: {
            servicesInclus: detailsEnrichis.servicesInclus,
            processusTexte: detailsEnrichis.processusTexte,
            optionsAssurance: detailsEnrichis.optionsAssurance,
            liens: {
                cgvTransporteur: detailsEnrichis.liens.cgvTransporteur,
                cgvEurosender: generalTCLink
            }
        }
    };

    return {
        // Pour débogage / extension
        provider: 'eurosender',
        provider_service_code: st.name,
        provider_offer_id: st.courierId,

        // Format interne "type Boxtal"
        transporteur,
        logo: logoUrl,
        service: serviceLabel,
        prix_ttc: prixTTC,
        livraison_estimee: edtInfo.label,
        temps_livraison_jours,
        mode_envoi: subtypeInfo.modeEnvoi,
        characteristics_labels,

        // Bloc de détails enrichis
        details
    };
}

// --------------------------------------------------
// EXPORT
// --------------------------------------------------

module.exports = {
    getEurosenderOffers,
    genererDetailsEnrichis
};