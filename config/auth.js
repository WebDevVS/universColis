const base64 = require('base-64'); // npm install base-64

const ACCESS_KEY = process.env.BOXTAL_ACCESS_KEY; // Utilise des variables d'environnement pour la sécurité
const SECRET_KEY = process.env.BOXTAL_SECRET_KEY;

function getAuthHeader() {
    const token = `${ACCESS_KEY}:${SECRET_KEY}`;
    const encoded = base64.encode(token);

    return {
        'Authorization': `Basic ${encoded}`,
        'Accept': 'application/xml',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
}

module.exports = { getAuthHeader };
