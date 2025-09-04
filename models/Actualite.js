const { Schema, model } = require('mongoose')

const actualiteShema = new Schema({
    resumeTitle: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    keyWord: { type: String, required: true },
    title: { type: String, required: true },
    paragraphs: [{
        pTitle: String,
        text: String,
        hasLinks: { type: Boolean, default: false }
    }],
    sources: [{
        name: String,
        article: String
    }],
    actualiteImg: { type: String, required: true },
    actualiteImgAlt: { type: String, required: true },
    actualiteImgDescription: { type: String, required: true },
    actualiteImgName: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['tarifs', 'reglementation', 'conseils', 'transport', 'douanes', 'actualites', 'logistique']
    },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: [{ type: String }],
    headline: { type: String },
    canonicalUrl: { type: String },
    ogType: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
    twitterTitle: { type: String },
    twitterDescription: { type: String },
    twitterImage: { type: String },
    publishedDate: { type: Date },
    modifiedDate: { type: Date },
    author: { type: String },
    // Accepte tout objet JSON pour structuredData
    structuredData: { type: Schema.Types.Mixed }
}, { collection: 'actualites' })

actualiteShema.index({ category: 1, publishedDate: -1 })

const Actualite = model('Actualite', actualiteShema)

module.exports = Actualite

