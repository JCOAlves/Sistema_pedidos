const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionariosController');

// Listar todos os funcionários
router.get('/', funcionariosController.listar);

// Criar novo funcionário
router.post('/', funcionariosController.criar);

// Buscar funcionário por ID
router.get('/:id', funcionariosController.buscarPorId);

// Atualizar funcionário
router.put('/:id', funcionariosController.atualizar);

// Deletar funcionário
router.delete('/:id', funcionariosController.deletar);

module.exports = router;
