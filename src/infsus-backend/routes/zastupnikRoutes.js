const express = require('express');
const zastupnikController = require('../controllers/zastupnikController');
const router = express.Router();

router.get('/', zastupnikController.getAllZastupnici);
router.get('/:name', zastupnikController.getZastupnici);
router.get('/:id/edit', (req, res, next) => {
    console.log('Reached zastupnik route with ID:', req.params.id);
    next();
}, zastupnikController.getZastupnikById);
router.put('/:id/edit', zastupnikController.updateZastupnik);

module.exports = router;