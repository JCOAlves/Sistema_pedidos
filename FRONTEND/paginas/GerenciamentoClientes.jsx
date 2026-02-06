import { useState, useEffect } from "react";
import { GET, POST, PUT, DELETE } from "../MetodosHTTP.js";


export default function GerenciamentoClientes() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [mostraFormulario, setMostraFormulario] = useState(false);
  const [editando, setEditando] = useState(null);
  const [buscaId, setBuscaId] = useState("");

  // Form states
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  // Carregar clientes ao montar componente
  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    try {
      setCarregando(true);
      const dados = await GET('/clientes');
      
      if (dados.success && Array.isArray(dados.data)) {
        setClientes(dados.data);
      } else if (Array.isArray(dados)) {
        setClientes(dados);
      }
    } catch (error) {
      exibirMensagem("Erro ao carregar clientes", "erro");
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
    setCpf("");
    setTelefone("");
    setEmail("");
  }

  function editarCliente(cliente) {
    setEditando(cliente.ID_cliente);
    setNome(cliente.NomeCliente);
    setCpf(cliente.cpf);
    setTelefone(cliente.NumeroTelefone);
    setEmail(cliente.EnderecoEmail);
    setMostraFormulario(true);
  }

  async function salvarCliente(e) {
    e.preventDefault();

    if (!nome || !cpf) {
      exibirMensagem("Nome e CPF são obrigatórios", "erro");
      return;
    }

    try {
      let resposta;

      if (editando) {
        resposta = await PUT(`/clientes/${editando}`, {
          nome,
          cpf,
          telefone,
          email
        });
      } else {
        resposta = await POST('/clientes', {
          nome,
          cpf,
          telefone,
          email
        });
      }

      if (resposta.success) {
        exibirMensagem(
          editando ? "Cliente atualizado com sucesso" : "Cliente criado com sucesso",
          "sucesso"
        );
        fecharFormulario();
        carregarClientes();
      } else {
        exibirMensagem(resposta.message || "Erro ao salvar cliente", "erro");
      }
    } catch (error) {
      exibirMensagem("Erro ao salvar cliente", "erro");
    }
  }

  async function deletarCliente(id) {
    if (!window.confirm("Tem certeza que deseja deletar este cliente?")) {
      return;
    }

    try {
      const resposta = await DELETE(`/clientes/${id}`);

      if (resposta.success) {
        exibirMensagem("Cliente deletado com sucesso", "sucesso");
        carregarClientes();
      } else {
        exibirMensagem(resposta.message || "Erro ao deletar cliente", "erro");
      }
    } catch (error) {
      exibirMensagem("Erro ao deletar cliente", "erro");
    }
  }

  async function buscarClientePorId() {
    if (!buscaId) {
      carregarClientes();
      return;
    }

    try {
      setCarregando(true);
      const dados = await GET(`/clientes/${buscaId}`);
      
      if (dados.success) {
        setClientes([dados.data]);
        exibirMensagem("Cliente encontrado", "sucesso");
      } else {
        exibirMensagem(dados.message || "Cliente não encontrado", "erro");
        setClientes([]);
      }
    } catch (error) {
      exibirMensagem("Erro ao buscar cliente", "erro");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-dark p-6 mt-20">
        <div className="max-w-6xl mx-auto mt-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gold">Gerenciamento de Clientes</h1>
            <button
              onClick={abrirFormulario}
              className="bg-gold text-dark px-6 py-3 rounded font-bold hover:bg-yellow-400 transition"
            >
              + Novo Cliente
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

          {/* Busca */}
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              placeholder="Buscar por ID ou CPF..."
              value={buscaId}
              onChange={(e) => setBuscaId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && buscarClientePorId()}
              className="flex-1 bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
            />
            <button
              onClick={buscarClientePorId}
              className="bg-gold text-dark px-6 py-3 rounded font-bold hover:bg-yellow-400 transition"
            >
              Buscar
            </button>
            {buscaId && (
              <button
                onClick={() => {
                  setBuscaId("");
                  carregarClientes();
                }}
                className="bg-darker border border-gold text-gold px-6 py-3 rounded font-bold hover:bg-dark transition"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Formulário Modal */}
          {mostraFormulario && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-dark border border-gold p-8 rounded max-w-md w-full max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-bold text-gold mb-6">
                  {editando ? "Editar Cliente" : "Novo Cliente"}
                </h2>

                <form onSubmit={salvarCliente} className="space-y-4">
                  <div>
                    <label className="block text-gold mb-2 font-bold">Nome <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gold mb-2 font-bold">CPF <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      placeholder="Ex: 123.456.789-00"
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    />
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
                    <label className="block text-gold mb-2 font-bold">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: joao@email.com"
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

          {/* Tabela de Clientes */}
          {carregando ? (
            <div className="text-center text-gray-400 py-12">
              <p>Carregando clientes...</p>
            </div>
          ) : clientes.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>Nenhum cliente encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-gold/30 rounded">
              <table className="w-full">
                <thead>
                  <tr className="bg-dark border-b border-gold/30">
                    <th className="text-left p-4 text-gold font-bold">ID</th>
                    <th className="text-left p-4 text-gold font-bold">Nome</th>
                    <th className="text-left p-4 text-gold font-bold">CPF</th>
                    <th className="text-left p-4 text-gold font-bold">Telefone</th>
                    <th className="text-left p-4 text-gold font-bold">Email</th>
                    <th className="text-center p-4 text-gold font-bold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.ID_cliente} className="border-b border-gold/10 hover:bg-darker/50 transition">
                      <td className="p-4 text-gold font-bold">{cliente.ID_cliente}</td>
                      <td className="p-4 text-white">{cliente.NomeCliente}</td>
                      <td className="p-4 text-gray-300">{cliente.cpf}</td>
                      <td className="p-4 text-gray-300">{cliente.NumeroTelefone || "-"}</td>
                      <td className="p-4 text-gray-300 text-sm truncate">{cliente.EnderecoEmail || "-"}</td>
                      <td className="px-4 py-2 text-center flex gap-2 flex-wrap justify-center items-center">
                        <button
                          onClick={() => editarCliente(cliente)}
                          className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-bold hover:bg-blue-700 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deletarCliente(cliente.ID_cliente)}
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
