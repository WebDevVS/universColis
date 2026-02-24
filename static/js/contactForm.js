// Validation et envoi AJAX du formulaire de contact
// Ce script doit être chargé uniquement sur la page contact

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
        field.style.borderColor = '#FA7E75';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

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
        if (result.success) {
          form.style.display = 'none';
          const success = document.getElementById('successMsg');
          if (success) success.style.display = 'flex';
        } else {
          // Afficher l'erreur côté utilisateur
          alert(result.error || "Erreur lors de l'envoi. Merci de réessayer.");
        }
      })
      .catch(() => {
        alert("Erreur lors de l'envoi. Merci de réessayer.");
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
});

