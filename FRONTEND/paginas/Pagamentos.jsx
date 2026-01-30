import { useEffect, useState } from "react"
import { GET } from "../MetodosHTTP.js";

//Página para a visualização dos pagamentos dos pedidos
function Pagamentos() {
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        async () => {
            try {
                const respota = await GET("/");
                setMensagem("reyt");

            } catch (error) {
                console.error("Erro ao buscar pagamentos.");
                setMensagem("Erro ao buscar dados de pagamentos");
            }
        }
    }, []);

    return (<>
        {mensagem && (
            <div className={`fixed top-4 right-4 px-4 py-3 rounded text-white font-semibold z-50 ${mensagem.includes('sucesso') ? 'bg-green-600' : 'bg-red-600'
                }`}>
                {mensagem}
            </div>
        )}
        <div className="mt-30 mb-30 text-center">
            <h1>Pagamentos</h1>
            <table className="table table-dark table-hover mt-4 max-w-300 ml-auto mr-auto table-fixed overflow-x-scroll text-left">
                <thead>
                    <tr>
                        <th className="w-auto break-words">Pagamento</th>
                        <th className="w-auto break-words">Data e Hora</th>
                        <th className="w-auto break-words">Pedido</th>
                        <th className="w-auto break-words">Cliente</th>
                        <th className="w-auto break-words">Valor pago</th>
                        <th className="w-auto break-words">Forma de Pagamento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ana</td><td>25</td>
                        <td>Ana</td><td>25</td>
                        <td>Ana</td><td>25</td>
                    </tr>
                    <tr>
                        <td>Ana</td><td>25</td>
                        <td>Ana</td><td>25</td>
                        <td>Ana</td><td>25</td>
                    </tr>
                    <tr>
                        <td>Ana</td><td>25</td>
                        <td>Ana</td><td>25</td>
                        <td>Ana</td><td>25</td>
                    </tr>
                    <tr>
                        <td>Ana</td><td>25</td>
                        <td>Ana</td><td>25</td>
                        <td>Ana</td><td>25</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
}

export default Pagamentos;