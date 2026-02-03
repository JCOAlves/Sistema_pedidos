import { useState, useEffect } from "react";
import { POST, GET } from "../MetodosHTTP";
import {validarCPF} from "../ValidacaoCampos.js"

export default function Formulario() {
  const [itensDisponiveis, setItensDisponiveis] = useState([]);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [praViagem, setPraViagem] = useState(false);
  const [observacoes, setObservacoes] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoItens, setCarregandoItens] = useState(true);
  const [pagamento, setPagamento] = useState("");

  // Carregar itens disponíveis ao montar componente
  useEffect(() => {
    carregarItens();
  }, []);

  async function carregarItens() {
    try {
      setCarregandoItens(true);
      const dados = await GET('/itens');
      console.log("Resposta da API:", dados);

      if (dados.success && Array.isArray(dados.data)) {
        setItensDisponiveis(dados.data);
      } else if (Array.isArray(dados)) {
        setItensDisponiveis(dados);
      } else {
        console.error("Formato inesperado:", dados);
        setMensagem("Erro ao carregar itens");
      }
    } catch (error) {
      console.error("Erro ao carregar itens:", erro);
      setMensagem("Erro de conexão ao carregar itens");
    } finally {
      setCarregandoItens(false);
    }
  }

  function adicionarItem(item) {
    const id = item.ID_item || item.id;
    const nome = item.NomeItem || item.nome;
    const preco = item.Preco || item.preco || 0;

    const itemExistente = itensCarrinho.find(i => i.id_item === id);

    if (itemExistente) {
      setItensCarrinho(itensCarrinho.map(i =>
        i.id_item === id
          ? { ...i, quantidade: i.quantidade + 1 }
          : i
      ));
    } else {
      setItensCarrinho([...itensCarrinho, {
        id_item: id,
        quantidade: 1,
        nome: nome,
        preco: preco
      }]);
    }
    setMensagem(`${nome} adicionado ao carrinho`);
    setTimeout(() => setMensagem(""), 2000);
  }

  function removerItem(id_item) {
    setItensCarrinho(itensCarrinho.filter(i => i.id_item !== id_item));
  }

  function alterarQuantidade(id_item, novaQtd) {
    if (novaQtd <= 0) {
      removerItem(id_item);
    } else {
      setItensCarrinho(itensCarrinho.map(i =>
        i.id_item === id_item ? { ...i, quantidade: novaQtd } : i
      ));
    }
  }

  //Ajustar função
  function VerificasaoCPF(CPF){
    const CPFValido = validarCPF(CPF);
    if(CPFValido){
      setCPF(CPF);
      setMensagem("");
    } else{
      setCPF(CPF);
      setMensagem("CPF invalido");
    }
  }

  function FormaContato(tipoContato) {
    switch (tipoContato) {
      case "tel":
        document.getElementById("contato").type = "tel";
        document.getElementById("contato").placeholder = "Número de telefone";
        document.getElementById("contato").maxLegth = 20;
        document.getElementById("contato").value = telefone;
        break;
      case "email":
        document.getElementById("contato").type = "email";
        document.getElementById("contato").placeholder = "Endereço de email";
        document.getElementById("contato").maxLegth = 100;
        document.getElementById("contato").value = email;
        break;
    }
  }

  function SelecaoContato(tipoContato, valor) {
    switch (tipoContato) {
      case "tel":
        setTelefone(valor);
        break;
      case "email":
        setEmail(valor);
        break;
    }
  }

  async function enviarPedido(e) {
    e.preventDefault();

    if (itensCarrinho.length === 0) {
      setMensagem("Adicione pelo menos um item ao carrinho");
      return;
    }

    if (nome === "" || cpf === "" || (email === "" && telefone === "")){
      setMensagem("Adicione seus dados de identificação e contato");
      return;
    }

    if(pagamento === ""){
      setMensagem("Selecione a forma de pagamento.");
      return;
    }

    setCarregando(true);

    try {
      //Envio dos dados do cliente
      const dadosCliente = await POST("/clientes", {
        nome, cpf, email, telefone
      });
      console.log("Resposta do cadastro do cliente:", dadosCliente);
      
      //Envio dos dados do pedido
      const dadosPedido = await POST('/pedidos', {
        praViagem,
        observacoes,
        itens: itensCarrinho.map(i => ({
          id_item: i.id_item,
          quantidade: i.quantidade
        }))
      });
      console.log("Resposta do pedido:", dadosPedido);

      // Criar pagamento com dados do pedido e valor total
      const dadosPagamento = dadosPedido.success && dadosPedido.data
        ? await POST("/pagamentos", {
            pedido: dadosPedido.data.id,
            valorPago: total,
            formaPagamento: pagamento
          })
        : { success: false, message: "Erro ao obter ID do pedido" };
      
      console.log("Resposta do cadastro de pagamento:", dadosPagamento);

      if (dadosPedido.success && dadosCliente.success && dadosPagamento.success) {
        setMensagem(`Pedido #${dadosPedido.data.id} criado com sucesso! Pagamento registrado.`);
        setItensCarrinho([]);
        setObservacoes("");
        setPraViagem(false);
        setNome("");
        setCPF("");
        setTelefone("");
        setEmail("");
        setPagamento("");
        window.scrollTo(0, 0);
      } else {
        setMensagem(`${dadosPedido.message || dadosCliente.message || dadosPagamento.message || "Erro ao criar pedido"}`);
      }

    } catch (error) {
      setMensagem("Erro de conexão com o servidor");
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  // Separar itens por tipo
  const pratos = itensDisponiveis.filter(item =>
    (item.TipoItem === 'Prato' || item.categoria === 'Lanches' || item.categoria === 'Pratos')
  );

  const bebidas = itensDisponiveis.filter(item =>
    (item.TipoItem === 'Bebida' || item.categoria === 'Bebidas')
  );

  const total = itensCarrinho.reduce((acc, i) => acc + (i.preco * i.quantidade), 0);

  return (<>
    <div className="p-6 max-w-6xl mr-auto ml-auto mt-18 mb-10">
      {mensagem && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded text-white font-semibold z-50 ${mensagem.includes('sucesso') ? 'bg-green-600' : 'bg-red-600'
      }`}>
          {mensagem}
        </div>
      )}

      <h2 className="text-center font-serif text-4xl md:text-5xl text-white mt-2 uppercase tracking-wide">Fazer Pedido</h2>
      <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna esquerda: Menu */}
        <div className="lg:col-span-2 space-y-6">

          {carregandoItens ? (
            <div className="text-center text-gray-400 py-8">
              <p>Carregando itens...</p>
            </div>
          ) : itensDisponiveis.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>Nenhum item disponível</p>
            </div>
          ) : (
            <>
              {/* Pratos */}
              {pratos.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gold mb-4">Pratos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pratos.map(item => (
                      <div key={item.ID_item || item.id} className="bg-dark rounded-lg p-4 border border-gray-700 hover:border-gold transition">
                        <div className="mb-3">
                          <h3 className="text-white font-semibold text-lg">{item.NomeItem || item.nome}</h3>
                          {item.Ingredientes && (
                            <p className="text-gray-400 text-sm">{item.Ingredientes}</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gold font-bold text-lg">
                            R$ {(item.Preco || item.preco || 0).toFixed(2)}
                          </span>
                          <button
                            onClick={() => adicionarItem(item)}
                            className="bg-gold text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bebidas */}
              {bebidas.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gold mb-4">Bebidas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bebidas.map(item => (
                      <div key={item.ID_item || item.id} className="bg-dark rounded-lg p-4 border border-gray-700 hover:border-gold transition">
                        <div className="mb-3">
                          <h3 className="text-white font-semibold text-lg">{item.NomeItem || item.nome}</h3>
                          {item.Ingredientes && (
                            <p className="text-gray-400 text-sm">{item.Ingredientes}</p>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gold font-bold text-lg">
                            R$ {(item.Preco || item.preco || 0).toFixed(2)}
                          </span>
                          <button
                            onClick={() => adicionarItem(item)}
                            className="bg-gold text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Coluna direita: Carrinho */}
        <div className="lg:col-span-1">
          <div className="bg-dark rounded-lg p-6 border border-gray-700 sticky top-20">
            <h2 className="text-2xl font-bold text-white mb-4">Seu Pedido</h2>

            {/* Items no carrinho */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {itensCarrinho.length === 0 ? (
                <p className="text-gray-400 text-center py-4">Carrinho vazio</p>
              ) : (
                itensCarrinho.map(item => (
                  <div key={item.id_item} className="bg-darker rounded p-3 border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold text-sm">{item.nome}</span>
                      <span className="text-gold font-bold">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alterarQuantidade(item.id_item, item.quantidade - 1)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700 w-8"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantidade}
                        onChange={(e) => alterarQuantidade(item.id_item, parseInt(e.target.value) || 1)}
                        className="w-12 bg-darker text-white text-center rounded border border-gray-600 text-sm"
                      />
                      <button
                        onClick={() => alterarQuantidade(item.id_item, item.quantidade + 1)}
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-green-700 w-8"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removerItem(item.id_item)}
                        className="ml-auto bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 font-bold"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total */}
            {itensCarrinho.length > 0 && (
              <div className="border-t border-gray-700 pt-3 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white font-bold text-lg">Total:</span>
                  <span className="text-gold font-bold text-2xl">R$ {total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={enviarPedido} className="">
              <div className="text-[13px] text-red-500 mb-3">*Campo obrigatorio</div>
              <label htmlFor="nome">Nome <span className="text-red-500">*</span></label>
              <input className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
                type="text" name="nome" id="nome" placeholder="Nome do cliente" value={nome} onInput={(e) => setNome(e.target.value)} required maxLength={100}/>

              <label htmlFor="cpf">CPF <span className="text-red-500">*</span></label>
              <input className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold"
                type="text" name="cpf" id="cpf" placeholder="Número de CPF" value={cpf} 
                onInput={(e) => {VerificasaoCPF(e.target.value)}} required maxLength={15}/>

              <label htmlFor="contato">Contato <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-[auto_1fr] gap-2.5">
                <select name="" id="" onChange={(e) => FormaContato(e.target.value)}
                  className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold">
                  <option value={"tel"}>Telefone</option>
                  <option value={"email"}>Email</option>
                </select>
                <input type="tel" name="contato" id="contato" onInput={(e) => { SelecaoContato(e.target.type, e.target.value) }}
                  placeholder="Número de telefone" maxLength={20} required
                  className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold" />
              </div>

              <label className="flex items-center mt-1 mb-4 gap-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={praViagem}
                  onChange={() => setPraViagem(!praViagem)}
                  className="w-4.5 h-4.5 accent-gold cursor-pointer"
                />
                <span className="text-[15px]">Para viagem</span>
              </label>

              <label htmlFor="observacoes">Observações</label>
              <textarea
                placeholder="Ex: sem cebola, sem gelo."
                value={observacoes} id="observacoes"
                onInput={(e) => setObservacoes(e.target.value)}
                className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold text-sm"
                rows="3"
              />

              <label htmlFor="pagamento">Forma de pagamento <span className="text-red-500">*</span></label>
              <select name="" id="pagamento" onChange={(e) => {setPagamento(e.target.value)}} required
                className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700 focus:outline-none focus:border-gold">
                <option value="" disabled selected>Selecione a forma de pagamento</option>
                <option value="Pix">Pix</option>
                <option value="Debito">Cartão de Debito</option>
                <option value="Credito">Cartão de Crédito</option>
                <option value="Dinheiro">Dinheiro em espécie</option>
              </select>

              <button
                type="submit"
                disabled={carregando || itensCarrinho.length === 0}
                className="w-full bg-gold text-black font-bold py-3 rounded hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Enviando..." : "Fazer Pedido"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>);
} 