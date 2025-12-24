const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController');

router.post('/', formularioController.listar);

module.exports = router;
