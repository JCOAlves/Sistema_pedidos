import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Inicial from "./paginas/Inicial.jsx"
import Formulario from "./paginas/Formulario.jsx";
import Menu from "./paginas/Menu.jsx"
import Pedidos from "./paginas/Pedidos.jsx" 
import Login from "./paginas/Login.jsx"
import ERRO from "./paginas/ERRO.jsx"
import Footer from "./componentes/Footer.jsx"

function VerificacaoLogin({logado, children}){
    if (logado) {
      return children
    }
    else{
      return <Navigate to={"/login"}/>
    }
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicial/>} />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/menu" element={<Menu/>} /> 
          <Route path="/form/pedido" element={<Formulario />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/:id" element={<Pedidos />}/>
          <Route path="/form/funcionario" element={<h1>Formulario de funcionario</h1>}/>
          <Route path="/funcionarios" element={<h1>Funcionarios</h1>}/>
          <Route path="/funcionarios/:id" element={<h1>Funcionario especifico</h1>}/>
          <Route path="/clientes" element={<h1>Clientes</h1>}/>
          <Route path="/clientes/:cpf" element={<h1>Cliente especifico</h1>}/>
          <Route path="/form/item" element={<h1>Formulario de item do menu</h1>}/>
          <Route path="/itens" element={<h1>Itens do menu</h1>}/>
          <Route path="/itens/:id" element={<h1>Item especifico do menu</h1>}/>
          <Route path="/ERRO" element={<ERRO mensagem={<h1>Página não encontrada. <br/> Volte para a página inicial</h1>}/>}/>
          <Route path="*" element={<Navigate to="/ERRO"/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App
