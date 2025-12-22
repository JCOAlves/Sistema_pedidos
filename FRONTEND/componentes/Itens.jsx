//ADICIONAR FOTO

function Item({ nome, preco, ingredientes }) {
    return (
        <div className="group">
            <div className="flex justify-between items-baseline mb-2 border-b border-gray-800 pb-2">
                <h3
                    className="font-serif text-xl md:text-2xl text-white group-hover:text-gold transition duration-300">
                    {nome}</h3>
                <span className="font-bold text-gold text-xl">R$: {preco}</span>
            </div>

            <p className="text-sm text-gray-500 italic">{ingredientes}</p>
        </div>

    )
}

export default Item