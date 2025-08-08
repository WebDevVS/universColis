const { Schema, model } = require('mongoose')

// TODO add username and validation according to assignment
const countryShema = new Schema({
  isoCode: { type: String, required: true },
  label: { type: String, required: true },
  cities: [
    {
      name: { type: String, required: true },
      postal: { type: String, required: true }
    }
  ]
}, { collection: 'countries' })

const Country = model('Country', countryShema)

module.exports = Country

