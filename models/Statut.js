const { Schema, model } = require('mongoose');

const statutSchema = new Schema({
    fr: { type: String, required: true },
    en: { type: String, default: null },
    explication: { type: String, required: true },
    action: { type: String, required: true },
    urgence: { type: String, enum: ['attendre', 'verifier', 'action', 'urgent'], required: true },
    phase: { type: String, enum: ['avant', 'transit', 'douane', 'livraison', 'probleme'], required: true },
    transporteur: { type: String, default: null },
    tags: { type: [String], default: [] }
}, {
    collection: 'statuts'
});

const Statut = model('Statut', statutSchema)

module.exports = Statut