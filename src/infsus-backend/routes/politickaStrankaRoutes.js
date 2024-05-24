const express = require('express');
const politickaStrankaController = require('../controllers/politickaStrankaController');
const router = express.Router();

router.get('/', politickaStrankaController.getAllPolitickeStranke);

module.exports = router;