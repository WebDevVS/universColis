// services/geonamesService.js
const axios = require('axios');
const countries = require('i18n-iso-countries');

countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

function normalize(str) {
  return (str || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['’`´]/g, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().toLowerCase();
}

async function searchPostalCodes(query, countryCode = 'FR') {
  try {
    const response = await axios.get('http://api.geonames.org/postalCodeSearchJSON', {
      params: {
        placename: query,
        country: countryCode,
        maxRows: 100,
        username: process.env.GEONAMES_USER
      }
    });

    const normQuery = normalize(query);
    const tokens = normQuery.split(' ');
    const data = response.data?.postalCodes || [];

    const countryName = countries.getName(countryCode, 'fr') || countryCode;

    const filtered = data.filter(p => {
      const place = normalize(p.placeName);
      const postal = normalize(p.postalCode);
      return tokens.every(token => place.includes(token) || postal.includes(token));
    });

    if (filtered.length === 0 && /^[aeiouy]/.test(normQuery)) {
      const accentMap = { a: 'àâä', e: 'éèêë', i: 'îï', o: 'ôö', u: 'ùûü', y: 'ÿ' };
      const first = normQuery[0];
      if (accentMap[first]) {
        for (const accented of accentMap[first]) {
          const altQuery = accented + normQuery.slice(1);
          const altFiltered = data.filter(p => normalize(p.placeName).includes(altQuery));
          if (altFiltered.length) return altFiltered;
        }
      }
    }

    const unique = {};
    for (const p of filtered) {
      if (!unique[p.postalCode]) {
        unique[p.postalCode] = {
          name: p.placeName,
          region: p.adminName1 || '',
          postal: p.postalCode,
          country: countryName,
          isExact: normalize(p.placeName) === normQuery
        };
      }
    }

    return Object.values(unique).sort((a, b) => {
      if (a.isExact && !b.isExact) return -1;
      if (!a.isExact && b.isExact) return 1;
      return parseInt(a.postal) - parseInt(b.postal);
    });
  } catch (err) {
    console.error('Erreur GeoNames (axios) :', err.message);
    return [];
  }
}

module.exports = {
  searchPostalCodes
};
