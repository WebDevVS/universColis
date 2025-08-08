const aboutUsController = require('express').Router()

 // ✅ SEO à faire
aboutUsController.get('/', (req, res) => {
    res.render('aboutUs', {
        title: 'Qui sommes nous?'
    })
}) 

module.exports = aboutUsController

