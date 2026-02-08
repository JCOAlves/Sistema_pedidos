const express = require('express');
const router = express.Router();
const pagamentosController = require('../controllers/pagamentosController');

router.get('/', pagamentosController.listar);

router.post('/', pagamentosController.criar);

router.put('/:id', pagamentosController.atualizar);
 
router.delete('/:id', pagamentosController.deletar);

module.exports = router;
