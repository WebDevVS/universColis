// cookiesConfig.js
function configureCookieBanner() {
  if (window.silktideCookieBannerManager && window.silktideCookieBannerManager.updateCookieBannerConfig) {
    window.silktideCookieBannerManager.updateCookieBannerConfig({
      text: {
        banner: {
          description:
            "Ce site utilise des cookies nécessaires, d’analyse et marketing. <a href='/politique-confidentialite' target='_blank'>En savoir plus dans notre Politique de confidentialité.</a>",
          acceptAllButtonText: "Tout accepter",
          rejectNonEssentialButtonText: "Tout refuser",
          preferencesButtonText: "Préférences",
        },
        preferences: {
          title: "Personnalisez vos préférences de cookies",
          description:
            "<p>Nous respectons votre vie privée. Vous pouvez choisir de ne pas autoriser certains types de cookies. Vos préférences s’appliqueront sur l’ensemble de notre site.</p>",
          savePreferencesButtonText: "Enregistrer mes choix",
        },
      },
      cookieTypes: [
        {
          id: "necessary",
          name: "Cookies nécessaires",
          description: "Indispensables au fonctionnement du site.",
          required: true,
        },
        {
          id: "analytics",
          name: "Cookies d’analyse",
          description: "Nous aident à améliorer le site.",
          defaultValue: false,
          onAccept: () =>
            window.gtag &&
            gtag("consent", "update", { analytics_storage: "granted" }),
          onReject: () =>
            window.gtag &&
            gtag("consent", "update", { analytics_storage: "denied" }),
        },
        {
          id: "marketing",
          name: "Cookies marketing",
          description: "Utilisés pour la publicité personnalisée.",
          defaultValue: false,
          onAccept: () =>
            window.gtag &&
            gtag("consent", "update", {
              ad_storage: "granted",
              ad_personalization: "granted",
            }),
          onReject: () =>
            window.gtag &&
            gtag("consent", "update", {
              ad_storage: "denied",
              ad_personalization: "denied",
            }),
        },
      ],
      position: {
        banner: "bottomRight",
      },
      cookieIcon: {
        enabled: false,
      },
      background: {
        showBackground: false,
      },
    });
  } else {
    setTimeout(configureCookieBanner, 100);
  }
}
configureCookieBanner();
