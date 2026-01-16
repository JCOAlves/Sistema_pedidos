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
