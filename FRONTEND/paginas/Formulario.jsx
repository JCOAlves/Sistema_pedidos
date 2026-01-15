import { useState, useEffect } from "react";
import { POST, GET } from "../MetodosHTTP";

export default function Formulario() {
  const [itensDisponiveis, setItensDisponiveis] = useState([]);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [praViagem, setPraViagem] = useState(true);
  const [observacoes, setObservacoes] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoItens, setCarregandoItens] = useState(true);

  // Carregar itens disponíveis ao montar componente
  useEffect(() => {
    carregarItens();
  }, []);

  async function carregarItens() {
    try {
      setCarregandoItens(true);
      const dados = await GET('/itens');
      console.log("Resposta da API:", dados);
      
      if (dados.success && Array.isArray(dados.data)) {
        setItensDisponiveis(dados.data);
      } else if (Array.isArray(dados)) {
        setItensDisponiveis(dados);
      } else {
        console.error("Formato inesperado:", dados);
        setMensagem("Erro ao carregar itens");
      }
    } catch (erro) {
      console.error("Erro ao carregar itens:", erro);
      setMensagem("Erro de conexão ao carregar itens");
    } finally {
      setCarregandoItens(false);
    }
  }

  function adicionarItem(item) {
    const id = item.ID_item || item.id;
    const nome = item.NomeItem || item.nome;
    const preco = item.Preco || item.preco || 0;
    
    const itemExistente = itensCarrinho.find(i => i.id_item === id);
    
    if (itemExistente) {
      setItensCarrinho(itensCarrinho.map(i =>
        i.id_item === id
          ? { ...i, quantidade: i.quantidade + 1 }
          : i
      ));
    } else {
      setItensCarrinho([...itensCarrinho, {
        id_item: id,
        quantidade: 1,
        nome: nome,
        preco: preco
      }]);
    }
    setMensagem(`${nome} adicionado ao carrinho`);
    setTimeout(() => setMensagem(""), 2000);
  }

  function removerItem(id_item) {
    setItensCarrinho(itensCarrinho.filter(i => i.id_item !== id_item));
  }

  function alterarQuantidade(id_item, novaQtd) {
    if (novaQtd <= 0) {
      removerItem(id_item);
    } else {
      setItensCarrinho(itensCarrinho.map(i =>
        i.id_item === id_item ? { ...i, quantidade: novaQtd } : i
      ));
    }
  }

  async function enviarPedido(e) {
    e.preventDefault();

    if (itensCarrinho.length === 0) {
      setMensagem("Adicione pelo menos um item ao carrinho");
      return;
    }

    setCarregando(true);

    try {
      const dados = await POST('/pedidos', {
        praViagem,
        observacoes,
        itens: itensCarrinho.map(i => ({
          id_item: i.id_item,
          quantidade: i.quantidade
        }))
      });

      console.log("Resposta do pedido:", dados);

      if (dados.success) {
        setMensagem(`Pedido #${dados.data.id} criado com sucesso!`);
        setItensCarrinho([]);
        setObservacoes("");
        setPraViagem(true);
        window.scrollTo(0, 0);
      } else {
        setMensagem(`${dados.message || "Erro ao criar pedido"}`);
      }
    } catch (error) {
      setMensagem("Erro de conexão com o servidor");
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  // Separar itens por tipo
  const pratos = itensDisponiveis.filter(item => 
    (item.TipoItem === 'Prato' || item.categoria === 'Lanches' || item.categoria === 'Pratos')
  );
  
  const bebidas = itensDisponiveis.filter(item => 
    (item.TipoItem === 'Bebida' || item.categoria === 'Bebidas')
  );

  const total = itensCarrinho.reduce((acc, i) => acc + (i.preco * i.quantidade), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {mensagem && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded text-white font-semibold z-50 ${
          mensagem.includes('sucesso') ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {mensagem}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna esquerda: Menu */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-white">Fazer Pedido</h1>

          {carregandoItens ? (
            <div className="text-center text-gray-400 py-8">
              <p>Carregando itens...</p>
            </div>
          ) : itensDisponiveis.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>Nenhum item disponível</p>
            </div>
          ) : (
            <>
              {/* Pratos */}
              {pratos.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gold mb-4">Pratos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pratos.map(item => (
                      <div key={item.ID_item || item.id} className="bg-dark rounded-lg p-4 border border-gray-700 hover:border-gold transition">
                        <div className="mb-3">
                          <h3 className="text-white font-semibold text-lg">{item.NomeItem || item.nome}</h3>
                          {item.Ingredientes && (
                            <p className="text-gray-400 text-sm">{item.Ingredientes}</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gold font-bold text-lg">
                            R$ {(item.Preco || item.preco || 0).toFixed(2)}
                          </span>
                          <button
                            onClick={() => adicionarItem(item)}
                            className="bg-gold text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bebidas */}
              {bebidas.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gold mb-4">Bebidas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bebidas.map(item => (
                      <div key={item.ID_item || item.id} className="bg-dark rounded-lg p-4 border border-gray-700 hover:border-gold transition">
                        <div className="mb-3">
                          <h3 className="text-white font-semibold text-lg">{item.NomeItem || item.nome}</h3>
                          {item.Ingredientes && (
                            <p className="text-gray-400 text-sm">{item.Ingredientes}</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gold font-bold text-lg">
                            R$ {(item.Preco || item.preco || 0).toFixed(2)}
                          </span>
                          <button
                            onClick={() => adicionarItem(item)}
                            className="bg-gold text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Coluna direita: Carrinho */}
        <div className="lg:col-span-1">
          <div className="bg-dark rounded-lg p-6 border border-gray-700 sticky top-20">
            <h2 className="text-2xl font-bold text-white mb-4">Seu Pedido</h2>

            {/* Items no carrinho */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {itensCarrinho.length === 0 ? (
                <p className="text-gray-400 text-center py-4">Carrinho vazio</p>
              ) : (
                itensCarrinho.map(item => (
                  <div key={item.id_item} className="bg-darker rounded p-3 border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold text-sm">{item.nome}</span>
                      <span className="text-gold font-bold">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alterarQuantidade(item.id_item, item.quantidade - 1)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700 w-8"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantidade}
                        onChange={(e) => alterarQuantidade(item.id_item, parseInt(e.target.value) || 1)}
                        className="w-12 bg-darker text-white text-center rounded border border-gray-600 text-sm"
                      />
                      <button
                        onClick={() => alterarQuantidade(item.id_item, item.quantidade + 1)}
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-green-700 w-8"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removerItem(item.id_item)}
                        className="ml-auto bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 font-bold"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total */}
            {itensCarrinho.length > 0 && (
              <div className="border-t border-gray-700 pt-3 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white font-bold text-lg">Total:</span>
                  <span className="text-gold font-bold text-2xl">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={enviarPedido} className="space-y-3">
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={praViagem}
                  onChange={(e) => setPraViagem(e.target.checked)}
                  className="w-4 h-4 accent-gold cursor-pointer"
                />
                <span className="text-sm">Para viagem</span>
              </label>

              <textarea
                placeholder="Observações (ex: sem cebola, sem gelo)"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold text-sm"
                rows="3"
              />

              <button
                type="submit"
                disabled={carregando || itensCarrinho.length === 0}
                className="w-full bg-gold text-black font-bold py-3 rounded hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Enviando..." : "Fazer Pedido"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 