import { useState, useEffect } from "react";
import { GET, POST, PUT, DELETE } from "../MetodosHTTP.js";
import BarraNavegacao from "../componentes/Navegacao.jsx";
import Logout from "../componentes/Logout.jsx";

export default function GerenciamentoItens() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [mostraFormulario, setMostraFormulario] = useState(false);
  const [editando, setEditando] = useState(null);

  // Form states
  const [nomeItem, setNomeItem] = useState("");
  const [tipoItem, setTipoItem] = useState("");
  const [preco, setPreco] = useState("");
  const [ingredientes, setIngredientes] = useState("");

  // Carregar itens ao montar componente
  useEffect(() => {
    carregarItens();
  }, []);

  async function carregarItens() {
    try {
      setCarregando(true);
      const dados = await GET('/itens');
      
      if (dados.success && Array.isArray(dados.data)) {
        setItens(dados.data);
      } else if (Array.isArray(dados)) {
        setItens(dados);
      }
    } catch (erro) {
      exibirMensagem("Erro ao carregar itens", "erro");
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
    setNomeItem("");
    setTipoItem("");
    setPreco("");
    setIngredientes("");
  }

  function editarItem(item) {
    setEditando(item.ID_item);
    setNomeItem(item.NomeItem);
    setTipoItem(item.TipoItem);
    setPreco(item.Preco);
    setIngredientes(item.Ingredientes);
    setMostraFormulario(true);
  }

  async function salvarItem(e) {
    e.preventDefault();

    if (!nomeItem || !tipoItem || !preco) {
      exibirMensagem("Preencha todos os campos obrigatórios", "erro");
      return;
    }

    try {
      let resposta;

      if (editando) {
        resposta = await PUT(`/itens/${editando}`, {
          nomeItem,
          tipoItem,
          preco: parseFloat(preco),
          ingredientes
        });
      } else {
        resposta = await POST('/itens', {
          nomeItem,
          tipoItem,
          preco: parseFloat(preco),
          ingredientes
        });
      }

      if (resposta.success) {
        exibirMensagem(
          editando ? "Item atualizado com sucesso" : "Item criado com sucesso",
          "sucesso"
        );
        fecharFormulario();
        carregarItens();
      } else {
        exibirMensagem(resposta.message || "Erro ao salvar item", "erro");
      }
    } catch (erro) {
      exibirMensagem("Erro ao salvar item", "erro");
    }
  }

  async function deletarItem(id) {
    if (!window.confirm("Tem certeza que deseja deletar este item?")) {
      return;
    }

    try {
      const resposta = await DELETE(`/itens/${id}`);

      if (resposta.success) {
        exibirMensagem("Item deletado com sucesso", "sucesso");
        carregarItens();
      } else {
        exibirMensagem(resposta.message || "Erro ao deletar item", "erro");
      }
    } catch (erro) {
      exibirMensagem("Erro ao deletar item", "erro");
    }
  }

  return (
    <>
      <BarraNavegacao>
        <div>Itens do Menu</div>
        <Logout/>
      </BarraNavegacao>
      <div className="min-h-screen bg-dark p-6 mt-20">
        <div className="max-w-6xl mx-auto mt-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gold">Gerenciamento de Itens</h1>
            <button
              onClick={abrirFormulario}
              className="bg-gold text-dark px-6 py-3 rounded font-bold hover:bg-yellow-400 transition"
            >
              + Novo Item
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
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-dark border border-gold p-8 rounded max-w-md w-full">
                <h2 className="text-2xl font-bold text-gold mb-6">
                  {editando ? "Editar Item" : "Novo Item"}
                </h2>

                <form onSubmit={salvarItem} className="space-y-4">
                  <div>
                    <label className="block text-gold mb-2 font-bold">Nome do Item <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={nomeItem}
                      onChange={(e) => setNomeItem(e.target.value)}
                      placeholder="Ex: Pizza Margherita"
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gold mb-2 font-bold">Tipo de Item <span className="text-red-500">*</span></label>
                    <select
                      value={tipoItem}
                      onChange={(e) => setTipoItem(e.target.value)}
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    >
                      <option value="">Selecione um tipo</option>
                      <option value="Prato">Prato Principal</option>
                      <option value="Bebida">Bebida</option>
                      <option value="Sobremesa">Sobremesa</option>
                      <option value="Aperitivo">Aperitivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gold mb-2 font-bold">Preço (R$) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      step="0.01"
                      value={preco}
                      onChange={(e) => setPreco(e.target.value)}
                      placeholder="Ex: 25.50"
                      className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gold mb-2 font-bold">Ingredientes</label>
                    <textarea
                      value={ingredientes}
                      onChange={(e) => setIngredientes(e.target.value)}
                      placeholder="Ex: Pão, carne, queijo, alface"
                      rows="3"
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

          {/* Tabela de Itens */}
          {carregando ? (
            <div className="text-center text-gray-400 py-12">
              <p>Carregando itens...</p>
            </div>
          ) : itens.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p>Nenhum item cadastrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-gold/30 rounded">
              <table className="w-full">
                <thead>
                  <tr className="bg-dark border-b border-gold/30">
                    <th className="text-left p-4 text-gold font-bold">Nome</th>
                    <th className="text-left p-4 text-gold font-bold">Tipo</th>
                    <th className="text-right p-4 text-gold font-bold">Preço</th>
                    <th className="text-left p-4 text-gold font-bold">Ingredientes</th>
                    <th className="text-center p-4 text-gold font-bold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item) => (
                    <tr key={item.ID_item} className="border-b border-gold/10 hover:bg-darker/50 transition">
                      <td className="p-4 text-white">{item.NomeItem}</td>
                      <td className="p-4 text-gray-300">{item.TipoItem}</td>
                      <td className="p-4 text-right text-gold font-bold">
                        R$ {parseFloat(item.Preco).toFixed(2)}
                      </td>
                      <td className="p-4 text-gray-400 text-sm max-w-xs truncate">
                        {item.Ingredientes || "-"}
                      </td>
                      <td className="p-4 text-center space-x-2">
                        <button
                          onClick={() => editarItem(item)}
                          className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-bold hover:bg-blue-700 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deletarItem(item.ID_item)}
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
