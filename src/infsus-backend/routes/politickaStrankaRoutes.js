const express = require('express');
const politickaStrankaController = require('../controllers/politickaStrankaController');
const router = express.Router();

router.get('/all', politickaStrankaController.getAllPolitickeStranke);
router.put('/create/:imepolitickestranke/:kratkiopisstranke/:oznakavrstepolitickestranke', politickaStrankaController.putPolitickaStranka);
router.delete('/delete/:imepolitickestranke', politickaStrankaController.deletePolitickaStranka);
router.get('/:name', politickaStrankaController.getPolitickaStranka);
router.put('/:name',politickaStrankaController.updatePolitickaStranka);

module.exports = router;