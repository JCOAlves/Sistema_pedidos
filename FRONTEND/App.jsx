import React from "react"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Inicial from "./paginas/Inicial.jsx"
import Formulario from "./paginas/Formulario.jsx"
import Menu from "./paginas/Menu.jsx"
import Pedidos from "./paginas/Pedidos.jsx"
import './style/App.css'

function App() {
  return (
    <>
      <BrowserRouter>
      <nav>
        <Link to="/" className="rota">Inicial</Link>
        <Link to="/formulario" className="rota">Formulario</Link>
        <Link to="/menu" className="rota">Menu</Link>
        <Link to="/pedidos" className="rota">Pedidos</Link>
      </nav>
        <Routes>
          <Route path="/" element={<Inicial/>}/>
          <Route path="/formulario" element={<Formulario/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/pedidos" element={<Pedidos/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
