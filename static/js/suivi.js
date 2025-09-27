// ===== TIMELINE ANIMATION POUR L'ANALYSE =====
let currentStep = 0;
let timelineInterval;

function showTrackingTimeline() {
  const overlay = document.getElementById('trackingTimelineOverlay');
  const progressFill = document.getElementById('timelineProgressFill');
  currentStep = 0;
  progressFill.style.width = '0%';
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`step${i}`).className = 'step-circle';
    document.getElementById(`label${i}`).className = 'step-label';
  }
  overlay.style.display = 'flex';
  setTimeout(() => {
    progressTimeline();
  }, 200);
}

function progressTimeline() {
  const steps = [
    {
      title: "Analyse en cours...",
      subtitle: "Nous analysons votre numéro de suivi",
      progress: 33
    },
    {
      title: "Sélection intelligente...",
      subtitle: "Choix du meilleur tracker pour votre colis",
      progress: 66
    },
    {
      title: "Préparation du résultat...",
      subtitle: "Configuration de l'interface de suivi",
      progress: 100
    }
  ];
  currentStep++;
  if (currentStep <= 3) {
    const stepData = steps[currentStep - 1];
    document.querySelector('.timeline-title').textContent = stepData.title;
    document.querySelector('.timeline-subtitle').textContent = stepData.subtitle;
    document.getElementById('timelineProgressFill').style.width = stepData.progress + '%';
    if (currentStep > 1) {
      const prevStep = document.getElementById(`step${currentStep - 1}`);
      const prevLabel = document.getElementById(`label${currentStep - 1}`);
      prevStep.classList.remove('active');
      prevStep.classList.add('completed');
      prevLabel.classList.remove('active');
      prevLabel.classList.add('completed');
    }
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const currentLabel = document.getElementById(`label${currentStep}`);
    currentStepEl.classList.add('active');
    currentLabel.classList.add('active');
    if (currentStep < 3) {
      timelineInterval = setTimeout(progressTimeline, 1200);
    } else {
      setTimeout(() => {
        currentStepEl.classList.remove('active');
        currentStepEl.classList.add('completed');
        currentLabel.classList.remove('active');
        currentLabel.classList.add('completed');
        document.querySelector('.timeline-title').textContent = "Analyse terminée !";
        document.querySelector('.timeline-subtitle').textContent = "Redirection vers votre interface de suivi...";
        setTimeout(() => {
          document.getElementById('trackingTimelineOverlay').style.display = 'none';
          startTracking();
        }, 1000);
      }, 800);
    }
  }
}

// Fermer la timeline si clic sur overlay
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('trackingTimelineOverlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        this.style.display = 'none';
        clearTimeout(timelineInterval);
      }
    });
  }
});

// Remplace le handler du bouton pour lancer la timeline avant le tracking
document.addEventListener('DOMContentLoaded', function() {
  const trackBtn = document.getElementById('trackBtn');
  if (trackBtn) {
    trackBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showTrackingTimeline();
    });
  }
});
// Map nom tracker -> nom de fichier image (unique pour tout le fichier)
const trackerLogoMap = {
  '17track': '/static/img/trackers/17Track.jpg',
  'trackglobal': '/static/img/trackers/TrackGlobal.jpg',
  'parcelsapp': '/static/img/trackers/Parcelsapp.jpg',
  'postalninja': '/static/img/trackers/PostalNinja.png',
  'track123': '/static/img/trackers/Track123.jpg'
};
// Masque la description du tracker sélectionné partout via CSS
const styleHideDescription = document.createElement('style');
styleHideDescription.innerHTML = `.current-tracker-description { display: none !important; }`;
document.head.appendChild(styleHideDescription);

// ===== VERSION FINALE OPTIMISÉE - TRACKING SYSTEM =====
// Combine le meilleur des 4 versions : UX simple + IA précise + apprentissage intelligent

// ===== CONFIGURATION DES WIDGETS =====
const trackerWidgets = {
  'parcelsapp': num => `<iframe src="https://parcelsapp.com/widget?num=${encodeURIComponent(num)}" style="height:600px; width:100%; border:none; border-radius:10px;" loading="lazy"></iframe>`,
  'trackglobal': num => `
    <iframe src='https://track.global/fr/iframe?wuid=0&init_params=eyJoZWlnaHQiOiI0MHB4In0='
            id='track-widget' frameborder='0' style='height: 140px; width:100%; border:none; border-radius:10px;'></iframe>
    <div style='margin-top:20px;'></div>
  `,
  'track123': num => `<div id="track123-tracking-widget" style="border-radius:10px; overflow:hidden;"></div>`,
  'postalninja': num => `
    <iframe title="Postal Ninja" 
            src="https://postal.ninja/widget/tracker?lc=fr&autoSize=true&num=${encodeURIComponent(num)}"
            style="width: 100%; min-height: 120px; border:none; border-radius:10px;"
            scrolling="no">
    </iframe>`,
  '17track': num => `<div id="YQContainer" style="border-radius:10px; overflow:hidden;"></div>`
};

// ===== CONFIGURATION INTELLIGENTE OPTIMISÉE =====
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
      // UPS, FedEx, Postal International (déjà présents)
      { regex: /^1Z[A-Z0-9]{16}$/, confidence: 0.98, type: 'UPS', priority: 1 },
      { regex: /^\d{12}$/, confidence: 0.95, type: 'FedEx Express', priority: 1 },
      { regex: /^\d{10}$/, confidence: 0.90, type: 'FedEx Ground', priority: 1 },
      { regex: /^[A-Z]{2}\d{9}[A-Z]{2}$/, confidence: 0.92, type: 'Postal International', priority: 2 },
      { regex: /^RR\d{9}[A-Z]{2}$/, confidence: 0.90, type: 'Recommandé International', priority: 2 },
      { regex: /^[0-9][A-Z][0-9]{11}$/, confidence: 0.80, type: 'Format alphanumérique 13 char', priority: 1  },
      // DHL
      { regex: /^\d{10}$/, confidence: 0.92, type: 'DHL (10 chiffres)', priority: 1 },
      { regex: /^\d{20}$/, confidence: 0.92, type: 'DHL (20 chiffres)', priority: 1 },
      { regex: /^JVGL\d{9,}$/, confidence: 0.92, type: 'DHL (JVGL)', priority: 1 },
      // GLS
      { regex: /^00\d{12,14}$/, confidence: 0.90, type: 'GLS', priority: 1 },
      // DPD
      { regex: /^\d{14}$/, confidence: 0.90, type: 'DPD', priority: 1 },
      // TNT
      { regex: /^\d{9}$/, confidence: 0.88, type: 'TNT', priority: 1 },
      // USPS
      { regex: /^9\d{15,21}$/, confidence: 0.90, type: 'USPS', priority: 1 },
      // Colissimo (autres formats)
      { regex: /^(8R|6A|6C)\d{11}$/, confidence: 0.90, type: 'Colissimo (autres)', priority: 1 },
      // Hermes
      { regex: /^\d{16}$/, confidence: 0.85, type: 'Hermes', priority: 1 },
      // Royal Mail
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
      // Colissimo (autres formats)
      { regex: /^(8R|6A|6C)\d{11}$/, confidence: 0.92, type: 'Colissimo (autres)', priority: 1 },
      // La Poste (France)
      { regex: /^\d{11}$/, confidence: 0.85, type: 'La Poste (France)', priority: 1 },
      // Royal Mail
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

// ===== VARIABLES GLOBALES =====
let currentTracker = null;
let currentTrackingNumber = null;
let isLoading = false;
let trackingHistory = JSON.parse(localStorage.getItem('trackingHistory') || '[]');
let detectionCache = new Map();
let performanceStats = JSON.parse(localStorage.getItem('performanceStats') || '{}');

// ===== SYSTÈME DE DÉTECTION ULTRA-OPTIMISÉ =====
function detectBestTracker(trackingNumber) {

  const cacheKey = trackingNumber.trim().toUpperCase();
  if (detectionCache.has(cacheKey)) {
    return detectionCache.get(cacheKey);
  }

  const cleanNumber = trackingNumber.trim().toUpperCase();
  let bestMatch = null;
  let maxConfidence = 0;
  let maxPriority = 0;

  // Test tous les patterns avec système de priorité
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

  // Analyse heuristique si aucun pattern précis
  if (!bestMatch) {
    bestMatch = analyzeByAdvancedHeuristics(cleanNumber);
  }

  // Apprentissage utilisateur
  const historicalMatch = getHistoricalWinner(cleanNumber);
  if (historicalMatch && historicalMatch.confidence > bestMatch.confidence) {
    bestMatch = historicalMatch;
  }

  // Alternatives intelligentes seulement si confiance < 95% (TOUJOURS pour avoir 2 options)
  bestMatch.alternatives = getSmartAlternatives(bestMatch.tracker, cleanNumber);

  // Cache et enregistrement
  detectionCache.set(cacheKey, bestMatch);
  recordDetectionAttempt(cleanNumber, bestMatch);

  return bestMatch;
}

function analyzeByAdvancedHeuristics(trackingNumber) {
  const length = trackingNumber.length;
  const hasLetters = /[A-Z]/.test(trackingNumber);
  const onlyNumbers = /^\d+$/.test(trackingNumber);
  const startsWithLetter = /^[A-Z]/.test(trackingNumber);

  // Yanwen ultra-prioritaire
  if (length === 16 && trackingNumber.startsWith('YT')) {
    return {
      tracker: 'track123',
      confidence: 0.98,
      detected: 'Yanwen (98% de réussite)',
      config: trackersIntelligentConfig['track123'],
      reason: 'Format Yanwen YT détecté - Track123 champion confirmé'
    };
  }

  // UPS ultra-prioritaire
  if (length === 18 && trackingNumber.startsWith('1Z')) {
    return {
      tracker: '17track',
      confidence: 0.98,
      detected: 'UPS (Excellence mondiale)',
      config: trackersIntelligentConfig['17track'],
      reason: 'Format UPS 1Z détecté - 17Track champion confirmé'
    };
  }

  // Colissimo France
  if (trackingNumber.startsWith('CP') && (trackingNumber.endsWith('FR') || length === 13)) {
    return {
      tracker: 'postalninja',
      confidence: 0.95,
      detected: 'Colissimo France',
      config: trackersIntelligentConfig['postalninja'],
      reason: 'Format Colissimo détecté - Interface française optimale'
    };
  }

  // Formats chinois longs
  if (length === 13 && onlyNumbers) {
    return {
      tracker: 'track123',
      confidence: 0.85,
      detected: 'Format chinois (13 chiffres)',
      config: trackersIntelligentConfig['track123'],
      reason: '13 chiffres - Pattern chinois typique'
    };
  }

  // Amazon
  if (trackingNumber.startsWith('TBA') || trackingNumber.includes('AMAZON')) {
    return {
      tracker: 'parcelsapp',
      confidence: 0.90,
      detected: 'Amazon Logistics',
      config: trackersIntelligentConfig['parcelsapp'],
      reason: 'Amazon détecté - ParcelsApp expert confirmé'
    };
  }

  // CORRECTION: Format générique - assure des alternatives
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
  const alternatives = {
    'track123': ['trackglobal'],
    '17track': ['parcelsapp'],
    'postalninja': ['17track'],
    'trackglobal': ['track123'],
    'parcelsapp': ['17track']
  };

  return alternatives[primaryTracker]?.slice(0, 1) || ['trackglobal'];
}

// ===== SYSTÈME D'AFFICHAGE INTELLIGENT POUR LA CONFIANCE =====
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

  // Pour les scores bas : met l'accent sur la couverture
  return {
    display: 'Couverture maximale',
    label: 'Réseau mondial le plus large',
    color: '#7c3aed',
    icon: '🌍'
  };
}

// Variables pour conserver la recommandation IA originale
let originalDetection = null;

// ===== INTERFACE OPTIMISÉE AVEC STRUCTURE DEMANDÉE =====
function showOptimizedRecommendation(detection, trackingNumber) {
  hideRecommendation();

  // CORRECTION: Sauvegarde TOUJOURS la nouvelle détection (pas seulement si null)
  originalDetection = { ...detection };

  const hasAlternatives = originalDetection.alternatives && originalDetection.alternatives.length > 0;
  const isUsingAlternative = false; // Première fois = pas d'alternative

  const summaryHTML = `
    <div id="recommendation-section" class="recommendation-section">
      <div class="ai-summary-card">
        <div class="ai-summary-header">
          <div class="ai-summary-title">
            <h3>🎯 Recommandation Intelligente</h3>
            <p>Analyse automatique de votre numéro de suivi</p>
          </div>
        </div>
        
        <div class="ai-summary-content">
          <!-- Meilleur service détecté (recalculé à chaque recherche) -->
          <div class="detection-row highlight">
            <div class="detection-label">
              <i class="fa-solid fa-bullseye"></i>
              Meilleur service pour votre colis
            </div>
            <div class="detection-value">
              <img class="tracker-logo-mini" alt="Logo ${originalDetection.tracker}" src="${trackerLogoMap[originalDetection.tracker] || ''}">
              <strong>${originalDetection.config.name}</strong>
              <span class="tracker-subtitle">${originalDetection.config.subtitle}</span>
            </div>
          </div>

          <!-- Tracker actuellement sélectionné (dynamique) -->
          <div class="current-tracker-section">
            <div>
              <div class="current-tracker-header">
                <div class="current-tracker-label">
                  <i class="fa-solid fa-play"></i>
                  Tracker sélectionné
                  ${isUsingAlternative ? '<span class="alternative-indicator">Alternative testée</span>' : ''}
                </div>
              </div>
              <div class="current-tracker-info">
                <div class="current-tracker-name">
                  <img class="tracker-logo-mini tracker-logo-mini-mobile" alt="Logo ${detection.tracker}" src="${trackerLogoMap[detection.tracker] || ''}">
                  <strong>${detection.config.name}</strong>
                </div>
                <span class="current-tracker-subtitle">${detection.config.subtitle}</span>
              </div>
            </div>
            <img class="tracker-logo-big" alt="Logo ${detection.tracker}" src="${trackerLogoMap[detection.tracker] || ''}">
          </div>
        </div>
      </div>
    </div>
  `;

  const widgetContainer = document.getElementById('tracker-widget-container');
  if (widgetContainer) {
    widgetContainer.insertAdjacentHTML('beforebegin', summaryHTML);

    // Animation fluide
    const section = document.getElementById('recommendation-section');
    if (section) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        section.style.transition = 'all 0.3s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, 50);
    }

    // (Statut de chargement retiré pour une interface plus épurée)
  }
}

// ===== FONCTION POUR METTRE À JOUR SEULEMENT LA SECTION TRACKER ACTUEL =====
function updateCurrentTrackerDisplay(tracker) {
  const currentSection = document.querySelector('.current-tracker-section');
  if (!currentSection || !originalDetection) return;

  const config = trackersIntelligentConfig[tracker];

  // CORRECTION 2: Récupère la vraie confiance du tracker pour le numéro actuel
  let trackerConfidence = 0.85; // Valeur par défaut

  // Essaie de récupérer la confiance spécifique pour ce tracker avec le numéro actuel
  if (currentTrackingNumber) {
    const freshDetection = detectBestTracker(currentTrackingNumber);

    // Si le tracker actuel correspond à la détection optimale, utilise sa confiance
    if (freshDetection.tracker === tracker) {
      trackerConfidence = freshDetection.confidence;
    } else {
      // Sinon, cherche dans les patterns du tracker pour ce numéro
      const cleanNumber = currentTrackingNumber.trim().toUpperCase();
      if (config.patterns) {
        for (const pattern of config.patterns) {
          if (pattern.regex.test(cleanNumber)) {
            trackerConfidence = pattern.confidence;
            break;
          }
        }
      }
    }
  }


  // Nettoie la section
  currentSection.innerHTML = '';


  // Structure identique à showOptimizedRecommendation (section tracker sélectionné)
  // Wrapper principal
  const wrapperDiv = document.createElement('div');
  wrapperDiv.style.display = 'flex';
  wrapperDiv.style.alignItems = 'center';
  wrapperDiv.style.justifyContent = 'space-between';
  wrapperDiv.style.width = '100%';

  // Partie gauche : infos tracker
  const leftDiv = document.createElement('div');

  // Header tracker sélectionné
  const headerDiv = document.createElement('div');
  headerDiv.className = 'current-tracker-header';
  const labelDiv = document.createElement('div');
  labelDiv.className = 'current-tracker-label';
  const playIcon = document.createElement('i');
  playIcon.className = 'fa-solid fa-play';
  labelDiv.appendChild(playIcon);
  labelDiv.appendChild(document.createTextNode(' Tracker sélectionné '));
  // etiquette HTML
  const etiquetteSpan = document.createElement('span');
  etiquetteSpan.className = 'alternative-indicator';
  if (tracker === originalDetection.tracker) {
    etiquetteSpan.classList.add('meilleur');
    etiquetteSpan.textContent = 'Meilleur choix';
  } else {
    etiquetteSpan.textContent = 'Alternative testée';
  }
  labelDiv.appendChild(etiquetteSpan);
  headerDiv.appendChild(labelDiv);
  leftDiv.appendChild(headerDiv);

  // Infos tracker (nom, sous-titre)
  const infoDiv = document.createElement('div');
  infoDiv.className = 'current-tracker-info';
  const nameDiv = document.createElement('div');
  nameDiv.className = 'current-tracker-name';
  // Mini-logo (affiché uniquement sur mobile via CSS)
  const miniLogo = document.createElement('img');
  miniLogo.className = 'tracker-logo-mini tracker-logo-mini-mobile';
  miniLogo.alt = 'Logo ' + tracker;
  miniLogo.src = trackerLogoMap[tracker] || '';
  nameDiv.appendChild(miniLogo);
  // Nom
  const strong = document.createElement('strong');
  strong.textContent = config.name;
  nameDiv.appendChild(strong);
  infoDiv.appendChild(nameDiv);
  // Sous-titre (en dessous)
  const subtitleSpan = document.createElement('span');
  subtitleSpan.className = 'current-tracker-subtitle';
  subtitleSpan.textContent = config.subtitle;
  infoDiv.appendChild(subtitleSpan);
  leftDiv.appendChild(infoDiv);

  // Description (masquée par CSS)
  const descDiv = document.createElement('div');
  descDiv.className = 'current-tracker-description';
  descDiv.textContent = config.description;
  infoDiv.appendChild(descDiv);

  // Partie droite : logo big
  const rightDiv = document.createElement('div');
  const logoBig = document.createElement('img');
  logoBig.className = 'tracker-logo-big';
  logoBig.alt = 'Logo ' + tracker;
  logoBig.src = trackerLogoMap[tracker] || '';
  rightDiv.appendChild(logoBig);

  wrapperDiv.appendChild(leftDiv);
  wrapperDiv.appendChild(rightDiv);
  currentSection.appendChild(wrapperDiv);

}

function hideRecommendation() {
  const section = document.getElementById('recommendation-section');
  if (section) {
    section.style.opacity = '0';
    setTimeout(() => section.remove(), 200);
  }
}

// ===== FONCTIONS PRINCIPALES ULTRA-OPTIMISÉES =====
function startTracking() {
  const input = document.getElementById('trackingNumber');
  const trackBtn = document.getElementById('trackBtn');

  if (!input || !trackBtn) return;

  const trackingNumber = input.value.trim();

  if (!trackingNumber) {
    input.focus();
    input.style.borderColor = '#ef4444';
    setTimeout(() => input.style.borderColor = '', 1000);
    return;
  }

  if (isLoading) return;

  isLoading = true;
  currentTrackingNumber = trackingNumber;

  // CORRECTION 1: Reset complet pour un nouveau tracking
  originalDetection = null;
  currentTracker = null;

  const originalHTML = trackBtn.textContent;
  trackBtn.classList.add('loading');
  // Nettoie le bouton et ajoute l'icône de chargement de façon sécurisée
  trackBtn.textContent = '';
  const spinner = document.createElement('i');
  spinner.className = 'fa-solid fa-spinner fa-spin';
  trackBtn.appendChild(spinner);
  trackBtn.appendChild(document.createTextNode(' Analyse...'));

  hideRecommendation();
  hideFeedback();

  // Détection ultrarapide
  setTimeout(() => {
    const startTime = Date.now();
    const detection = detectBestTracker(trackingNumber);
    const analysisTime = Date.now() - startTime;

    currentTracker = detection.tracker;
    showOptimizedRecommendation(detection, trackingNumber);

    setTimeout(() => {
      showOptimizedWidget(detection.tracker, trackingNumber);
      showManualSelector();

  trackBtn.classList.remove('loading');
  trackBtn.textContent = originalHTML;
      isLoading = false;

    }, 200);

  }, 150); // Délai minimal pour fluidité
}

function showOptimizedWidget(trackerType, trackingNumber) {
  const container = document.getElementById('tracker-widget-container');
  if (!container || !trackerType || !trackingNumber) return;

  // Création du bloc de suivi (section identique à la recommandation)
  let oldSection = document.getElementById('tracking-section');
  if (oldSection) oldSection.remove();

  // Création de la section
  const section = document.createElement('section');
  section.id = 'tracking-section';
  section.className = 'recommendation-section';

  // Card principale
  const card = document.createElement('div');
  card.className = 'ai-summary-card';

  // Header
  const header = document.createElement('div');
  header.className = 'ai-summary-header';
  const title = document.createElement('div');
  title.className = 'ai-summary-title';
  title.innerHTML = '<h3>📦 Suivi de votre colis</h3><p>Interface de suivi et actions</p>';
  header.appendChild(title);
  card.appendChild(header);

  // Contenu principal (regroupe header widget, bouton copy, widget)
  const content = document.createElement('div');
  content.className = 'ai-summary-content';

  // Header widget (supprimé : widget-section-title)
  // (on ne crée plus le header/titre du widget)

  // Bouton copier
  const needsCopyBtn = trackerType === 'track123' || trackerType === 'trackglobal' || trackerType === 'parcelsapp' || trackerType === 'postalninja';
  const oldCopyDiv = document.getElementById('copy-tracking-btn-global');
  if (oldCopyDiv) oldCopyDiv.remove();
  if (needsCopyBtn) {
    const copyDiv = document.createElement('div');
    copyDiv.className = 'copy-tracking-btn-container';
    copyDiv.id = 'copy-tracking-btn-global';
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-tracking-btn';
    copyBtn.type = 'button';
    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copier le numéro';
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(trackingNumber).then(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copier le numéro';
          copyBtn.classList.remove('copied');
        }, 1200);
      });
    });
    copyDiv.appendChild(copyBtn);
  const infoStrong = document.createElement('strong');
  infoStrong.className = 'copy-tracking-info';
  infoStrong.textContent = 'Collez ce numéro dans le champ du widget si besoin.';
  copyDiv.appendChild(infoStrong);
    content.appendChild(copyDiv);
  }



  // On ne déplace plus le container ! On va juste remplir son contenu et générer la card autour
  // On vide le container
  container.classList.add('active');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // On crée la card et on y met le widget
  card.appendChild(content);
  section.appendChild(card);

  // Place la section juste après la recommandation IA
  const recSection = document.getElementById('recommendation-section');
  if (recSection && recSection.parentNode) {
    recSection.parentNode.insertBefore(section, recSection.nextSibling);
  } else {
    // fallback : ajoute à la fin du body
    document.body.appendChild(section);
  }

  // Spinner de chargement à l'intérieur du widget (centré)
  const loadingDivWidget = document.createElement('div');
  loadingDivWidget.className = 'widget-loading-inside';
  loadingDivWidget.id = 'widget-loading-inside';
  const spinnerDivWidget = document.createElement('div');
  spinnerDivWidget.className = 'loading-spinner-inside';
  const spinnerIconWidget = document.createElement('i');
  spinnerIconWidget.className = 'fa-solid fa-spinner fa-spin';
  spinnerDivWidget.appendChild(spinnerIconWidget);
  loadingDivWidget.appendChild(spinnerDivWidget);
  const textDivWidget = document.createElement('div');
  textDivWidget.className = 'loading-text';
  textDivWidget.textContent = 'Chargement du widget...';
  loadingDivWidget.appendChild(textDivWidget);
  container.appendChild(loadingDivWidget);

  // Timeout de fallback automatique (10s)
  let widgetLoadedFlag = false;
  let fallbackTimeoutWidget = setTimeout(() => {
    if (!widgetLoadedFlag) {
      const detection = detectBestTracker(trackingNumber);
      const alternatives = detection.alternatives || [];
      if (alternatives.length > 0) {
        handleTrackingError(new Error('Timeout de chargement du widget'), trackerType, trackingNumber);
        switchTracker(alternatives[0]);
      } else {
        handleTrackingError(new Error('Timeout de chargement du widget'), trackerType, trackingNumber);
      }
    }
    const insideSpinner = document.getElementById('widget-loading-inside');
    if (insideSpinner) insideSpinner.style.display = 'none';
  }, 10000);

  setTimeout(() => {
    container.innerHTML = trackerWidgets[trackerType](trackingNumber);

    let iframe = container.querySelector('iframe');
    if (iframe) {
      iframe.onerror = () => {
        clearTimeout(fallbackTimeoutWidget);
        const detection = detectBestTracker(trackingNumber);
        const alternatives = detection.alternatives || [];
        handleTrackingError(new Error('Erreur de chargement iframe'), trackerType, trackingNumber);
        if (alternatives.length > 0) {
          switchTracker(alternatives[0]);
        }
        const insideSpinner = document.getElementById('widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
      };
      iframe.onload = () => {
        widgetLoadedFlag = true;
        clearTimeout(fallbackTimeoutWidget);
        const insideSpinner = document.getElementById('widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
      };
    } else {
      if (trackerType === 'track123') {
        let waited = 0;
        const interval = setInterval(() => {
          const widget = document.getElementById('track123-tracking-widget');
          if (widget && widget.childNodes.length > 0) {
            widgetLoadedFlag = true;
            clearTimeout(fallbackTimeoutWidget);
            const insideSpinner = document.getElementById('widget-loading-inside');
            if (insideSpinner) insideSpinner.style.display = 'none';
            clearInterval(interval);
          } else if (waited > 9500) {
            const insideSpinner = document.getElementById('widget-loading-inside');
            if (insideSpinner) insideSpinner.style.display = 'none';
            clearInterval(interval);
          }
          waited += 200;
        }, 200);
      } else {
        setTimeout(() => {
          widgetLoadedFlag = true;
          clearTimeout(fallbackTimeoutWidget);
          const insideSpinner = document.getElementById('widget-loading-inside');
          if (insideSpinner) insideSpinner.style.display = 'none';
        }, 2000);
      }
    }

    switch (trackerType) {
      case '17track':
        load17Track(trackingNumber);
        break;
      case 'trackglobal':
        setupTrackGlobalResize();
        break;
      case 'track123':
        loadTrack123ScriptOnce();
        break;
    }

    updateTrackerButtons(trackerType);
    recordPerformance(trackerType, 'loaded');

  }, 300);

  // Spinner de chargement à l'intérieur du widget (centré)
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'widget-loading-inside';
  loadingDiv.id = 'widget-loading-inside';
  const spinnerDiv = document.createElement('div');
  spinnerDiv.className = 'loading-spinner-inside';
  const spinnerIcon = document.createElement('i');
  spinnerIcon.className = 'fa-solid fa-spinner fa-spin';
  spinnerDiv.appendChild(spinnerIcon);
  loadingDiv.appendChild(spinnerDiv);
  const textDiv = document.createElement('div');
  textDiv.className = 'loading-text';
  textDiv.textContent = 'Chargement du widget...';
  loadingDiv.appendChild(textDiv);
  container.appendChild(loadingDiv);

  // Timeout de fallback automatique (10s)
  let widgetLoaded = false;
  let fallbackTimeout = setTimeout(() => {
    if (!widgetLoaded) {
      const detection = detectBestTracker(trackingNumber);
      const alternatives = detection.alternatives || [];
      if (alternatives.length > 0) {
        handleTrackingError(new Error('Timeout de chargement du widget'), trackerType, trackingNumber);
        switchTracker(alternatives[0]);
      } else {
        handleTrackingError(new Error('Timeout de chargement du widget'), trackerType, trackingNumber);
      }
    }
    const insideSpinner = document.getElementById('widget-loading-inside');
    if (insideSpinner) insideSpinner.style.display = 'none';
  }, 10000);

  setTimeout(() => {
    container.innerHTML = trackerWidgets[trackerType](trackingNumber);

    let iframe = container.querySelector('iframe');
    if (iframe) {
      iframe.onerror = () => {
        clearTimeout(fallbackTimeout);
        const detection = detectBestTracker(trackingNumber);
        const alternatives = detection.alternatives || [];
        handleTrackingError(new Error('Erreur de chargement iframe'), trackerType, trackingNumber);
        if (alternatives.length > 0) {
          switchTracker(alternatives[0]);
        }
        const insideSpinner = document.getElementById('widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
      };
      iframe.onload = () => {
        widgetLoaded = true;
        clearTimeout(fallbackTimeout);
        const insideSpinner = document.getElementById('widget-loading-inside');
        if (insideSpinner) insideSpinner.style.display = 'none';
      };
    } else {
      if (trackerType === 'track123') {
        let waited = 0;
        const interval = setInterval(() => {
          const widget = document.getElementById('track123-tracking-widget');
          if (widget && widget.childNodes.length > 0) {
            widgetLoaded = true;
            clearTimeout(fallbackTimeout);
            const insideSpinner = document.getElementById('widget-loading-inside');
            if (insideSpinner) insideSpinner.style.display = 'none';
            clearInterval(interval);
          } else if (waited > 9500) {
            const insideSpinner = document.getElementById('widget-loading-inside');
            if (insideSpinner) insideSpinner.style.display = 'none';
            clearInterval(interval);
          }
          waited += 200;
        }, 200);
      } else {
        setTimeout(() => {
          widgetLoaded = true;
          clearTimeout(fallbackTimeout);
          const insideSpinner = document.getElementById('widget-loading-inside');
          if (insideSpinner) insideSpinner.style.display = 'none';
        }, 2000);
      }
    }

    switch (trackerType) {
      case '17track':
        load17Track(trackingNumber);
        break;
      case 'trackglobal':
        setupTrackGlobalResize();
        break;
      case 'track123':
        loadTrack123ScriptOnce();
        break;
    }

    updateTrackerButtons(trackerType);
    recordPerformance(trackerType, 'loaded');

  }, 300);
}

// ===== SYSTÈME DE FEEDBACK INTELLIGENT =====

// Feedback-widget supprimé : aucune fonction d'affichage ou d'enregistrement de feedback utilisateur n'est conservée.

// ===== SYSTÈME D'APPRENTISSAGE ET PERFORMANCE =====
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

  // Garde les 150 derniers pour apprentissage optimal
  if (trackingHistory.length > 150) {
    trackingHistory = trackingHistory.slice(-150);
  }

  localStorage.setItem('trackingHistory', JSON.stringify(trackingHistory));
}

// ===== FONCTIONS UTILITAIRES OPTIMISÉES =====
function tryAlternative(tracker) {
  if (currentTrackingNumber) {

    // NE PAS cacher la recommandation, juste mettre à jour la section tracker actuel
    currentTracker = tracker;

    // Met à jour seulement l'affichage du tracker actuel
    updateCurrentTrackerDisplay(tracker);

    // Charge le nouveau widget
    showOptimizedWidget(tracker, currentTrackingNumber);
    updateTrackerButtons(tracker);

    trackUserAction('alternative_tried', tracker);
  }
}

function switchTracker(newTracker) {
  if (!currentTrackingNumber || isLoading) return;

  currentTracker = newTracker;
  hideFeedback();

  // Met à jour seulement l'affichage du tracker actuel, pas toute la recommandation
  updateCurrentTrackerDisplay(newTracker);

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
  if (manualSelector && manualSelector.classList.contains('hidden')) {
    setTimeout(() => {
      manualSelector.style.transition = 'all 0.4s ease';
      manualSelector.classList.remove('hidden');
    }, 800);
  }
}

// ===== CHARGEMENT DES TRACKERS =====
function load17Track(trackingNumber) {
  if (typeof YQV5 !== "undefined") {
    YQV5.trackSingle({
      YQ_ContainerId: "YQContainer",
      YQ_Height: 600,
      YQ_Lang: "fr",
      YQ_Fc: "0",
      YQ_Num: trackingNumber
    });
  } else {
    console.warn('⚠️ 17Track script manquant');
  }
}

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

// ===== SUGGESTIONS INTELLIGENTES BASÉES SUR L'HISTORIQUE =====
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
    // Création sécurisée du dropdown
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

      // Ajoute l'action de sélection sécurisée
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

    // Ajoute le dropdown juste après le champ input
    trackingInput.parentNode.insertBefore(container, trackingInput.nextSibling);
  }
}

function selectSuggestion(trackingNumber) {
  const trackingInput = document.getElementById('trackingNumber');
  if (trackingInput) {
    trackingInput.value = trackingNumber;
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

// ===== SYSTÈME DE CACHE INTELLIGENT =====
const smartCache = {
  detectionCache: new Map(),
  maxAge: 10 * 60 * 1000, // 10 minutes

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

    // Nettoyage automatique
    if (this.detectionCache.size > 100) {
      const oldestKeys = Array.from(this.detectionCache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp)
        .slice(0, 20)
        .map(([key]) => key);

      oldestKeys.forEach(key => this.detectionCache.delete(key));
    }
  }
};

// ===== ANALYTICS ET MONITORING =====
function trackUserAction(action, tracker = null, details = {}) {
  const event = {
    action: action,
    tracker: tracker,
    timestamp: Date.now(),
    trackingNumber: currentTrackingNumber,
    details: details
  };

  // Stockage local pour analytics
  const analytics = JSON.parse(localStorage.getItem('trackingAnalytics') || '[]');
  analytics.push(event);

  // Garde seulement les 500 derniers événements
  if (analytics.length > 500) {
    analytics.splice(0, analytics.length - 500);
  }

  localStorage.setItem('trackingAnalytics', JSON.stringify(analytics));
}

// ===== GESTION D'ERREURS AVANCÉE =====
function handleTrackingError(error, tracker, trackingNumber) {

  console.error(`❌ Erreur ${tracker}:`, error);

  const container = document.getElementById('tracker-widget-container');
  if (container) {
    // Création sécurisée du widget d'erreur
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

// ===== OPTIMISATIONS PERFORMANCE =====
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

// ===== INITIALISATION OPTIMISÉE =====
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

    // Désactivation de l'affichage des suggestions récentes
    // trackingInput.addEventListener('input', function () {
    //   debouncedShowSuggestions(this.value);
    // });

    // trackingInput.addEventListener('blur', function () {
    //   setTimeout(() => hideSuggestions(), 200);
    // });

    trackingInput.addEventListener('focus', function () {
      trackUserAction('input_focused');
    });
  }

  // Boutons de sélection manuelle avec tracking
  document.querySelectorAll('.tracker-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const tracker = this.dataset.tracker;
      const trackingInput = document.getElementById('trackingNumber');
      // Si aucun numéro n'est en cours, on lance la recherche puis le switch
      if (tracker && (!currentTrackingNumber || currentTrackingNumber.trim() === '')) {
        if (trackingInput && trackingInput.value.trim() !== '') {
          trackUserAction('search_clicked');
          // Lance la recherche, puis switch après affichage IA
          startTracking();
          // On attend que le widget IA soit affiché, puis on switch
          setTimeout(() => {
            // Si le tracker demandé est différent du tracker IA, on switch
            if (window.originalDetection && tracker !== window.originalDetection.tracker) {
              switchTracker(tracker);
            }
          }, 600); // 200ms (affichage IA) + 300ms (affichage widget) + marge
        }
      } else if (tracker && currentTrackingNumber) {
        trackUserAction('manual_switch', tracker);
        switchTracker(tracker);
      }
    });
  });

  // FAQ avec analytics
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = answer.style.display === 'block';

      trackUserAction('faq_clicked', null, {
        question: this.textContent.trim(),
        opening: !isOpen
      });

      document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('open'));

      if (!isOpen) {
        answer.style.display = 'block';
        this.classList.add('open');
      }
    });
  });

  document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.display = 'none';
  });

  // Raccourcis clavier optimisés
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

  // Nettoyage périodique optimisé
  setInterval(() => {
    smartCache.detectionCache.forEach((value, key) => {
      if (Date.now() - value.timestamp > smartCache.maxAge) {
        smartCache.detectionCache.delete(key);
      }
    });
  }, 5 * 60 * 1000); // Toutes les 5 minutes

  // Analytics de session
  trackUserAction('session_started');

});

// ===== FONCTIONS AVANCÉES BONUS =====
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

// ===== VERSION CONSOLE POUR DEBUG =====
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
    version: '4.0-optimized'
  };
}