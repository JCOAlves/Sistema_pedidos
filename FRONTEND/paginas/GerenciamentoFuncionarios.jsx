import { useState, useEffect } from "react";
import { GET, POST, PUT, DELETE } from "../MetodosHTTP";
import BarraNavegacao from "../componentes/Navegacao";

export default function GerenciamentoFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [mostraFormulario, setMostraFormulario] = useState(false);
  const [editando, setEditando] = useState(null);

  // Form states
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  // Carregar funcionários ao montar componente
  useEffect(() => {
    carregarFuncionarios();
  }, []);

  async function carregarFuncionarios() {
    try {
      setCarregando(true);
      const dados = await GET('/funcionarios');
      
      if (dados.success && Array.isArray(dados.data)) {
        setFuncionarios(dados.data);
      } else if (Array.isArray(dados)) {
        setFuncionarios(dados);
      }
    } catch (erro) {
      exibirMensagem("Erro ao carregar funcionários", "erro");
    } finally {
      setCarregando(false);
    }
  }

  function exibirMensagem(msg, tipo) {
    setMensagem(msg);
    setTipoMensagem(tipo);
    setTimeout(() => setMensagem(""), 3000);
  }

  function abrirFormulario() {
    setMostraFormulario(true);
    setEditando(null);
    limparFormulario();
  }

  function fecharFormulario() {
    setMostraFormulario(false);
    setEditando(null);
    limparFormulario();
  }

  function limparFormulario() {
    setNome("");
    setCargo("");
    setTelefone("");
    setEmail("");
    setCpf("");
  }

  function editarFuncionario(func) {
    setEditando(func.ID_funcionario);
    setNome(func.Nome);
    setCargo(func.Cargo);
    setTelefone(func.Telefone);
    setEmail(func.Email);
    setCpf(func.CPF);
    setMostraFormulario(true);
  }

  async function salvarFuncionario(e) {
    e.preventDefault();

    if (!nome || !cargo) {
      exibirMensagem("Nome e Cargo são obrigatórios", "erro");
      return;
    }

    try {
      let resposta;

      if (editando) {
        resposta = await PUT(`/funcionarios/${editando}`, {
          nome,
          cargo,
          telefone,
          email,
          cpf
        });
      } else {
        resposta = await POST('/funcionarios', {
          nome,
          cargo,
          telefone,
          email,
          cpf
        });
      }

      if (resposta.success) {
        exibirMensagem(
          editando ? "Funcionário atualizado com sucesso" : "Funcionário criado com sucesso",
          "sucesso"
        );
        fecharFormulario();
        carregarFuncionarios();
      } else {
        exibirMensagem(resposta.message || "Erro ao salvar funcionário", "erro");
      }
    } catch (erro) {
      exibirMensagem("Erro ao salvar funcionário", "erro");
    }
  }

  async function deletarFuncionario(id) {
    if (!window.confirm("Tem certeza que deseja deletar este funcionário?")) {
      return;
    }

    try {
      const resposta = await DELETE(`/funcionarios/${id}`);

      if (resposta.success) {
        exibirMensagem("Funcionário deletado com sucesso", "sucesso");
        carregarFuncionarios();
      } else {
        exibirMensagem(resposta.message || "Erro ao deletar funcionário", "erro");
      }
    } catch (erro) {
      exibirMensagem("Erro ao deletar funcionário", "erro");
    }
  }

  return (
    <>
      <BarraNavegacao>Gerenciamento de Funcionários</BarraNavegacao>
      <div className="min-h-screen bg-dark p-6 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gold">Gerenciamento de Funcionários</h1>
            <button
              onClick={abrirFormulario}
              className="bg-gold text-dark px-6 py-3 rounded font-bold hover:bg-yellow-400 transition"
            >
              + Novo Funcionário
            </button>
          </div>

          {/* Mensagens */}
          {mensagem && (
            <div
              className={`p-4 rounded mb-6 ${
                tipoMensagem === "sucesso"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {mensagem}
            </div>
          )}

          {/* Formulário Modal */}
          {mostraFormulario && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-dark border border-gold p-8 rounded max-w-md w-full max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-bold text-gold mb-6">
                  {editando ? "Editar Funcionário" : "Novo Funcionário"}
                </h2>

                <form onSubmit={salvarFuncionario} className="space-y-4">
                  <div>
                    <label className="block text-gold mb-2 font-bold">Nome <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Maria Silva"
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gold mb-2 font-bold">Cargo <span className="text-red-500">*</span></label>
                    <select
                      value={cargo}
                      onChange={(e) => setCargo(e.target.value)}
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    >
                      <option value="">Selecione um cargo</option>
                      <option value="Gerente">Gerente</option>
                      <option value="Chef">Chef</option>
                      <option value="Cozinheiro">Cozinheiro</option>
                      <option value="Atendente">Atendente</option>
                      <option value="Entregador">Entregador</option>
                      <option value="Gerente de Cozinha">Gerente de Cozinha</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gold mb-2 font-bold">Telefone</label>
                    <input
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="Ex: (11) 99999-9999"
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gold mb-2 font-bold">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: maria@restaurant.com"
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gold mb-2 font-bold">CPF</label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      placeholder="Ex: 123.456.789-00"
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-gold text-dark py-3 rounded font-bold hover:bg-yellow-400 transition"
                    >
                      {editando ? "Atualizar" : "Criar"}
                    </button>
                    <button
                      type="button"
                      onClick={fecharFormulario}
                      className="flex-1 bg-darker border border-gold text-gold py-3 rounded font-bold hover:bg-dark transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tabela de Funcionários */}
          {carregando ? (
            <div className="text-center text-gray-400 py-12">
              <p>Carregando funcionários...</p>
            </div>
          ) : funcionarios.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>Nenhum funcionário cadastrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-gold/30 rounded">
              <table className="w-full">
                <thead>
                  <tr className="bg-dark border-b border-gold/30">
                    <th className="text-left p-4 text-gold font-bold">ID</th>
                    <th className="text-left p-4 text-gold font-bold">Nome</th>
                    <th className="text-left p-4 text-gold font-bold">Cargo</th>
                    <th className="text-left p-4 text-gold font-bold">Telefone</th>
                    <th className="text-left p-4 text-gold font-bold">Email</th>
                    <th className="text-left p-4 text-gold font-bold">CPF</th>
                    <th className="text-center p-4 text-gold font-bold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionarios.map((func) => (
                    <tr key={func.ID_funcionario} className="border-b border-gold/10 hover:bg-darker/50 transition">
                      <td className="p-4 text-gold font-bold">{func.ID_funcionario}</td>
                      <td className="p-4 text-white">{func.Nome}</td>
                      <td className="p-4 text-gray-300">{func.Cargo}</td>
                      <td className="p-4 text-gray-300">{func.Telefone || "-"}</td>
                      <td className="p-4 text-gray-300 text-sm truncate">{func.Email || "-"}</td>
                      <td className="p-4 text-gray-300">{func.CPF || "-"}</td>
                      <td className="p-4 text-center space-x-2">
                        <button
                          onClick={() => editarFuncionario(func)}
                          className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-bold hover:bg-blue-700 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deletarFuncionario(func.ID_funcionario)}
                          className="bg-red-600 text-white px-3 py-2 rounded text-sm font-bold hover:bg-red-700 transition"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
