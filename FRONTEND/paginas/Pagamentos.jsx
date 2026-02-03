import { useEffect, useState } from "react"
import { GET, DELETE } from "../MetodosHTTP.js";

//Página para a visualização dos pagamentos dos pedidos
function Pagamentos() {
    const [mensagem, setMensagem] = useState("");
    const [pagamentos, setPagamentos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarPagamentos();
    }, []);

    async function carregarPagamentos() {
        try {
            setCarregando(true);
            const resposta = await GET("/pagamentos");
            console.log("Resposta de pagamentos:", resposta);

            if (resposta.success && Array.isArray(resposta.data)) {
                setPagamentos(resposta.data);
                setMensagem("");
            } else if (Array.isArray(resposta)) {
                setPagamentos(resposta);
                setMensagem("");
            } else {
                console.error("Formato inesperado:", resposta);
                setMensagem("Erro ao carregar pagamentos");
            }
        } catch (error) {
            console.error("Erro ao buscar pagamentos:", error);
            setMensagem("Erro ao buscar dados de pagamentos");
        } finally {
            setCarregando(false);
        }
    }

    async function deletarPagamento(id) {
        if (window.confirm("Deseja deletar este pagamento?")) {
            try {
                const resposta = await DELETE(`/pagamentos/${id}`);
                if (resposta.success) {
                    setMensagem("Pagamento deletado com sucesso");
                    carregarPagamentos();
                } else {
                    setMensagem(resposta.message || "Erro ao deletar pagamento");
                }
            } catch (error) {
                console.error("Erro ao deletar pagamento:", error);
                setMensagem("Erro ao deletar pagamento");
            }
        }
    }

    return (<>
        {mensagem && (
            <div className={`fixed top-4 right-4 px-4 py-3 rounded text-white font-semibold z-50 ${mensagem.includes('sucesso') ? 'bg-green-600' : 'bg-red-600'
                }`}>
                {mensagem}
            </div>
        )}
        <div className="mt-30 mb-30 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Pagamentos</h1>
            {carregando ? (
                <p className="text-gray-400">Carregando pagamentos...</p>
            ) : pagamentos.length === 0 ? (
                <p className="text-gray-400">Nenhum pagamento encontrado</p>
            ) : (
                <table className="table table-dark table-hover mt-4 max-w-300 ml-auto mr-auto table-fixed overflow-x-scroll text-left w-full">
                    <thead>
                        <tr>
                            <th className="w-auto break-words">ID</th>
                            <th className="w-auto break-words">Pedido</th>
                            <th className="w-auto break-words">Valor Pago</th>
                            <th className="w-auto break-words">Forma de Pagamento</th>
                            <th className="w-auto break-words">Data e Hora</th>
                            <th className="w-auto break-words">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagamentos.map((pagamento) => (
                            <tr key={pagamento.ID_pagamento}>
                                <td>{pagamento.ID_pagamento}</td>
                                <td>{pagamento.Pedido}</td>
                                <td>R$ {(pagamento.ValorPago || 0).toFixed(2)}</td>
                                <td>{pagamento.FormaPagamento || 'Não especificado'}</td>
                                <td>{new Date(pagamento.HorarioPagamento).toLocaleString('pt-BR')}</td>
                                <td>
                                    <button
                                        onClick={() => deletarPagamento(pagamento.ID_pagamento)}
                                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition font-semibold"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </>)
}

export default Pagamentos;