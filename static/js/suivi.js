// ===== VERSION COMPLÈTE OPTIMISÉE POUR INP =====
// Lazy-loading intelligent des widgets de tracking
// Objectif : Réduire INP de 234ms à ~150ms



// ===== SYSTÈME DE LAZY-LOADING (NOUVEAU) =====
let widgetsLoaded = {
  '17track': false,
  'track123': false,
  'trackglobal': false,
  'parcelsapp': false,
  'postalninja': false
};

let widgetScriptsLoaded = {
  '17track': false,
  'track123': false
};


document.addEventListener('DOMContentLoaded', function () {
  const trackBtn = document.getElementById('trackBtn');
  const infoDetails = document.querySelector('.tracking-info-details');
  if (trackBtn) {
    trackBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (infoDetails) {
        infoDetails.classList.remove('hidden-info');
      }
    });
  }
});

// ===== CONFIGURATION (ORIGINAL) =====
const trackerLogoMap = {
  '17track': '/static/img/trackers/17Track.webp',
  'trackglobal': '/static/img/trackers/TrackGlobal.webp',
  'parcelsapp': '/static/img/trackers/Parcelsapp.webp',
  'postalninja': '/static/img/trackers/PostalNinja.webp',
  'track123': '/static/img/trackers/Track123.webp'
};

const styleHideDescription = document.createElement('style');
styleHideDescription.innerHTML = `.current-tracker-description { display: none !important; }`;
document.head.appendChild(styleHideDescription);

// ===== CONFIGURATION DES WIDGETS (ORIGINAL) =====
const trackerWidgets = {
  'parcelsapp': num => `<iframe src="https://parcelsapp.com/widget?num=${encodeURIComponent(num)}" style="height:600px; width:100%; border:none; border-radius:10px;" loading="lazy"></iframe>`,
  'trackglobal': num => `
    <iframe src='https://track.global/fr/iframe?wuid=0&init_params=eyJoZWlnaHQiOiI0MHB4In0='
            id='track-widget' frameborder='0' style='height: 500px; width:100%; border:none; border-radius:10px;'></iframe>
    <div style='margin-top:20px;'></div>
  `,
  'track123': num => `<div id="track123-tracking-widget" style="border-radius:10px; overflow:hidden;"></div>`,
  'postalninja': num => `
   <iframe title="Widget de suivi des colis" 
          src="https://postal.ninja/widget/tracker"
          style="width: 100%; height: 500px; border: none; border-radius: 10px;"
          frameborder="0">
  </iframe>`,
  '17track': num => `<div id="YQContainer" style="border-radius:10px; overflow:hidden;"></div>`
};

// ===== CONFIGURATION INTELLIGENTE (ORIGINAL) =====
const trackersIntelligentConfig = {
  '17track': {
    name: '17Track',
    subtitle: 'Champion International',
    description: 'Optimal pour UPS, FedEx, DHL et tous les envois internationaux',
    transporteurs: '2926+ transporteurs',
    coverage: 0.95,
    speed: 0.75,
    reliability: 0.99,
    speciality: 'international',
    realData: {
      supportedCarriers: 2926,
      accuracy: '99.9%',
      countries: 230
    },
    patterns: [
      { regex: /^1Z[A-Z0-9]{16}$/, confidence: 0.98, type: 'UPS', priority: 1 },
      { regex: /^\d{12}$/, confidence: 0.95, type: 'FedEx Express', priority: 1 },
      { regex: /^\d{10}$/, confidence: 0.90, type: 'FedEx Ground', priority: 1 },
      { regex: /^[A-Z]{2}\d{9}[A-Z]{2}$/, confidence: 0.92, type: 'Postal International', priority: 2 },
      { regex: /^RR\d{9}[A-Z]{2}$/, confidence: 0.90, type: 'Recommandé International', priority: 2 },
      { regex: /^[0-9][A-Z][0-9]{11}$/, confidence: 0.80, type: 'Format alphanumérique 13 char', priority: 1 },
      { regex: /^\d{10}$/, confidence: 0.92, type: 'DHL (10 chiffres)', priority: 1 },
      { regex: /^\d{20}$/, confidence: 0.92, type: 'DHL (20 chiffres)', priority: 1 },
      { regex: /^JVGL\d{9,}$/, confidence: 0.92, type: 'DHL (JVGL)', priority: 1 },
      { regex: /^00\d{12,14}$/, confidence: 0.90, type: 'GLS', priority: 1 },
      { regex: /^\d{14}$/, confidence: 0.90, type: 'DPD', priority: 1 },
      { regex: /^\d{9}$/, confidence: 0.88, type: 'TNT', priority: 1 },
      { regex: /^9\d{15,21}$/, confidence: 0.90, type: 'USPS', priority: 1 },
      { regex: /^(8R|6A|6C)\d{11}$/, confidence: 0.90, type: 'Colissimo (autres)', priority: 1 },
      { regex: /^\d{16}$/, confidence: 0.85, type: 'Hermes', priority: 1 },
      { regex: /^[A-Z]{2}\d{9}GB$/, confidence: 0.88, type: 'Royal Mail', priority: 1 }
    ]
  },

  'track123': {
    name: 'Track123',
    subtitle: 'Expert Colis Chinois',
    description: 'Spécialisé pour AliExpress, Yanwen, Cainiao et tous les colis chinois',
    transporteurs: 'Spécialiste Chine',
    coverage: 0.85,
    speed: 0.95,
    reliability: 0.98,
    speciality: 'china',
    realData: {
      yanwenSuccess: '98%',
      cainiaoExpertise: 'Leader',
      aliexpressPartner: true
    },
    patterns: [
      { regex: /^YT\d{16}$/, confidence: 0.98, type: 'Yanwen (Champion)', priority: 1 },
      { regex: /^LP\d{16}$/, confidence: 0.95, type: 'Cainiao (AliExpress)', priority: 1 },
      { regex: /^LY\d{16}$/, confidence: 0.95, type: 'Yun Express', priority: 1 },
      { regex: /^VP\d{9}YP$/, confidence: 0.90, type: 'Yanwen Express', priority: 1 },
      { regex: /^\d{13}$/, confidence: 0.85, type: 'Format chinois probable', priority: 2 }
    ]
  },

  'postalninja': {
    name: 'Postal Ninja',
    subtitle: 'Expert France & Europe',
    description: 'Interface française pour Colissimo, La Poste et Europe',
    transporteurs: '880+ services',
    coverage: 0.88,
    speed: 0.90,
    reliability: 0.92,
    speciality: 'europe',
    realData: {
      supportedServices: 880,
      frenchInterface: true,
      colissimoExpert: true
    },
    patterns: [
      { regex: /^CP\d{9}[A-Z]{2}$/, confidence: 0.95, type: 'Colissimo', priority: 1 },
      { regex: /^LX\d{9}[A-Z]{2}$/, confidence: 0.90, type: 'Chronopost', priority: 1 },
      { regex: /^[A-Z]{2}\d{9}(FR|ES|DE|IT|NL|BE)$/, confidence: 0.88, type: 'Postal européen', priority: 2 },
      { regex: /^(8R|6A|6C)\d{11}$/, confidence: 0.92, type: 'Colissimo (autres)', priority: 1 },
      { regex: /^\d{11}$/, confidence: 0.85, type: 'La Poste (France)', priority: 1 },
      { regex: /^[A-Z]{2}\d{9}GB$/, confidence: 0.88, type: 'Royal Mail', priority: 1 }
    ]
  },

  'trackglobal': {
    name: 'Track.Global',
    subtitle: 'Solution Backup',
    description: 'Rapide et efficace pour formats atypiques et inconnus',
    transporteurs: 'Multi-régional',
    coverage: 0.80,
    speed: 0.98,
    reliability: 0.85,
    speciality: 'backup',
    realData: {
      speedChampion: true,
      unknownFormats: 'Spécialité'
    },
    patterns: [
      { regex: /^[A-Z]{4}\d{10}$/, confidence: 0.80, type: 'Format asiatique', priority: 2 },
      { regex: /^[A-Z]{3}\d{8}$/, confidence: 0.70, type: 'Format atypique', priority: 3 }
    ]
  },

  'parcelsapp': {
    name: 'ParcelsApp',
    subtitle: 'Analyse Complète',
    description: 'Historique détaillé et suivi multi-étapes pour analyses poussées',
    transporteurs: '900+ internationaux',
    coverage: 0.88,
    speed: 0.70,
    reliability: 0.90,
    speciality: 'detailed',
    realData: {
      detailLevel: 'Maximum',
      amazonExpert: true
    },
    patterns: [
      { regex: /^TBA\d{12}$/, confidence: 0.90, type: 'Amazon Logistics', priority: 1 },
      { regex: /^AMAZON\d+$/, confidence: 0.85, type: 'Amazon', priority: 1 }
    ]
  }
};

// ===== VARIABLES GLOBALES (ORIGINAL) =====
let currentTracker = null;
let currentTrackingNumber = null;
let isLoading = false;
let trackingHistory = JSON.parse(localStorage.getItem('trackingHistory') || '[]');
let detectionCache = new Map();
let currentWidgetTimeout = null;
let performanceStats = JSON.parse(localStorage.getItem('performanceStats') || '{}');
let originalDetection = null;

// ===== SANITIZATION (ORIGINAL) =====
function sanitizeTrackingNumber(input) {
  if (typeof input !== 'string') {
    console.warn('⚠️ Numéro de suivi invalide (pas une chaîne)');
    return '';
  }
  const cleaned = input
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9\-]/g, '')
    .substring(0, 50);
  if (cleaned !== input.trim()) { }
  return cleaned;
}

// ===== DÉTECTION (ORIGINAL - COMPLET) =====
function detectBestTracker(trackingNumber) {
  const cacheKey = trackingNumber.trim().toUpperCase();
  if (detectionCache.has(cacheKey)) {
    return detectionCache.get(cacheKey);
  }

  const cleanNumber = trackingNumber.trim().toUpperCase();
  let bestMatch = null;
  let maxConfidence = 0;
  let maxPriority = 0;

  for (const [trackerId, config] of Object.entries(trackersIntelligentConfig)) {
    if (!config.patterns) continue;

    for (const pattern of config.patterns) {
      if (pattern.regex.test(cleanNumber)) {
        const score = pattern.confidence * pattern.priority;

        if (score > (maxConfidence * maxPriority) ||
          (score === (maxConfidence * maxPriority) && pattern.confidence > maxConfidence)) {
          bestMatch = {
            tracker: trackerId,
            confidence: pattern.confidence,
            detected: pattern.type,
            config: config,
            priority: pattern.priority,
            reason: `Pattern ${pattern.type} détecté avec priorité ${pattern.priority}`
          };
          maxConfidence = pattern.confidence;
          maxPriority = pattern.priority;
        }
      }
    }
  }

  if (!bestMatch) {
    bestMatch = analyzeByAdvancedHeuristics(cleanNumber);
  }

  const historicalMatch = getHistoricalWinner(cleanNumber);
  if (historicalMatch && historicalMatch.confidence > bestMatch.confidence) {
    bestMatch = historicalMatch;
  }

  bestMatch.alternatives = getSmartAlternatives(bestMatch.tracker, cleanNumber);

  detectionCache.set(cacheKey, bestMatch);
  recordDetectionAttempt(cleanNumber, bestMatch);

  return bestMatch;
}

function analyzeByAdvancedHeuristics(trackingNumber) {
  const length = trackingNumber.length;
  const hasLetters = /[A-Z]/.test(trackingNumber);
  const onlyNumbers = /^\d+$/.test(trackingNumber);
  const startsWithLetter = /^[A-Z]/.test(trackingNumber);

  if (length === 16 && trackingNumber.startsWith('YT')) {
    return {
      tracker: 'track123',
      confidence: 0.98,
      detected: 'Yanwen (98% de réussite)',
      config: trackersIntelligentConfig['track123'],
      reason: 'Format Yanwen YT détecté - Track123 champion confirmé'
    };
  }

  if (length === 18 && trackingNumber.startsWith('1Z')) {
    return {
      tracker: '17track',
      confidence: 0.98,
      detected: 'UPS (Excellence mondiale)',
      config: trackersIntelligentConfig['17track'],
      reason: 'Format UPS 1Z détecté - 17Track champion confirmé'
    };
  }

  if (trackingNumber.startsWith('CP') && (trackingNumber.endsWith('FR') || length === 13)) {
    return {
      tracker: 'postalninja',
      confidence: 0.95,
      detected: 'Colissimo France',
      config: trackersIntelligentConfig['postalninja'],
      reason: 'Format Colissimo détecté - Interface française optimale'
    };
  }

  if (length === 13 && onlyNumbers) {
    return {
      tracker: 'track123',
      confidence: 0.85,
      detected: 'Format chinois (13 chiffres)',
      config: trackersIntelligentConfig['track123'],
      reason: '13 chiffres - Pattern chinois typique'
    };
  }

  if (trackingNumber.startsWith('TBA') || trackingNumber.includes('AMAZON')) {
    return {
      tracker: 'parcelsapp',
      confidence: 0.90,
      detected: 'Amazon Logistics',
      config: trackersIntelligentConfig['parcelsapp'],
      reason: 'Amazon détecté - ParcelsApp expert confirmé'
    };
  }

  return {
    tracker: '17track',
    confidence: 0.75,
    detected: 'Couverture universelle',
    config: trackersIntelligentConfig['17track'],
    reason: '2926 transporteurs - Couverture la plus large au monde'
  };
}

function getHistoricalWinner(trackingNumber) {
  const similarSuccessful = trackingHistory
    .filter(record =>
      record.success === true &&
      record.number.length === trackingNumber.length &&
      record.number.substring(0, 2) === trackingNumber.substring(0, 2)
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  if (similarSuccessful.length >= 2) {
    const mostRecent = similarSuccessful[0];
    return {
      ...mostRecent.detection,
      confidence: Math.min(mostRecent.detection.confidence + 0.1, 0.99),
      detected: mostRecent.detection.detected + ' (Apprentissage)',
      reason: 'Basé sur vos succès précédents - Pattern similaire confirmé',
      isHistorical: true
    };
  }

  return null;
}

function getSmartAlternatives(primaryTracker, trackingNumber) {
  const cleanNumber = trackingNumber.trim().toUpperCase();

  if (/^(YT|LP|LY|LZ|UJ|UG|LS)\d+/.test(cleanNumber)) {
    return ['track123'];
  }

  if (/^(CP|LX|8R|6A|6C)/.test(cleanNumber) || cleanNumber.includes('FR')) {
    return ['postalninja'];
  }

  if (/^TBA/.test(cleanNumber) || cleanNumber.includes('AMAZON')) {
    return ['parcelsapp'];
  }

  if (cleanNumber.length < 10 || /^[A-Z]{4,}/.test(cleanNumber)) {
    return ['trackglobal'];
  }

  return ['track123'];
}

function getSmartDisplayConfidence(realConfidence, tracker) {
  const config = trackersIntelligentConfig[tracker];

  if (realConfidence >= 0.95) {
    return {
      display: Math.round(realConfidence * 100) + '%',
      label: 'Excellence confirmée',
      color: '#10b981',
      icon: '🎯'
    };
  }

  if (realConfidence >= 0.85) {
    return {
      display: Math.round(realConfidence * 100) + '%',
      label: 'Très fiable',
      color: '#059669',
      icon: '✅'
    };
  }

  if (realConfidence >= 0.75) {
    return {
      display: Math.round(realConfidence * 100) + '%',
      label: 'Recommandé',
      color: '#0891b2',
      icon: '👍'
    };
  }

  return {
    display: 'Couverture maximale',
    label: 'Réseau mondial le plus large',
    color: '#7c3aed',
    icon: '🌍'
  };
}


function updateCurrentTrackerDisplay(tracker) {
}

function hideRecommendation() {
  const section = document.getElementById('recommendation-section');
  if (section) {
    section.style.opacity = '0';
    setTimeout(() => section.remove(), 200);
  }
}

// ===== CHARGEMENT LAZY DES TRACKERS (NOUVEAU - OPTIMISÉ) =====
function load17TrackLazy(trackingNumber) {

  // RESET COMPLET : vide le conteneur ET force le rechargement du script
  const container = document.getElementById('YQContainer');
  if (container) {
    container.innerHTML = '';
  }

  // Si le script est déjà chargé ET YQV5 existe, réutilise-le
  if (widgetScriptsLoaded['17track'] && typeof YQV5 !== "undefined") {
    // Attend que le DOM soit stable et que le conteneur soit vraiment prêt
    setTimeout(() => {
      const verifyContainer = document.getElementById('YQContainer');
      if (!verifyContainer) {
        console.error('❌ Conteneur YQContainer introuvable');
        return;
      }

      YQV5.trackSingle({
        YQ_ContainerId: "YQContainer",
        YQ_Height: 600,
        YQ_Lang: "fr",
        YQ_Fc: "0",
        YQ_Num: trackingNumber
      });
      widgetsLoaded['17track'] = true;
    }, 100); // Augmenté à 100ms pour laisser le temps au DOM
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://www.17track.net/externalcall.js';
  script.async = true;
  script.onload = () => {
    widgetScriptsLoaded['17track'] = true;
    if (typeof YQV5 !== "undefined") {
      YQV5.trackSingle({
        YQ_ContainerId: "YQContainer",
        YQ_Height: 600,
        YQ_Lang: "fr",
        YQ_Fc: "0",
        YQ_Num: trackingNumber
      });
      widgetsLoaded['17track'] = true;
    }
  };
  document.head.appendChild(script);
}

function loadTrack123ScriptOnce() {
  // Supprime l'ancien widget Track123 s'il existe
  const oldWidget = document.getElementById("track123-tracking-widget");
  if (oldWidget) {
    oldWidget.innerHTML = "";
  }

  // Supprime l'ancien script Track123 s'il existe
  const oldScript = document.getElementById("track123-tracking-widget-script");
  if (oldScript && oldScript.parentNode) {
    oldScript.parentNode.removeChild(oldScript);
  }

  // Définit la config globale comme recommandé
  window.track123WidgetConfig = {
    api_base: "https://www.track123.com",
    provider_type: 3,
    language: "en_US",
    theme_color: "#5B62FF",
    width_type: "auto",
    width_value: ""
  };

  // Ajoute le script officiel Track123 (méthode recommandée)
  (function (e, t, n) {
    var r, i = e.getElementsByTagName(t)[0];
    r = e.createElement(t);
    r.src = "https://www.track123.com/track123-widget.min.js";
    r.id = n;
    i.parentNode.insertBefore(r, i);
  })(document, "script", "track123-tracking-widget-script");
}

function preloadIframeWidgets() {
  widgetsLoaded['trackglobal'] = true;
  widgetsLoaded['parcelsapp'] = true;
  widgetsLoaded['postalninja'] = true;
}

function initLazyLoading(trackingNumber) {

  // NE PAS charger 17Track ici - il sera chargé dans showOptimizedWidget()
  // après la création du conteneur YQContainer

  const loadSecondaryWidgets = () => {
    preloadIframeWidgets();
    window.removeEventListener('scroll', scrollHandler);
  };

  const delayTimer = setTimeout(loadSecondaryWidgets, 2000);

  const scrollHandler = () => {
    clearTimeout(delayTimer);
    loadSecondaryWidgets();
  };

  window.addEventListener('scroll', scrollHandler, { once: true, passive: true });
}

// ===== REMPLACE LES FONCTIONS ORIGINALES =====
function load17Track(trackingNumber) {
  load17TrackLazy(trackingNumber);
}

// Pas de remplacement pour Track123 - on utilise directement loadTrack123ScriptOnce()

// ===== FONCTION PRINCIPALE OPTIMISÉE =====
function startTracking() {
  const input = document.getElementById('trackingNumber');
  const trackBtn = document.getElementById('trackBtn');

  if (!input || !trackBtn) return;

  const rawInput = input && input.value ? input.value.trim() : '';
  const trackingNumber = sanitizeTrackingNumber(rawInput);

  if (!trackingNumber) {
    input.focus();
    input.style.borderColor = '#ef4444';
    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = `
      color: #dc2626;
      font-size: 12px;
      margin-top: 4px;
      animation: fadeIn 0.3s;
    `;
    errorMsg.textContent = 'Veuillez entrer un numéro de suivi valide';
    const oldError = input.parentElement.querySelector('.error-message');
    if (oldError) oldError.remove();
    errorMsg.className = 'error-message';
    input.parentElement.appendChild(errorMsg);
    setTimeout(() => {
      input.style.borderColor = '';
      if (errorMsg.parentElement) errorMsg.remove();
    }, 3000);
    return;
  }

  if (trackingNumber.length < 6) {
    input.focus();
    input.style.borderColor = '#f59e0b';
    const warnMsg = document.createElement('div');
    warnMsg.style.cssText = `
      color: #d97706;
      font-size: 12px;
      margin-top: 4px;
    `;
    warnMsg.textContent = 'Le numéro semble trop court (minimum 6 caractères)';
    warnMsg.className = 'error-message';
    const oldError = input.parentElement.querySelector('.error-message');
    if (oldError) oldError.remove();
    input.parentElement.appendChild(warnMsg);
    setTimeout(() => {
      input.style.borderColor = '';
      if (warnMsg.parentElement) warnMsg.remove();
    }, 3000);
    return;
  }

  if (isLoading) return;

  // Nettoyage des anciens badges désactivé (recommandation supprimée)
  // clearAllBadges();

  // Supprime aussi l'ancienne explication si elle existe
  document.getElementById('tracker-explanation')?.remove();

  // Masque l'encart "Comment ça marche" dès le lancement du suivi
  try {
    const explainer = document.querySelector('.explainer-banner-wrapper');
    if (explainer) {
      explainer.style.display = 'none';
    }
  } catch (e) {
    console.warn('Hide explainer failed:', e);
  }

  isLoading = true;
  currentTrackingNumber = trackingNumber;
  originalDetection = null;
  currentTracker = null;

  const originalHTML = trackBtn.textContent;
  trackBtn.classList.add('loading');
  trackBtn.textContent = '';
  const spinner = document.createElement('i');
  spinner.className = 'fa-solid fa-spinner fa-spin';
  trackBtn.appendChild(spinner);
  trackBtn.appendChild(document.createTextNode(' Analyse...'));

  // hideRecommendation(); // Section de recommandation désactivée
  hideFeedback();

  setTimeout(() => {
    const startTime = Date.now();
    const detection = detectBestTracker(trackingNumber);
    const analysisTime = Date.now() - startTime;

    currentTracker = '17track';

    // RESET des flags de lazy-loading pour un nouveau tracking
    widgetsLoaded = {
      '17track': false,
      'track123': false,
      'trackglobal': false,
      'parcelsapp': false,
      'postalninja': false
    };
    secondaryWidgetsLoaded = false;

    // LANCE LE LAZY-LOADING ICI 
    initLazyLoading(trackingNumber);

    setTimeout(() => {
      showOptimizedWidget('17track', trackingNumber);
      showManualSelector();

      trackBtn.classList.remove('loading');
      trackBtn.textContent = originalHTML;
      isLoading = false;

      // ⚡ NOUVEAU : Affiche juste la phrase (déjà dans le HTML)
      const universalTip = document.querySelector('.universal-tip');
      if (universalTip) {
        universalTip.classList.remove('hidden');
      }

      // Recommandation désactivée: pas d'ajout de badge "Recommandé"

      // Afficher les sections post-suivi (actions rapides, articles, etc.)
      revealPostTrackingSections();

    }, 200);

  }, 150);
}

// ===== RESTE DU CODE ORIGINAL (showOptimizedWidget, etc.) =====
function scrollToTrackingSection() {
  const section = document.getElementById('tracking-section');
  if (!section) return;
  const header = document.querySelector('.navbar');
  const headerH = header ? header.offsetHeight : 0;
  const rect = section.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  const centerY = absoluteTop - Math.max(0, (window.innerHeight - rect.height) / 2) - headerH;
  window.scrollTo({ top: centerY, behavior: 'smooth' });
}

function scrollTrackingDeferred() {
  setTimeout(() => scrollToTrackingSection(), 60);
}

function showOptimizedWidget(trackerType, trackingNumber) {
  if (!trackerType || !trackingNumber) return;

  const oldSection = document.getElementById('tracking-section');
  if (oldSection) oldSection.remove();

  // Sécurité: s'assurer que l'encart explicatif est caché quand le widget s'affiche
  const explainer = document.querySelector('.explainer-banner-wrapper');
  if (explainer) {
    explainer.style.display = 'none';
  }

  const section = document.createElement('section');
  section.id = 'tracking-section';
  section.className = 'recommendation-section';

  const card = document.createElement('div');
  card.className = 'ai-summary-card';

  const header = document.createElement('div');
  header.className = 'ai-summary-header';
  const title = document.createElement('div');
  title.className = 'ai-summary-title';
  title.innerHTML = '<h3 class="widget-section-title"><i class="fa-solid fa-route"></i>Résultats du suivi</h3>';
  header.appendChild(title);
  card.appendChild(header);

  // Supprime le wrapper "ai-summary-content" autour du bloc copie pour gagner de la place

  const needsCopyBtn = trackerType === 'track123' || trackerType === 'trackglobal' || trackerType === 'parcelsapp' || trackerType === 'postalninja';

  const oldCopyDiv = document.getElementById('copy-tracking-btn-global');
  if (oldCopyDiv) oldCopyDiv.remove();

  if (needsCopyBtn) {
    const copyDiv = document.createElement('div');
    copyDiv.className = 'copy-tracking-btn-container';
    copyDiv.id = 'copy-tracking-btn-global';
    copyDiv.innerHTML = `
      <div class="tracking-number-header">
        <i class="fa-solid fa-lightbulb"></i>
        <strong>Comparez facilement</strong>
      </div>
      <div class="tracking-instructions">
        <p class="instructions-list">Copiez votre numéro ci-dessous, puis collez-le directement dans chaque tracker pour comparer les résultats <i class="fa-solid fa-arrow-down"></i>.</p>
      </div>
      <div class="tracking-number-display">
        <span class="tracking-number-text">${trackingNumber}</span>
        <button class="copy-tracking-btn" type="button" id="copy-btn-${Date.now()}">
          <i class="fa-solid fa-copy"></i> Copier
        </button>
      </div>
    `;
    // Ajoute directement le bloc dans la carte, sans couche supplémentaire
    card.appendChild(copyDiv);

    const copyBtn = copyDiv.querySelector('.copy-tracking-btn');
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(trackingNumber).then(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copier';
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Erreur de copie:', err);
        copyBtn.innerHTML = '<i class="fa-solid fa-times"></i> Erreur';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copier';
        }, 2000);
      });
    });

    // plus de wrapper à ajouter
  }

  const widgetContainer = document.createElement('div');
  widgetContainer.className = 'tracker-widget-container active';
  widgetContainer.id = 'current-tracking-widget';

  card.appendChild(widgetContainer);
  section.appendChild(card);

  const oldTrackingSection = document.getElementById('tracking-section');
  if (oldTrackingSection && oldTrackingSection.parentNode) {
    oldTrackingSection.parentNode.removeChild(oldTrackingSection);
  }

  // ✅ Positionnement: insère le widget AVANT .universal-tip pour l'ordre souhaité
  const universalTip = document.querySelector('.universal-tip');
  if (universalTip && universalTip.parentNode) {
    universalTip.parentNode.insertBefore(section, universalTip);
  } else {
    // Fallback : insère avant manual-selector
    const manualSelector = document.getElementById('manual-selector');
    if (manualSelector && manualSelector.parentNode) {
      manualSelector.parentNode.insertBefore(section, manualSelector);
    } else {
      (document.querySelector('.tracking-form-container') || document.body).appendChild(section);
    }
  }

  widgetContainer.innerHTML = '';
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'widget-loading-inside';
  loadingDiv.id = 'widget-loading-inside';
  const spinnerDiv = document.createElement('div');
  spinnerDiv.className = 'loading-spinner-inside';
  loadingDiv.appendChild(spinnerDiv);
  const textDiv = document.createElement('div');
  textDiv.className = 'loading-text';
  textDiv.textContent = 'Chargement du tracker...';
  loadingDiv.appendChild(textDiv);
  widgetContainer.appendChild(loadingDiv);

  if (currentWidgetTimeout) {
    clearTimeout(currentWidgetTimeout);
    currentWidgetTimeout = null;
  }

  let widgetLoadedFlag = false;
  currentWidgetTimeout = setTimeout(() => {
    if (!widgetLoadedFlag) {
      const detection = detectBestTracker(trackingNumber);
      const alternatives = detection.alternatives || [];
      handleTrackingError(new Error('Timeout de chargement du widget'), trackerType, trackingNumber);
      if (alternatives.length > 0) {
        switchTracker(alternatives[0]);
      }
    }
    const insideSpinner = widgetContainer.querySelector('#widget-loading-inside');
    if (insideSpinner) insideSpinner.style.display = 'none';
  }, 10000);

  if (['parcelsapp', 'trackglobal', 'postalninja'].includes(trackerType)) {
    let widgetHTML = trackerWidgets[trackerType](trackingNumber);
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = widgetHTML;
    let iframe = tempDiv.querySelector('iframe');
    if (iframe) {
      iframe.onload = () => {
        widgetLoadedFlag = true;
        clearTimeout(currentWidgetTimeout);
        const insideSpinner = widgetContainer.querySelector('#widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
        scrollTrackingDeferred();
        // Révéler après chargement du widget iframe
        revealPostTrackingSections();
      };
      iframe.onerror = () => {
        clearTimeout(currentWidgetTimeout);
        const detection = detectBestTracker(trackingNumber);
        const alternatives = detection.alternatives || [];
        handleTrackingError(new Error('Erreur de chargement iframe'), trackerType, trackingNumber);
        if (alternatives.length > 0) {
          switchTracker(alternatives[0]);
        }
        const insideSpinner = widgetContainer.querySelector('#widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
      };
      widgetContainer.appendChild(iframe);
      Array.from(tempDiv.childNodes).forEach(node => {
        if (node !== iframe) widgetContainer.appendChild(node);
      });
    }
  } else if (trackerType === 'track123') {
    let widgetHTML = trackerWidgets[trackerType](trackingNumber);
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = widgetHTML;
    let widget = tempDiv.querySelector('#track123-tracking-widget');
    widgetContainer.appendChild(widget);
    loadTrack123ScriptOnce();
    let waited = 0;
    const interval = setInterval(() => {
      if (widget && widget.childNodes.length > 0) {
        widgetLoadedFlag = true;
        clearTimeout(currentWidgetTimeout);
        const insideSpinner = widgetContainer.querySelector('#widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
        scrollTrackingDeferred();
        // Révéler après chargement du widget Track123
        revealPostTrackingSections();
        clearInterval(interval);
      } else if (waited > 9500) {
        const insideSpinner = widgetContainer.querySelector('#widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
        clearInterval(interval);
      }
      waited += 200;
    }, 200);
  } else if (trackerType === '17track') {
    let widgetHTML = trackerWidgets[trackerType](trackingNumber);
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = widgetHTML;
    let widget = tempDiv.querySelector('#YQContainer');
    widgetContainer.appendChild(widget);
    load17Track(trackingNumber);
    let waited = 0;
    const interval = setInterval(() => {
      if (widget && widget.childNodes.length > 0) {
        widgetLoadedFlag = true;
        clearTimeout(currentWidgetTimeout);
        const insideSpinner = widgetContainer.querySelector('#widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
        scrollTrackingDeferred();
        // Révéler après chargement du widget 17Track
        revealPostTrackingSections();
        clearInterval(interval);
      } else if (waited > 9500) {
        const insideSpinner = widgetContainer.querySelector('#widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
        clearInterval(interval);
      }
      waited += 200;
    }, 200);
  }

  updateTrackerButtons(trackerType);
  recordPerformance(trackerType, 'loaded');
}

// ===== FONCTIONS UTILITAIRES (ORIGINAL) =====
function updatePerformanceStats(tracker, success) {
  if (!performanceStats[tracker]) {
    performanceStats[tracker] = {
      attempts: 0,
      successes: 0,
      lastUsed: Date.now()
    };
  }

  const stats = performanceStats[tracker];
  stats.attempts++;
  stats.lastUsed = Date.now();

  if (success) {
    stats.successes++;
  }

  localStorage.setItem('performanceStats', JSON.stringify(performanceStats));
}

function recordPerformance(tracker, action) {
}

function recordDetectionAttempt(trackingNumber, detection) {
  const record = {
    number: trackingNumber,
    detection: detection,
    timestamp: Date.now(),
    success: null
  };

  trackingHistory.push(record);

  if (trackingHistory.length > 150) {
    trackingHistory = trackingHistory.slice(-150);
  }

  localStorage.setItem('trackingHistory', JSON.stringify(trackingHistory));
}

function tryAlternative(tracker) {
  if (currentTrackingNumber) {
    currentTracker = tracker;
    showOptimizedWidget(tracker, currentTrackingNumber);
    updateTrackerButtons(tracker);
    trackUserAction('alternative_tried', tracker);
  }
}

function switchTracker(newTracker) {
  if (!currentTrackingNumber || isLoading) return;
  currentTracker = newTracker;
  hideFeedback();
  showOptimizedWidget(newTracker, currentTrackingNumber);
  recordManualChoice(newTracker);
  trackUserAction('manual_switch', newTracker);
}

function recordManualChoice(chosenTracker) {
  const lastRecord = trackingHistory[trackingHistory.length - 1];
  if (lastRecord) {
    lastRecord.manualOverride = chosenTracker;
    lastRecord.userChoice = true;
    localStorage.setItem('trackingHistory', JSON.stringify(trackingHistory));
  }
}

function hideFeedback() {
  const feedbackWidget = document.getElementById('feedback-widget');
  if (feedbackWidget) {
    feedbackWidget.style.opacity = '0';
    setTimeout(() => feedbackWidget.remove(), 200);
  }
}

function updateTrackerButtons(activeTracker) {
  document.querySelectorAll('.tracker-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tracker === activeTracker) {
      btn.classList.add('active');
    }
  });
}

function showManualSelector() {
  const manualSelector = document.getElementById('manual-selector');
  if (!manualSelector) return;

  // ⚡ NE DÉPLACE RIEN, JUSTE AFFICHE
  if (manualSelector.classList.contains('hidden')) {
    setTimeout(() => {
      manualSelector.classList.remove('hidden');
      manualSelector.style.opacity = '1';
      manualSelector.style.visibility = 'visible';
      manualSelector.style.display = 'block';
    }, 400);
  }
}

// ===== BADGE SUGGÉRÉ INTÉGRÉ DANS LE BOUTON =====
// function addSuggestedBadge(recommendedTracker) {
//   // Recommandation désactivée
// }

// ===== NETTOYAGE DES ANCIENS BADGES =====
// function clearAllBadges() {
//   // Recommandation désactivée (plus de badges à nettoyer)
// }

function setupTrackGlobalResize() {
  window.onmessage = (e) => {
    const frame = document.querySelector('iframe#track-widget');
    const size = e.data;
    if (frame && size.height) {
      const heightToSet = size.height > 80 ? size.height : 80;
      frame.style.height = (heightToSet + 30) + 'px';
    }
  };
}

function showSmartSuggestions(inputValue) {
  if (inputValue.length < 3) {
    hideSuggestions();
    return;
  }

  const suggestions = trackingHistory
    .filter(record =>
      record.number.toLowerCase().includes(inputValue.toLowerCase()) &&
      record.success !== false
    )
    .slice(0, 4)
    .map(record => ({
      number: record.number,
      tracker: record.detection.config.name,
      success: record.success,
      confidence: record.detection.confidence
    }));

  if (suggestions.length === 0) {
    hideSuggestions();
    return;
  }

  hideSuggestions();
  const trackingInput = document.getElementById('trackingNumber');
  if (trackingInput) {
    const container = document.createElement('div');
    container.id = 'tracking-suggestions';
    container.className = 'tracking-suggestions-optimized dropdown-suggestions';

    const header = document.createElement('div');
    header.className = 'suggestions-header';
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-history';
    header.appendChild(icon);
    header.appendChild(document.createTextNode(' Recherches récentes'));
    container.appendChild(header);

    suggestions.forEach(suggestion => {
      const item = document.createElement('div');
      item.className = 'suggestion-item-optimized';

      item.addEventListener('click', () => {
        selectSuggestion(suggestion.number);
      });

      const numberDiv = document.createElement('div');
      numberDiv.className = 'suggestion-number';
      numberDiv.textContent = suggestion.number;
      item.appendChild(numberDiv);

      const infoDiv = document.createElement('div');
      infoDiv.className = 'suggestion-info';

      const trackerSpan = document.createElement('span');
      trackerSpan.className = 'suggestion-tracker';
      trackerSpan.textContent = suggestion.tracker;
      infoDiv.appendChild(trackerSpan);

      let icon;
      if (suggestion.success === true) {
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-check-circle success';
      } else {
        icon = document.createElement('i');
        icon.className = 'fa-solid fa-clock pending';
      }
      infoDiv.appendChild(icon);

      item.appendChild(infoDiv);
      container.appendChild(item);
    });

    trackingInput.parentNode.insertBefore(container, trackingInput.nextSibling);
  }
}

function selectSuggestion(trackingNumber) {
  const trackingInput = document.getElementById('trackingNumber');
  if (trackingInput) {
    const cleanNumber = sanitizeTrackingNumber(trackingNumber);
    trackingInput.value = cleanNumber;
    hideSuggestions();
    startTracking();
  }
}

function hideSuggestions() {
  const suggestions = document.getElementById('tracking-suggestions');
  if (suggestions) {
    suggestions.remove();
  }
}

const smartCache = {
  detectionCache: new Map(),
  maxAge: 10 * 60 * 1000,

  get(key) {
    const item = this.detectionCache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.maxAge) {
      this.detectionCache.delete(key);
      return null;
    }

    return item.value;
  },

  set(key, value) {
    this.detectionCache.set(key, {
      value: value,
      timestamp: Date.now()
    });

    if (this.detectionCache.size > 100) {
      const oldestKeys = Array.from(this.detectionCache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp)
        .slice(0, 20)
        .map(([key]) => key);

      oldestKeys.forEach(key => this.detectionCache.delete(key));
    }
  }
};

function trackUserAction(action, tracker = null, details = {}) {
  const event = {
    action: action,
    tracker: tracker,
    timestamp: Date.now(),
    trackingNumber: currentTrackingNumber,
    details: details
  };

  const analytics = JSON.parse(localStorage.getItem('trackingAnalytics') || '[]');
  analytics.push(event);

  if (analytics.length > 500) {
    analytics.splice(0, analytics.length - 500);
  }

  localStorage.setItem('trackingAnalytics', JSON.stringify(analytics));
}

// Affiche les blocs post-tracking une fois le suivi lancé
function revealPostTrackingSections() {
  try {
    document.querySelectorAll('.post-tracking-content.hidden').forEach(el => {
      el.classList.remove('hidden');
      el.classList.add('reveal-section');
    });


    // Afficher et repositionner le bouton décodeur APRÈS le widget
    const decoderTrigger = document.getElementById('openDecoderModal');
    const universalTip = document.querySelector('.universal-tip');
    if (decoderTrigger && universalTip && universalTip.parentNode) {
      // Déplace le bouton juste avant .universal-tip
      universalTip.parentNode.insertBefore(decoderTrigger, universalTip);
      decoderTrigger.classList.remove('hidden');
    }

  } catch (e) {
    console.warn('Post-tracking reveal error:', e);
  }
}

function handleTrackingError(error, tracker, trackingNumber) {
  console.error(`❌ Erreur ${tracker}:`, error);

  const container = document.getElementById('current-tracking-widget') ||
    document.getElementById('tracker-widget-container');

  if (!container) {
    showErrorNotification(tracker, error.message);
    return;
  }

  if (container) {
    container.innerHTML = '';
    const widget = document.createElement('div');
    widget.className = 'widget-error-optimized';

    const errorContent = document.createElement('div');
    errorContent.className = 'error-content';

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-exclamation-triangle';
    errorContent.appendChild(icon);

    const h4 = document.createElement('h4');
    h4.textContent = 'Problème de chargement';
    errorContent.appendChild(h4);

    const p = document.createElement('p');
    p.textContent = trackersIntelligentConfig[tracker].name + ' ne répond pas actuellement.';
    errorContent.appendChild(p);

    const actions = document.createElement('div');
    actions.className = 'error-actions';

    const btnRetry = document.createElement('button');
    btnRetry.className = 'btn-retry';
    btnRetry.innerHTML = '<i class="fa-solid fa-redo"></i> Réessayer';
    btnRetry.addEventListener('click', () => retryTracking(tracker, trackingNumber));
    actions.appendChild(btnRetry);

    const btnAlt = document.createElement('button');
    btnAlt.className = 'btn-alternative';
    btnAlt.innerHTML = '<i class="fa-solid fa-shuffle"></i> Alternative';
    btnAlt.addEventListener('click', () => useBackupTracker(trackingNumber));
    actions.appendChild(btnAlt);

    errorContent.appendChild(actions);
    widget.appendChild(errorContent);
    container.appendChild(widget);
  }

  trackUserAction('error', tracker, { error: error.message });
}

function showErrorNotification(tracker, errorMessage) {
  const oldNotif = document.getElementById('error-notification');
  if (oldNotif) oldNotif.remove();

  const notification = document.createElement('div');
  notification.id = 'error-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #dc2626;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    max-width: 400px;
    text-align: center;
  `;

  const config = trackersIntelligentConfig[tracker];
  notification.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 8px;">
      <i class="fa-solid fa-exclamation-triangle"></i>
      Erreur de chargement
    </div>
    <div>${config?.name || tracker} ne répond pas actuellement.</div>
    <button onclick="this.parentElement.remove()" style="
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      margin-top: 8px;
      cursor: pointer;
    ">Fermer</button>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function retryTracking(tracker, trackingNumber) {
  showOptimizedWidget(tracker, trackingNumber);
  trackUserAction('retry', tracker);
}

function useBackupTracker(trackingNumber) {
  const backupOrder = ['17track', 'trackglobal', 'parcelsapp'];
  const nextTracker = backupOrder.find(t => t !== currentTracker);

  if (nextTracker) {
    switchTracker(nextTracker);
    trackUserAction('backup_used', nextTracker);
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedShowSuggestions = debounce(showSmartSuggestions, 300);

// ===== INITIALISATION (ORIGINAL) =====
document.addEventListener('DOMContentLoaded', function () {
  const trackBtn = document.getElementById('trackBtn');
  const trackingInput = document.getElementById('trackingNumber');

  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      trackUserAction('search_clicked');
      startTracking();
    });
  }

  if (trackingInput) {
    trackingInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        trackUserAction('search_enter');
        startTracking();
      }
    });

    trackingInput.addEventListener('focus', function () {
      trackUserAction('input_focused');
    });
  }

  document.querySelectorAll('.tracker-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const tracker = this.dataset.tracker;
      const trackingInput = document.getElementById('trackingNumber');
      if (tracker && (!currentTrackingNumber || currentTrackingNumber.trim() === '')) {
        if (trackingInput && trackingInput.value.trim() !== '') {
          trackUserAction('search_clicked');
          startTracking();
          setTimeout(() => {
            if (window.originalDetection && tracker !== window.originalDetection.tracker) {
              switchTracker(tracker);
            }
          }, 600);
        }
      } else if (tracker && currentTrackingNumber) {
        trackUserAction('manual_switch', tracker);
        switchTracker(tracker);
      }
    });
  });

  // ✅ Nouveaux boutons dans les cartes du comparatif
  document.querySelectorAll('.btn-select-tracker').forEach(btn => {
    btn.addEventListener('click', function () {
      const tracker = this.dataset.tracker;
      const trackingInputEl = document.getElementById('trackingNumber');

      // Si pas encore de numéro en cours, démarrer le suivi puis basculer sur le tracker sélectionné
      if (tracker && (!currentTrackingNumber || currentTrackingNumber.trim() === '')) {
        if (trackingInputEl && trackingInputEl.value.trim() !== '') {
          trackUserAction('comparison_select_clicked', tracker);
          startTracking();
          setTimeout(() => {
            switchTracker(tracker);
          }, 600);
        }
      } else if (tracker && currentTrackingNumber) {
        // Si un suivi est déjà en cours, basculer directement
        trackUserAction('comparison_manual_switch', tracker);
        switchTracker(tracker);
      }
    });
  });

  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = answer.style.display === 'block';

      trackUserAction('faq_clicked', null, {
        question: this.textContent.trim(),
        opening: !isOpen
      });

      // Toggle only the clicked FAQ item; allow multiple open
      if (isOpen) {
        answer.style.display = 'none';
        this.classList.remove('open');
      } else {
        answer.style.display = 'block';
        this.classList.add('open');
      }
    });
  });

  document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.display = 'none';
  });

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      trackUserAction('keyboard_shortcut', null, { shortcut: 'ctrl+enter' });
      startTracking();
    }

    if (e.key === 'Escape') {
      hideRecommendation();
      hideSuggestions();
    }
  });

  setInterval(() => {
    smartCache.detectionCache.forEach((value, key) => {
      if (Date.now() - value.timestamp > smartCache.maxAge) {
        smartCache.detectionCache.delete(key);
      }
    });
  }, 5 * 60 * 1000);

  trackUserAction('session_started');

  window.addEventListener('beforeunload', () => {
    if (currentWidgetTimeout) {
      clearTimeout(currentWidgetTimeout);
    }
  });

});

function exportUserData() {
  const data = {
    trackingHistory: trackingHistory,
    performanceStats: performanceStats,
    analytics: JSON.parse(localStorage.getItem('trackingAnalytics') || '[]'),
    exportDate: new Date().toISOString(),
    version: '4.0'
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `tracking-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  trackUserAction('data_exported');
}

function getOptimizationStats() {
  const totalSearches = trackingHistory.length;
  const successfulSearches = trackingHistory.filter(r => r.success === true).length;
  const manualOverrides = trackingHistory.filter(r => r.manualOverride).length;

  return {
    totalSearches,
    successRate: totalSearches > 0 ? (successfulSearches / totalSearches * 100).toFixed(1) : 0,
    aiAccuracy: totalSearches > 0 ? ((totalSearches - manualOverrides) / totalSearches * 100).toFixed(1) : 0,
    topTracker: getMostSuccessfulTracker(),
    recentActivity: trackingHistory.filter(r => Date.now() - r.timestamp < 7 * 24 * 60 * 60 * 1000).length
  };
}

function getMostSuccessfulTracker() {
  const trackerSuccess = {};

  trackingHistory.forEach(record => {
    if (record.success === true) {
      const tracker = record.detection.tracker;
      trackerSuccess[tracker] = (trackerSuccess[tracker] || 0) + 1;
    }
  });

  const topTracker = Object.keys(trackerSuccess).reduce((a, b) =>
    trackerSuccess[a] > trackerSuccess[b] ? a : b, '17track'
  );

  return {
    name: trackersIntelligentConfig[topTracker]?.name || 'Aucun',
    successes: trackerSuccess[topTracker] || 0
  };
}

// ===== DEBUG CONSOLE =====
if (typeof window !== 'undefined') {
  window.trackingSystemDebug = {
    getStats: getOptimizationStats,
    exportData: exportUserData,
    clearHistory: () => {
      localStorage.removeItem('trackingHistory');
      localStorage.removeItem('performanceStats');
      localStorage.removeItem('trackingAnalytics');
      trackingHistory = [];
      performanceStats = {};
    },
    version: '4.0-optimized',
    lazyLoadingStatus: () => widgetsLoaded,
    scriptsStatus: () => widgetScriptsLoaded
  };

}


