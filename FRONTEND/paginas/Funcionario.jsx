import { useState, useEffect } from "react"
import { useSearchParams, useNavigate, Navigate, Link } from "react-router-dom"


//Página de usuário do funcionario
function Funcionario({dadosUsuario}) {
    const [mensagem, setMensagem] = useState("");
    const [nomeFuncionario, setNome] = useState("Fulano");
    const [cargoFuncionario, setCargo] = useState("Cozinheiro");
    const navigate = useNavigate();
    const { id_funcionario } = useSearchParams();
    if (id_funcionario === undefined){ return <Navigate to={"/ERRO"}/> }

    useEffect(() => {
        const { NomeFuncionario, CargoFuncionario } = dadosUsuario;
        if(NomeFuncionario != undefined && CargoFuncionario != undefined){
            setNome(NomeFuncionario);
            setCargo(CargoFuncionario);
        } else{
            navigate("/login");
        }

    }, [id_funcionario])

    return (<>
        {mensagem && (
            <div className={`fixed top-4 right-4 px-4 py-3 rounded text-white font-semibold z-50 ${mensagem.includes('sucesso') ? 'bg-green-600' : 'bg-red-600'
                }`}>
                {mensagem}
            </div>
        )}
        <section className="border rounded pt-5 pb-5 pl-3 pr-3 mt-35 ml-auto mr-auto mb-20 gap-3 paginaFuncionario">
            <img src="https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg?semt=ais_user_personalization&w=740&q=80"
                alt="Foto de funcionario logado" className="w-45 h-45 border ml-auto mr-auto text-center rounded-full" />
            <div className="ml-auto mr-auto mt-3">
                <div className="mb-3 mx-1 p-2 rounded text-black bg-gold w-auto text-center font-bold">{nomeFuncionario} - <span className="italic">{cargoFuncionario}</span></div>
                <div className="flex gap-2 flex-wrap justify-center items-center flex-row w-full">
                    <Link to={"/gerenciamento/itens"} className="p-2 border rounded">Itens</Link>
                    <Link to={"/gerenciamento/pedidos"} className="p-2 border rounded">Pedidos</Link>
                    <Link to={"/gerenciamento/funcionarios"} className="p-2 border rounded">Funcionarios</Link>
                    <Link to={"/gerenciamento/clientes"} className="p-2 border rounded">Clientes</Link>
                    <Link to={"/gerenciamento/pagamentos"} className="p-2 border rounded">Pagamentos</Link>
                </div>
            </div>
        </section>
    </>)
}

export default Funcionario;