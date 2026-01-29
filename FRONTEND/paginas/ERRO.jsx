import BarraNavegacao from "../componentes/Navegacao.jsx"

//Página de erro

function ERRO({mensagem}){
    return (<div className="min-h-155">
        <BarraNavegacao></BarraNavegacao>
        <div className="mt-30 mb-30 mr-auto ml-auto w-100 break-words">
            <h2 className="text-center font-serif text-3xl md:text-5xl text-white mt-2 uppercase tracking-wide pl-5 pr-5">{mensagem}</h2>
        </div>
    </div>)
}

export default ERRO;