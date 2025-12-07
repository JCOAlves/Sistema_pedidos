-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07/12/2025 às 19:40
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sistema_restaurante`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `cardapios`
--

CREATE TABLE `cardapios` (
  `Restaurante` int(11) NOT NULL,
  `ID_cardapio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `ID_cliente` int(11) NOT NULL,
  `NomeCliente` varchar(100) NOT NULL,
  `NumeroTelefone` varchar(14) NOT NULL,
  `EnderecoEmail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cliente_pedido`
--

CREATE TABLE `cliente_pedido` (
  `ID_relacionamento` int(11) NOT NULL,
  `Pedido` int(11) NOT NULL,
  `Cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `ID_funcionario` int(11) NOT NULL,
  `NomeFuncionario` varchar(100) NOT NULL,
  `EmailFuncionario` varchar(100) NOT NULL,
  `SenhaSistema_funcionario` varchar(100) NOT NULL,
  `CargoFuncionario` enum('Gerente','Cozinheiro','Garcom') DEFAULT NULL,
  `Restaurante` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `itens`
--

CREATE TABLE `itens` (
  `ID_item` int(11) NOT NULL,
  `NomeItem` varchar(100) NOT NULL,
  `TipoItem` enum('Prato','Bebida') DEFAULT NULL,
  `Ingredientes` varchar(200) NOT NULL,
  `Preco` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `itens`
--

INSERT INTO `itens` (`ID_item`, `NomeItem`, `TipoItem`, `Ingredientes`, `Preco`) VALUES
(1, 'Frango Grelhado', 'Prato', 'Peito de frango, arroz, batata', 28.5),
(2, 'Refrigerante 2L', 'Bebida', 'Coca-Cola, Fanta, Guaraná', 12),
(3, 'Suco Natural', 'Bebida', 'Laranja, Limão, Abacaxi', 8.5),
(4, 'Água Mineral', 'Bebida', 'Sem gás, com gás', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamentos`
--

CREATE TABLE `pagamentos` (
  `ID_pagamento` int(11) NOT NULL,
  `HorarioPagamento` timestamp NOT NULL DEFAULT current_timestamp(),
  `FormaPagamento` enum('Dinheiro','Pix','Credito','Debito') DEFAULT NULL,
  `Pedido` int(11) NOT NULL,
  `ValorPago` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `ID_pedido` int(11) NOT NULL,
  `HorarioPedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `StatusPedido` enum('Em preparo','Entregue','Pago','Cancelado') DEFAULT 'Em preparo',
  `PraViagem` tinyint(1) NOT NULL,
  `Observacoes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedido_item`
--

CREATE TABLE `pedido_item` (
  `ID_relacionamento` int(11) NOT NULL,
  `Item` int(11) NOT NULL,
  `Pedido` int(11) NOT NULL,
  `Quantidade` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `ID_produto` int(11) NOT NULL,
  `Disponivel` tinyint(1) NOT NULL,
  `Cardapio` int(11) NOT NULL,
  `Item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `restaurantes`
--

CREATE TABLE `restaurantes` (
  `ID_restaurante` int(11) NOT NULL,
  `NomeRestaurante` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `restaurantes`
--

INSERT INTO `restaurantes` (`ID_restaurante`, `NomeRestaurante`) VALUES
(1, 'Churrascaria');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `cardapios`
--
ALTER TABLE `cardapios`
  ADD PRIMARY KEY (`ID_cardapio`),
  ADD KEY `Restaurante` (`Restaurante`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`ID_cliente`);

--
-- Índices de tabela `cliente_pedido`
--
ALTER TABLE `cliente_pedido`
  ADD PRIMARY KEY (`ID_relacionamento`),
  ADD KEY `Pedido` (`Pedido`),
  ADD KEY `Cliente` (`Cliente`);

--
-- Índices de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`ID_funcionario`),
  ADD KEY `Restaurante` (`Restaurante`);

--
-- Índices de tabela `itens`
--
ALTER TABLE `itens`
  ADD PRIMARY KEY (`ID_item`);

--
-- Índices de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD PRIMARY KEY (`ID_pagamento`),
  ADD KEY `Pedido` (`Pedido`);

--
-- Índices de tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`ID_pedido`);

--
-- Índices de tabela `pedido_item`
--
ALTER TABLE `pedido_item`
  ADD PRIMARY KEY (`ID_relacionamento`),
  ADD KEY `Item` (`Item`),
  ADD KEY `Pedido` (`Pedido`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`ID_produto`),
  ADD KEY `Cardapio` (`Cardapio`),
  ADD KEY `Item` (`Item`);

--
-- Índices de tabela `restaurantes`
--
ALTER TABLE `restaurantes`
  ADD PRIMARY KEY (`ID_restaurante`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cardapios`
--
ALTER TABLE `cardapios`
  MODIFY `ID_cardapio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `ID_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cliente_pedido`
--
ALTER TABLE `cliente_pedido`
  MODIFY `ID_relacionamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `ID_funcionario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `itens`
--
ALTER TABLE `itens`
  MODIFY `ID_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  MODIFY `ID_pagamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `ID_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedido_item`
--
ALTER TABLE `pedido_item`
  MODIFY `ID_relacionamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `ID_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `restaurantes`
--
ALTER TABLE `restaurantes`
  MODIFY `ID_restaurante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `cardapios`
--
ALTER TABLE `cardapios`
  ADD CONSTRAINT `cardapios_ibfk_1` FOREIGN KEY (`Restaurante`) REFERENCES `restaurantes` (`ID_restaurante`);

--
-- Restrições para tabelas `cliente_pedido`
--
ALTER TABLE `cliente_pedido`
  ADD CONSTRAINT `cliente_pedido_ibfk_1` FOREIGN KEY (`Pedido`) REFERENCES `pedidos` (`ID_pedido`),
  ADD CONSTRAINT `cliente_pedido_ibfk_2` FOREIGN KEY (`Cliente`) REFERENCES `clientes` (`ID_cliente`);

--
-- Restrições para tabelas `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`Restaurante`) REFERENCES `restaurantes` (`ID_restaurante`);

--
-- Restrições para tabelas `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`Pedido`) REFERENCES `pedidos` (`ID_pedido`);

--
-- Restrições para tabelas `pedido_item`
--
ALTER TABLE `pedido_item`
  ADD CONSTRAINT `pedido_item_ibfk_1` FOREIGN KEY (`Item`) REFERENCES `itens` (`ID_item`),
  ADD CONSTRAINT `pedido_item_ibfk_2` FOREIGN KEY (`Pedido`) REFERENCES `pedidos` (`ID_pedido`);

--
-- Restrições para tabelas `produtos`
--
ALTER TABLE `produtos`
  ADD CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`Cardapio`) REFERENCES `cardapios` (`ID_cardapio`),
  ADD CONSTRAINT `produtos_ibfk_2` FOREIGN KEY (`Item`) REFERENCES `itens` (`ID_item`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
