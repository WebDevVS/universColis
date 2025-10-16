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
          // Use helper so behavior is consistent with nav buttons
          scrollToSectionWithSticky(targetElement);

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

  // ===== Active nav using IntersectionObserver + smooth scroll for .nav-btn =====
  (function() {
    const navButtons = Array.from(document.querySelectorAll('.nav-btn'));

    // Map section id -> nav button
    const btnById = new Map();
    navButtons.forEach(btn => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) btnById.set(href.slice(1), btn);
    });

    // Select any element with an id that corresponds to a nav button (covers div#materiel too)
    const sections = Array.from(document.querySelectorAll('[id]')).filter(el => btnById.has(el.id));

    if ('IntersectionObserver' in window && sections.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const btn = btnById.get(id);
          if (!btn) return;
          if (entry.isIntersecting) {
            // remove active from all to keep single active
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          }
        });
      }, { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 });

      sections.forEach(s => observer.observe(s));
    } else {
      // Fallback: simple scroll-based detection
      function setActiveNav() {
        let current = '';
        sections.forEach(section => {
          const top = section.getBoundingClientRect().top;
          if (top <= 120) current = section.getAttribute('id');
        });
        navButtons.forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('href') === `#${current}`);
        });
      }
      window.addEventListener('scroll', setActiveNav);
      setActiveNav();
    }

    // Helper: scroll to a section while accounting for a sticky nav
    function scrollToSectionWithSticky(targetSection) {
      if (!targetSection) return;
      // We intentionally DO NOT set inline scrollMarginTop here.
      // Anchor offset is controlled by CSS via --anchor-offset so designers can tweak it.
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Smooth scroll au clic (utilise scrollIntoView et prend en compte le sticky)
    navButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          scrollToSectionWithSticky(targetSection);
          // update hash without jumping
          if (history && history.pushState) history.pushState(null, '', targetId);
        }
      });
    });
  })();


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


