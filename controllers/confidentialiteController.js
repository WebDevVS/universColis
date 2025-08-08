const confidentialiteController = require('express').Router()

 // ✅ SEO à faire
confidentialiteController.get('/', (req, res) => {
    res.render('confidentialite', {
        title: 'Politique de confidentialite'
    })
}) 

module.exports = confidentialiteController

