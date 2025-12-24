const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.listar);
router.get('/:id', pedidosController.buscarPorId);
router.post('/', pedidosController.criar);
router.put('/:id', pedidosController.atualizar);

module.exports = router;
