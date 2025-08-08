// Fonction pour afficher le bouton de remontée en haut
document.addEventListener("DOMContentLoaded", function () {

  const backToTopButton = document.getElementById('back-to-top');

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block"; // Afficher le bouton
      } else {
        backToTopButton.style.display = "none"; // Masquer le bouton
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  const select = document.getElementById("article-select");

  if (select) {
    select.addEventListener("change", function () {
      const targetId = this.value;
      if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });

          // Ajoute une classe pour l'effet de surbrillance
          targetElement.classList.add("highlight");

          // Supprime la classe après 2 secondes
          setTimeout(() => {
            targetElement.classList.remove("highlight");
          }, 2000);
        } else {
          console.error("Élément cible non trouvé !");
        }
      }
    });
  }
});

function showTab(tabId) {
  // Cacher tous les panneaux de contenu
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabPanes.forEach(pane => {
    pane.classList.remove('active');
  });

  // Désactiver tous les boutons d'onglet
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.classList.remove('active');
  });

  // Afficher le panneau de contenu sélectionné
  const selectedPane = document.getElementById(tabId);
  if (selectedPane) selectedPane.classList.add('active');

  // Activer le bouton d'onglet correspondant
  const activeBtn = document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`);
  if (activeBtn) activeBtn.classList.add('active');
}


