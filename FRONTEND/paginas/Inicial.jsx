import BarraNavegacao from "../componentes/Navegacao.jsx";
import Header from "../componentes/Header.jsx";

export default function Inicial() {

  return (<>
    <BarraNavegacao>
      <a href="#home" className="hover:text-gold transition duration-300">Home</a>
      <a href="#sobre" className="hover:text-gold transition duration-300">Sobre</a>
      <a href="#horario" className="hover:text-gold transition duration-300">Horario</a>
    </BarraNavegacao>
    <Header />
    <section id="sobre" className="py-20 bg-darker">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gold/20 opacity-75 blur-lg group-hover:opacity-100 transition duration-500">
          </div>
          <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop"
            alt="Chef cozinhando" className="relative w-full shadow-2xl border-l-4 border-gold" />
        </div>

        <div>
          <span className="font-script text-3xl text-gold block mb-2">Momentos Especiais</span>
          <h2 className="font-serif text-4xl text-white mb-6 uppercase">Tradicional & Moderno</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Nossa cozinha é um laboratório de sabores onde respeitamos as técnicas ancestrais, mas não temos
            medo de inovar. Ingredientes frescos, selecionados diariamente, transformam-se em obras de arte no
            prato.
          </p>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Do ambiente intimista à apresentação sofisticada, cada detalhe foi pensado para proporcionar
            conforto e sofisticação.
          </p>

          <a href="#"
            className="text-gold border-b border-gold pb-1 hover:text-white hover:border-white transition duration-300 uppercase text-sm tracking-widest">
            Ler Nossa História
          </a>
        </div>
      </div>
    </section>

    <section id="horario" className="py-20 bg-darker border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="font-script text-3xl text-gold">Lorem</span>
        <h2 className="font-serif text-4xl text-white mt-2 mb-12 uppercase">Horário de Funcionamento</h2>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base border border-gray-800 p-8 rounded-lg bg-dark">
          <div className="flex flex-col space-y-2">
            <span className="text-gold font-bold uppercase tracking-wider">Domingo</span>
            <span className="text-gray-400">17:00 - 22:00</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="text-gold font-bold uppercase tracking-wider">Seg - Ter</span>
            <span className="text-gray-400">17:00 - 22:30</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="text-gold font-bold uppercase tracking-wider">Qua - Sex</span>
            <span className="text-gray-400">17:00 - 23:00</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="text-gold font-bold uppercase tracking-wider">Sábado</span>
            <span className="text-gray-400">17:00 - 00:00</span>
          </div>
        </div>

        <p className="mt-8 text-gray-500 text-sm">Reservas são limitadas a 2 horas. Por favor, note que não aceitamos
          grupos acima de 6 pessoas sem aviso prévio.</p>
      </div>
    </section>
  </>);
}
