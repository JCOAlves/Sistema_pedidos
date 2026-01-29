function BarraNavegacao({children}) {
    return (
        <nav className="fixed w-full z-50 bg-dark/90 backdrop-blur-md border-b border-white/10 top-0">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-serif font-bold text-gold tracking-widest border-2 border-gold p-2 px-4">I&F</div>
                <div className="flex gap-3 text-sm uppercase tracking-widest">
                    {children}
                </div>
            </div>

        </nav>
    )
}

export default BarraNavegacao