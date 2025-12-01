export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6">
 
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-wide">Sistema de Pedidos</h2>
          <p className="text-gray-400 mt-2 text-sm">Organize seus pedidos com facilidade!</p>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm mb-10 text-center">

          <div className="space-y-2">
            <p className="font-semibold text-white">Formulário</p>
            <a href="/formulario" className="block hover:text-white">Novo Pedido</a>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white">Menu</p>
            <a href="/menu" className="block hover:text-white">Cardápio</a>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white">Pedidos</p>
            <a href="/pedidos" className="block hover:text-white">Ver Pedidos</a>
          </div>

        </div>
 
        <div className="text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
          <p>SISTEMA DE PEDIDOS™ © {new Date().getFullYear()}. Todos os direitos reservados.</p>
          <p className="mt-1">Imagens meramente ilustrativas.</p>
        </div>

      </div>
    </footer>
  );
}
