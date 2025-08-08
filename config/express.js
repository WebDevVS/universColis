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
      eq: (a, b) => a === b,
      split: (string, delimiter) => {
        if (typeof string === 'string') {
          return string.split(delimiter).map(str => str.trim());
        }
        return [];
      },
      json: (context) => JSON.stringify(context),
      multiply: (a, b) => a * b,
      isProd: () => process.env.NODE_ENV === 'production' // 🔧 nouveau helper
    }
  });

  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');

  app.use('/static', express.static('static'));
  app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
  app.use(express.urlencoded({ extended: true }));

  // 🧠 Middleware global pour toutes les vues
  app.use((req, res, next) => {
    const isProd = process.env.NODE_ENV === 'production';

    res.locals.isProd = isProd;

    res.locals.scripts = [
      'articleSelector',
      'autocomplete',
      'comparateurFilters',
      'cookiePreferencesButton',
      'cookiesConfig',
      'googleAnalytics',
      'redirect',
      'static',
      'suivi',
      'tabs'
    ];

    res.locals.styles = ['style'];

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
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
          "https://www.17track.net",
          "https://cdn.track123.com",
          "https://www.track123.com"
        ],

        // Feuilles de styles : pas de style inline ici non plus
        styleSrc: [
          "'self'",
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
          "https://www.google-analytics.com",
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
    origin: 'https://tondomaine.com', // ou '*' en dev
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