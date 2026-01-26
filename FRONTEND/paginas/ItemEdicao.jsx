import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import BarraNavegacao from "../componentes/Navegacao.jsx";
import { GET, PUT, POST } from "../MetodosHTTP.js"

//Página de edição de item do menu.
function ItemForm({ funcaoItem = "criar" }) {
    const { id } = useSearchParams();
    const [carregando, setCarregando] = useState(false);
    const [Item, setItem] = useState({});
    const [nomeItem, setNome] = useState("");
    const [tipoItem, setTipo] = useState("");
    const [ingredientes, setIngredientes] = useState("");
    const [preco, setPreco] = useState(1);
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    //if (id === undefined){ navigate("/ERRO") }

    async function BuscaItem(ID) {
        try {
            setCarregando(true);
            const objetoItem = await GET("/");
            setCarregando(false);
            return objetoItem;

        } catch (error) {
            setMensagem(`${erro.message || erro || "Erro na busca de item."}`)

        } finally {
            setCarregando(false);
        }
    }

    async function EditarItem() {
        try {
            const itemEditado = { id, nomeItem, tipoItem, ingredientes, preco }
            const respostaEdicao = await PUT("/", itemEditado);
            if (respostaEdicao.ok) {
                setMensagem("Item editado com sucesso.");
                setTimeout(navigate("/menu"), 5000);
            }

        } catch (error) {
            setMensagem(`${erro.message || erro || "Erro na edição de item."}`);
        }
    }

    async function criarItem() {
        try {
            const dadosItem = { nomeItem, tipoItem, ingredientes, preco };
            const respostaCriacao = await POST("/", dadosItem);
            if (respostaCriacao.ok) {
                setMensagem("Item criado com sucesso.");
                setTimeout(navigate("/menu"), 5000);
            }

        } catch (error) {
            console.error("Erro na criação de item.");
            setMensagem(`${erro.message || erro || "Erro na criação de item."}`);
        }
    }

    useEffect(() => {
        if (funcaoItem === "editar") {
            async () => {
                const objetoItem = await BuscaItem(ID_item);
                setItem(objetoItem);
            }

            const { nomeItem, tipoItem, ingredientes, preco } = Item;
            setNome(nomeItem);
            setTipo(tipoItem);
            setIngredientes(ingredientes);
            setPreco(preco);

            const tiposItem = document.querySelectorAll("option");
            tiposItem.forEach(tipo => {
                tipo.value === tipoItem ? tipo.selected = true : null
            });
        }

    }, [id]);

    return (<>
        <BarraNavegacao>{funcaoItem === "criar" ? "Registrar item" : "editar item"}</BarraNavegacao>
        {!carregando ?
            (<form action="" onSubmit={() => { funcaoItem === "criar" ? criarItem() : EditarItem() }} className="w-auto max-w-150 rounded mr-auto ml-auto mt-35 mb-20 p-7 border border-gray-700">
                <label htmlFor="nomeItem">Nome do Item</label>
                <input type="text" name="nomeItem" id="nomeItem" placeholder="Nome do item" value={nomeItem} onInput={() => { }}
                    className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold" />

                <div className="grid grid-cols-[1fr_1fr] grid-rows-[auto] gap-5 mb-4">
                    <div>
                        <label htmlFor="tipoItem">Tipo item</label>
                        <select name="tipoItem" id="tipoItem" onChange={() => { }} className="w-full mt-2 p-3.5 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold">
                            <option value="prato">Prato</option>
                            <option value="bebida">Bebida</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="preco">Preço do item</label>
                        <input type="number" name="preco" id="preco" min={1} placeholder="Preço do item" value={preco} onInput={() => { }} className="w-full mt-2 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold" />
                    </div>
                </div>

                <label htmlFor="ingredientes">Ingredientes do item</label>
                <textarea name="ingredientes" id="ingredientes" maxLength={150} value={ingredientes} onInput={() => { }} placeholder="Ingredientes do item"
                    className="w-full h-100 mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"></textarea>

                {funcaoItem === "editar" ? (<input type="hidden" name="ID_item" id="ID_item" value={id} />) : null}

                <div className="text-center mt-5">
                    <button type="submit" className="w-30 bg-gold text-black font-bold py-3 rounded hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {funcaoItem === "criar" ? "Criar" : "Editar"}</button>
                </div>
            </form>) : null}
    </>)
}

export default ItemForm;