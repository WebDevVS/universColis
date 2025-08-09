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
    // Formulaire rapide
    const formsRapide = document.querySelectorAll('form[action="/comparateur-des-prix"]');

    formsRapide.forEach(form => {
        form.addEventListener('submit', function (e) {
            // Ne pas empêcher la soumission, juste afficher le spinner
            showLoadingSpinner();
        });
    });
}

document.addEventListener('DOMContentLoaded', attachLoadingToForms);