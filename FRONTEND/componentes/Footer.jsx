

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <h4 className="text-2xl font-serif text-gold mb-2">I&F Restaurante</h4>
                <p className="text-gray-500 text-sm">Rua Socorro, 321 - Parnamoscou</p>
                <p className="text-gray-500 text-sm">+55 4002-8922</p>
            </div>

            <div className="text-gray-600 text-xs text-center md:text-right">&copy; 2023 I&F Projeto. <br/>Todos os direitos reservados.</div>
        </div>
    </footer>
  );
}
