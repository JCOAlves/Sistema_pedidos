import { useState, useEffect } from "react";
import { GET } from "../MetodosHTTP.js";
import BarraNavegacao from "../componentes/Navegacao.jsx";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  // Carregar pedidos ao montar componente
  useEffect(() => {
    carregarPedidos();
    // Recarregar a cada 5 segundos
    const intervalo = setInterval(carregarPedidos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  async function carregarPedidos() {
    try {
      setCarregando(true);
      const dados = await GET('/pedidos');
      
      if (dados.success && Array.isArray(dados.data)) {
        setPedidos(dados.data);
        setErro("");
      } else {
        setErro("Erro ao carregar pedidos");
      }
    } catch (error) {
      console.error("Erro:", erro);
      setErro("Erro de conexão com o servidor");
    } finally {
      setCarregando(false);
    }
  }

  async function abrirPedido(id) {
    try {
      const dados = await GET(`/pedidos/${id}`);
      
      if (dados.success) {
        setPedidoSelecionado(dados.data);
      } else {
        setErro("Erro ao carregar detalhes do pedido");
      }
    } catch (error) {
      console.error("Erro:", erro);
      setErro("Erro de conexão");
    }
  }

  const pedidosFiltrados = pedidos.filter(p => {
    if (filtroStatus === "todos") return true;
    return p.StatusPedido === filtroStatus;
  });

  // Formatador de data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString("pt-BR");
  };

  return (<>
    <BarraNavegacao>Pedidos</BarraNavegacao>
    <div className="p-6 max-w-6xl mr-auto ml-auto mb-0 mt-23">
      <h1 className="text-3xl font-bold text-white mb-6">Meus Pedidos</h1>

      {erro && (
        <div className="fixed top-4 right-4 z-50 bg-red-600 text-white font-semibold p-4 rounded mb-4">{erro}</div>
      )}

      {!pedidoSelecionado ? (
        <>
          {/* Filtros */}
          <div className="mb-6 flex gap-2 flex-wrap">
            {["todos", "Em preparo", "Entregue", "Pago", "Cancelado"].map(status => (
              <button
                key={status}
                onClick={() => setFiltroStatus(status)}
                className={`px-4 py-2 rounded font-semibold transition ${
                  filtroStatus === status
                    ? "bg-gold text-black"
                    : "bg-dark text-gold border border-gold hover:bg-gold hover:text-black"
                }`}
              >
                {status === "todos" ? "Todos" : status}
              </button>
            ))}
          </div>

          {/* Lista de Pedidos */}
          {carregando ? (
            <div className="text-center text-gray-400 py-8">
              <p>Carregando pedidos...</p>
            </div>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>Nenhum pedido encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pedidosFiltrados.map(pedido => (
                <div
                  key={pedido.ID_pedido}
                  onClick={() => abrirPedido(pedido.ID_pedido)}
                  className="bg-dark rounded-lg p-4 border border-gray-700 hover:border-gold transition cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-gold font-bold text-lg">Pedido #{pedido.ID_pedido}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded ${
                      pedido.StatusPedido === "Em preparo" ? "bg-yellow-600" :
                      pedido.StatusPedido === "Entregue" ? "bg-green-600" :
                      pedido.StatusPedido === "Pago" ? "bg-blue-600" :
                      "bg-red-600"
                    }`}>
                      {pedido.StatusPedido}
                    </span>
                  </div>

                  <div className="text-gray-300 text-sm space-y-1 mb-3">
                    <p>{formatarData(pedido.HorarioPedido)}</p>
                    <p>{pedido.PraViagem ? "Para Viagem" : "Para Consumir"}</p>
                    {pedido.Observacoes && (
                      <p>{pedido.Observacoes.substring(0, 50)}...</p>
                    )}
                  </div>

                  <button className="w-full bg-gold text-black py-2 rounded hover:bg-yellow-400 transition font-semibold text-sm">
                    Ver Detalhes
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Detalhes do Pedido */}
          <button
            onClick={() => setPedidoSelecionado(null)}
            className="mb-4 px-4 py-2 bg-gold text-black rounded hover:bg-yellow-400 transition font-semibold"
          >
            ← Voltar
          </button>

          <div className="bg-dark rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gold mb-2">Pedido #{pedidoSelecionado.ID_pedido}</h2>
                <p className="text-gray-400">{formatarData(pedidoSelecionado.HorarioPedido)}</p>
              </div>
              <span className={`text-sm font-semibold px-4 py-2 rounded ${
                pedidoSelecionado.StatusPedido === "Em preparo" ? "bg-yellow-600" :
                pedidoSelecionado.StatusPedido === "Entregue" ? "bg-green-600" :
                pedidoSelecionado.StatusPedido === "Pago" ? "bg-blue-600" :
                "bg-red-600"
              }`}>
                {pedidoSelecionado.StatusPedido}
              </span>
            </div>

            {/* Informações do Pedido */}
            <div className="bg-darker rounded p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Tipo</p>
                  <p className="text-white font-semibold">
                    {pedidoSelecionado.PraViagem ? "Para Viagem" : "Para Consumir"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Observações</p>
                  <p className="text-white font-semibold">
                    {pedidoSelecionado.Observacoes || "Nenhuma"}
                  </p>
                </div>
              </div>
            </div>

            {/* Itens do Pedido */}
            <h3 className="text-xl font-bold text-gold mb-3">Itens do Pedido</h3>
            <div className="space-y-3">
              {pedidoSelecionado.itens && pedidoSelecionado.itens.length > 0 ? (
                pedidoSelecionado.itens.map((item, idx) => (
                  <div key={idx} className="bg-darker rounded p-4 border border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{item.NomeItem}</h4>
                        <p className="text-gray-400 text-sm">{item.Ingredientes}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gold font-bold">R$ {item.Preco.toFixed(2)}</p>
                        <p className="text-gray-400 text-sm">x{item.Quantidade}</p>
                      </div>
                    </div>
                    <div className="text-right pt-2 border-t border-gray-600">
                      <p className="text-gold font-bold">
                        Subtotal: R$ {(item.Preco * item.Quantidade).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Nenhum item no pedido</p>
              )}
            </div>

            {/* Total */}
            {pedidoSelecionado.itens && pedidoSelecionado.itens.length > 0 && (
              <div className="bg-darker rounded p-4 mt-6 border border-gold">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-lg">Total:</span>
                  <span className="text-gold font-bold text-2xl">
                    R$ {pedidoSelecionado.itens
                      .reduce((acc, item) => acc + (item.Preco * item.Quantidade), 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  </>);
}
