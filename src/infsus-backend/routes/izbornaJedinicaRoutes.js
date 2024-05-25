const express = require('express');
const izbornaJedinicaController = require('../controllers/izbornaJedinicaController');
const router = express.Router();

router.get('/all', izbornaJedinicaController.getAllIzborneJedinice);
router.put('/create/:rednibrojizbjed/:opis/:brojbiraca', izbornaJedinicaController.putIzbornaJedinica);
router.delete('/delete/:rednibrojizbjed', izbornaJedinicaController.deleteIzbornaJedinica);

module.exports = router;