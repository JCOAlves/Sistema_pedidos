import { useState, useEffect, use } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import BarraNavegacao from "../componentes/Navegacao.jsx"
import {BotaoComun} from "../componentes/Botoes.jsx"
import { GET } from "../MetodosHTTP.js"


//Página de usuário do funcionario
function Funcionario() {
    const [mensagem, setMensagem] = useState("");
    const [nomeFuncionario, setNome] = useState("Fulano");
    const [cargoFuncionario, setCargo] = useState("Cozinheiro");
    const navigate = useNavigate();
    const { id } = useSearchParams();
    //if (id === undefined){ return <Navigate to={"/ERRO"}/> }

    useEffect(() => {
        async () => {
            try {
                const funcionario = await GET("/");
                const { nomeFuncionario, funcao } = funcionario;
                if (nomeFuncionario === undefined && funcao === undefined) {
                    setMensagem("Erro no carregamento de dados do usuário");
                }

            } catch (error){
                console.error("Erro no carregamento de dados do usuário")
                setMensagem("Erro no carregamento de dados do usuário");
            }
        }
    }, [id])

    return (<>
        <BarraNavegacao>
            <div>{"Logout -->"}</div>
        </BarraNavegacao>
        <div className="mt-30 w-full">
            {mensagem && (
                <div className={`fixed top-4 right-4 px-4 py-3 rounded text-white font-semibold z-50 ${mensagem.includes('sucesso') ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                    {mensagem}
                </div>
            )}
            <section className="flex ml-auto mr-auto mb-20 gap-5 max-w-300">
                <div className="w-60 h-60 border ml-auto mr-auto text-center rounded-full">Imagem</div>
                <div className="border ml-auto mr-auto w-full p-4">
                    <div>{nomeFuncionario}</div>
                    <BotaoComun texto="Itens" funcao={() => {navigate("/itens")}}/>
                    <BotaoComun texto="Pedidos" funcao={() => {navigate("/pedidos")}}/>
                    <BotaoComun texto="Pagamentos" funcao={() => {navigate("/")}}/>
                </div>
            </section>
        </div>
    </>)
}

export default Funcionario;