document.addEventListener("DOMContentLoaded", function () {
  function bindCookiePrefButton() {
    const btn = document.getElementById("open-cookie-preferences");
    if (
      btn &&
      window.silktideCookieBannerManager &&
      typeof window.silktideCookieBannerManager.showPreferences === "function"
    ) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        window.silktideCookieBannerManager.showPreferences();
      });
    }
  }

  if (
    window.silktideCookieBannerManager &&
    typeof window.silktideCookieBannerManager.showPreferences === "function"
  ) {
    bindCookiePrefButton();
  } else {
    document.addEventListener("silktideCookieBannerLoaded", bindCookiePrefButton);
  }
  // When the silktide banner/modal is created it sometimes renders a H1 for the
  // preferences title. That can create a second H1 on pages and trigger SEO warnings
  // even when the banner is visually hidden. Replace any H1 inside the banner/modal
  // with H2 after the widget is loaded.
  function normalizeSilktideHeadings() {
    const containers = [document.getElementById('silktide-modal'), document.getElementById('silktide-banner')];
    containers.forEach(c => {
      if (!c) return;
      const h1s = c.querySelectorAll('h1');
      h1s.forEach(h1 => {
        const h2 = document.createElement('h2');
        // copy attributes and content
        h2.innerHTML = h1.innerHTML;
        for (let i = 0; i < h1.attributes.length; i++) {
          const attr = h1.attributes[i];
          h2.setAttribute(attr.name, attr.value);
        }
        h1.parentNode.replaceChild(h2, h1);
      });
    });
  }

  // Run once when the banner is loaded
  if (window.silktideCookieBannerManager && document.getElementById('silktide-wrapper')) {
    normalizeSilktideHeadings();
  } else {
    document.addEventListener('silktideCookieBannerLoaded', normalizeSilktideHeadings);
  }
});
