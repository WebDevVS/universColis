const Materiel = require("../models/Materiel")

async function getAll(){
    return Materiel.find({}).lean()
}

module.exports = {
    getAll
}