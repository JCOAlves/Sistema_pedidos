const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Listar todos os pedidos
router.get('/', pedidosController.listar);

// Criar novo pedido
router.post('/', pedidosController.criar);

// Buscar pedido por ID (deve estar DEPOIS de rotas com POST)
router.get('/:id', pedidosController.buscarPorId);

// Atualizar pedido
router.put('/:id', pedidosController.atualizar);

// Deletar pedido
router.delete('/:id', pedidosController.deletar);

module.exports = router;
