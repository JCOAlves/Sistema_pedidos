function BarraNavegacao() {
    return (
        <nav className="fixed w-full z-50 bg-dark/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-serif font-bold text-gold tracking-widest border-2 border-gold p-2 px-4">I&F</div>
                <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
                    <a href="#home" className="hover:text-gold transition duration-300">Home</a>
                    <a href="#sobre" className="hover:text-gold transition duration-300">Sobre</a>
                    <a href="#horario" className="hover:text-gold transition duration-300">Horario</a>
                </div>
            </div>

        </nav>
    )
}

export default BarraNavegacao