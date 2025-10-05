const Question = require("../models/Question")

async function getAll() {
    return Question.find({}).lean();
}

async function getByCategory(category) {
    return Question.find({ category }).lean();
}

async function getBySlug(slug) {
    return Question.findOne({ slug }).lean();
}

async function getBySlugAndCategory(slug, category) {
    return Question.findOne({ slug, category }).lean();
}

async function countAll() {
    return Question.countDocuments();
}

module.exports = {
    getAll,
    getByCategory,
    getBySlug,
    getBySlugAndCategory,
    countAll
};