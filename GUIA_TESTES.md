# 🧪 GUIA PRÁTICO DE TESTES

## ⚡ Opção 1: Usar REST Client do VS Code (Recomendado)

### Passo 1: Instalar Extensão
1. Abra a aba de **Extensões** (Ctrl+Shift+X)
2. Procure por **"REST Client"** 
3. Instale a extensão feita por **Huachao Mao**

### Passo 2: Abrir o Arquivo de Testes
- Abra o arquivo: `TESTE_REQUISICOES.http`
- Veja que cada requisição tem um link **"Send Request"** acima

### Passo 3: Executar os Testes
Siga a ordem:

1. **Teste #1** (Status) - Verifica conexão com banco
   - Espera: `"success": true`
   
2. **Teste #2** (Listar itens) - Vê quais itens existem
   - Anote os `ID_item` que você vai usar
   - Exemplo: `"ID_item": 1`, `"ID_item": 3`, etc.

3. **Teste #3** (Listar pedidos) - Vê todos os pedidos
   - Deve estar vazio ou com poucos pedidos

4. **Teste #4** (Criar pedido) - ⭐ TESTE PRINCIPAL
   - Clique em "Send Request"
   - Espera resposta com `"success": true`
   - **Anote o ID do pedido retornado** (ex: `"id": 5`)

5. **Teste #5** (Buscar pedido) - Substitua o ID
   - Mude `GET /pedidos/1` para `GET /pedidos/{ID_QUE_ANOTOU}`
   - Deve retornar o pedido com os itens completos

6. **Testes #6-10** - Testes de validação
   - Verificam se o backend rejeita dados inválidos
   - Todos devem retornar erros com `"success": false`

---

## ⚡ Opção 2: Usar cURL no PowerShell

Abra um **novo terminal PowerShell** na pasta `Sistema_pedidos` e execute:

### Teste 1: Verificar Status
```powershell
curl -X GET http://localhost:3000/api/status `
  -Headers @{"Content-Type"="application/json"} | ConvertTo-Json
```

### Teste 2: Listar Itens
```powershell
curl -X GET http://localhost:3000/api/itens `
  -Headers @{"Content-Type"="application/json"} | ConvertTo-Json
```

### Teste 3: Listar Pedidos
```powershell
curl -X GET http://localhost:3000/api/pedidos `
  -Headers @{"Content-Type"="application/json"} | ConvertTo-Json
```

### Teste 4: Criar Pedido (⭐ PRINCIPAL)
```powershell
$body = @{
    praViagem = $true
    observacoes = "sem cebola"
    itens = @(
        @{ id_item = 1; quantidade = 2 },
        @{ id_item = 3; quantidade = 1 }
    )
} | ConvertTo-Json

curl -X POST http://localhost:3000/api/pedidos `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body | ConvertTo-Json
```

### Teste 5: Buscar Pedido por ID
```powershell
# Substitua "5" pelo ID que foi retornado no teste anterior
curl -X GET http://localhost:3000/api/pedidos/5 `
  -Headers @{"Content-Type"="application/json"} | ConvertTo-Json
```

---

## ⚡ Opção 3: Usar Postman/Insomnia

### Passo 1: Baixar Insomnia
- Acesse: https://insomnia.rest/download
- Instale (é gratuito)

### Passo 2: Criar Requisições Manualmente

**GET /api/status**
```
Method: GET
URL: http://localhost:3000/api/status
Headers: Content-Type: application/json
```

**GET /api/itens**
```
Method: GET
URL: http://localhost:3000/api/itens
Headers: Content-Type: application/json
```

**GET /api/pedidos**
```
Method: GET
URL: http://localhost:3000/api/pedidos
Headers: Content-Type: application/json
```

**POST /api/pedidos** ⭐
```
Method: POST
URL: http://localhost:3000/api/pedidos
Headers: Content-Type: application/json

Body (JSON):
{
  "praViagem": true,
  "observacoes": "sem cebola",
  "itens": [
    { "id_item": 1, "quantidade": 2 },
    { "id_item": 3, "quantidade": 1 }
  ]
}
```

**GET /api/pedidos/:id**
```
Method: GET
URL: http://localhost:3000/api/pedidos/5
Headers: Content-Type: application/json
```

---

## ✅ Checklist de Testes

### Antes de Começar
- [ ] Backend rodando (`npm start` na pasta BACKEND)
- [ ] Banco de dados MySQL conectado
- [ ] Terminal mostrando "CONEXÃO COM MYSQL ESTABELECIDA!"

### Testes de Sucesso (200/201)
- [ ] Teste #1: Status retorna `success: true`
- [ ] Teste #2: Itens retorna lista com `ID_item`
- [ ] Teste #3: Pedidos retorna array (pode estar vazio)
- [ ] Teste #4: Criar pedido retorna `success: true` + `id`
- [ ] Teste #5: Buscar pedido retorna pedido + itens com JOIN

### Testes de Erro (400/404)
- [ ] Teste #6: ID inválido retorna 400
- [ ] Teste #7: Pedido inexistente retorna 404
- [ ] Teste #8: Array vazio de itens retorna 400
- [ ] Teste #9: Item inválido retorna 400
- [ ] Teste #10: Quantidade inválida retorna 400

---

## 🔍 O Que Esperar em Cada Resposta

### ✅ POST /api/pedidos - Sucesso (201)
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

### ✅ GET /api/pedidos/:id - Sucesso (200)
```json
{
  "success": true,
  "message": "Pedido encontrado",
  "data": {
    "ID_pedido": 5,
    "HorarioPedido": "2024-01-14T10:30:00.000Z",
    "StatusPedido": "Em preparo",
    "PraViagem": 1,
    "Observacoes": "sem cebola",
    "itens": [
      {
        "ID_relacionamento": 1,
        "Item": 1,
        "Quantidade": 2,
        "NomeItem": "Frango Grelhado",
        "TipoItem": "Prato",
        "Preco": 28.5,
        "Ingredientes": "Frango, arroz, batata"
      }
    ]
  }
}
```

### ❌ GET /api/pedidos/abc - Erro (400)
```json
{
  "success": false,
  "message": "ID do pedido inválido"
}
```

### ❌ GET /api/pedidos/9999 - Erro (404)
```json
{
  "success": false,
  "message": "Pedido não encontrado"
}
```

### ❌ POST com item inválido - Erro (400)
```json
{
  "success": false,
  "message": "Item com ID 9999 não encontrado"
}
```

---

## 🚀 Resumo Rápido

**Teste Rápido em 3 Passos:**

1. **Abra `TESTE_REQUISICOES.http`** e clique em "Send Request" do **Teste #1**
   - Se ver `"success": true`, backend está funcionando ✅

2. **Clique no Teste #2** para ver os IDs dos itens
   - Anote alguns IDs (ex: 1, 2, 3)

3. **No Teste #4**, ajuste os `id_item` com os valores que anotou
   - Clique "Send Request"
   - Se retornar um ID, pedido foi criado com sucesso ✅

4. **No Teste #5**, troque o `1` pelo ID retornado
   - Clique "Send Request"
   - Se retornar o pedido completo com itens, tudo está funcionando ✅✅✅

---

## 🆘 Se Algo Não Funcionar

### Backend não inicia?
```powershell
# Na pasta BACKEND:
npm install
npm start
```

### Erro de conexão com banco?
- Verifique se MySQL/XAMPP está rodando
- Veja a mensagem de erro no console do backend

### Erro "Porta já em uso"?
```powershell
# Matar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID {PID} /F
```

### Insomnia/Postman não carrega?
- Use o arquivo `TESTE_REQUISICOES.http` com REST Client (mais fácil)

---

## 💡 Dicas

- Sempre execute os testes **em ordem**
- Use o **Teste #2** para saber quais `id_item` existem
- **Anote os IDs** dos pedidos criados para testes posteriores
- A resposta do **Teste #5** deve incluir os itens completos com nome e preço
- Se algo falhar, veja a mensagem de erro em `"message"`

Qualquer dúvida, me avise! 🚀
