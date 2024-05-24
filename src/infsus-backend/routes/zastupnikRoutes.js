const express = require('express');
const zastupnikController = require('../controllers/zastupnikController');
const router = express.Router();

router.get('/', zastupnikController.getAllZastupnici);
module.exports = router;