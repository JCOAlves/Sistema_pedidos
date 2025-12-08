import {useNavigate} from "react-router-dom"

export default function Inicial() {
  const navigate = useNavigate()

  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >

      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 container mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-5x1 md:text-7xl font-extrabold text-white leading-tight">
            Aproveite<br />Refeições<br />Deliciosas
          </h1>

          <p className="text-gray-300 mt-6 text-lg max-w-lg">
            Peça suas refeições de forma rápida, fácil e moderna.
            Qualidade, sabor e praticidade direto no seu sistema!
          </p>

          <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg w-fit" onClick={() => {navigate("/formulario")}}>
            Fazer Pedido
          </button>
          <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg w-fit" style={{marginLeft: "20px"}}  onClick={() => {navigate("/menu")}}>
            Ver Menu
          </button>
        </div>
 
    

      </div>
    </main>
  );
}
