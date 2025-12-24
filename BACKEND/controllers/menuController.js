exports.listar = (req, res) => {
  res.json([
    'Início',
    'Cardápio',
    'Pedidos',
    'Clientes'
  ]);
};
