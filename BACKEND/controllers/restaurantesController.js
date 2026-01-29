const db = require('../utills/db');

exports.listar = async (req, res) => {
  try{
    const Restaurantes = await db.query('SELECT * FROM restaurantes');
    res.status(200).json({
      success: true,
      message: 'Dados do restaurante recuperados com sucesso.',
      data: Restaurantes[0]
    });
    
  } catch(error){
    console.error('Erro ao recuperar dados do restaurante:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao recuperar dados do restaurante.',
      error: error.message
    });
  }
};
