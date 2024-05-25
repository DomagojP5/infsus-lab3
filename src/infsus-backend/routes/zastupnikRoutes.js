const express = require('express');
const zastupnikController = require('../controllers/zastupnikController');
const router = express.Router();

router.get('/', zastupnikController.getAllZastupnici);
router.get('/:name', zastupnikController.getZastupnici);
router.get('/:id/edit', zastupnikController.getZastupnikById);
router.put('/:id/edit', zastupnikController.updateZastupnik);
router.post('/add/:stranka', zastupnikController.createZastupnik)
router.delete('/delete/:imezastupnika/:imepolitickestranke', zastupnikController.deleteZastupnik);

module.exports = router;