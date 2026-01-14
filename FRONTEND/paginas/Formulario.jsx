import { useState } from "react";
import { POST } from "../MetodosHTTP.js"

export default function Formulario() {
    const [nome, setNome] = useState("");
    const [CPF, setCPF] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [itens, setItens] = useState("");
    const [praViagem, setPraViagem] = useState(false);
    const [observacoes, setObservacoes] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function enviarPedido(e) {
        e.preventDefault();

        if (!nome || !CPF) {
            setMensagem("Por favor preencha nome e CPF.");
            return;
        }

        try { //A seleção de itens do pedido será feita no formato de cards.
            // parse items string into array of { nome, quantidade }
            const parsedItens = itens
                .split(',')
                .map(s => s.trim())
                .filter(Boolean)
                .map(part => {
                    const m = part.match(/^(\d+)\s*[xX]?\s*(.+)$/);
                    if (m) return { nome: m[2].trim(), quantidade: Number(m[1]) };
                    return { nome: part, quantidade: 1 };
                });


            //Utilização da função POST de MetodosHTTP.js
            const dadosForm = {
                nome: nome,
                cpf: CPF,
                telefone: telefone,
                email: email,
                itens: parsedItens,
                praViagem: praViagem,
                observacoes: observacoes
            }

            const response = await POST("http://localhost:3000/api/pedidos", dadosForm);

            if (!response.ok) {
                setMensagem(response.erro || "Erro ao criar pedido");
                return;
            }

            setMensagem("Pedido criado com sucesso!");
            setNome("");
            setCPF("");
            setTelefone("");
            setEmail("");
            setItens("");
            setObservacoes("");
            setPraViagem(false);

        } catch (error) {
            setMensagem("Erro de conexão com o servidor");
            return;
        }
    }

    function FormaContato(tipoContato) {
        switch (tipoContato) {
            case "telefone":
                document.getElementById("contato").type = "tel";
                document.getElementById("contato").placeholder = "Número de telefone";
                document.getElementById("contato").maxLength = 9;
                break;
            case "email":
                document.getElementById("contato").type = "email";
                document.getElementById("contato").placeholder = "Endereço de email";
                document.getElementById("contato").maxLength = 100;
                break;
        }
    }

    function SelecaoContato(tipoInput, valorCampo){
        switch(tipoInput){
            case "tel":
                setTelefone(valorCampo);
                break;
            case "email":
                setEmail(valorCampo);
                break;
        }

    }

    return (
        <div className="p-6 max-w-md mx-auto bg-dark rounded-lg shadow-lg">
            <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl text-white mt-2 uppercase tracking-wide">Formulário do Cliente
                </h2>
                <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
            </div>

            <form onSubmit={enviarPedido} className="">
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    placeholder="Nome completo (Nome e sobrenome)"
                    id="nome"
                    value={nome}
                    onInput={(e) => setNome(e.target.value)}
                    className="campo w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
                    maxLength={100}
                    required
                />

                <label htmlFor="cpf">CPF</label>
                <input
                    type="text"
                    placeholder="Cadastro de Pessoa Física"
                    id="cpf"
                    value={CPF}
                    onInput={(e) => setCPF(e.target.value)}
                    className="campo w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
                    maxLength={11}
                    required
                />

                <label htmlFor="contato">Contato</label>
                <div className="grid grid-cols-[1fr_2.5fr] gap-2 grid-row-1">
                    <select name="" id="" onChange={(e) => {FormaContato(e.target.value)}}
                    className="campo w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold">
                        <option value="telefone">Telefone</option>
                        <option value="email">Email</option>
                    </select>

                    <input
                        type="tel"
                        placeholder="Número de telefone"
                        id="contato"
                        value={telefone}
                        onInput={(e) => {SelecaoContato(e.target.type, e.target.value)}}
                        className="campo w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
                        maxLength={9}
                        required
                    />
                </div>

                <label htmlFor="pedido">Pedido</label>
                <input
                    type="text"
                    placeholder="Campo temporario"
                    id="pedido"
                    value={itens}
                    onInput={(e) => setItens(e.target.value)}
                    className="campo w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
                    required
                />

                <label className="campo flex items-center gap-2 text-gray-300">
                    <input
                        type="checkbox"
                        checked={praViagem}
                        onChange={(e) => setPraViagem(e.target.checked)}
                        className="accent-gold"
                    />
                    Para viagem
                </label>

                <label htmlFor="observacao">Observacao</label>
                <textarea
                    placeholder="Alterações no pedido ou aviso de restrições alimentares (alergias ou intolerâncias alimentares)."
                    id="observacao"
                    value={observacoes}
                    onInput={(e) => setObservacoes(e.target.value)}
                    className="campo w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
                />

                <button
                    type="submit"
                    className="w-full bg-gold text-black font-bold py-3 rounded hover:bg-yellow-400 transition"
                >
                    Fazer pedido
                </button>
            </form>

            {mensagem && (
                <p className="mt-4 text-center text-gold">{mensagem}</p>
            )}
        </div>
    );
}
