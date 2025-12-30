const db = require('../utills/db');

exports.listar = async (req, res) => {
  try {
    const pedidos = await db.query('SELECT * FROM pedidos');
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar pedidos' });
  }
};
