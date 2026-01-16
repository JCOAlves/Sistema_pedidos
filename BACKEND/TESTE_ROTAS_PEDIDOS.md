# Teste das Rotas de Pedidos

## 🔧 Configuração

As rotas de pedidos estão implementadas em `/api/pedidos` e usam as tabelas:
- `pedidos` - armazena os pedidos
- `itens` - armazena os itens do cardápio
- `pedido_item` - tabela de relacionamento entre pedidos e itens

## 📋 Endpoints Disponíveis

### 1. **GET /api/pedidos**
Listar todos os pedidos

**Resposta (200 OK):**
```json
{
  "success": true,
  "message": "Pedidos listados com sucesso",
  "count": 2,
  "data": [
    {
      "ID_pedido": 1,
      "PraViagem": 1,
      "Observacoes": "sem cebola",
      "DataPedido": "2024-01-14T10:30:00.000Z",
      "StatusPedido": "Em preparo"
    }
  ]
}
```

---

### 2. **POST /api/pedidos**
Criar um novo pedido com itens

**Formato da Requisição:**
```json
{
  "praViagem": true,
  "observacoes": "sem cebola",
  "itens": [
    { "id_item": 1, "quantidade": 2 },
    { "id_item": 3, "quantidade": 1 }
  ]
}
```

**Validações:**
- `praViagem` é obrigatório (boolean)
- `itens` deve ser um array não vazio
- Cada item deve ter `id_item` e `quantidade` (número > 0)
- O `id_item` deve existir na tabela `itens`

**Resposta (201 Created):**
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "data": {
    "id": 5,
    "praViagem": true,
    "observacoes": "sem cebola",
    "totalItens": 2
  }
}
```

**Resposta de Erro (400 Bad Request):**
```json
{
  "success": false,
  "message": "Dados incompletos. Envie praViagem (boolean) e itens (array com id_item e quantidade)"
}
```

---

### 3. **GET /api/pedidos/:id**
Buscar pedido por ID com seus itens

**Exemplo:** `GET /api/pedidos/5`

**Resposta (200 OK):**
```json
{
  "success": true,
  "message": "Pedido encontrado",
  "data": {
    "ID_pedido": 5,
    "PraViagem": 1,
    "Observacoes": "sem cebola",
    "DataPedido": "2024-01-14T10:30:00.000Z",
    "StatusPedido": "Em preparo",
    "itens": [
      {
        "ID_pedido_item": 1,
        "id_item": 1,
        "Quantidade": 2,
        "NomeItem": "Frango Grelhado",
        "TipoItem": "Prato",
        "Preco": 28.50,
        "Ingredientes": "Frango, arroz, batata"
      },
      {
        "ID_pedido_item": 2,
        "id_item": 3,
        "Quantidade": 1,
        "NomeItem": "Suco Natural",
        "TipoItem": "Bebida",
        "Preco": 8.50,
        "Ingredientes": "Laranja, Limão"
      }
    ]
  }
}
```

**Resposta de Erro (404 Not Found):**
```json
{
  "success": false,
  "message": "Pedido não encontrado"
}
```

---

## 🧪 Exemplos com cURL

### Listar todos os pedidos
```bash
curl -X GET http://localhost:3000/api/pedidos
```

### Criar um novo pedido
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "praViagem": true,
    "observacoes": "sem cebola",
    "itens": [
      { "id_item": 1, "quantidade": 2 },
      { "id_item": 3, "quantidade": 1 }
    ]
  }'
```

### Buscar pedido específico
```bash
curl -X GET http://localhost:3000/api/pedidos/5
```

---

## 📝 Estrutura das Tabelas

### Tabela `pedidos`
```sql
CREATE TABLE pedidos (
  ID_pedido INT AUTO_INCREMENT PRIMARY KEY,
  PraViagem BOOLEAN DEFAULT 0,
  Observacoes VARCHAR(255),
  DataPedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  StatusPedido VARCHAR(50) DEFAULT 'Em preparo'
);
```

### Tabela `itens`
```sql
CREATE TABLE itens (
  ID_item INT AUTO_INCREMENT PRIMARY KEY,
  NomeItem VARCHAR(100) NOT NULL,
  TipoItem ENUM('Prato', 'Bebida'),
  Ingredientes VARCHAR(200),
  Preco FLOAT NOT NULL
);
```

### Tabela `pedido_item`
```sql
CREATE TABLE pedido_item (
  ID_pedido_item INT AUTO_INCREMENT PRIMARY KEY,
  ID_pedido INT NOT NULL,
  id_item INT NOT NULL,
  Quantidade INT NOT NULL,
  FOREIGN KEY (ID_pedido) REFERENCES pedidos(ID_pedido),
  FOREIGN KEY (id_item) REFERENCES itens(ID_item)
);
```

---

## ✅ Boas Práticas Implementadas

✅ **Validação de entrada** - Todos os dados são validados antes de inserir  
✅ **Transações** - POST usa transação para garantir consistência  
✅ **Respostas padronizadas** - Todos os endpoints retornam `success` + `message` + `data`  
✅ **Tratamento de erros** - Erros são capturados e retornados com status HTTP apropriado  
✅ **Sem gambiarras** - Os IDs são usados em vez de nomes de itens  
✅ **JOINs eficientes** - GET /:id retorna itens com seus dados completos  

---

## 🚀 Frontend - Como Usar

No arquivo `MetodosHTTP.js`, use assim:

```javascript
import { POST, GET } from './MetodosHTTP.js';

// Criar pedido
const novoPedido = await POST('/pedidos', {
  praViagem: true,
  observacoes: 'sem cebola',
  itens: [
    { id_item: 1, quantidade: 2 },
    { id_item: 3, quantidade: 1 }
  ]
});

// Listar pedidos
const pedidos = await GET('/pedidos');

// Buscar pedido específico
const pedido = await GET('/pedidos/5');
```

O `MetodosHTTP.js` já adiciona automaticamente o prefixo `http://localhost:3000/api`, então use rotas relativas!
