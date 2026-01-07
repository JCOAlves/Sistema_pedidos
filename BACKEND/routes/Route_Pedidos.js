const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.listar);
router.post('/', pedidosController.criar);

module.exports = router;
