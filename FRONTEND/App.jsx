import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { GET } from "./MetodosHTTP.js"
import Inicial from "./paginas/Inicial.jsx"
import Formulario from "./paginas/Formulario.jsx"
import Menu from "./paginas/Menu.jsx"
import Pedidos from "./paginas/Pedidos.jsx"
import Login from "./paginas/Login.jsx"
import ERRO from "./paginas/ERRO.jsx"
import PedidoEdicao from "./paginas/PedidoEdicao.jsx"
import Funcionario from "./paginas/Funcionario.jsx"
import GerenciamentoItens from './paginas/GerenciamentoItens.jsx';
import GerenciamentoClientes from './paginas/GerenciamentoClientes.jsx';
import GerenciamentoFuncionarios from './paginas/GerenciamentoFuncionarios.jsx';
import Pagamentos from "./paginas/Pagamentos.jsx"
import Footer from "./componentes/Footer.jsx"
import BarraNavegacao from "./componentes/Navegacao.jsx"
import Logout from "./componentes/Logout.jsx"


function App() {
    const [logado, setLogado] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const location = useLocation();
    const [Pagina, setPagina] = useState("");

    useEffect(() => {
        const nomePagina = location.pathname;

        if(nomePagina === "/"){
            setPagina(<>
                <a href="#home" className="hover:text-gold transition duration-300">Home</a>
                <a href="#sobre" className="hover:text-gold transition duration-300">Sobre</a>
                <a href="#horario" className="hover:text-gold transition duration-300">Horario</a>
            </>);
        } else if (nomePagina === "/menu"){
            setPagina("Menu");
        } else if (nomePagina === "/login"){
            setPagina("Login");
        } else if (nomePagina === "/form/pedido"){
            setPagina("Fazer pedido");
        } else if (nomePagina === "/gerenciamento/itens"){
            setPagina("Itens do menu");
        } else if (nomePagina === "/gerenciamento/clientes"){
            setPagina("Clientes");
        } else if (nomePagina === "/gerenciamento/funcionarios"){
            setPagina("Funcionários");
        } else if (nomePagina.includes("/gerenciamento/pedidos")){
            setPagina("Pedidos");
        } else if (nomePagina.includes("/gerenciamento/pagamentos")){
            setPagina("Pagamentos");
        } else if (nomePagina === "/ERRO" || nomePagina === "/NEGADO"){
            setPagina(null);
        } else {
            setPagina("Funcionario");
        }

    }, [location])

    
    function VerificacaoLogin({ logado, carregando, children }) {
        if (carregando){
            return <h1 className="text-center">Carregando...</h1>

        } else {
            if (logado) {
                return children
        
            } else {
                return <Navigate to={"/login"}/>
            }
        }
    }
    
    useEffect(() => {
        async function BuscarSessao() {
            setCarregando(true);
            try {
                const resposta = await GET("/funcionarios/verificacaoLogin");
                const { funcionarioLogado, data } = resposta;
                if(funcionarioLogado){
                    setLogado(true);
                    setUsuario(data);
                } else{
                    setLogado(false);
                    setUsuario(null);
                }

            } catch (error) {
                console.error("Erro na verificação de usuário logado na sessão.")
            } finally{
                setCarregando(false);
            }
        }

        
        BuscarSessao();
        
    }, [logado]);

    return (
        <>
            <BarraNavegacao>
                {Pagina} {typeof Pagina === 'string' && location.pathname.includes("/gerenciamento") ? 
                    <Logout setLogado={setLogado} setUsuario={setUsuario}/> : null}
            </BarraNavegacao>
                <Routes>
                    <Route path="/" element={<Inicial />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/form/pedido" element={<Formulario />} />
                    <Route path="/login" element={<Login setLogado={setLogado}/>} />
                    <Route path="/gerenciamento/:id_funcionario" element={<Funcionario dadosUsuario={usuario}/>} />
                    <Route path="/gerenciamento/itens" element={<GerenciamentoItens />} />
                    <Route path="/gerenciamento/clientes" element={<GerenciamentoClientes />} />
                    <Route path="/gerenciamento/funcionarios" element={<GerenciamentoFuncionarios />} />
                    <Route path="/gerenciamento/pedidos" element={<VerificacaoLogin logado={logado} carregando={carregando}><Pedidos /></VerificacaoLogin>} />
                    <Route path="/gerenciamento/pedidos/:id" element={<PedidoEdicao />} />
                    <Route path="/gerenciamento/pagamentos" element={<Pagamentos />} />
                    <Route path="/gerenciamento/pagamentos/:id" element={<h1>Página de pagamento por ID</h1>} />
                    <Route path="/NEGADO" element={<ERRO mensagem={<h1>Você não possui autorização para acessar essa página. <br /> Volte para a página inicial.</h1>} />} />
                    <Route path="/ERRO" element={<ERRO mensagem={<h1>Página não encontrada. <br /> Volte para a página inicial.</h1>} />} />
                    <Route path="*" element={<Navigate to="/ERRO" />} />
                </Routes>
            <Footer />
        </>
    )
}

export default App
