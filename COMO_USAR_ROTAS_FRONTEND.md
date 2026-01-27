# Como Usar as Rotas no Frontend

## 📚 Introdução

O arquivo `MetodosHTTP.js` já está configurado com as funções de requisição HTTP. Basta importar e usar!

```javascript
import { GET, POST, PUT, DELETE } from './MetodosHTTP.js';
```

---

## 🔧 Exemplos de Uso

### ITENS

```javascript
// Listar todos os itens
const itens = await GET('/itens');

// Buscar item por ID
const item = await GET('/itens/1');

// Criar novo item
const novoItem = await POST('/itens', {
  nomeItem: 'Pizza Margherita',
  tipoItem: 'Prato Principal',
  preco: 35.00,
  ingredientes: 'Massa, molho, queijo, tomate'
});

// Atualizar item
const itemAtualizado = await PUT('/itens/1', {
  nomeItem: 'Pizza Premium',
  preco: 40.00
});

// Deletar item
const resultado = await DELETE('/itens/1');
```

---

### CLIENTES

```javascript
// Listar todos os clientes
const clientes = await GET('/clientes');

// Buscar por ID
const cliente = await GET('/clientes/1');

// Buscar por CPF
const cliente = await GET('/clientes/123.456.789-00');

// Criar cliente
const novoCliente = await POST('/clientes', {
  nome: 'João Pedro Silva',
  cpf: '123.456.789-00',
  telefone: '(11) 99999-9999',
  email: 'joao@email.com',
  endereco: 'Rua A, 123'
});

// Atualizar cliente (por ID ou CPF)
const clienteAtualizado = await PUT('/clientes/123.456.789-00', {
  telefone: '(11) 98888-8888',
  email: 'joao.novo@email.com'
});

// Deletar cliente (por ID ou CPF)
const resultado = await DELETE('/clientes/123.456.789-00');
```

---

### FUNCIONÁRIOS

```javascript
// Listar todos os funcionários
const funcionarios = await GET('/funcionarios');

// Buscar funcionário por ID
const funcionario = await GET('/funcionarios/1');

// Criar funcionário
const novoFunc = await POST('/funcionarios', {
  nome: 'Maria Santos',
  cargo: 'Gerente',
  telefone: '(11) 97777-7777',
  email: 'maria@restaurant.com',
  cpf: '987.654.321-00'
});

// Atualizar funcionário
const funcAtualizado = await PUT('/funcionarios/1', {
  cargo: 'Gerente Sênior',
  telefone: '(11) 96666-6666'
});

// Deletar funcionário
const resultado = await DELETE('/funcionarios/1');
```

---

### PEDIDOS

```javascript
// Listar todos os pedidos
const pedidos = await GET('/pedidos');

// Buscar pedido com seus itens
const pedido = await GET('/pedidos/1');
// Retorna:
// {
//   ID_pedido: 1,
//   PraViagem: 1,
//   Observacoes: 'Sem cebola',
//   itens: [
//     { ID_item: 1, NomeItem: 'Pizza', Quantidade: 2 },
//     { ID_item: 3, NomeItem: 'Refrigerante', Quantidade: 2 }
//   ]
// }

// Criar pedido
const novoPedido = await POST('/pedidos', {
  praViagem: true,
  observacoes: 'Sem cebola, com muito queijo',
  itens: [
    { id_item: 1, quantidade: 2 },
    { id_item: 3, quantidade: 1 }
  ]
});

// Atualizar pedido
const pedidoAtualizado = await PUT('/pedidos/1', {
  praViagem: false,
  observacoes: 'Entregar em casa',
  itens: [
    { id_item: 2, quantidade: 3 }
  ]
});

// Deletar pedido (remove o pedido e seus itens)
const resultado = await DELETE('/pedidos/1');
```

---

## 💡 Exemplo Prático em um Componente React

```javascript
import { GET, POST, PUT, DELETE } from '../MetodosHTTP.js';
import { useState, useEffect } from 'react';

export default function ListaItens() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Buscar itens quando componente monta
  useEffect(() => {
    carregarItens();
  }, []);

  const carregarItens = async () => {
    try {
      const dados = await GET('/itens');
      setItens(dados.data || dados);
      setCarregando(false);
    } catch (erro) {
      console.error('Erro ao carregar itens:', erro);
      setCarregando(false);
    }
  };

  const criarNovoItem = async () => {
    const novoItem = {
      nomeItem: 'Novo Prato',
      tipoItem: 'Prato Principal',
      preco: 25.00,
      ingredientes: 'Ingredientes aqui'
    };

    const resposta = await POST('/itens', novoItem);
    
    if (resposta.success) {
      console.log('Item criado:', resposta.data);
      carregarItens(); // Recarrega a lista
    } else {
      console.error('Erro:', resposta.message);
    }
  };

  const atualizarItem = async (id) => {
    const dados = {
      nomeItem: 'Nome Atualizado',
      preco: 30.00
    };

    const resposta = await PUT(`/itens/${id}`, dados);
    
    if (resposta.success) {
      console.log('Item atualizado');
      carregarItens();
    }
  };

  const deletarItem = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar?')) {
      const resposta = await DELETE(`/itens/${id}`);
      
      if (resposta.success) {
        console.log('Item deletado');
        carregarItens();
      }
    }
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Itens</h1>
      <button onClick={criarNovoItem}>Criar Novo Item</button>
      
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map(item => (
            <tr key={item.ID_item}>
              <td>{item.NomeItem}</td>
              <td>{item.TipoItem}</td>
              <td>R$ {item.Preco}</td>
              <td>
                <button onClick={() => atualizarItem(item.ID_item)}>Editar</button>
                <button onClick={() => deletarItem(item.ID_item)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## ⚠️ Checklist para Frontend

- [ ] Importar funções HTTP: `import { GET, POST, PUT, DELETE } from './MetodosHTTP.js'`
- [ ] Usar as rotas corretas: `/itens`, `/clientes`, `/funcionarios`, `/pedidos`
- [ ] Verificar resposta: `response.success` e `response.data`
- [ ] Tratar erros com try/catch
- [ ] Recarregar lista após criar/atualizar/deletar
- [ ] Confirmar antes de deletar
- [ ] Mostrar mensagens de sucesso/erro ao usuário

---

## 🔄 Fluxo Completo

```
1. Componente React executa: GET('/itens')
        ↓
2. MetodosHTTP.js monta URL: http://localhost:3000/api/itens
        ↓
3. Envia requisição HTTP para o BACKEND
        ↓
4. Backend processa em: routes/Route_Itens.js
        ↓
5. Controller executa lógica: itensController.listar()
        ↓
6. Database retorna dados: SELECT * FROM itens
        ↓
7. Controller formata resposta JSON
        ↓
8. Frontend recebe: { success: true, data: [...] }
        ↓
9. Componente atualiza estado e renderiza UI
```

---

## 🚀 Próximos Passos

1. **Atualize os componentes** que usam dados (Menu, Pedidos, etc.)
2. **Teste cada rota** usando Postman ou VS Code REST Client
3. **Implemente formulários** para criar/editar recursos
4. **Adicione loading states** durante requisições
5. **Implemente tratamento de erros** com feedback ao usuário
