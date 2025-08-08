const express = require('express');
const router = express.Router();
const autocompleteController = require('../controllers/autocompleteController');

router.get('/autocomplete', autocompleteController.handleAutocomplete);

module.exports = router;
