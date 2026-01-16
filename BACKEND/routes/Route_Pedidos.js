const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Listar todos os pedidos
router.get('/', pedidosController.listar);

// Buscar pedido por ID (deve estar ANTES de rotas com outros parâmetros)
router.get('/:id', pedidosController.buscarPorId);

// Criar novo pedido
router.post('/', pedidosController.criar);

module.exports = router;
