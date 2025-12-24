const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionariosController');

router.get('/', funcionariosController.listar);

module.exports = router;
