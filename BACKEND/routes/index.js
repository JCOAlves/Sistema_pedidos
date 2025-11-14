let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'mundo' });
});

router.get('/dados', function(req, res){
  let msg = {"mundo":"ola"};
  res.send(msg);
});

module.exports = router;
