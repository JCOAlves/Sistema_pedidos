const express = require('express');
const router = express.Router();

router.use('/status', require('./Route_Status'));
router.use('/restaurantes', require('./Route_Restaurantes')); 
router.use('/itens', require('./Route_Itens'));
router.use('/clientes', require('./Route_Clientes'));
router.use('/pedidos', require('./Route_Pedidos'));
router.use('/funcionarios', require('./Route_Funcionarios'));
router.use('/menu', require('./Route_Menu'));
router.use('/formulario', require('./Route_Formulario'));

module.exports = router;
