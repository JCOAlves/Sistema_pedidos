let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/index/:nome/:sobrenome', function(req, res, next) {
  res.render('index', { title: req.params.nome+" "+req.params.sobrenome });
});

/*
router.get('/notas', function(req, res){
  let nota1 = Number(req.query.nota1);
  let nota2 = Number(req.query.nota2);
  let nota3 = Number(req.query.nota3);
  const media = ((nota1+nota2+nota3)/3).toFixed(0);
  const mensagem = media >= 60 ? `Sua média é ${media}.\nParabens! Você foi aprovado!` : `Sua média é ${media}.\nInfelizmente você foi reprovado.`;
  res.send(mensagem);
});

  */

module.exports = router;
