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

// Loga o funcionário no sistema
router.post('/login', funcionariosController.login);

// Verifica se o funcionário está logado no sistema
router.get('/vericacaoLogin', funcionariosController.checkLogin);

// Desloga o funcionário do sistema
router.post('/logout', funcionariosController.logout);

module.exports = router;
