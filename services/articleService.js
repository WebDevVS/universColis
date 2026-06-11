const Article = require("../models/Article")

async function getAll(){
    return Article.find({}).sort({ publishedDate: -1, _id: -1 }).lean()
}

async function getBySlug(slug){
    return Article.findOne({slug}).lean() 
}

async function getMenuTiteles() {
    return Article.find({}, { slug: 1, menuTitle: 1, publishedDate: 1, _id: 0 }).sort({ publishedDate: -1, _id: -1 }).lean();
}

module.exports = {
    getAll,
    getBySlug,
    getMenuTiteles
} 