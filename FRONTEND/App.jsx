import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
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
import GerenciamentoItens from './paginas/GerenciamentoItens';
import GerenciamentoClientes from './paginas/GerenciamentoClientes';
import GerenciamentoFuncionarios from './paginas/GerenciamentoFuncionarios';
import Pagamentos from "./paginas/Pagamentos.jsx"
import Footer from "./componentes/Footer.jsx"


function App() {
    const [logado, setLogado] = useState(false);
    
    function VerificacaoLogin({ logado, children }) {
        if (logado === true) {
            return children
    
        } else if(logado === false){
            alert("FALSE");
        }
    }
    
    useEffect(() => {
        async function BuscarSessao() {
            try {
                const resposta = await GET("/funcionarios/verificacaoLogin");
                const { funcionarioLogado } = resposta;
                if (funcionarioLogado === true) {
                    setLogado(true);
                }
                else {
                    setLogado(false);
                }

            } catch (error) {
                console.error("Erro na verificação de usuário logado na sessão.")
            }
        }

      BuscarSessao();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicial />} />
                    <Route path="/login" element={<Login setLogado={setLogado}/>} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/form/pedido" element={<Formulario />} />
                    <Route path="/gerenciamento/:id_funcionario" element={<Funcionario />} />
                    <Route path="/gerenciamento/itens" element={<GerenciamentoItens />} />
                    <Route path="/gerenciamento/clientes" element={<GerenciamentoClientes />} />
                    <Route path="/gerenciamento/funcionarios" element={<GerenciamentoFuncionarios />} />
                    <Route path="/gerenciamento/pedidos" element={<VerificacaoLogin logado={logado}><Pedidos /></VerificacaoLogin>} />
                    <Route path="/gerenciamento/pedidos/:id" element={<PedidoEdicao />} />
                    <Route path="/gerenciamento/pagamentos" element={<Pagamentos />} />
                    <Route path="/gerenciamento/pagamentos/:id" element={<h1>Página de pagamento por ID</h1>} />
                    <Route path="/NEGADO" element={<ERRO mensagem={<h1>Você não possui autorização para acessar essa página. <br /> Volte para a página inicial.</h1>} />} />
                    <Route path="/ERRO" element={<ERRO mensagem={<h1>Página não encontrada. <br /> Volte para a página inicial.</h1>} />} />
                    <Route path="*" element={<Navigate to="/ERRO" />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    )
}

export default App
