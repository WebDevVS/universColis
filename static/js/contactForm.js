// Validation et envoi AJAX du formulaire de contact
// Ce script doit être chargé uniquement sur la page contact

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let valid = true;

    // Helper : afficher erreur
    function setError(fieldId, errorId, msg) {
      const field = document.getElementById(fieldId);
      const error = document.getElementById(errorId);
      if (field) field.classList.add('input-error');
      if (error) {
        error.textContent = msg;
        error.classList.add('visible');
      }
      valid = false;
    }

    // Helper : effacer erreur
    function clearError(fieldId, errorId) {
      const field = document.getElementById(fieldId);
      const error = document.getElementById(errorId);
      if (field) field.classList.remove('input-error');
      if (error) {
        error.textContent = '';
        error.classList.remove('visible');
      }
    }

    // Nom
    const nom = document.getElementById('nom');
    if (!nom.value.trim()) {
      setError('nom', 'error-nom', 'Veuillez indiquer votre nom et prénom.');
    } else {
      clearError('nom', 'error-nom');
    }

    // Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      setError('email', 'error-email', 'Veuillez indiquer votre adresse email.');
    } else if (!emailRegex.test(email.value.trim())) {
      setError('email', 'error-email', 'Adresse email invalide.');
    } else {
      clearError('email', 'error-email');
    }

    // Sujet
    const sujet = document.getElementById('sujet');
    if (!sujet.value) {
      setError('sujet', 'error-sujet', 'Veuillez choisir un sujet.');
    } else {
      clearError('sujet', 'error-sujet');
    }

    // Message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      setError('message', 'error-message', 'Veuillez écrire votre message.');
    } else {
      clearError('message', 'error-message');
    }

    // Checkbox privacy
    const privacy = document.getElementById('privacy');
    const errorPrivacy = document.getElementById('error-privacy');
    const privacyCheck = document.querySelector('.privacy-check');
    if (!privacy.checked) {
      if (privacyCheck) privacyCheck.classList.add('check-error');
      if (errorPrivacy) {
        errorPrivacy.textContent = 'Vous devez accepter la politique de confidentialité.';
        errorPrivacy.classList.add('visible');
      }
      valid = false;
    } else {
      if (privacyCheck) privacyCheck.classList.remove('check-error');
      if (errorPrivacy) {
        errorPrivacy.textContent = '';
        errorPrivacy.classList.remove('visible');
      }
    }

    if (!valid) return;

    // Préparer les données du formulaire
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Désactiver le bouton pour éviter les doubles envois
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Envoi AJAX (fetch)
    fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        const errorMsg = form.querySelector('.errorMsg');
        if (result.success) {
          form.style.display = 'none';
          const success = document.getElementById('successMsg');
          if (success) success.style.display = 'flex';
        } else {
          // Afficher l'erreur côté utilisateur
          if (errorMsg) {
            errorMsg.textContent = result.error || "Erreur lors de l'envoi. Merci de réessayer.";
            errorMsg.style.display = 'block';
          } else {
            alert(result.error || "Erreur lors de l'envoi. Merci de réessayer.");
          }
        }
      })
      .catch(() => {
        const errorMsg = form.querySelector('.errorMsg');
        if (errorMsg) {
          errorMsg.textContent = "Erreur lors de l'envoi. Merci de réessayer.";
          errorMsg.style.display = 'block';
        } else {
          alert("Erreur lors de l'envoi. Merci de réessayer.");
        }
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
});

