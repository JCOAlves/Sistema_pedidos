const db = require('../utills/db');

/**
 * Listar todos os funcionários
 */
exports.listar = async (req, res) => {
  try {
    const funcionarios = await db.query('SELECT * FROM funcionarios ORDER BY NomeFuncionario');
    
    res.status(200).json({
      success: true,
      message: 'Funcionários listados com sucesso',
      count: funcionarios.length,
      data: funcionarios
    });
  } catch (error) {
    console.error('Erro ao listar funcionários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar funcionários',
      error: error.message
    });
  }
};

/**
 * Criar novo funcionário
 */
exports.criar = async (req, res) => {
  try {
    const { nome, cargo, telefone, email, cpf } = req.body;

    // Validar dados obrigatórios
    if (!nome || !cargo) {
      return res.status(400).json({
        success: false,
        message: 'Dados incompletos. Envie: nome, cargo'
      });
    }

    // Inserir funcionário
    const resultado = await db.execute(
      'INSERT INTO funcionarios (NomeFuncionario, Cargo, Telefone, EmailFuncionario, CPF) VALUES (?, ?, ?, ?, ?)',
      [nome, cargo, telefone || '', email || '', cpf || '']
    );

    res.status(201).json({
      success: true,
      message: 'Funcionário criado com sucesso',
      data: {
        id: resultado.insertId,
        nome,
        cargo,
        telefone: telefone || '',
        email: email || '',
        cpf: cpf || ''
      }
    });
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar funcionário',
      error: error.message
    });
  }
};

/**
 * Buscar funcionário por ID
 */
exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID do funcionário inválido'
      });
    }

    const funcionarios = await db.query(
      'SELECT * FROM funcionarios WHERE ID_funcionario = ?',
      [id]
    );

    if (funcionarios.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Funcionário não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Funcionário encontrado',
      data: funcionarios[0]
    });
  } catch (error) {
    console.error('Erro ao buscar funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar funcionário',
      error: error.message
    });
  }
};

/**
 * Atualizar funcionário
 */
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cargo, telefone, email, cpf } = req.body;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID do funcionário inválido'
      });
    }

    // Verificar se funcionário existe
    const funcExistente = await db.query(
      'SELECT ID_funcionario FROM funcionarios WHERE ID_funcionario = ?',
      [id]
    );

    if (funcExistente.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Funcionário não encontrado'
      });
    }

    // Atualizar apenas os campos fornecidos
    const campos = [];
    const valores = [];

    if (nome !== undefined) {
      campos.push('NomeFuncionario = ?');
      valores.push(nome);
    }
    if (cargo !== undefined) {
      campos.push('Cargo = ?');
      valores.push(cargo);
    }
    if (telefone !== undefined) {
      campos.push('Telefone = ?');
      valores.push(telefone);
    }
    if (email !== undefined) {
      campos.push('EmailFuncionario = ?');
      valores.push(email);
    }
    if (cpf !== undefined) {
      campos.push('CPF = ?');
      valores.push(cpf);
    }

    if (campos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum campo para atualizar'
      });
    }

    valores.push(id);

    await db.execute(
      `UPDATE funcionarios SET ${campos.join(', ')} WHERE ID_funcionario = ?`,
      valores
    );

    res.status(200).json({
      success: true,
      message: 'Funcionário atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar funcionário',
      error: error.message
    });
  }
};

/**
 * Deletar funcionário
 */
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID do funcionário inválido'
      });
    }

    // Verificar se funcionário existe
    const funcExistente = await db.query(
      'SELECT ID_funcionario FROM funcionarios WHERE ID_funcionario = ?',
      [id]
    );

    if (funcExistente.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Funcionário não encontrado'
      });
    }

    await db.execute(
      'DELETE FROM funcionarios WHERE ID_funcionario = ?',
      [id]
    );

    res.status(200).json({
      success: true,
      message: 'Funcionário deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar funcionário',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  const { emailFuncionario, senhaFuncionario } = req.body;

  try {
    const buscaFuncionario = await db.query(
      "SELECT * FROM funcionarios WHERE EmailFuncionario = ? AND SenhaSistema_funcionario = ?", 
      [emailFuncionario, senhaFuncionario]
    )

    if(buscaFuncionario.length === 0){
      console.log("Login invalido. Email ou senha incorretos.")
      return res.status(404).json({
        success: true,
        login: false,
        message: 'Login invalido. Email ou senha incorretos.'
      });

    } else{
      const [usuario] = buscaFuncionario;
      const {NomeFuncionario, EmailFuncionario, CargoFuncionario} = usuario;

      req.session.NomeFuncionario = NomeFuncionario;
      req.session.EmailFuncionario = EmailFuncionario;
      req.session.CargoFuncionario = CargoFuncionario;

      console.log("Sessão do funcionario inicializada.");
      return res.status(200).json({
        success: true,
        login: true,
        message: 'Login validado. Funcionario logado no sistema.',
        data: usuario
      });
    }

  } catch (error){
    console.error('Erro no login de funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no login de funcionário',
      error: error.message
    });
  }
}

exports.checkLogin = async (req, res) => {
  try{
    if(req.session.NomeFuncionario && req.session.EmailFuncionario && req.session.CargoFuncionario){
      return res.status(200).json({
        success: true,
        funcionarioLogado: true,
        message: 'O funcionario está logado no sistema.'
      });

    } else{
      return res.status(404).json({
        success: false,
        funcionarioLogado: false,
        message: 'Não há funcionario logado no sistema'
      });
    }

  } catch (error){
    console.error('Erro na verificação de login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro na verificação de login',
      error: error.message
    });
  }
}

exports.logout = async (req, res) => {
  const { executarLogout=true } = req.body;

  try{
    if(executarLogout){
      req.session.destroy((err) => {
        if (err){
          console.error("Erro no logout do funcionário:", err);
          return res.status(500).json({
            success: false,
            message: 'Erro no logout do funcionário',
            error: err.message
          })
        }
        res.clearCookie('sistemaRestaurante'); // Limpa o cookie da sessão
  
        return res.status(200).json({
            success: true,
            logout: true,
            message: 'O funcionário está deslogado do sistema.'
          });
      });
      
    } else{
      return res.status(400).json({ 
        success: false, 
        message: 'Logout não solicitado.' 
      });
    }

  } catch (error){
    console.error("Erro no logout do funcionário:", error);
    return res.status(500).json({
      success: false,
      message: 'Erro no logout do funcionário',
      error: error.message
    })
  }
}