import {useEffect, useState} from "react"
import {useSearchParams, useNavigate} from "react-router-dom"
import BarraNavegacao from "../componentes/Navegacao.jsx";
import {GET, PUT} from "../MetodosHTTP.js"

//Página de edição de item do menu.
function ItemEdicao(objetoItem){
    const {id} = useSearchParams();
    const [carregando, setCarregando] = useState(false);
    const [Item, setItem] = useState({});
    const [nomeItem, setNome] = useState("");
    const [tipoItem, setTipo] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [preco, setPreco] = useState(0);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    async function BuscaItem(ID){
        try{
            setCarregando(true);
            const objetoItem = await GET("/");
            setCarregando(false);
            return objetoItem;

        } catch (erro){
            setMensagem(`${erro.message || erro || "Erro na busca de item."}`)
        
        } finally {
            setCarregando(false);
        }
    }

    async function EditarITem() {
        try{
            const itemEditado = { ID_item ,nomeItem, tipoItem, ingredientes, preco }
            const respostaEdicao = await PUT("/", itemEditado);
            if (respostaEdicao.ok){
                setMensagem("Item editado com sucesso.");
                setTimeout(navigate("/menu"), 5000);
            }
        
        } catch (erro){
            setMensagem(`${erro.message || erro || "Erro na edição de item."}`);
        }
    }

    useEffect(() => {
        async () => { 
            const objetoItem = await BuscaItem(ID_item);
            setItem(objetoItem);
        }

        const {nomeItem, tipoItem, ingredientes, preco} = Item;
        setNome(nomeItem);
        setTipo(tipoItem);
        setIngredientes(ingredientes);
        setPreco(preco);

        const tiposItem = document.querySelectorAll("option");
        tiposItem.forEach(tipo => {
            tipo.value === tipoItem ? tipo.selected = true : null
        });
    }, [id]);

    return ( <>
        <BarraNavegacao>edição</BarraNavegacao>
        {!carregando ?
        (<form action="" onSubmit={() => {}} className="w-100 rounded mr-auto ml-auto mt-40 mb-20 p-7 border border-gray-700">
            <label htmlFor="nomeItem">Nome do Item</label>
            <input type="text" name="nomeItem" id="nomeItem" placeholder="Nome do item" value={nomeItem} onInput={() => {}} 
                className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"/>
            
            <label htmlFor="tipoItem">Tipo item</label>
            <select name="tipoItem" id="tipoItem" onChange={() => {}} className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold">
                <option value="prato">Prato</option>
                <option value="bebida">Bebida</option>
            </select>

            <label htmlFor="ingredientes">Ingredientes do item</label>
            <textarea name="ingredientes" id="ingredientes" maxLength={150} value={ingredientes} onInput={() => {}} placeholder="Ingredientes do item"
                className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"></textarea>
            
            <label htmlFor="preco">Preço do item</label>
            <input type="number" name="preco" id="preco" min={1} placeholder="Preço do item" value={preco} onInput={() => {}} className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"/>
            <input type="hidden" name="ID_item" id="ID_item" value={ID_item} className=""/>

            <div className="text-center mt-5">
                <button type="submit" className="w-30 bg-gold text-black font-bold py-3 rounded hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed">Editar</button>
            </div>
        </form>) : null} 
    </>)
}

export default ItemEdicao;