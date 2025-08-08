const Category = require("../models/Category")

async function getAllCategories(){
    return Category.find({}).lean()
}

module.exports = {
    getAllCategories
}