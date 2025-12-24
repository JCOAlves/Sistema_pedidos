exports.listar = (req, res) => {
  res.json([
    { id: 1, nome: 'Carlos', cpf: '123.456.789-00' },
    { id: 2, nome: 'Ana', cpf: '987.654.321-00' }
  ]);
};
