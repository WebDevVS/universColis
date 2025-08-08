const { searchPostalCodes } = require('../services/geonamesService');

exports.handleAutocomplete = async (req, res) => {
  const query = req.query.query;
  const country = req.query.country || 'FR';

  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Requête invalide' });
  }

  try {
    const results = await searchPostalCodes(query, country);
    res.json(results);
  } catch (err) {
    console.error('Erreur GeoNames :', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
};
