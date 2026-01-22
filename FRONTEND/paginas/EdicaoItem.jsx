import {useEffect, useState} from "react"
import {useSearchParams, useNavigate} from "react-router-dom"
import {GET, PUT} from "../MetodosHTTP.js"

//Página de edição de item do menu.
function ItemEdicao(objetoItem){
    const {ID_item} = useSearchParams();
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
    }, [ID_item]);

    return ( <>
        {carregando ?
        (<form action="" onSubmit={() => {}}>
            <input type="hidden" name="ID_item" id="ID_item" value={ID_item} className=""/>
            <input type="text" name="nomeItem" id="nomeItem" placeholder="" value={nomeItem} onInput={() => {}} className=""/>
            <select name="tipoItem" id="tipoItem" onChange={() => {}} className="">
                <option value="prato">Prato</option>
                <option value="bebida">Bebida</option>
            </select>
            <textarea name="ingredientes" id="ingredientes" maxLength={150} value={ingredientes} onInput={() => {}} className=""></textarea>
            <input type="number" name="preco" id="preco" min={1} placeholder="Preço do item" value={preco} onInput={() => {}} className=""/>
            <button type="submit">Editar</button>
        </form>) : null} 
    </>)
}

export default ItemEdicao;