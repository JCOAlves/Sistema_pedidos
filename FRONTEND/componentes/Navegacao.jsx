function BarraNavegacao() {
    return (
        <nav class="fixed w-full z-50 bg-dark/90 backdrop-blur-md border-b border-white/10">
            <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div class="text-2xl font-serif font-bold text-gold tracking-widest border-2 border-gold p-2 px-4">I&F</div>
                <div class="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
                    <a href="#home" class="hover:text-gold transition duration-300">Home</a>
                    <a href="#sobre" class="hover:text-gold transition duration-300">Sobre</a>
                    <a href="#horario" class="hover:text-gold transition duration-300">Horario</a>
                </div>
            </div>

        </nav>
    )
}

export default BarraNavegacao