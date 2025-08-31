//const authController = require("../controllers/authController")
const homeController = require("../controllers/homeController")
const suiviController = require("../controllers/suiviController")
const comparateurController = require("../controllers/comparateurController")
const meterielController = require("../controllers/materielController")
const articleController = require("../controllers/articleController")
const autocompleteController = require("../controllers/autocompleteController")
const autocompleteRoutes = require('../routes/autocompleteRoute')
const aboutUsController = require("../controllers/aboutUsController")
const commentCaMarcheController = require("../controllers/commentCaMarcheController")
const mentionsLegalesController = require("../controllers/mentionsLegalesController")
const confidentialiteController = require("../controllers/confidentialiteController")


const cspSuivi = require("../middlewares/cspSuivi");

module.exports = (app) => {
    app.use('/', homeController)
    app.use('/suivi', cspSuivi, suiviController)
    app.use('/comparateur-des-prix', comparateurController)
    app.use('/mon-materiel', meterielController)
    app.use('/conseils', articleController)
    app.use('/api', autocompleteRoutes)
    app.use('/qui-sommes-nous', aboutUsController)
    app.use('/comment-ca-marche', commentCaMarcheController)
    app.use('/mentions-legales', mentionsLegalesController)
    app.use('/politique-confidentialite', confidentialiteController)
    

    app.use((req, res) => {
        res.status(404).render('404');
    });

    // Error handler (optionnel, pour les erreurs serveur)
    app.use((err, req, res, next) => {
        if (process.env.NODE_ENV !== 'production') {
            console.error(err.stack);
        }
        res.status(500).render('error');
    });
}