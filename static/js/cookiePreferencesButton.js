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
});
