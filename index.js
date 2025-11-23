require('dotenv').config()
const express = require('express')
const expressConfig = require('./config/express')
const databaseConfig = require('./config/database')
const routesConfig = require('./config/routes')
const minifyMiddleware = require('./middlewares/minifyHtml')


start()

async function start() {
  const app = express()


  expressConfig(app)
  await databaseConfig(app)

  if (process.env.NODE_ENV === 'production') {
    app.use(minifyMiddleware);
  }

  // MIDDLEWARE EZOIC - Définir les pages avec publicités
  // ========================================
  app.use((req, res, next) => {
    // Liste des pages où Ezoic se charge (facile à modifier)
    const ezoicPages = [
      '/suivi',           // Page de suivi de colis
      '/actualites/',     // Articles d'actualités
      // '/questions/',   // Questions FAQ (décommentez pour activer)
      // '/mon-materiel'  // Page matériel (décommentez pour activer)
    ];

    // Vérifier si la page actuelle est dans la liste
    res.locals.showEzoic = ezoicPages.some(page =>
      req.path === page || req.path.startsWith(page)
    );

    // Identifier le type de page (utile pour placements pub plus tard)
    res.locals.pageType = {
      isTracking: req.path === '/suivi',
      isActualite: req.path.startsWith('/actualites/'),
      isConseils: req.path.startsWith('/conseils/'),
      isQuestion: req.path.startsWith('/questions/'),
      isComparateur: req.path === '/' || req.path.startsWith('/comparateur')
    };

    next();
  });


  // ADS.TXT - Redirection vers Ezoic
  // ========================================
  app.get('/ads.txt', (req, res) => {
    res.redirect(301, 'https://srv.adstxtmanager.com/19390/universcolis.fr');
  });


  routesConfig(app)

  const PORT = process.env.PORT || 5555;
  app.listen(PORT, () => {

  });

}
