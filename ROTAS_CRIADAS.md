# Rotas Criadas - Sistema de Pedidos

## Resumo das Rotas Implementadas

### 1. ITENS

| Método | Rota | Descrição |
|--------|------|----------|
| GET | `/itens` | Listar todos os itens |
| POST | `/itens` | Criar novo item |
| GET | `/itens/:id` | Buscar item por ID |
| PUT | `/itens/:id` | Atualizar item |
| DELETE | `/itens/:id` | Deletar item |

**Exemplo POST /itens:**
```json
{
  "nomeItem": "Hamburger",
  "tipoItem": "Prato Principal",
  "preco": 25.50,
  "ingredientes": "Pão, carne, queijo, alface"
}
```

**Exemplo PUT /itens/:id:**
```json
{
  "nomeItem": "Hamburger Deluxe",
  "preco": 28.50
}
```

---

### 2. CLIENTES

| Método | Rota | Descrição |
|--------|------|----------|
| GET | `/clientes` | Listar todos os clientes |
| POST | `/clientes` | Criar novo cliente |
| GET | `/clientes/:id` | Buscar cliente por ID ou CPF |
| PUT | `/clientes/:id` | Atualizar cliente por ID ou CPF |
| DELETE | `/clientes/:id` | Deletar cliente por ID ou CPF |

**Exemplo POST /clientes:**
```json
{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "telefone": "(11) 9 1234-5678",
  "email": "joao@example.com",
  "endereco": "Rua A, 123"
}
```

**Exemplo GET /clientes/123 ou /clientes/123.456.789-00:**
- Busca por ID: `GET /clientes/123`
- Busca por CPF: `GET /clientes/123.456.789-00`

---

### 3. FUNCIONÁRIOS

| Método | Rota | Descrição |
|--------|------|----------|
| GET | `/funcionarios` | Listar todos os funcionários |
| POST | `/funcionarios` | Criar novo funcionário |
| GET | `/funcionarios/:id` | Buscar funcionário por ID |
| PUT | `/funcionarios/:id` | Atualizar funcionário |
| DELETE | `/funcionarios/:id` | Deletar funcionário |

**Exemplo POST /funcionarios:**
```json
{
  "nome": "Maria Santos",
  "cargo": "Cozinheira",
  "telefone": "(11) 9 8765-4321",
  "email": "maria@example.com",
  "cpf": "987.654.321-00"
}
```

---

### 4. PEDIDOS

| Método | Rota | Descrição |
|--------|------|----------|
| GET | `/pedidos` | Listar todos os pedidos |
| POST | `/pedidos` | Criar novo pedido |
| GET | `/pedidos/:id` | Buscar pedido por ID (com itens) |
| PUT | `/pedidos/:id` | Atualizar pedido |
| DELETE | `/pedidos/:id` | Deletar pedido (e seus itens) |

**Exemplo POST /pedidos:**
```json
{
  "praViagem": true,
  "observacoes": "Sem cebola",
  "itens": [
    {
      "id_item": 1,
      "quantidade": 2
    },
    {
      "id_item": 3,
      "quantidade": 1
    }
  ]
}
```

**Exemplo PUT /pedidos/:id:**
```json
{
  "praViagem": false,
  "observacoes": "Com maionese",
  "itens": [
    {
      "id_item": 2,
      "quantidade": 3
    }
  ]
}
```

---

## Estrutura de Respostas

### Resposta de Sucesso (GET/PUT/DELETE)
```json
{
  "success": true,
  "message": "Descrição da ação realizada",
  "data": { ... }
}
```

### Resposta de Sucesso (Listagem)
```json
{
  "success": true,
  "message": "Descrição da ação realizada",
  "count": 10,
  "data": [ ... ]
}
```

### Resposta de Sucesso (Criação)
```json
{
  "success": true,
  "message": "Recurso criado com sucesso",
  "data": {
    "id": 1,
    ...
  }
}
```

### Resposta de Erro
```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Detalhes técnicos do erro"
}
```

---

## Códigos HTTP Utilizados

- **200**: OK - Requisição bem-sucedida (GET, PUT, DELETE)
- **201**: Created - Recurso criado com sucesso (POST)
- **400**: Bad Request - Dados inválidos ou incompletos
- **404**: Not Found - Recurso não encontrado
- **500**: Internal Server Error - Erro no servidor

---

## Recursos

Todos os controladores foram criados/atualizados em:
- [itensController.js](BACKEND/controllers/itensController.js)
- [clientesController.js](BACKEND/controllers/clientesController.js)
- [funcionariosController.js](BACKEND/controllers/funcionariosController.js)
- [pedidosController.js](BACKEND/controllers/pedidosController.js)

Todas as rotas foram configuradas em:
- [Route_Itens.js](BACKEND/routes/Route_Itens.js)
- [Route_Clientes.js](BACKEND/routes/Route_Clientes.js)
- [Route_Funcionarios.js](BACKEND/routes/Route_Funcionarios.js)
- [Route_Pedidos.js](BACKEND/routes/Route_Pedidos.js)
