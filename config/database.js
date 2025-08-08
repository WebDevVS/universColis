const mongoose = require('mongoose')

module.exports = async (app) => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "comparateur_fr"
        })


    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}