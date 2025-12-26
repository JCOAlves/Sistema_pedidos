import imagem from "/images/bg.jpg";

function Item({ nome, preco, ingredientes }) {
    return (
        <div className="group cardItem">
            <img src={imagem} alt="Imagem teste" className="imagemItem"/>
            <div className="">
                <div className="flex justify-between items-baseline mb-2 border-b border-gray-800 pb-2">
                    <h3
                        className="font-serif text-xl md:text-2xl text-white group-hover:text-gold transition duration-300">
                        {nome}</h3>
                    <span className="font-bold text-gold text-xl">R$: {preco}</span>
                </div>
                <p className="text-sm text-gray-500 italic">{ingredientes}</p>
            </div>
        </div>
    )
}

export default Item