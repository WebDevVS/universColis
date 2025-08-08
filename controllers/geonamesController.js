const express = require('express');
const router = express.Router();
const { searchCity } = require('../services/geonamesService'); // ⬅️ importer la bonne fonction

// Route GET pour autocomplétion
router.get('/autocomplete', async (req, res) => {
  const { q, countryCode = 'FR' } = req.query;

  if (!q || q.length < 2 || q.length > 50) {
    return res.status(400).json({ error: 'Requête invalide.' });
  }
  if (!/^[a-zA-Z0-9\s\-']+$/.test(q)) {
    return res.status(400).json({ error: 'Caractères non autorisés.' });
  }

  try {
    const results = await searchCity(q, countryCode); // ⬅️ utiliser searchCity
    res.json(results);
  } catch (error) {
    console.error('Erreur dans /autocomplete :', error.message);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

module.exports = router;

