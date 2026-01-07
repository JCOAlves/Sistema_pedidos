import { useState } from "react";

export default function Formulario() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [itens, setItens] = useState("");
  const [praViagem, setPraViagem] = useState(false);
  const [observacoes, setObservacoes] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function enviarPedido(e) {
    e.preventDefault();

    if (!nome || !telefone) {
      setMensagem("Por favor preencha nome e telefone.");
      return;
    }

    try {
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

      const response = await fetch("http://localhost:3000/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          telefone,
          endereco,
          itens: parsedItens,
          praViagem,
          observacoes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensagem(data.erro || "Erro ao criar pedido");
        return;
      }

      setMensagem("Pedido criado com sucesso!");
      setNome("");
      setTelefone("");
      setEndereco("");
      setItens("");
      setObservacoes("");
      setPraViagem(false);

    } catch (error) {
      setMensagem("Erro de conexão com o servidor");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-dark rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-6">Formulário de Pedido</h1>

      <form onSubmit={enviarPedido} className="space-y-4">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
          required
        />

        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
          required
        />

        <input
          type="text"
          placeholder="Endereço (opcional)"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
        />

        <input
          type="text"
          placeholder="Itens (ex: 2x Pizza, 1x Coca)"
          value={itens}
          onChange={(e) => setItens(e.target.value)}
          className="w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
          required
        />

        <label className="flex items-center gap-2 text-gray-300">
          <input
            type="checkbox"
            checked={praViagem}
            onChange={(e) => setPraViagem(e.target.checked)}
            className="accent-gold"
          />
          Para viagem
        </label>

        <textarea
          placeholder="Observações do pedido"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          className="w-full p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
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
