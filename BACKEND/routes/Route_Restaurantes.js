const express = require('express');
const router = express.Router();
const restaurantesController = require('../controllers/restaurantesController');

router.get('/', restaurantesController.listar);

module.exports = router;
