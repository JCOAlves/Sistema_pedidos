import Item from "../componentes/Itens.jsx";
import {BotaoComun} from "../componentes/Botoes.jsx"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"

//ADICIONAR SELEÇÃO PARA VER BEBIDAS E PRATOS
export default function Menu() {
  const [listaItens, setItens] = useState([]);
  const [tipoIten, setTipo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    switch(tipoIten){
      case "Prato":
        setItens([
          { "nome": "Lorem Prato", "preco": 0, "ingredientes": "1,2,3,4" },
          { "nome": "Lorem Prato", "preco": 0, "ingredientes": "1,2,3,4" },
          { "nome": "Lorem", "preco": 0, "ingredientes": "1,2,3,4" }
        ]);
        break;
      case "Bebida":
        setItens([
          { "nome": "Lorem Bebida", "preco": 0, "ingredientes": "1,2,3,4" },
          { "nome": "Lorem Bebida", "preco": 0, "ingredientes": "1,2,3,4" },
          { "nome": "Lorem", "preco": 0, "ingredientes": "1,2,3,4" }
        ]);
        break;
      default:
        setItens([
          { "nome": "Lorem", "preco": 0, "ingredientes": "1,2,3,4" },
          { "nome": "Lorem", "preco": 0, "ingredientes": "1,2,3,4" },
          { "nome": "Lorem", "preco": 0, "ingredientes": "1,2,3,4" }
        ]);
        break;
    }
  }, []);


  return (
    <section id="menu" className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="font-script text-3xl text-gold">Culinária para todos os paladares</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-2 uppercase tracking-wide">Nossos Especiais
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {listaItens.map((iten, index) => (<Item key={index} nome={iten["nome"]} preco={iten["preco"]} ingredientes={iten["ingredientes"]} />))}
        </div>
      </div>

      <div className="text-center mt-16">
        <BotaoComun texto={"Fazer Pedido"} funcao={() => navigate("/")}/>
      </div>
    </section>
  );
}
