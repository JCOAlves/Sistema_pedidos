//Card dos itens
function Item({ nome, preco, ingredientes, tipo="", ID="" }) {
    const rotaIMG = tipo && ID ? `/images/ItensMenu/${tipo}_${ID}.jpeg` : "./images/bg.jpg"

    return (
        <div className="group cardItem">
            <img src={rotaIMG} alt={`Imagem de ${nome}`} className="imagemItem"/>
            <div className="">
                <div className="flex justify-between items-baseline mb-2 border-b border-gray-800 pb-2">
                    <h3
                        className="font-serif text-xl md:text-2xl text-white group-hover:text-gold transition duration-300">
                        {nome || "Sem nome"}</h3>
                    <span className="font-bold text-gold text-xl">R$: {preco || "0"}</span>
                </div>
                <p className="text-sm text-gray-500 italic">{ingredientes || "Sem descrição"}</p>
            </div>
        </div>
    )
}

export default Item;