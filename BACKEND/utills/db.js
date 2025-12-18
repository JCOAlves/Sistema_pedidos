const mysql = require('mysql2/promise');

console.log('Configurando conexão com MySQL/XAMPP');

const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'sistema_restaurante_bd',
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

console.log('Configuração do banco:');
console.log('Host:', config.host);
console.log('Porta:', config.port);
console.log('Usuário:', config.user);
console.log('Banco:', config.database);
console.log('Senha:', config.password === '' ? '(vazia)' : '(tem senha)');

let pool;

async function criarPool() {
    try {
        pool = mysql.createPool(config);
        
        const connection = await pool.getConnection();
        console.log('CONEXÃO COM MYSQL ESTABELECIDA!');
        
        try {
            await connection.query(`USE ${config.database}`);
            console.log(`Banco "${config.database}" selecionado.`);
            
            const [tabelas] = await connection.query('SHOW TABLES');
            console.log(`Tabelas encontradas: ${tabelas.length}`);
            if (tabelas.length > 0) {
                tabelas.forEach((tabela, i) => {
                    const nome = Object.values(tabela)[0];
                    console.log(`      ${i+1}. ${nome}`);
                });
            }
        } catch (error) {
            if (error.code === 'ER_BAD_DB_ERROR') {
                console.log(`Banco "${config.database}" não existe.`);
                console.log('Acesse: http://localhost/phpmyadmin');
                console.log('Clique em "Novo" e crie o banco.');
            }
        }
        
        connection.release();
        return pool;
        
    } catch (error) {
        console.error('ERRO AO CONECTAR:');
        console.error('Código:', error.code);
        console.error('Mensagem:', error.message);
        
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\n SOLUÇÃO:');
            console.error('   1. O XAMPP NÃO tem senha por padrão');
            console.error('   2. Remova qualquer senha do arquivo .env');
            console.error('   3. Deixe DB_PASSWORD vazio');
            console.error('   4. Tente: mysql -u root (sem -p) no terminal');
        }
        
        pool = {
            query: () => Promise.reject(error),
            execute: () => Promise.reject(error)
        };
        
        return pool;
    }
}

criarPool();

module.exports = {
    pool,
    
    async query(sql, params = []) {
        try {
            const [rows] = await pool.query(sql, params);
            return rows;
        } catch (error) {
            console.error('Erro na query:', error.message);
            throw error;
        }
    },
    
    async execute(sql, params = []) {
        try {
            const [result] = await pool.execute(sql, params);
            return result;
        } catch (error) {
            console.error('Erro na execução:', error.message);
            throw error;
        }
    },
    
    async testConnection() {
        try {
            const [rows] = await pool.query('SELECT NOW() as hora, VERSION() as versao');
            return {
                success: true,
                message: 'Conectado ao MySQL!',
                hora: rows[0].hora,
                versao: rows[0].versao
            };
        } catch (error) {
            return {
                success: false,
                message: 'Falha na conexão',
                erro: error.message
            };
        }
    },
    
    async getRestaurantes() {
        try {
            return await this.query('SELECT * FROM restaurantes');
        } catch (error) {
            console.log('Criando tabela restaurantes de exemplo');
            await this.execute(`
                CREATE TABLE IF NOT EXISTS restaurantes (
                    ID_restaurante INT AUTO_INCREMENT PRIMARY KEY,
                    NomeRestaurante VARCHAR(100) NOT NULL
                )
            `);
            await this.execute(
                'INSERT INTO restaurantes (NomeRestaurante) VALUES (?)',
                ['Restaurante do XAMPP']
            );
            return await this.query('SELECT * FROM restaurantes');
        }
    },
    
    async getCardapio() {
        try {
            return await this.query('SELECT * FROM itens');
        } catch (error) {
            console.log('Criando tabela itens de exemplo...');
            await this.execute(`
                CREATE TABLE IF NOT EXISTS itens (
                    ID_item INT AUTO_INCREMENT PRIMARY KEY,
                    NomeItem VARCHAR(100) NOT NULL,
                    TipoItem ENUM('Prato', 'Bebida'),
                    Ingredientes VARCHAR(200),
                    Preco FLOAT NOT NULL
                )
            `);
            const itens = [
                []
            ];
            for (const item of itens) {
                await this.execute(
                    'INSERT INTO itens (NomeItem, TipoItem, Ingredientes, Preco) VALUES (?, ?, ?, ?)',
                    item
                );
            }
            return await this.query('SELECT * FROM itens');
        }
    }
};