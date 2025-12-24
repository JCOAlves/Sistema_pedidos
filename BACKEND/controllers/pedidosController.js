exports.listar = (req, res) => {
  res.json([
    { id: 1, cliente: 'Carlos', total: 45 },
    { id: 2, cliente: 'Ana', total: 30 }
  ]);
};

exports.buscarPorId = (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    cliente: 'Carlos',
    total: 45
  });
};

exports.criar = (req, res) => {
  res.status(201).json({
    message: 'Pedido criado com sucesso',
    dados: req.body
  });
};

exports.atualizar = (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Pedido ${id} atualizado`,
    dados: req.body
  });
};
