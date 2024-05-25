const express = require('express');
const vrstaPolitickeStrankeController = require('../controllers/vrstaPolitickeStrankeController');
const router = express.Router();

router.get('/all', vrstaPolitickeStrankeController.getAllVrstePolitickeStranke);
router.get('/:id', vrstaPolitickeStrankeController.getImeVrstePolitickeStranke);

module.exports = router;