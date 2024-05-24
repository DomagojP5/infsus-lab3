const express = require('express');
const politickaStrankaController = require('../controllers/politickaStrankaController');
const router = express.Router();

router.get('/all', politickaStrankaController.getAllPolitickeStranke);
router.get('/:name', politickaStrankaController.getPolitickaStranka);

module.exports = router;