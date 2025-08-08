const mentionsLegalesController = require('express').Router()

 // ✅ SEO à faire
mentionsLegalesController.get('/', (req, res) => {
    res.render('mentionsLegales', {
        title: 'Mentions légales'
    })
}) 

module.exports = mentionsLegalesController

