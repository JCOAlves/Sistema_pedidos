let formularios = [
  { id: 1, nome: "Formulário 1" },
  { id: 2, nome: "Formulário 2" }
];

exports.getFormularios = (req, res) => {
  res.json(formularios);
};

exports.createFormulario = (req, res) => {
  const novo = {
    id: Date.now(),
    nome: req.body.nome
  };
  formularios.push(novo);
  res.json({ msg: "Formulário criado", novo });
};
