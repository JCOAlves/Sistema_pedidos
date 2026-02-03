const db = require('../utills/db');
 
exports.listar = async (req, res) => {
  try {
    const pagamentos = await db.query('SELECT * FROM pagamentos ORDER BY ID_pagamento DESC');

    res.status(200).json({
      success: true,
      message: 'Pagamentos listados com sucesso',
      count: pagamentos.length,
      data: pagamentos
    });
  } catch (error) {
    console.error('Erro ao listar pagamentos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar pagamentos',
      error: error.message
    });
  }
};
 
exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID do pagamento inválido' });
    }

    const pagamentos = await db.query('SELECT * FROM pagamentos WHERE ID_pagamento = ?', [id]);

    if (pagamentos.length === 0) {
      return res.status(404).json({ success: false, message: 'Pagamento não encontrado' });
    }

    res.status(200).json({ success: true, message: 'Pagamento encontrado', data: pagamentos[0] });
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar pagamento', error: error.message });
  }
};
 
exports.criar = async (req, res) => {
  try {
    const { pedido, valorPago, formaPagamento } = req.body;

    if (!pedido || isNaN(pedido) || valorPago === undefined || isNaN(valorPago)) {
      return res.status(400).json({ success: false, message: 'Dados incompletos. Envie pedido (id) e valorPago (número)' });
    }
 
    const pedidoExistente = await db.query('SELECT ID_pedido FROM pedidos WHERE ID_pedido = ?', [pedido]);
    if (pedidoExistente.length === 0) {
      return res.status(400).json({ success: false, message: `Pedido com ID ${pedido} não encontrado` });
    }
 
    const result = await db.execute(
      'INSERT INTO pagamentos (Pedido, ValorPago, FormaPagamento) VALUES (?, ?, ?)',
      [pedido, valorPago, formaPagamento || null]
    );

    const pagamentoId = result.insertId;
 
    try {
      await db.execute('UPDATE pedidos SET StatusPedido = ? WHERE ID_pedido = ?', ['Pago', pedido]);
    } catch (err) {
      console.warn('Falha ao atualizar status do pedido para Pago:', err.message);
    }

    res.status(201).json({ success: true, message: 'Pagamento criado com sucesso', data: { id: pagamentoId } });
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).json({ success: false, message: 'Erro ao criar pagamento', error: error.message });
  }
};
 
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { valorPago, formaPagamento } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID do pagamento inválido' });
    }

    const existente = await db.query('SELECT ID_pagamento FROM pagamentos WHERE ID_pagamento = ?', [id]);
    if (existente.length === 0) {
      return res.status(404).json({ success: false, message: 'Pagamento não encontrado' });
    }

    const campos = [];
    const valores = [];

    if (valorPago !== undefined) {
      if (isNaN(valorPago)) {
        return res.status(400).json({ success: false, message: 'valorPago deve ser número' });
      }
      campos.push('ValorPago = ?');
      valores.push(valorPago);
    }
    if (formaPagamento !== undefined) {
      campos.push('FormaPagamento = ?');
      valores.push(formaPagamento);
    }

    if (campos.length > 0) {
      valores.push(id);
      await db.execute(`UPDATE pagamentos SET ${campos.join(', ')} WHERE ID_pagamento = ?`, valores);
    }

    res.status(200).json({ success: true, message: 'Pagamento atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar pagamento', error: error.message });
  }
};
 
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID do pagamento inválido' });
    }

    const existente = await db.query('SELECT ID_pagamento FROM pagamentos WHERE ID_pagamento = ?', [id]);
    if (existente.length === 0) {
      return res.status(404).json({ success: false, message: 'Pagamento não encontrado' });
    }

    await db.execute('DELETE FROM pagamentos WHERE ID_pagamento = ?', [id]);

    res.status(200).json({ success: true, message: 'Pagamento deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar pagamento:', error);
    res.status(500).json({ success: false, message: 'Erro ao deletar pagamento', error: error.message });
  }
};
