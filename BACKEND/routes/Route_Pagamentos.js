const express = require('express');
const router = express.Router();
const pagamentosController = require('../controllers/pagamentosController');
 
router.post('/', pagamentosController.criar);
 
router.delete('/:id', pagamentosController.deletar);

module.exports = router;
