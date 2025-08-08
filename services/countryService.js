const Country = require("../models/Country")

async function getAll(){
    return Country.find({}).sort({ label: 1 }).lean()
}

async function getFormattedData(isoCode) {
    const country = await Country.findOne({ isoCode }).lean();

    if (!country) return null;

    return {
        [isoCode]: {
            label: country.label,
            cities: country.cities
        }
    };
}


module.exports = {
    getAll,
    getFormattedData
}