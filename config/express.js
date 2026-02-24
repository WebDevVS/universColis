const express = require('express');
const handlebars = require('express-handlebars');
const menuArticles = require('../middlewares/menuArticles');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

module.exports = (app) => {
  const hbs = handlebars.create({
    extname: '.hbs',
    helpers: {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      eq: (a, b) => a === b,
      gt: (a, b) => a > b,
      lt: (a, b) => a < b,
      range: function (start, end) {
        let arr = [];
        for (let i = start; i <= end; i++) arr.push(i);
        return arr;
      },
      split: (string, delimiter) => {
        if (typeof string === 'string') {
          return string.split(delimiter).map(str => str.trim());
        }
        return [];
      },
      json: (context) => JSON.stringify(context),
      multiply: (a, b) => a * b,

      parseMarkdownLinks: function (text) {
        if (!text) return '';
        return new hbs.handlebars.SafeString(
          text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
            // Liens internes : /, #, ou vers universcolis.fr
            if (
              url.startsWith('/') ||
              url.startsWith('#') ||
              url.startsWith('https://www.universcolis.fr') ||
              url.startsWith('http://www.universcolis.fr') ||
              url.startsWith('https://universcolis.fr') ||
              url.startsWith('http://universcolis.fr')
            ) {
              return `<a href="${url}">${linkText}</a>`;
            }
            // Liens externes
            return `<a href="${url}" target="_blank" rel="noopener">${linkText}</a>`;
          })
        );
      },
      or: (a, b) => a || b,

      markdown: function (text) {
        if (!text) return '';

        let html = text
          // **Gras** → <strong>
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          // Emojis numérotés (plus gros)
          .replace(/(\d+️⃣)/g, '<span style="font-size: 1.1em;">$1</span>')
          // Puces • → avec marge
          .replace(/^(\s*)•\s/gm, '$1<span style="margin-left: 1em;">• </span>')
          // Sauts de ligne doubles
          .replace(/\n\n/g, '<br><br>')
          // Sauts de ligne simples
          .replace(/\n/g, '<br>');

        return new hbs.handlebars.SafeString(html);
      },

      // Format date to dd/mm/yyyy, robust to French month names
      formatDate: function (input) {
        try {
          let d = null;
          const monthMap = {
            'jan': 0, 'janvier': 0,
            'fév': 1, 'fev': 1, 'févr': 1, 'fevrier': 1,
            'mar': 2, 'mars': 2,
            'avr': 3, 'avril': 3,
            'mai': 4,
            'juin': 5,
            'juil': 6, 'juillet': 6,
            'août': 7, 'aout': 7,
            'sept': 8, 'septembre': 8,
            'oct': 9, 'octobre': 9,
            'nov': 10, 'novembre': 10,
            'déc': 11, 'dec': 11, 'décembre': 11
          };

          if (!input) return '';

          if (input instanceof Date) {
            d = input;
          } else if (typeof input === 'number') {
            d = new Date(input);
          } else if (typeof input === 'string') {
            const iso = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (iso) {
              const y = parseInt(iso[1], 10);
              const m = parseInt(iso[2], 10) - 1;
              const day = parseInt(iso[3], 10);
              d = new Date(Date.UTC(y, m, day));
            } else {
              const parts = input.trim().toLowerCase().replace(/\./g, '').split(/\s+/);
              // e.g. "28 jan 2025"
              if (parts.length >= 3 && /^\d{1,2}$/.test(parts[0]) && monthMap[parts[1]] !== undefined && /^\d{4}$/.test(parts[2])) {
                const day = parseInt(parts[0], 10);
                const m = monthMap[parts[1]];
                const y = parseInt(parts[2], 10);
                d = new Date(Date.UTC(y, m, day));
              } else {
                const t = Date.parse(input);
                if (!isNaN(t)) d = new Date(t);
              }
            }
          }

          if (!d || isNaN(d.getTime())) return input;
          const dd = String(d.getUTCDate()).padStart(2, '0');
          const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
          const yyyy = d.getUTCFullYear();
          return `${dd}/${mm}/${yyyy}`;
        } catch (e) {
          return input || '';
        }
      },
      // Helper pour lire un fichier (ex: critical CSS)
      readFile: function (filePath) {
        const fs = require('fs');
        try {
          // Chemin absolu depuis la racine du projet
          const absPath = require('path').join(__dirname, '..', filePath.replace(/^\/+/, ''));
          if (fs.existsSync(absPath)) {
            return fs.readFileSync(absPath, 'utf8');
          } else {
            return '';
          }
        } catch (e) {
          return '';
        }
      }

    }
  });

  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');

  app.use(express.static('static'));
  app.use('/static', express.static('static'));
  app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // 🧠 Middleware global pour toutes les vues
  app.use((req, res, next) => {
    const isProd = process.env.NODE_ENV === 'production';

    res.locals.isProd = isProd;

    res.locals.scripts = [
      'articleSelector',
      'articleShare',
      'autocomplete',
      'comparateurFilters',
      'contactForm',
      'generate-sitemaps',
      'glightbox-init',
      'loading',
      'redirect',
      'static',
      'suivi',
      'tabs'
    ];

    res.locals.styles = ['style'];

    next();
  });

  // Permissions Policy pour limiter les warnings navigateur
  app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'autoplay=(), fullscreen=(), cross-origin-isolated=()');
    next();
  });

  // Sécurité : headers, CORS, rate limit
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        // Par défaut, tout est autorisé uniquement depuis ton domaine
        defaultSrc: ["'self'"],

        // Seules les sources JS autorisées (aucun <script> inline ici !)
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://cdn.jsdelivr.net",
          "https://*.jsdelivr.net",
          "https://www.17track.net",
          "https://cdn.track123.com",
          "https://www.track123.com",
          "https://www.track123.com/widget/",
          "https://www.universcolis.fr",
          // Ezoic
          "https://www.ezojs.com",
          "https://www.ezoic.com",
          "https://*.ezoic.net",
          "https://go.ezodn.com",
          "https://go.ezoic.net",
          // Partenaires pub
          "https://cdn.id5-sync.com",
          "https://*.googlesyndication.com",
          "https://*.googleadservices.com",
          "https://*.doubleclick.net",
          "https://securepubads.g.doubleclick.net",
          "https://pagead2.googlesyndication.com",
          // ⬇️ MICROSOFT CLARITY - AJOUTEZ CECI
          "https://www.clarity.ms",
          "https://*.clarity.ms",
          // Google Ads traffic quality endpoint
          "https://*.adtrafficquality.google",
          "https://adtrafficquality.google"
        ],

        // Feuilles de styles : pas de style inline ici non plus
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net",
          "https://cdn.track123.com",
          // Ezoic
          "https://*.ezoic.net",
          "https://*.googlesyndication.com"
        ],

        // Polices de caractères (Google Fonts en général)
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net",
          "https://cdn.track123.com",
          "data:"
        ],

        // Images : autorise les liens vers Boxtal + analytics + les images locales
        imgSrc: [
          "'self'",
          "data:",
          "https://resource.boxtal.build",
          "https://resource.boxtal.com",
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
          // Ezoic
          "https://*.ezoic.net",
          "https:",  // Pour toutes images de pubs
          "http:"
        ],

        // Pour les appels JS type `fetch()` ou XHR
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
          // Google Ads traffic quality endpoint
          "https://*.adtrafficquality.google",
          "https://adtrafficquality.google",
          "https://ep1.adtrafficquality.google",
          "https://ep2.adtrafficquality.google",
          // Ezoic
          "https://*.ezoic.net",
          "https://go.ezodn.com",
          "https://g.ezoic.net",
          // ID5
          "https://id5-sync.com",
          "https://cdn.id5-sync.com",
          "https://*.id5-sync.com",
          "https://lbs.eu-1-id5-sync.com",
          "https://lb.eu-1-id5-sync.com",
          // Google Ads
          "https://*.googlesyndication.com",
          "https://*.doubleclick.net",
          // ⬇️ MICROSOFT CLARITY - AJOUTEZ CECI
          "https://www.clarity.ms",
          "https://*.clarity.ms",
          "https://c.clarity.ms"
        ],

        // Interdiction d’embarquer ton site dans une iframe
        frameSrc: [
          "'self'",
          "https://www.google.com",
          "https://www.googletagmanager.com",
          "https://tagassistant.google.com",
          "https://parcelsapp.com",
          "https://track.global",
          "https://postal.ninja",
          "https://www.track123.com",
          "https://www.17track.net",
          // Ezoic
          "https://*.ezoic.net",
          "https://go.ezoic.net",
          // Google Ads
          "https://*.googlesyndication.com",
          "https://*.doubleclick.net",
          "https://googleads.g.doubleclick.net",
          "https://tpc.googlesyndication.com",
          // Google Ads Traffic Quality - IFRAMES
          "https://*.adtrafficquality.google",
          "https://ep1.adtrafficquality.google",
          "https://ep2.adtrafficquality.google"
        ],

        // Empêche les plugins type Flash/Java
        objectSrc: ["'none'"],

        // Le <base> doit venir du site uniquement
        baseUri: ["'self'"]
      }
    },

    // Politique de référence (utile pour le SEO + sécurité)
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },

    // Si tu as des images externes (ex : Boxtal), on désactive temporairement celui-ci
    crossOriginEmbedderPolicy: false
  }));

  app.use(cors({
    origin: 'https://universcolis.fr', // ou '*' en dev
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Trop de requêtes, réessayez plus tard.'
  });
  app.use(limiter);

  app.use(menuArticles);
};