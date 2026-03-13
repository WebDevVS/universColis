// === READING PROGRESS BAR ===
(function () {
  const ACTIVE_PATHS = [
    /^\/actualites\/.+/,   // pages articles individuels
    /^\/questions\/.+/,    // pages questions individuelles
    /^\/conseils\/.+/,     // pages guides individuels
  ];
  const bar = document.getElementById('reading-progress-bar');
  if (!bar) return;
  const path = window.location.pathname;
  const isActive = ACTIVE_PATHS.some(re => re.test(path));
  if (!isActive) return;
  bar.style.display = 'block';
  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const progress = Math.min(100, (scrollTop / docHeight) * 100);
    bar.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();
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
  (function () {
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
      btn.addEventListener('click', function (e) {
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

    // TOC toggle + count + auto-close on item click
    (function setupTocToggle() {
      const tocToggle = document.getElementById('tocToggle');
      const tocNav = document.getElementById('tocNav');
      const tocCount = document.getElementById('tocCount');
      if (!tocNav) return;

      const items = Array.from(tocNav.querySelectorAll('.toc-item'));
      // update count
      if (tocCount) tocCount.textContent = items.length + (items.length > 1 ? ' sections' : ' section');

      if (!tocToggle) return;

      tocToggle.addEventListener('click', function () {
        tocNav.classList.toggle('show');
        tocToggle.classList.toggle('active');
        const isExpanded = tocNav.classList.contains('show');
        tocToggle.setAttribute('aria-expanded', isExpanded);
      });

      // Close TOC on mobile when selecting an item
      items.forEach(a => a.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
          tocNav.classList.remove('show');
          tocToggle.classList.remove('active');
          tocToggle.setAttribute('aria-expanded', false);
        }
      }));
    })();

    // ===== Mobile Menu: Close on outside click =====
    (function setupMobileMenuClose() {
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');

      if (!navbarToggler || !navbarCollapse) return;

      // Detect clicks outside the menu on mobile
      document.addEventListener('click', function (e) {
        // Check if menu is open
        const isMenuOpen = navbarCollapse.classList.contains('show');
        if (!isMenuOpen) return;

        // Check if click is outside both the menu and the toggle button
        const clickedInsideMenu = navbarCollapse.contains(e.target);
        const clickedToggler = navbarToggler.contains(e.target);

        if (!clickedInsideMenu && !clickedToggler) {
          // Close the menu
          navbarCollapse.classList.remove('show');
          navbarToggler.classList.add('collapsed');
          navbarToggler.setAttribute('aria-expanded', 'false');
        }
      });

      // Close menu when clicking on a nav link (except dropdown toggle)
      const navLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 991) { // Breakpoint Bootstrap lg
            navbarCollapse.classList.remove('show');
            navbarToggler.classList.add('collapsed');
            navbarToggler.setAttribute('aria-expanded', 'false');
          }
        });
      });

      // Close menu when clicking on a dropdown item
      const dropdownItems = navbarCollapse.querySelectorAll('.dropdown-item');
      dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
          if (window.innerWidth <= 991) {
            navbarCollapse.classList.remove('show');
            navbarToggler.classList.add('collapsed');
            navbarToggler.setAttribute('aria-expanded', 'false');
          }
        });
      });
    })();
  })();

  const scrollLinks = document.querySelectorAll('a[href="#formulaire-comparateur"]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const formulaire = document.getElementById('formulaire-comparateur');
      if (!formulaire) return;

      // Mesure dynamique de la navbar sticky si présente
      const navbar = document.querySelector('.navbar');
      const navHeight = navbar ? navbar.getBoundingClientRect().height : 0;
      // Marge additionnelle légère pour la respiration visuelle
      const extra = 12;
      const headerOffset = Math.max(56, Math.min(160, Math.round(navHeight + extra)));

      const elementPosition = formulaire.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

      // Focus sur le premier champ après le scroll
      setTimeout(() => {
        const firstInput = formulaire.querySelector('input, select');
        if (firstInput) firstInput.focus();
      }, 500);
    });
  });


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

  document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(button => {
    button.addEventListener('click', function () {
      setTimeout(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
      }, 350); // Attendre que l'animation collapse soit terminée
    });
  });
}

// (TOC toggle is initialized within DOMContentLoaded)

// ============================================================
// SEO FIX — Vendor List link (Ezoic/Silktide CMP)
// Ajoute rel="nofollow" sur le lien "Vendor List" généré
// automatiquement par la CMP Ezoic pour éviter le warning
// PageSpeed "Links are not crawlable". Aucun impact sur le
// fonctionnement des cookies ou du consentement.
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  const vendorLink = document.getElementById('ez-vendors');
  if (vendorLink) {
    vendorLink.setAttribute('rel', 'nofollow');
  }
});