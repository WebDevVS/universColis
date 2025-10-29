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

    }
  });

  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');

  app.use(express.static('static'));
  app.use('/static', express.static('static'));
  app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
  app.use(express.urlencoded({ extended: true }));

  // 🧠 Middleware global pour toutes les vues
  app.use((req, res, next) => {
    const isProd = process.env.NODE_ENV === 'production';

    res.locals.isProd = isProd;

    res.locals.scripts = [
      'articleSelector',
      'articleShare',
      'autocomplete',
      'comparateurFilters',
      'cookiePreferencesButton',
      'cookiesConfig',
      'generate-sitemaps',
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
          "https://www.17track.net",
          "https://cdn.track123.com",
          "https://www.track123.com",
          "https://www.universcolis.fr"
        ],

        // Feuilles de styles : pas de style inline ici non plus
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net",
          "https://cdn.track123.com"
        ],

        // Polices de caractères (Google Fonts en général)
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net",
          "https://cdn.track123.com"
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
          "https://track123-widget.track123cdn.com"
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
          "https://www.17track.net"
        ],

        // Interdiction d’embarquer ton site dans une iframe
        frameSrc: [
          "'self'",
          "https://www.googletagmanager.com",
          "https://tagassistant.google.com",
          "https://parcelsapp.com",
          "https://track.global",
          "https://postal.ninja",
          "https://www.track123.com",
          "https://www.17track.net"
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