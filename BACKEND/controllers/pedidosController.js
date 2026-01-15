const db = require('../utills/db');

/**
 * Listar todos os pedidos
 */
exports.listar = async (req, res) => {
  try {
    const pedidos = await db.query('SELECT * FROM pedidos ORDER BY ID_pedido DESC');
    
    res.status(200).json({
      success: true,
      message: 'Pedidos listados com sucesso',
      count: pedidos.length,
      data: pedidos
    });
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar pedidos',
      error: error.message
    });
  }
};

/**
 * Buscar pedido por ID com seus itens
 */
exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID do pedido inválido'
      });
    }

    // Buscar pedido
    const pedidos = await db.query(
      'SELECT * FROM pedidos WHERE ID_pedido = ?',
      [id]
    );

    if (pedidos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    const pedido = pedidos[0];

    // Buscar itens do pedido com JOIN
    const itens = await db.query(`
      SELECT 
        pi.ID_relacionamento,
        pi.Item,
        pi.Quantidade,
        i.NomeItem,
        i.TipoItem,
        i.Preco,
        i.Ingredientes
      FROM pedido_item pi
      INNER JOIN itens i ON pi.Item = i.ID_item
      WHERE pi.Pedido = ?
    `, [id]);

    res.status(200).json({
      success: true,
      message: 'Pedido encontrado',
      data: {
        ...pedido,
        itens: itens
      }
    });

  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedido',
      error: error.message
    });
  }
};

/**
 * Criar novo pedido com itens
 * Espera formato:
 * {
 *   "praViagem": true,
 *   "observacoes": "sem cebola",
 *   "itens": [
 *     { "id_item": 1, "quantidade": 2 },
 *     { "id_item": 3, "quantidade": 1 }
 *   ]
 * }
 */
exports.criar = async (req, res) => {
  try {
    const { praViagem, observacoes, itens } = req.body;

    // Validar dados obrigatórios
    if (praViagem === undefined || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Dados incompletos. Envie praViagem (boolean) e itens (array com id_item e quantidade)'
      });
    }

    // Validar formato dos itens
    for (const item of itens) {
      if (!item.id_item || !item.quantidade || item.quantidade <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Cada item deve ter id_item (número) e quantidade (número > 0)'
        });
      }
    }

    // Validar se todos os itens existem antes de inserir
    for (const item of itens) {
      const validarItem = await db.query(
        'SELECT ID_item FROM itens WHERE ID_item = ?',
        [item.id_item]
      );

      if (validarItem.length === 0) {
        return res.status(400).json({
          success: false,
          message: `Item com ID ${item.id_item} não encontrado`
        });
      }
    }

    // 1. Inserir pedido na tabela pedidos
    const pedidoResult = await db.execute(
      'INSERT INTO pedidos (PraViagem, Observacoes) VALUES (?, ?)',
      [praViagem ? 1 : 0, observacoes || '']
    );

    const pedidoId = pedidoResult.insertId;

    // 2. Inserir itens relacionados na tabela pedido_item
    for (const item of itens) {
      await db.execute(
        'INSERT INTO pedido_item (Item, Pedido, Quantidade) VALUES (?, ?, ?)',
        [item.id_item, pedidoId, item.quantidade]
      );
    }

    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: {
        id: pedidoId,
        praViagem,
        observacoes: observacoes || '',
        totalItens: itens.length
      }
    });

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar pedido',
      error: error.message
    });
  }
};
