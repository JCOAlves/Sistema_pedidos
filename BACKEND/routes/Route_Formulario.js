const express = require("express");
const router = express.Router();
const { getFormularios, createFormulario } = require("../controllers/formularioController");

router.get("/", getFormularios);
router.post("/", createFormulario);

module.exports = router;
