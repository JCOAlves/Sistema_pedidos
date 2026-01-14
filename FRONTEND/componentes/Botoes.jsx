//Botoes
export function BotaoComun({ texto, funcao }) {
    return <button className="rounded bg-gold text-darker px-8 py-3 uppercase tracking-widest font-bold hover:bg-white transition duration-300" onClick={funcao}>{texto}</button>
}

export function BotaoTransparente({ texto, funcao }) {
    return <button className="rounded border border-gold text-gold px-8 py-3 uppercase tracking-widest hover:bg-gold hover:text-darker transition duration-300" onClick={funcao}>{texto}</button>
}