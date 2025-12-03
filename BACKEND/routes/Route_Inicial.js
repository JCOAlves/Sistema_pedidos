const express = require("express");
const router = express.Router();
const { getInicial } = require("../controllers/InicialController");

router.get("/", getInicial);

module.exports = router;
