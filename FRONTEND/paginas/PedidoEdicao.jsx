import {useState, useEffect} from "react"
import {useParams, Navigate} from "react-router-dom"
import {GET, PUT} from "../MetodosHTTP.js"

//Página de edição de pedido
function PedidoEdicao({CargoFuncionario=""}){
    const [listaItens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    
    const {id} = useParams();
    if (id === undefined){ return <Navigate to={"/ERRO"}/> }
    if(CargoFuncionario != "Gerente"){ return <Navigate to={"/NEGADO"}/> }

    useEffect(() => {
        async () => {
            try{
                setCarregando(true);
                const itensPedido = await GET("/");
                setItens(itensPedido.data);

            } catch (error){
                setMensagem("Pedido não disponivel.")
            } finally {
                setCarregando(false);
            }
        }

    }, [id]);

    async function EditarPedido(){
        try{
            const pedidoEditado = await PUT("/", {});
            setMensagem("Pedido editado com sucesso.");

        } catch (error){
            setMensagem("Erro na edição de pedido.");
        }
    }

    return (<>
        <form className="w-100 rounded mr-auto ml-auto mt-30 mb-20 p-7 border border-gray-700">
            {!carregando && mensagem ? null : mensagem}

            <div className="text-center">
                <button type="submit" className="w-30 bg-gold text-black font-bold py-3 rounded hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed">Editar pedido</button>
            </div>
        </form>
    </>)
}

export default PedidoEdicao;