const db = require('../utills/db');

/**
 * Listar todos os itens
 */
exports.listar = async (req, res) => {
  try {
    const itens = await db.query('SELECT * FROM itens ORDER BY NomeItem');
    
    res.status(200).json({
      success: true,
      message: 'Itens listados com sucesso',
      count: itens.length,
      data: itens
    });
  } catch (error) {
    console.error('Erro ao listar itens:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar itens',
      error: error.message
    });
  }
};

/**
 * Criar novo item
 */
exports.criar = async (req, res) => {
  try {
    const { nomeItem, tipoItem, preco, ingredientes } = req.body;

    // Validar dados obrigatórios
    if (!nomeItem || !tipoItem || preco === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Dados incompletos. Envie: nomeItem, tipoItem, preco'
      });
    }

    // Inserir item
    const resultado = await db.execute(
      'INSERT INTO itens (NomeItem, TipoItem, Preco, Ingredientes) VALUES (?, ?, ?, ?)',
      [nomeItem, tipoItem, preco, ingredientes || '']
    );

    res.status(201).json({
      success: true,
      message: 'Item criado com sucesso',
      data: {
        id: resultado.insertId,
        nomeItem,
        tipoItem,
        preco,
        ingredientes: ingredientes || ''
      }
    });
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar item',
      error: error.message
    });
  }
};

/**
 * Buscar item por ID
 */
exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID do item inválido'
      });
    }

    const itens = await db.query(
      'SELECT * FROM itens WHERE ID_item = ?',
      [id]
    );

    if (itens.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Item não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item encontrado',
      data: itens[0]
    });
  } catch (error) {
    console.error('Erro ao buscar item:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar item',
      error: error.message
    });
  }
};

/**
 * Atualizar item
 */
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeItem, tipoItem, preco, ingredientes } = req.body;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID do item inválido'
      });
    }

    // Verificar se item existe
    const itemExistente = await db.query(
      'SELECT ID_item FROM itens WHERE ID_item = ?',
      [id]
    );

    if (itemExistente.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Item não encontrado'
      });
    }

    // Atualizar apenas os campos fornecidos
    const campos = [];
    const valores = [];

    if (nomeItem !== undefined) {
      campos.push('NomeItem = ?');
      valores.push(nomeItem);
    }
    if (tipoItem !== undefined) {
      campos.push('TipoItem = ?');
      valores.push(tipoItem);
    }
    if (preco !== undefined) {
      campos.push('Preco = ?');
      valores.push(preco);
    }
    if (ingredientes !== undefined) {
      campos.push('Ingredientes = ?');
      valores.push(ingredientes);
    }

    if (campos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum campo para atualizar'
      });
    }

    valores.push(id);

    await db.execute(
      `UPDATE itens SET ${campos.join(', ')} WHERE ID_item = ?`,
      valores
    );

    res.status(200).json({
      success: true,
      message: 'Item atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar item',
      error: error.message
    });
  }
};

/**
 * Deletar item
 */
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID do item inválido'
      });
    }

    // Verificar se item existe
    const itemExistente = await db.query(
      'SELECT ID_item FROM itens WHERE ID_item = ?',
      [id]
    );

    if (itemExistente.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Item não encontrado'
      });
    }

    await db.execute(
      'DELETE FROM itens WHERE ID_item = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'Item deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar item',
      error: error.message
    });
  }
};
