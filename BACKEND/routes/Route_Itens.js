const express = require('express');
const router = express.Router();
const itensController = require('../controllers/itensController');

// Listar todos os itens
router.get('/', itensController.listar);

// Criar novo item
router.post('/', itensController.criar);

// Buscar item por ID
router.get('/:id', itensController.buscarPorId);

// Atualizar item
router.put('/:id', itensController.atualizar);

// Deletar item
router.delete('/:id', itensController.deletar);

module.exports = router;
