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

exports.criar = async (req, res) => {
  try {
    const { praViagem, observacoes } = req.body;
 
    if (praViagem === undefined || observacoes === undefined) {
      return res.status(400).json({ erro: 'Dados incompletos' });
    }

    const result = await db.execute(
      `INSERT INTO pedidos (PraViagem, Observacoes)
       VALUES (?, ?)`,
      [praViagem ? 1 : 0, observacoes]
    );

    res.status(201).json({
      mensagem: 'Pedido criado com sucesso',
      id: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar pedido' });
  }
};
