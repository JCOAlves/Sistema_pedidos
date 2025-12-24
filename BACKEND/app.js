const express = require("express");
const app = express();
const cors = require('cors');

const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

const db = require('./utills/db');

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        sistema: "API do Sistema de Restaurante",
        status: "ONLINE",
        banco: "MySQL/XAMPP",
        endpoints: [
            "GET    /api/status           - Testa conexão com banco",
            "GET    /api/restaurantes     - Lista todos restaurantes",
            "GET    /api/cardapio         - Mostra cardápio completo",
            "GET    /api/clientes         - Lista clientes",
            "GET    /api/pedidos          - Lista pedidos",
            "POST   /api/pedidos          - Cria novo pedido",
            "GET    /api/pedidos/:id      - Busca pedido específico",
            "PUT    /api/pedidos/:id      - Atualiza pedido",
            "GET    /api/itens            - Lista todos os itens"
        ]
    });
});

app.get("/api/status", async (req, res) => {
    try {
        const status = await req.db.testConnection();
        res.json(status);
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

app.get("/api/restaurantes", async (req, res) => {
    try {
        const restaurantes = await req.db.query('SELECT * FROM restaurantes');
        res.json({
            success: true,
            count: restaurantes.length,
            data: restaurantes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/api/restaurantes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [restaurante] = await req.db.query(
            'SELECT * FROM restaurantes WHERE ID_restaurante = ?', 
            [id]
        );
        
        if (!restaurante) {
            return res.status(404).json({
                success: false,
                message: "Restaurante não encontrado"
            });
        }
        
        res.json({
            success: true,
            data: restaurante
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/api/cardapio", async (req, res) => {
    try {
        const cardapio = await req.db.query('SELECT * FROM itens ORDER BY TipoItem, NomeItem');
        res.json({
            success: true,
            count: cardapio.length,
            data: cardapio
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/api/clientes", async (req, res) => {
    try {
        const clientes = await req.db.query('SELECT * FROM clientes');
        res.json({
            success: true,
            count: clientes.length,
            data: clientes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post("/api/clientes", async (req, res) => {
    try {
        const { NomeCliente, NumeroTelefone, EnderecoEmail } = req.body;
        
        const result = await req.db.execute(
            'INSERT INTO clientes (NomeCliente, NumeroTelefone, EnderecoEmail) VALUES (?, ?, ?)',
            [NomeCliente, NumeroTelefone, EnderecoEmail]
        );
        
        res.json({
            success: true,
            message: "Cliente criado com sucesso!",
            clienteId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/api/pedidos", async (req, res) => {
    try {
        const pedidos = await req.db.query(`
            SELECT p.*, c.NomeCliente 
            FROM pedidos p
            LEFT JOIN cliente_pedido cp ON p.ID_pedido = cp.Pedido
            LEFT JOIN clientes c ON cp.Cliente = c.ID_cliente
            ORDER BY p.HorarioPedido DESC
        `);
        
        res.json({
            success: true,
            count: pedidos.length,
            data: pedidos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post("/api/pedidos", async (req, res) => {
    try {
        const { praViagem, observacoes, clienteId, itens } = req.body;
        
        const connection = await req.db.pool.getConnection();
        await connection.beginTransaction();
        
        try {
            const [pedidoResult] = await connection.execute(
                'INSERT INTO pedidos (PraViagem, Observacoes, StatusPedido) VALUES (?, ?, ?)',
                [praViagem ? 1 : 0, observacoes || '', 'Em preparo']
            );
            
            const pedidoId = pedidoResult.insertId;
            
            for (const item of itens || []) {
                await connection.execute(
                    'INSERT INTO pedido_item (Pedido, Item, Quantidade) VALUES (?, ?, ?)',
                    [pedidoId, item.itemId, item.quantidade || 1]
                );
            }
            
            if (clienteId) {
                await connection.execute(
                    'INSERT INTO cliente_pedido (Pedido, Cliente) VALUES (?, ?)',
                    [pedidoId, clienteId]
                );
            }
            
            await connection.commit();
            connection.release();
            
            res.json({
                success: true,
                message: "Pedido criado com sucesso!",
                pedidoId: pedidoId
            });
            
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/api/pedidos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const [pedido] = await req.db.query(`
            SELECT p.*, c.NomeCliente 
            FROM pedidos p
            LEFT JOIN cliente_pedido cp ON p.ID_pedido = cp.Pedido
            LEFT JOIN clientes c ON cp.Cliente = c.ID_cliente
            WHERE p.ID_pedido = ?
        `, [id]);
        
        if (!pedido) {
            return res.status(404).json({
                success: false,
                message: "Pedido não encontrado"
            });
        }
        
        const itens = await req.db.query(`
            SELECT i.*, pi.Quantidade 
            FROM pedido_item pi
            JOIN itens i ON pi.Item = i.ID_item
            WHERE pi.Pedido = ?
        `, [id]);
        
        res.json({
            success: true,
            data: {
                ...pedido,
                itens: itens
            }
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.put("/api/pedidos/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const result = await req.db.execute(
            'UPDATE pedidos SET StatusPedido = ? WHERE ID_pedido = ?',
            [status, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Pedido não encontrado"
            });
        }
        
        res.json({
            success: true,
            message: "Status do pedido atualizado!"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/api/itens", async (req, res) => {
    try {
        const itens = await req.db.query('SELECT * FROM itens ORDER BY NomeItem');
        res.json({
            success: true,
            count: itens.length,
            data: itens
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/api/inserir-exemplo", async (req, res) => {
    try {
        await req.db.execute(`
            INSERT IGNORE INTO restaurantes (NomeRestaurante) 
            VALUES ('Churrascaria')
        `);
        
        await req.db.execute(`
            INSERT IGNORE INTO itens (NomeItem, TipoItem, Ingredientes, Preco) VALUES
            ('Frango Grelhado', 'Prato', 'Peito de frango, arroz, batata', 28.50),
            ('Refrigerante 2L', 'Bebida', 'Coca-Cola, Fanta, Guaraná', 12.00),
            ('Suco Natural', 'Bebida', 'Laranja, Limão, Abacaxi', 8.50),
            ('Água Mineral', 'Bebida', 'Sem gás, com gás', 4.00)
        `);
        
        res.json({
            success: true,
            message: "Dados de exemplo inseridos com sucesso!"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

try {
    const pedidosRoutes = require("./routes/Route_Pedidos");
    const formularioRoutes = require("./routes/Route_Formulario");
    const menuRoutes = require("./routes/Route_Menu");
    const inicialRoutes = require("./routes/Route_Inicial");
    
    app.use("/api/pedidos-old", pedidosRoutes);
    app.use("/api/formulario-old", formularioRoutes);
    app.use("/api/menu-old", menuRoutes);
    app.use("/api/inicial-old", inicialRoutes);
    
    console.log('Rotas carregadas (com sufixo -old para compatibilidade)');
} catch (error) {
    console.log('rotas não encontradas, usando apenas API nova');
}

app.use((req, res) => {
    res.status(404).json({
        error: "Rota não encontrada",
        path: req.path,
        method: req.method,
        sugestao: "Consulte a rota raiz (/) para ver endpoints disponíveis"
    });
});

app.use((err, req, res, next) => {
    console.error('Erro interno:', err.stack);
    res.status(500).json({
        error: "Erro interno do servidor",
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

//A APLICAÇÃO ESTA RODANDO NA PORTA 3001, MAS TAMBEM TÁ RONDANDO NA 3000
//o SERVIDOR ESTÁ SUBINDO A APLICAÇÃO DUAS VEZES, UMA PRA 3000 E OUTRA PARA 3001
//QUANDO ESTÁ RODANDO NA 3000, QUANDO SOBE PELA SEGUNDA VEZ, MATA A PRIMEIRA
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`
               API REST
         Sistema de Restaurante
  
    
    Servidor: http://localhost:${PORT}
    Banco: MySQL/XAMPP
    Status: Conectado a 10 tabelas
    
    ENDPOINTS PRINCIPAIS:
    /                    - Lista todos endpoints
    /api/status          - Teste de conexão com banco
    /api/restaurantes    - Lista restaurantes
    /api/cardapio        - Mostra cardápio
    /api/pedidos         - CRUD de pedidos
    /api/clientes        - CRUD de clientes
    /api/itens           - Lista todos itens
    
    Frontend pode acessar em: http://localhost:3000 (API)
    CORS configurado para: http://localhost:5173 (React/Vite)
    
    API REST criada e funcionando!
    `);
});

module.exports = app;