const base64 = require('base-64'); // npm install base-64

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

// Eurosender (si token Bearer)
const EUROSENDER_API_KEY = process.env.EUROSENDER_API_KEY;

function getEurosenderAuthHeader() {
  if (!EUROSENDER_API_KEY) {
    throw new Error('Manque EUROSENDER_API_KEY');
  }
  return {
    'x-api-key': EUROSENDER_API_KEY,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
}

module.exports = { getBoxtalAuthHeader, getEurosenderAuthHeader };
