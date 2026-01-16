# 🧪 TESTE RÁPIDO - PASSO A PASSO

## ✅ Backend já está rodando na porta 3000

Você pode usar **3 formas** para testar:

---

## **FORMA 1: REST Client no VS Code (Mais Fácil) ⭐**

### Passo 1: Instalar Extensão
1. Abra **Extensões** (Ctrl+Shift+X)
2. Procure: `REST Client`
3. Instale a do **Huachao Mao**

### Passo 2: Abrir Arquivo
- Abra o arquivo: `TESTE_REQUISICOES.http` que está na raiz do projeto

### Passo 3: Executar Testes
- Aparecerá um link **"Send Request"** acima de cada requisição
- Clique para executar

**Ordem recomendada:**
1. Teste #1 (Status) → deve retornar OK
2. Teste #2 (Listar itens) → veja os IDs disponíveis
3. Teste #3 (Listar pedidos) → deve estar vazio ou com poucos
4. **Teste #4 (Criar pedido)** → ajuste os IDs se necessário
5. **Teste #5 (Buscar pedido)** → coloque o ID que foi retornado

---

## **FORMA 2: Usar Este Script PowerShell**

Copie e cole este script no **PowerShell** (dentro da pasta Sistema_pedidos):

```powershell
# Teste 1: Status
Write-Host "`n=== TESTE 1: Status do Backend ===" -ForegroundColor Cyan
$status = Invoke-WebRequest -Uri "http://localhost:3000/api/status" -Headers @{"Content-Type"="application/json"}
Write-Host "✅ Backend respondendo!" -ForegroundColor Green
$status.Content

# Teste 2: Listar Itens
Write-Host "`n=== TESTE 2: Listar Itens ===" -ForegroundColor Cyan
$itens = Invoke-WebRequest -Uri "http://localhost:3000/api/itens" -Headers @{"Content-Type"="application/json"}
$itensJson = $itens.Content | ConvertFrom-Json
Write-Host "Itens encontrados:" $itensJson.data.Count -ForegroundColor Green
$itensJson.data | ConvertTo-Json

# Teste 3: Listar Pedidos
Write-Host "`n=== TESTE 3: Listar Pedidos ===" -ForegroundColor Cyan
$pedidos = Invoke-WebRequest -Uri "http://localhost:3000/api/pedidos" -Headers @{"Content-Type"="application/json"}
$pedidosJson = $pedidos.Content | ConvertFrom-Json
Write-Host "Pedidos encontrados:" $pedidosJson.count -ForegroundColor Green
$pedidosJson | ConvertTo-Json

# Teste 4: Criar Pedido
Write-Host "`n=== TESTE 4: CRIAR PEDIDO ===" -ForegroundColor Yellow
$body = @{
    praViagem = $true
    observacoes = "sem gelo"
    itens = @(
        @{ id_item = 1; quantidade = 2 },
        @{ id_item = 3; quantidade = 1 }
    )
} | ConvertTo-Json

Write-Host "Enviando pedido..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/pedidos" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $body `
        -ErrorAction Stop
    
    $responseJson = $response.Content | ConvertFrom-Json
    Write-Host "✅ SUCESSO! Pedido criado com ID:" $responseJson.data.id -ForegroundColor Green
    $responseJson | ConvertTo-Json
    
} catch {
    Write-Host "❌ Erro ao criar pedido" -ForegroundColor Red
    Write-Host "Status Code:" $_.Exception.Response.StatusCode
    Write-Host "Erro:" $_.Exception.Message
}
```

---

## **FORMA 3: cURL (Se tiver instalado)**

```bash
# Teste 1: Status
curl http://localhost:3000/api/status

# Teste 2: Listar itens  
curl http://localhost:3000/api/itens

# Teste 3: Listar pedidos
curl http://localhost:3000/api/pedidos

# Teste 4: Criar pedido
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "praViagem": true,
    "observacoes": "sem gelo",
    "itens": [
      { "id_item": 1, "quantidade": 2 },
      { "id_item": 3, "quantidade": 1 }
    ]
  }'

# Teste 5: Buscar pedido (substitua 1 pelo ID retornado)
curl http://localhost:3000/api/pedidos/1
```

---

## 📊 O Que Esperar

### ✅ Sucesso no POST /api/pedidos (201)
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "data": {
    "id": 5,
    "praViagem": true,
    "observacoes": "sem gelo",
    "totalItens": 2
  }
}
```

### ✅ Sucesso no GET /api/pedidos/:id (200)
```json
{
  "success": true,
  "message": "Pedido encontrado",
  "data": {
    "ID_pedido": 5,
    "HorarioPedido": "2024-01-14T...",
    "StatusPedido": "Em preparo",
    "PraViagem": 1,
    "Observacoes": "sem gelo",
    "itens": [
      {
        "ID_relacionamento": 1,
        "Item": 1,
        "Quantidade": 2,
        "NomeItem": "Frango Grelhado",
        "TipoItem": "Prato",
        "Preco": 28.5,
        "Ingredientes": "Peito de frango, arroz, batata"
      }
    ]
  }
}
```

---

## 🆘 Se der Erro

### Erro 500 (Interno do Servidor)
- **Causa:** Problema no código ou banco de dados
- **Solução:** Veja o console do Node.js backend para ver qual é o erro exato

### Erro 404 (Não Encontrado)
- **Causa:** Endpoint não existe ou ID de pedido inválido
- **Solução:** Verifique a URL e o ID

### Erro 400 (Bad Request)
- **Causa:** Dados inválidos no request
- **Solução:** Verifique o JSON enviado, confira os IDs dos itens

---

## 🚀 Próximos Passos

Depois de testar com sucesso:

1. ✅ Confirme que o pedido foi criado
2. ✅ Confirme que consegue buscar o pedido com os itens
3. ✅ Teste com outros IDs de itens
4. ✅ Pronto! As rotas estão funcionando!

Se tudo der certo, você pode usar o frontend para criar pedidos! 🎉
