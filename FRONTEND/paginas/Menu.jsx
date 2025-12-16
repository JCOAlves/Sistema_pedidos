import Item from "../componentes/Itens.jsx";
import {BotaoComun} from "../componentes/Botoes.jsx"
import {useNavigate} from "react-router-dom"

//ADICIONAR SELEÇÃO PARA VER BEBIDAS E PRATOS
export default function Menu() {
  const navigate = useNavigate();

  const listaItens = [
    { "nome": "Lorem", "preco": 0, "ingredientes": "1,2,3,4" },
    { "nome": "Lorem", "preco": 0, "ingredientes": "1,2,3,4" },
    { "nome": "Lorem", "preco": 0, "ingredientes": "1,2,3,4" }
  ]

  return (
    <section id="menu" class="py-24 bg-dark relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

      <div class="max-w-5xl mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <span class="font-script text-3xl text-gold">Culinária para todos os paladares</span>
          <h2 class="font-serif text-4xl md:text-5xl text-white mt-2 uppercase tracking-wide">Nossos Especiais
          </h2>
          <div class="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        <div class="grid grid-cols-1 gap-12">
          {listaItens.map((iten, index) => (<Item key={index} nome={iten["nome"]} preco={iten["preco"]} ingredientes={iten["ingredientes"]} />))}
        </div>
      </div>

      <div class="text-center mt-16">
        <BotaoComun texto={"Fazer Pedido"} funcao={navigate("/")}/>
      </div>
    </section>
  );
}
