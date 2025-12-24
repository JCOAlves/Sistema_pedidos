exports.listar = (req, res) => {
  res.json([
    { id: 1, nome: 'Coca-Cola', categoria: 'Bebidas' },
    { id: 2, nome: 'Batata Frita', categoria: 'Lanches' }
  ]);
};
