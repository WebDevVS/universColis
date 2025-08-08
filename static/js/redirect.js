// Fonction pour déclencher l'animation de redirection
function showRedirectionAnimation(targetUrl, transporterName = '') {
    const overlay = document.getElementById('redirectionOverlay');
    const countdownEl = document.getElementById('countdown');
    const spinnerText = document.querySelector('.spinner-text');

    overlay.classList.add('active');

    let countdown = 3;
    countdownEl.textContent = countdown;

    const spinnerTexts = ['Préparation...', 'Connexion...', 'Redirection...'];
    let textIndex = 0;

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;

        if (textIndex < spinnerTexts.length - 1) {
            textIndex++;
            spinnerText.textContent = spinnerTexts[textIndex];
        }

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            overlay.classList.remove('active');
            // Ouvre le site dans un nouvel onglet
            window.open(targetUrl, '_blank');
        }
    }, 1000);
}

function attachRedirectionListeners() {
    const reserveBtns = document.querySelectorAll('.reserve-btn');
    reserveBtns.forEach(btn => {
        // Pour éviter les doublons, retire d'abord tout listener existant
        btn.removeEventListener('click', handleReserveClick);
        btn.addEventListener('click', handleReserveClick);
    });
}

function handleReserveClick(e) {
    e.preventDefault();
    const targetUrl = this.getAttribute('data-url');
    showRedirectionAnimation(targetUrl);
}

// Initial attach on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    attachRedirectionListeners();
});

// Expose pour les scripts dynamiques
window.attachRedirectionListeners = attachRedirectionListeners;

// Fermer l'overlay si on clique dessus (optionnel)
document.getElementById('redirectionOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});
