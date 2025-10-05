const { Schema, model } = require('mongoose')

const questionShema = new Schema({
    title: { type: String, required: true },
    teaser : { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    categoryLabels: {
        type: [String],
        required: true,
    },
    readingTime: { type: Number, required: false },
    resume: {
        text: { type: String, required: true },
        hasLinks: { type: Boolean, default: false }
    } ,
    paragraphs: [{
        pTitle: String,
        pSubtitle: String,
        text: String,
        list: [String],
        highlight: String,
        hasLinks: { type: Boolean, default: false },
        isTable: { type: Boolean, default: false },
        table: {
            headers: [String],
            rows: [[String]]
        },
        questionImg: String,
        questionImgAlt: String,
        questionImgFigcaption: String,
        questionImgDescription: String
    }],
    faq: [{
        question: String,
        responses: [String],
        hasLinks: { type: Boolean, default: false }
    }],
    sources: [{
        name: String,
        article: String,
        hasLinks: { type: Boolean, default: false }
    }],
    cta: [{
        phrase: String,
        button: String,
    }],
    questionImg: { type: String, required: true },
    questionImgAlt: { type: String, required: true },
    questionImgDescription: { type: String, required: true },
    questionImgFigcaption: { type: String, required: true },
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
}, { collection: 'questions' })


const Question = model('Question', questionShema)

module.exports = Question

