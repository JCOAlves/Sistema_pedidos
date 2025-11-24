const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Rota de menu funcionando" });
});

module.exports = router;
