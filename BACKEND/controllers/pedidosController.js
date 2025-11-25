let pedidos = [];

exports.getPedidos = (req, res) => {
  res.json(pedidos);
};

exports.createPedido = (req, res) => {
  const novo = {
    id: Date.now(),
    item: req.body.item,
    quantidade: req.body.quantidade
  };

  pedidos.push(novo);
  res.status(201).json({ msg: "Pedido criado", novo });
};

exports.updatePedido = (req, res) => {
  const id = Number(req.params.id);
  const pedido = pedidos.find(p => p.id === id);

  if (!pedido) {
    return res.status(404).json({ error: "Pedido não encontrado" });
  }

  pedido.item = req.body.item ?? pedido.item;
  pedido.quantidade = req.body.quantidade ?? pedido.quantidade;

  res.json({ msg: "Pedido atualizado", pedido });
};

exports.deletePedido = (req, res) => {
  const id = Number(req.params.id);
  const before = pedidos.length;
  pedidos = pedidos.filter(p => p.id !== id);
  const removed = before !== pedidos.length;

  if (!removed) return res.status(404).json({ error: "Pedido não encontrado" });
  return res.json({ msg: "Pedido removido" });
};
