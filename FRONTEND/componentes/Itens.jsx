import imagem from "/images/bg.jpg";

function Item({ nome, preco, ingredientes }) {
    return (
        <div className="group cardItem">
            <img src={imagem} alt="Imagem teste" className="imagemItem"/>
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

function PedidoItem({objetoItem}){
    const [quantidade, setQuantidade] = useState(0);

    return (
        <div className="group cardItem">
            <img src={imagem} alt="Imagem teste" className="imagemItem"/>
            <div className="">
                <div className="flex justify-between items-baseline mb-2 border-b border-gray-800 pb-2">
                    <h3
                        className="font-serif text-xl md:text-2xl text-white group-hover:text-gold transition duration-300">
                        {objetoItem["nome"]}</h3>
                    <span className="font-bold text-gold text-xl">R$: {objetoItem["preco"]}</span>
                </div>
                <p className="text-sm text-gray-500 italic">{objetoItem["ingredientes"]}</p>
                <div>
                    <button onClick={() => setQuantidade(quantidade+1)}>+</button>
                    <div id="quantidade">{quantidade}</div>
                    <button onClick={() => setQuantidade(quantidade-1)}>-</button>
                </div>
                <input type="hidden" name="ID_item" id={objetoItem["ID_item"]} value={objetoItem["ID_item"]}/>
            </div>
        </div>
    )


}

export default Item