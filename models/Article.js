const { Schema, model } = require('mongoose')

const articleShema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    menuTitle: { type: String, required: true, unique: true },
    cardTitle: { type: String, required: true },
    cardImg: { type: String, required: true },
    cardImgAlt: { type: String, required: true },
    cardImgDescription: { type: String, required: true },
    cardImgName: { type: String, required: true },
    idCard: { type: String, required: true },
    introduction: { type: String, required: true },
    summary: [{ type: String }],
    etapeWord: { type: String },
    steps: [{
        title: String,
        description: String,
        image: String,
        imageAlt: String,
        figcaption: String,
        imageDescription: String,
        imageName: String,
    }],
    materialsWord: { type: String },
    materials: [{ type: String }],
    packingTips: [{
        mistake: String,
        solution: String
    }],
    faq: [{
        question: String,
        responses: [{
            type: { type: String, enum: ['positive', 'negative'] },
            text: String
        }]
    }],
    astuce: { type: String },
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
}, { collection: 'articles' })

const Article = model('Article', articleShema)

module.exports = Article

