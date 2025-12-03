const express = require("express");
const router = express.Router();

const {
  getPedidos,
  createPedido,
  updatePedido,
  deletePedido
} = require("../controllers/pedidosController");

router.get("/", getPedidos);
router.post("/", createPedido);
router.put("/:id", updatePedido);
router.delete("/:id", deletePedido);

module.exports = router;
