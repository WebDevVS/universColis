const Actualite = require("../models/Actualite")

async function getAll(){
    // Trie par publishedDate décroissant (plus récent en premier)
    return Actualite.find({}).sort({ publishedDate: -1 }).lean()
}

async function getBySlug(slug){
    return Actualite.findOne({slug}).lean() 
}

async function getLatest(limit = 3) {
    return Actualite.find({}).sort({ publishedDate: -1 }).limit(limit).lean();
}

async function countAll() {
    return Actualite.countDocuments();
}
async function getPaginated(page, pageSize) {
    return Actualite.find({})
        .sort({ publishedDate: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean();
}
module.exports = {
    getAll,
    getBySlug,
    getLatest,
    countAll,
    getPaginated,
}