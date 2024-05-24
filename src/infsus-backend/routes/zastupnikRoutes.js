const express = require('express');
const zastupnikController = require('../controllers/zastupnikController');
const router = express.Router();

router.get('/', zastupnikController.getAllZastupnici);
router.get('/:name', zastupnikController.getZastupnici);
module.exports = router;