// Fonction pour afficher le spinner de chargement
function showLoadingSpinner() {
    const overlay = document.getElementById('loadingOverlay');
    const spinnerText = document.getElementById('spinnerText');

    // Textes qui changent pendant le chargement
    const loadingMessages = [
        'Recherche des offres...',
        'Analyse des prix...',
        'Finalisation des résultats...'
    ];

    let currentStep = 0;
    overlay.style.display = 'flex';

    // Animation des étapes
    const stepInterval = setInterval(() => {
        if (currentStep > 0) {
            // Marquer l'étape précédente comme terminée
            const prevStep = document.getElementById(`step${currentStep}`);
            prevStep.classList.remove('active');
            prevStep.classList.add('completed');
            prevStep.closest('.loading-step').querySelector('.step-label').classList.remove('active');
        }

        currentStep++;

        if (currentStep <= 3) {
            // Activer l'étape actuelle
            const currentStepEl = document.getElementById(`step${currentStep}`);
            const currentLabel = currentStepEl.closest('.loading-step').querySelector('.step-label');

            currentStepEl.classList.add('active');
            currentLabel.classList.add('active');

            // Changer le texte du spinner
            if (loadingMessages[currentStep - 1]) {
                spinnerText.textContent = loadingMessages[currentStep - 1];
            }
        }

        if (currentStep >= 3) {
            clearInterval(stepInterval);
        }
    }, 1500);
}

// Pour ton vrai formulaire, attache cette fonction
function attachLoadingToForms() {
    // Sélectionne tous les formulaires qui envoient vers /comparateur-des-prix (y compris dans la modale)
    const forms = document.querySelectorAll('form[action="/comparateur-des-prix"]');
    forms.forEach(form => {
        form.addEventListener('submit', function () {
            showLoadingSpinner();
        });
    });
}

document.addEventListener('DOMContentLoaded', attachLoadingToForms);