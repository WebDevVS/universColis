const { Schema, model } = require('mongoose')

// TODO add username and validation according to assignment
const materielShema = new Schema({
    category: { type: String, required: true }, // Titre de l'article
    type: { type: String, required: true }, // URL friendly
    products: [{
        name: { type: String, required: true }, // Nom du produit
        url: { type: String }, // Lien du produit
      }],
}, { collection: 'materiels' })

const Materiel = model('Materiel', materielShema)

module.exports = Materiel

