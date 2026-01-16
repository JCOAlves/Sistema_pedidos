# 🎨 Frontend Conectado ao Backend

## ✅ O que foi feito

### 📄 Página Formulario.jsx
- ✅ Carrega itens disponíveis do backend automaticamente
- ✅ Separa itens por categoria (Pratos e Bebidas)
- ✅ Sistema de carrinho de compras interativo
- ✅ Adicionar, remover e alterar quantidade de itens
- ✅ Cálculo automático do total
- ✅ Checkbox para "Para Viagem"
- ✅ Campo de observações
- ✅ Envia pedido com formato correto (id_item + quantidade)
- ✅ Feedback visual de sucesso/erro

### 📋 Página Pedidos.jsx
- ✅ Lista todos os pedidos
- ✅ Filtro por status (Todos, Em preparo, Entregue, Pago, Cancelado)
- ✅ Clique em pedido para ver detalhes
- ✅ Mostra itens do pedido com JOIN (nome, preço, ingredientes)
- ✅ Cálculo de total por item e geral
- ✅ Recarrega automaticamente a cada 5 segundos
- ✅ Formatação de data em português
- ✅ Ícones e cores por status

---

## 🚀 Como Usar

### Passo 1: Certifique-se que o Backend está rodando
```bash
# Terminal 1: Na pasta BACKEND
npm start
```

Deve mostrar: `CONEXÃO COM MYSQL ESTABELECIDA!`

### Passo 2: Rode o Frontend
```bash
# Terminal 2: Na pasta FRONTEND
npm run dev
```

Deve abrir em: `http://localhost:5173`

### Passo 3: Teste o Formulário
1. Vá para a rota: `/form/pedido`
2. Clique em "Adicionar" em qualquer item
3. Veja o carrinho atualizar na direita
4. Ajuste a quantidade se necessário
5. Marque "Para viagem" se quiser
6. Adicione observações (opcional)
7. Clique em "Fazer Pedido"
8. Se sucesso, verá mensagem: `✅ Pedido #X criado com sucesso!`

### Passo 4: Veja os Pedidos
1. Vá para a rota: `/pedidos`
2. Veja a lista de pedidos criados
3. Clique em um pedido para ver detalhes
4. Veja os itens com preço, quantidade e total

---

## 📊 Fluxo de Dados

```
Frontend (Formulario.jsx)
    ↓
    → GET /api/itens (carrega cardápio)
    → Usuário clica em items e monta carrinho
    → POST /api/pedidos com { praViagem, observacoes, itens }
    ↓
Backend (pedidosController.js)
    ↓
    → Valida dados
    → INSERT INTO pedidos
    → INSERT INTO pedido_item (para cada item)
    ↓
Frontend (Pedidos.jsx)
    ↓
    → GET /api/pedidos (lista todos)
    → GET /api/pedidos/:id (busca com itens via JOIN)
    ↓
Mostra dados formatados e atualiza a cada 5s
```

---

## 🎨 Componentes Atualizados

### MetodosHTTP.js
- ✅ Já tem API_BASE_URL configurada (`http://localhost:3000/api`)
- ✅ Funções GET, POST, PUT, DELETE prontas
- ✅ Trata erros automaticamente

### Formulario.jsx
- ✅ `useState` para gerenciar itens, carrinho, estado
- ✅ `useEffect` para carregar itens ao montar
- ✅ Funções: `carregarItens`, `adicionarItem`, `removerItem`, `alterarQuantidade`, `enviarPedido`
- ✅ Usa `POST('/pedidos', {...})` do MetodosHTTP

### Pedidos.jsx
- ✅ `useState` para pedidos, pedido selecionado, carregamento
- ✅ `useEffect` com intervalo de 5 segundos
- ✅ Funções: `carregarPedidos`, `abrirPedido`, `formatarData`
- ✅ Usa `GET('/pedidos')` e `GET('/pedidos/:id')` do MetodosHTTP

---

## ✨ Funcionalidades Extras

### Carrinho de Compras
- Adicionar itens com 1 clique
- Aumentar/diminuir quantidade
- Remover item individual
- Total automático em tempo real
- Feedback visual ao adicionar

### Status e Filtros
- Filtrar por status do pedido
- Cores diferentes por status:
  - 🟡 Em preparo (amarelo)
  - 🟢 Entregue (verde)
  - 🔵 Pago (azul)
  - 🔴 Cancelado (vermelho)

### Atualização em Tempo Real
- Recarrega pedidos a cada 5 segundos automaticamente
- Pode desligar o intervalo se quiser

---

## 🔍 Testando Manualmente

### Criar um pedido via formulário:
1. Abra `http://localhost:5173/form/pedido`
2. Clique em 2-3 itens diferentes
3. Mude as quantidades
4. Marque "Para viagem"
5. Adicione observação: "teste"
6. Clique em "Fazer Pedido"
7. Veja mensagem de sucesso com ID

### Ver o pedido em Pedidos:
1. Vá para `http://localhost:5173/pedidos`
2. Você verá o pedido criado listado
3. Clique para ver detalhes
4. Veja os itens, preço e total

### Verificar via REST Client:
1. Abra `TESTE_REQUISICOES.http`
2. Execute `GET /api/pedidos`
3. Compare com o que vê no frontend

---

## 🆘 Se Algo Não Funcionar

### Erro "API_BASE_URL is not defined"
- Verifique se `MetodosHTTP.js` tem a constante `API_BASE_URL`

### Itens não aparecem no formulário
- Verifique se backend está respondendo em `/api/itens`
- Abra DevTools (F12) e veja a aba Network

### Pedido não é criado
- Veja o console do navegador (F12) para mensagens de erro
- Veja o console do backend para erros de banco de dados

### Dados não atualizam em tempo real
- Aumente o intervalo de 5000ms (5 segundos) se quiser
- Ou implemente WebSocket para tempo real de verdade

---

## 💡 Melhorias Futuras (Opcional)

Se quiser melhorar ainda mais:

1. **Autenticação** - Login com token JWT
2. **WebSocket** - Atualizações em tempo real sem polling
3. **Localização de Pedidos** - Mapa do entregador
4. **Histórico** - Pedidos anteriores
5. **Avaliação** - Classificar pedido após entrega
6. **Notificações** - Alertar quando pedido sair do preparo
7. **Pagamento** - Integrar Stripe/PayPal
8. **Cupons** - Desconto com código

---

## 📁 Arquivos Modificados

- ✅ [Formulario.jsx](./paginas/Formulario.jsx) - Novo sistema de carrinho e integração
- ✅ [Pedidos.jsx](./paginas/Pedidos.jsx) - Listagem e detalhes de pedidos
- ✅ [MetodosHTTP.js](./MetodosHTTP.js) - Já estava pronto com base URL

---

**Agora o frontend está 100% conectado ao backend!** 🎉

Se tiver dúvidas ou quiser fazer mais algo, me avise!
