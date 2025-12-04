import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Inicial from "./paginas/Inicial.jsx"
import Formulario from "./paginas/Formulario.jsx"
import Menu from "./paginas/Menu.jsx"
import Pedidos from "./paginas/Pedidos.jsx" 
import Header from "./componentes/Header"
import Footer from "./componentes/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />    

        <Routes>
          <Route path="/" element={<Inicial />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
        
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
