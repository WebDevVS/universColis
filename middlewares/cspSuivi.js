const helmet = require("helmet");

module.exports = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://cdn.jsdelivr.net", // Autorise glightbox et autres scripts CDN
      "https://*.jsdelivr.net",
      "https://www.17track.net",
      "https://cdn.track123.com",
      "https://www.track123.com",
      "https://www.track123.com/widget/",
      "https://www.ezojs.com",
      "https://www.ezoic.com",
      "https://*.ezoic.net",
      "https://go.ezodn.com",
      "https://go.ezoic.net",
      // Partenaires publicitaires Ezoic
      "https://cdn.id5-sync.com",           // ID5 (identity tracking)
      "https://*.googlesyndication.com",    // Google Ads
      "https://*.googleadservices.com",     // Google Ads
      "https://*.doubleclick.net",          // DoubleClick (Google)
      "https://securepubads.g.doubleclick.net",
      "https://pagead2.googlesyndication.com",
      // ⬇️ MICROSOFT CLARITY - AJOUTEZ CECI
      "https://www.clarity.ms",
      "https://*.clarity.ms",
      // Google Ads traffic quality endpoint
      "https://*.adtrafficquality.google",
      "https://adtrafficquality.google",
      "'unsafe-inline'" // ⚠️ ici on assouplit uniquement sur cette route
    ],
    scriptSrcAttr: ["'unsafe-inline'"],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
      "https://cdnjs.cloudflare.com",
      "https://cdn.jsdelivr.net",
      "https://cdn.track123.com",
      "https://www.track123.com",
      "https://*.ezoic.net",
      "https://*.googlesyndication.com"
    ],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
      "https://cdnjs.cloudflare.com",
      "https://cdn.jsdelivr.net",
      "https://cdn.track123.com"
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https://resource.boxtal.build",
      "https://www.google-analytics.com",
      "https://www.googletagmanager.com",
      "https://stats.g.doubleclick.net",
      "https://parcelsapp.com",
      "https://track.global",
      "https://postal.ninja",
      "https://www.track123.com",
      "https://cdn.track123.com",
      "https://www.17track.net",
      "https://track123.com",
      "https://track123-widget.track123.com",
      "https://track123-widget.track123cdn.com",
      "https://*.ezoic.net",
      "https:",  // Pour toutes les images de pubs
      "http:"    // Certaines pubs anciennes
    ],
    connectSrc: [
      "'self'",
      "https://www.google-analytics.com",
      "https://region1.google-analytics.com",
      "https://www.googletagmanager.com",
      "https://stats.g.doubleclick.net",
      "https://parcelsapp.com",
      "https://track.global",
      "https://postal.ninja",
      "https://www.track123.com",
      "https://cdn.track123.com",
      "https://www.17track.net",
      "https://*.ezoic.net",
      "https://go.ezodn.com",
      "https://g.ezoic.net",
      // Partenaires pub
      "https://id5-sync.com",              // ← AJOUTÉ (domaine racine)
      "https://cdn.id5-sync.com",
      "https://*.id5-sync.com",            // Wildcard sous-domaines
      "https://lbs.eu-1-id5-sync.com",     // ← AJOUTÉ (explicite)
      "https://lb.eu-1-id5-sync.com",      // ← AJOUTÉ (explicite)
      "https://*.googlesyndication.com",
      "https://*.doubleclick.net",
      // ⬇️ MICROSOFT CLARITY - AJOUTEZ CECI
      "https://www.clarity.ms",
      "https://*.clarity.ms",
      "https://c.clarity.ms",
      // Autorise endpoint Google Ads traffic quality
      "https://ep1.adtrafficquality.google",
      "https://ep2.adtrafficquality.google"
    ],
    frameSrc: [
      "'self'",
      "https://www.googletagmanager.com",
      "https://tagassistant.google.com",
      "https://parcelsapp.com",
      "https://track.global",
      "https://postal.ninja",
      "https://www.track123.com",
      "https://www.17track.net",
      "https://extcall.17track.net",
      "https://*.ezoic.net",
      "https://go.ezoic.net",
      // Partenaires pub (iframes de pubs)
      "https://*.googlesyndication.com",
      "https://*.doubleclick.net",
      "https://googleads.g.doubleclick.net",
      "https://tpc.googlesyndication.com"
    ],
    objectSrc: ["'none'"],
    baseUri: ["'self'"]
  }
});

