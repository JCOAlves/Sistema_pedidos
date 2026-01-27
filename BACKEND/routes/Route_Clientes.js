const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Listar todos os clientes
router.get('/', clientesController.listar);

// Criar novo cliente
router.post('/', clientesController.criar);

// Buscar cliente por ID ou CPF (deve estar DEPOIS de POST)
router.get('/:id', clientesController.buscarPorIdOuCpf);

// Atualizar cliente por ID ou CPF
router.put('/:id', clientesController.atualizar);

// Deletar cliente por ID ou CPF
router.delete('/:id', clientesController.deletar);

module.exports = router;
