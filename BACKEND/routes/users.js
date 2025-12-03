let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/bom', function(req, res, next) {
  res.send('Bem-vindo ao Express');
});

router.get('/sobre', function(req, res) {
  res.send("'Olá mundo'");
});

module.exports = router;
