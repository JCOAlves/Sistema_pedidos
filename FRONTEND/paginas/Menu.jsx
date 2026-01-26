import Item from "../componentes/Itens.jsx";
import BarraNavegacao from "../componentes/Navegacao.jsx"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { GET } from "../MetodosHTTP.js"

//ADICIONAR SELEÇÃO PARA VER BEBIDAS E PRATOS
export default function Menu() {
  const [listaItens, setItens] = useState([]);
  const [todosItens, setTodosItens] = useState([]);
  const [tipoIten, setTipo] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  function Filtragem(tipo, indice) {
    const listaBotoes_item = document.querySelectorAll(".botao_tipoIten");
    if (tipoIten === tipo) {
      setTipo("");
    } else {
      setTipo(tipo);
    }
    listaBotoes_item.forEach(botao => {
      botao.className = "rounded border border-gold text-gold botao_tipoIten";
    })
    listaBotoes_item[indice].className = "rounded bg-gold text-darker botao_tipoIten"
  }

  // Carregar itens da API ao montar o componente
  useEffect(() => {
    async function carregarItens() {
      try {
        setCarregando(true);
        const dados = await GET('/itens');
        if (Array.isArray(dados.data)) {
          setTodosItens(dados.data);
        } else{
          setMensagem("Erro ao carregar menu");
        }

      } catch (error) {
        console.error(error);
        setMensagem("Erro na busca de itens do menu:", dados);
      
      } finally {
        setCarregando(false);
      }
    };
    carregarItens();
  }, []);

  // Filtrar itens por tipo
  useEffect(() => {
    if (tipoIten === "") {
      setItens(todosItens);

    } else {
      const itensFiltrados = todosItens.filter(item => item.TipoItem === tipoIten);
      setItens(itensFiltrados);
    }
  }, [tipoIten, todosItens]);


  return (<>
    <BarraNavegacao>Menu</BarraNavegacao>
    <section id="menu" className="py-24 bg-dark relative overflow-hidden mt-5">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

      {mensagem && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded text-white font-semibold z-50 ${mensagem.includes('sucesso') ? 'bg-green-600' : 'bg-red-600'
      }`}>
          {mensagem}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <span className="font-script text-3xl text-gold">Culinária para todos os paladares</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-2 uppercase tracking-wide">Nossos Especiais
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
          <nav className="tiposIten">
            <button className="rounded bg-gold text-darker botao_tipoIten" onClick={() => Filtragem("", 0)}>Menu completo</button>
            <button className="rounded border border-gold text-gold hover:bg-gold hover:text-darker botao_tipoIten" onClick={() => Filtragem("Prato", 1)}>Pratos</button>
            <button className="rounded border border-gold text-gold hover:bg-gold hover:text-darker botao_tipoIten" onClick={() => Filtragem("Bebida", 2)}>Bebidas</button>
          </nav>
        </div>

        {carregando ?
          (<div className="text-center text-gray-400 py-8">
            <p>Carregando itens...</p>
          </div>)
          : (
            <div className="grid grid-cols-1 gap-12">
              {listaItens.length != 0 || todosItens.length != 0 ?
                listaItens.map((iten, index) => (<Item key={index} nome={iten["NomeItem"]} preco={iten["Preco"].toFixed(2)} ingredientes={iten["Ingredientes"]} />))
                : <div className="text-center text-gray-400 py-8">
                  <p>Itens do menu indisponíveis</p>
                </div>}
            </div>
          )}
      </div>

      <div className="text-center mt-16">
        <button className="rounded bg-gold text-darker px-8 py-3 uppercase tracking-widest w-max mr-auto ml-auto font-bold hover:bg-white transition duration-300 botaoPedido"
          onClick={() => navigate("/form/pedido")}>Fazer Pedido</button>
      </div>
    </section>
    </>);
}
