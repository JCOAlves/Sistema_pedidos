import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white px-8 py-6 shadow-lg w-full">
      <div className="flex items-center justify-between w-full">

        <h1 className="text-2xl font-bold tracking-wide">
          Sistema de Pedidos
        </h1>

        <nav className="flex gap-8 text-base font-medium">
          <Link to="/" className="hover:text-gray-300">Início</Link>
          <Link to="/formulario" className="hover:text-gray-300">Formulário</Link>
          <Link to="/menu" className="hover:text-gray-300">Menu</Link>
          <Link to="/pedidos" className="hover:text-gray-300">Pedidos</Link>
        </nav>

      </div>
    </header>
  );
}
