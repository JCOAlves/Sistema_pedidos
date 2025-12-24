exports.listar = (req, res) => {
  res.json([
    { id: 1, nome: 'João Silva', cargo: 'Atendente' },
    { id: 2, nome: 'Maria Souza', cargo: 'Cozinheira' }
  ]);
};
