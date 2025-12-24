exports.listar = (req, res) => {
  res.json([
    { id: 1, nome: 'Restaurante Central' },
    { id: 2, nome: 'Cantina da Escola' }
  ]);
};
