# Adicionando Novas Páginas ao App.jsx

## 📱 Como Integrar as Novas Páginas

Você precisa atualizar o arquivo `App.jsx` para adicionar as novas rotas. Aqui está como fazer:

### 1. Importar os Componentes

Adicione as seguintes importações no topo do seu `App.jsx`:

```javascript
import GerenciamentoItens from './paginas/GerenciamentoItens';
import GerenciamentoClientes from './paginas/GerenciamentoClientes';
import GerenciamentoFuncionarios from './paginas/GerenciamentoFuncionarios';
```

### 2. Adicionar as Rotas

Dentro da seção `<Routes>` do seu `App.jsx`, adicione:

```javascript
<Routes>
  {/* Rotas existentes */}
  <Route path="/" element={<Inicial />} />
  <Route path="/menu" element={<Menu />} />
  <Route path="/pedidos" element={<Pedidos />} />
  
  {/* NOVAS ROTAS - Gerenciamento */}
  <Route path="/gerenciamento/itens" element={<GerenciamentoItens />} />
  <Route path="/gerenciamento/clientes" element={<GerenciamentoClientes />} />
  <Route path="/gerenciamento/funcionarios" element={<GerenciamentoFuncionarios />} />
  
  {/* Mais rotas... */}
</Routes>
```

### 3. Adicionar Links na Navegação

Se quiser adicionar botões de acesso rápido, você pode adicionar no componente `Navegacao.jsx` ou `Header.jsx`:

```javascript
<Link to="/gerenciamento/itens" className="nav-link">
  Gerenciar Itens
</Link>
<Link to="/gerenciamento/clientes" className="nav-link">
  Gerenciar Clientes
</Link>
<Link to="/gerenciamento/funcionarios" className="nav-link">
  Gerenciar Funcionários
</Link>
```

---

## 🎯 Exemplo Completo do App.jsx

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicial from './paginas/Inicial';
import Menu from './paginas/Menu';
import Pedidos from './paginas/Pedidos';
import Formulario from './paginas/Formulario';
import GerenciamentoItens from './paginas/GerenciamentoItens';
import GerenciamentoClientes from './paginas/GerenciamentoClientes';
import GerenciamentoFuncionarios from './paginas/GerenciamentoFuncionarios';

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas Públicas */}
        <Route path="/" element={<Inicial />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/form/pedido" element={<Formulario />} />
        
        {/* Páginas de Gerenciamento */}
        <Route path="/gerenciamento/itens" element={<GerenciamentoItens />} />
        <Route path="/gerenciamento/clientes" element={<GerenciamentoClientes />} />
        <Route path="/gerenciamento/funcionarios" element={<GerenciamentoFuncionarios />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## 🔐 Painel Administrativo (Opcional)

Se quiser criar um painel centralizado para acesso a todos os gerenciamentos:

```jsx
// paginas/Admin.jsx
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../componentes/Navegacao';

export default function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <BarraNavegacao>Painel Administrativo</BarraNavegacao>
      <div className="min-h-screen bg-dark p-6 mt-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gold mb-12 text-center">
            Painel Administrativo
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Itens */}
            <div
              onClick={() => navigate('/gerenciamento/itens')}
              className="bg-darker border border-gold/30 p-8 rounded cursor-pointer hover:border-gold hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold text-gold mb-4">📋 Itens</h2>
              <p className="text-gray-300 mb-6">
                Gerencie os itens do menu, preços, ingredientes e tipos.
              </p>
              <button className="w-full bg-gold text-dark py-2 rounded font-bold hover:bg-yellow-400">
                Acessar
              </button>
            </div>

            {/* Card Clientes */}
            <div
              onClick={() => navigate('/gerenciamento/clientes')}
              className="bg-darker border border-gold/30 p-8 rounded cursor-pointer hover:border-gold hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold text-gold mb-4">👥 Clientes</h2>
              <p className="text-gray-300 mb-6">
                Gerencie dados dos clientes, endereços e telefones.
              </p>
              <button className="w-full bg-gold text-dark py-2 rounded font-bold hover:bg-yellow-400">
                Acessar
              </button>
            </div>

            {/* Card Funcionários */}
            <div
              onClick={() => navigate('/gerenciamento/funcionarios')}
              className="bg-darker border border-gold/30 p-8 rounded cursor-pointer hover:border-gold hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold text-gold mb-4">👨‍💼 Funcionários</h2>
              <p className="text-gray-300 mb-6">
                Gerencie informações dos funcionários, cargos e contatos.
              </p>
              <button className="w-full bg-gold text-dark py-2 rounded font-bold hover:bg-yellow-400">
                Acessar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
```

Depois adicione ao `App.jsx`:
```javascript
<Route path="/admin" element={<Admin />} />
```

---

## ✨ Funcionalidades Implementadas

Cada página de gerenciamento possui:

✅ **Listar** - Exibe todos os registros em tabela
✅ **Criar** - Formulário modal para novos registros
✅ **Editar** - Atualiza registros existentes
✅ **Deletar** - Remove registros com confirmação
✅ **Validação** - Valida campos obrigatórios
✅ **Feedback** - Mostra mensagens de sucesso/erro
✅ **Busca** - (Clientes) Busca por ID ou CPF
✅ **Responsividade** - Funciona em desktop e mobile

---

## 🧪 Teste as Funcionalidades

### Testar Itens:
1. Acesse `/gerenciamento/itens`
2. Clique em "+ Novo Item"
3. Preencha os dados
4. Clique em "Criar"
5. Veja a mensagem de sucesso
6. Teste editar e deletar

### Testar Clientes:
1. Acesse `/gerenciamento/clientes`
2. Use a busca para encontrar clientes por ID ou CPF
3. Teste todas as operações CRUD

### Testar Funcionários:
1. Acesse `/gerenciamento/funcionarios`
2. Crie, edite e delete funcionários
3. Valide os dados obrigatórios

---

## 🐛 Troubleshooting

**Problema:** Página não aparece
- **Solução:** Verifique se a rota foi adicionada corretamente no `App.jsx`

**Problema:** Dados não carregam
- **Solução:** Verifique se o backend está rodando (`npm start` na pasta BACKEND)

**Problema:** Erro de conexão
- **Solução:** Verifique se o `API_BASE_URL` está correto em `MetodosHTTP.js` (deve ser `http://localhost:3000/api`)

---

## 📚 Próximos Passos

1. Implementar autenticação/autorização
2. Adicionar permissões (Admin, Gerente, Funcionário)
3. Implementar paginação nas tabelas
4. Adicionar filtros avançados
5. Exportar dados em CSV/PDF
6. Adicionar relatórios
