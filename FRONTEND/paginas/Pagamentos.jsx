import { useEffect, useState } from "react"
import { GET, DELETE, PUT } from "../MetodosHTTP.js";
import { Navigate } from "react-router-dom"

//Página para a visualização dos pagamentos dos pedidos
function Pagamentos({ CargoFuncionario = "" }) {
    const [mensagem, setMensagem] = useState("");
    const [pagamentos, setPagamentos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [exibiForm, setExibi] = useState(false);
    const [valorPagoID, setValor] = useState("");
    const [EspecificoID, setID] = useState("");
    const [formaPagamentoID, setPagamento] = useState("");

    if (CargoFuncionario != "Gerente") { return <Navigate to={"/NEGADO"} /> }

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

    function abrirForm(ID, formaPagamento, valorPago) {
        setID(ID);
        setPagamento(formaPagamento);
        setValor(valorPago);
        const listaPagamento = document.querySelectorAll("option");
        listaPagamento.forEach(pag => {
            if (pag.value === formaPagamentoID) {
                pag.selected = true;
            }
        })
        setExibi(true);
    }

    function fecharForm() {
        setExibi(false);
        setID("");
        setPagamento("");
        setValor("");
    }

    async function atualizarPagamento(ID) {
        try {
            if(valorPagoID != "" && formaPagamentoID != ""){
                const dadosNovos = { ID_pagamento: ID, valorPedido: valorPagoID, formaPagamento: formaPagamentoID }
                const resposta = await PUT(`/pagamentos/${ID}`, dadosNovos);
                const { success, message } = resposta;
                if (success) {
                    setMensagem(message);
                } else {
                    setMensagem("Erro na atualização de dados de pagamento");
                }
            } 
            
        } catch (error) {
            setMensagem(`Erro na atualização de pagamento: ${error || error.message}`);
            console.error(`Erro na atualização de pagamento: ${error || error.message}`);
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

        {exibiForm ? (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-dark border border-gold p-8 rounded max-w-md w-full max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-bold text-gold mb-6">Editar pagamento</h2>
                <form className="space-y-8" onSubmit={() => {atualizarPagamento(EspecificoID)}}>
                    <div>
                        <label htmlFor="valorPago" className="block text-gold mb-2 font-bold">Valor do Pedido</label>
                        <input type="number" name="valorPago" id="valorPago" onInput={(e) => { setValor(e.target.value) }}
                            value={valorPagoID} placeholder="Valor total do pedido"
                            className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400" />
                    </div>
                    <div>
                        <label htmlFor="formaPagamento" className="block text-gold mb-2 font-bold">Forma pagamento</label>
                        <select name="formaPagamento" id="formaPagamento" onChange={(e) => { setPagamento(e.target.value) }}
                            className="w-full bg-darker border border-gold text-white p-3 rounded focus:outline-none focus:border-yellow-400">
                            <option value="" disabled>Forma de pagamento</option>
                            <option value="Pix">Pix</option>
                            <option value="Debito">Cartão de Debito</option>
                            <option value="Credito">Cartão de Crédito</option>
                            <option value="Dinheiro">Dinheiro em espécie</option>
                        </select>
                    </div>
                    <input type="hidden" name="ID_pagamento" value={EspecificoID} />
                    <div className="flex justify-between w-full gap-4 mt-10">
                        <button className="flex-1 bg-gold text-dark py-3 px-4 rounded font-bold hover:bg-yellow-400 transition" 
                            type="submit">Atualizar</button>
                        <button className="flex-1 bg-darker border border-gold text-gold py-3 px-4 rounded font-bold hover:bg-dark transition"
                            onClick={() => { fecharForm() }}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>) : null}

        <div className="mt-30 mb-30 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Pagamentos</h1>
            {carregando ? (
                <p className="text-gray-400">Carregando pagamentos...</p>
            ) : pagamentos.length === 0 ? (
                <p className="text-gray-400">Nenhum pagamento encontrado</p>
            ) : (
                <table className="table table-dark table-hover border overflow-x-auto border-gold/30 rounded mt-4 max-w-240 ml-auto mr-auto table-fixed overflow-x-scroll text-left w-full">
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
                                <td className="flex gap-2 flex-wrap justify-center items-center">
                                    <button onClick={() => { abrirForm(pagamento.ID_pagamento, pagamento.ValorPago || 0, pagamento.FormaPagamento) }}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition font-semibold">
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deletarPagamento(pagamento.ID_pagamento)}
                                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition font-semibold">
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