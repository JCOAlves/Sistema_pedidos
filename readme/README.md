Sistema de pedidos de um restaurante
Sistema de pedidos de um restaurante, desenvolvido por BrennoGithub, ArielcsSilva, Fabiana020, squaredmi e JCOAlves, para a materia de Banco de Dados.

Frameworks utilizados
O sistema utiliza os frameworks Express JS para o densenvolvimento Backend e o React JS para o Frontend. Além dos frameworks já citados, o projeto utiliza outras ferramentas como:

Backend:

XAMPP
Banco de dados MySQL (SQL)
CORS
Frontend:

Vite
Tailwind CSS
API Fetch
Banco de dados SQL
O projeto utiliza um banco de dados MySQL físico para armazenar tabelas com dados da aplicação.

Modelo logico do banco de dados do sistema de pedidos

Restaurante: Armazena dados sobre o restaurante.
Funcionarios: Armazena dados dos funcionario para o acesso ao sistema de pedidos.
Clientes: Armazena dados dos clientes.
Cardapio: Relaciona cardapio ao restaurante.
Item: Armazena dados sobre os itens do cardapio do restaurante.
Produto: Relaciona itens ao cardapio e diz quais itens estão disponiveis.
Pedidos: Armazena dados dos pedidos.
Pedido_item: Relaciona os itens do cardapio aos pedidos e registra a quantidade de itens no cardapio.
Cliente_pedido: Relaciona pedidos aos clientes.
Pagamentos: Armazena dados dos pagamentos dos pedidos.
Modelo Físico do banco SQL: Sistema_restaurante.bd. 