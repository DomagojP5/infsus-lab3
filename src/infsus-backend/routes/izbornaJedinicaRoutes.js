const express = require('express');
const izbornaJedinicaController = require('../controllers/izbornaJedinicaController');
const router = express.Router();

router.get('/', izbornaJedinicaController.getAllIzborneJedinice);

module.exports = router;