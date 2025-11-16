let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sobre', function(req, res, next) {
  res.send('Olá mundo');
});

module.exports = router;
