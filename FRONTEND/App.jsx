import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { GET } from "./MetodosHTTP.js"
import Inicial from "./paginas/Inicial.jsx"
import Formulario from "./paginas/Formulario.jsx"
import Menu from "./paginas/Menu.jsx"
import Pedidos from "./paginas/Pedidos.jsx"
import Login from "./paginas/Login.jsx"
import ERRO from "./paginas/ERRO.jsx"
import ItemForm from "./paginas/ItemEdicao.jsx"
import PedidoEdicao from "./paginas/PedidoEdicao.jsx"
import Funcionario from "./paginas/Funcionario.jsx"
import Pagamentos from "./paginas/Pagamentos.jsx"
import Footer from "./componentes/Footer.jsx"

function VerificacaoLogin({ children }) {
    async () => {
        try {
            const resposta = await GET("/");
            const { logado=false } = resposta;
            if (logado != undefined && logado === true) {
                return children
            }
            else {
                return <Navigate to={"/login"} />
            }

        } catch (error) {
            console.error("Erro na verificação de usuário logado na sessão.")
            alert("Erro na verificação de usuário logado na sessão.");
        }
    }
}

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Inicial />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/form/pedido" element={<Formulario />} />
                    <Route path="/pedidos" element={<Pedidos />} />
                    <Route path="/pedidos/:id" element={<PedidoEdicao />} />
                    <Route path="/form/funcionario" element={<h1>Formulario de funcionario</h1>} />
                    <Route path="/funcionarios" element={<h1>Funcionarios</h1>} />
                    <Route path="/funcionarios/:id" element={<Funcionario />} />
                    <Route path="/form/item" element={<ItemForm />} />
                    <Route path="/itens" element={<h1>Itens do menu</h1>} />
                    <Route path="/itens/:id" element={<ItemForm funcaoItem="editar"/>} />
                    <Route path="/pagamentos" element={<Pagamentos/>}/>
                    <Route path="/pagamentos/:id"/>
                    <Route path="/ERRO" element={<ERRO mensagem={<h1>Página não encontrada. <br /> Volte para a página inicial</h1>} />} />
                    <Route path="*" element={<Navigate to="/ERRO" />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    )
}

export default App
