const helmet = require("helmet");

module.exports = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://www.17track.net",
      "https://cdn.track123.com",
      "https://www.track123.com",
      "https://www.track123.com/widget/",
      "https://www.ezojs.com",
      "https://www.ezoic.com",
      "https://*.ezoic.net",
      "https://go.ezodn.com",
      "https://go.ezoic.net",
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
      "https://*.ezoic.net"
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
      "https://g.ezoic.net"
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
      "https://go.ezoic.net"
    ],
    objectSrc: ["'none'"],
    baseUri: ["'self'"]
  }
});

