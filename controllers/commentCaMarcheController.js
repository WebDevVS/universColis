const commentCaMarcheController = require('express').Router()

 // ✅ SEO à faire
commentCaMarcheController.get('/', (req, res) => {
    res.render('commentCaMarche', {
        title: 'Commentça marche?'
    })
}) 

module.exports = commentCaMarcheController

