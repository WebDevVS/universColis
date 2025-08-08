const { Schema, model } = require('mongoose')

// TODO add username and validation according to assignment
const categoryShema = new Schema({
    category: { type: String, required: true },
    codeBoxtal: { type: String, required: true },
    products: [{
        code: { type: String, required: true },
        label_fr: { type: String, required: true }
    }]
}, { collection: 'categories' })

const Category = model('Category', categoryShema)

module.exports = Category
