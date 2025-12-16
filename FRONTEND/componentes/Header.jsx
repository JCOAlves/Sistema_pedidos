

import {BotaoComun, BotaoTransparente} from "../componentes/Botoes.jsx"
import {useNavigate} from "react-router-dom"

export default function Header() {
  const navigate = useNavigate();

  return (
    <header id="home" className="relative h-screen flex items-center justify-center text-center px-6">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" alt="Steak na grelha" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/60"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto mt-16">
        <p className="font-script text-3xl md:text-5xl text-gold mb-4">Sejam bem-vindos ao nosso restaurante!</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-wider">Por trás dos Pratos</h1>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto font-light">
          Descubra a fusão perfeita entre a tradição culinária e a modernidade em cada garfada. Uma experiência gastronômica inesquecível.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <BotaoTransparente texto={"Ver Menu"}  funcao={() => {navigate("/menu")}}/>
          <BotaoComun texto={"Fazer Pedido"} funcao={() => {navigate("/")}}/>
        </div>
      </div>
    </header>
  );
}
