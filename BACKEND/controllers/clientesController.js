const db = require('../utills/db');

/**
 * Listar todos os clientes
 */
exports.listar = async (req, res) => {
  try {
    const clientes = await db.query('SELECT * FROM clientes ORDER BY NomeCliente');
    
    res.status(200).json({
      success: true,
      message: 'Clientes listados com sucesso',
      count: clientes.length,
      data: clientes
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar clientes',
      error: error.message
    });
  }
};

/**
 * Criar novo cliente
 */
exports.criar = async (req, res) => {
  try {
    const { nome, cpf, telefone, email, endereco } = req.body;

    // Validar dados obrigatórios
    if (!nome || !cpf) {
      return res.status(400).json({
        success: false,
        message: 'Dados incompletos. Envie: NomeCliente, cpf'
      });
    }

    // Verificar se CPF já possui um nome cadastrado
    const cpfExistente = await db.query(
      'SELECT ID_cliente FROM clientes WHERE cpf = ? AND NomeCliente = ?',
      [cpf, nome] // Verica se o CPF já está relacionado ao nome de um cliente
    );

    if (cpfExistente.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'CPF já cadastrado com nome de um usuário'
      });
    }

    // Inserir cliente
    const resultado = await db.execute(
      'INSERT INTO clientes (NomeCliente, CPF, NumeroTelefone, EnderecoEmail, Endereco) VALUES (?, ?, ?, ?, ?)',
      [nome, cpf, telefone || '', email || '', endereco || '']
    );

    res.status(201).json({
      success: true,
      message: 'Cliente criado com sucesso',
      data: {
        id: resultado.insertId,
        nome,
        cpf,
        telefone: telefone || '',
        email: email || '',
        endereco: endereco || ''
      }
    });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar cliente',
      error: error.message
    });
  }
};

/**
 * Buscar cliente por ID ou CPF
 */
exports.buscarPorIdOuCpf = async (req, res) => {
  try {
    const { id } = req.params;

    // Tentar buscar por ID primeiro
    if (!isNaN(id)) {
      const clientes = await db.query(
        'SELECT * FROM clientes WHERE ID_cliente = ?',
        [id]
      );

      if (clientes.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Cliente encontrado',
          data: clientes[0]
        });
      }
    }

    // Buscar por CPF
    const clientes = await db.query(
      'SELECT * FROM clientes WHERE CPF = ?',
      [id]
    );

    if (clientes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cliente encontrado',
      data: clientes[0]
    });
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar cliente',
      error: error.message
    });
  }
};

/**
 * Atualizar cliente por ID ou CPF
 */
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, telefone, email, endereco } = req.body;

    // Encontrar o cliente
    let cliente = null;

    if (!isNaN(id)) {
      const resultado = await db.query(
        'SELECT ID_cliente FROM clientes WHERE ID_cliente = ?',
        [id]
      );
      if (resultado.length > 0) {
        cliente = resultado[0];
      }
    }

    if (!cliente) {
      const resultado = await db.query(
        'SELECT ID_cliente FROM clientes WHERE CPF = ?',
        [id]
      );
      if (resultado.length > 0) {
        cliente = resultado[0];
      }
    }

    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    // Atualizar apenas os campos fornecidos
    const campos = [];
    const valores = [];

    if (nome !== undefined) {
      campos.push('NomeCliente = ?');
      valores.push(nome);
    }
    if (cpf !== undefined) {
      campos.push('CPF = ?');
      valores.push(cpf);
    }
    if (telefone !== undefined) {
      campos.push('NumeroTelefone = ?');
      valores.push(telefone);
    }
    if (email !== undefined) {
      campos.push('EnderecoEmail = ?');
      valores.push(email);
    }
    if (endereco !== undefined) {
      campos.push('Endereco = ?');
      valores.push(endereco);
    }

    if (campos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum campo para atualizar'
      });
    }

    valores.push(cliente.ID_cliente);

    await db.execute(
      `UPDATE clientes SET ${campos.join(', ')} WHERE ID_cliente = ?`,
      valores
    );

    res.status(200).json({
      success: true,
      message: 'Cliente atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar cliente',
      error: error.message
    });
  }
};

/**
 * Deletar cliente por ID ou CPF
 */
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    // Encontrar o cliente
    let cliente = null;

    if (!isNaN(id)) {
      const resultado = await db.query(
        'SELECT ID_cliente FROM clientes WHERE ID_cliente = ?',
        [id]
      );
      if (resultado.length > 0) {
        cliente = resultado[0];
      }
    }

    if (!cliente) {
      const resultado = await db.query(
        'SELECT ID_cliente FROM clientes WHERE CPF = ?',
        [id]
      );
      if (resultado.length > 0) {
        cliente = resultado[0];
      }
    }

    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente não encontrado'
      });
    }

    await db.execute(
      'DELETE FROM clientes WHERE ID_cliente = ?',
      [cliente.ID_cliente]
    );

    res.status(200).json({
      success: true,
      message: 'Cliente deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar cliente',
      error: error.message
    });
  }
};
