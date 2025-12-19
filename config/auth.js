const base64 = require('base-64');

// Boxtal
const BOXTAL_ACCESS_KEY = process.env.BOXTAL_ACCESS_KEY;
const BOXTAL_SECRET_KEY = process.env.BOXTAL_SECRET_KEY;

function getBoxtalAuthHeader() {
  if (!BOXTAL_ACCESS_KEY || !BOXTAL_SECRET_KEY) {
    throw new Error('Manque BOXTAL_ACCESS_KEY / BOXTAL_SECRET_KEY');
  }
  const encoded = Buffer.from(`${BOXTAL_ACCESS_KEY}:${BOXTAL_SECRET_KEY}`, 'utf8').toString('base64');
  return {
    Authorization: `Basic ${encoded}`,
    Accept: 'application/xml',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
}

// Eurosender
const EUROSENDER_API_KEY = process.env.EUROSENDER_API_KEY;

// ✅ LOG AU CHARGEMENT DU MODULE
console.log('🔑 [auth.js] Chargement EUROSENDER_API_KEY:');
console.log('   - Définie:', !!EUROSENDER_API_KEY);
console.log('   - Type:', typeof EUROSENDER_API_KEY);
console.log('   - Longueur:', EUROSENDER_API_KEY?.length);
console.log('   - 10 premiers chars:', EUROSENDER_API_KEY?.substring(0, 10));
console.log('   - Contient guillemets?', EUROSENDER_API_KEY?.includes('"'));

function getEurosenderAuthHeader() {
  // ✅ LOG À CHAQUE APPEL
  console.log('🔑 [getEurosenderAuthHeader] Génération header:');
  console.log('   - Clé utilisée:', EUROSENDER_API_KEY?.substring(0, 10));
  
  if (!EUROSENDER_API_KEY) {
    throw new Error('Manque EUROSENDER_API_KEY');
  }
  
  const headers = {
    'x-api-key': EUROSENDER_API_KEY,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  
  // ✅ LOG DU HEADER GÉNÉRÉ
  console.log('   - Header x-api-key (10 premiers):', headers['x-api-key']?.substring(0, 10));
  
  return headers;
}

module.exports = { getBoxtalAuthHeader, getEurosenderAuthHeader };