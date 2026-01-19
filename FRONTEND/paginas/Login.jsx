import {Navigate} from "react-router-dom"
import {useState} from "react"

//Página de Login do sistema do restaurante
function Login(redirecionamento="/"){
    const [logado, setLogado] = useState(false);

    return (
        <form className="w-100 rounded mr-auto ml-auto mt-20 mb-20 p-7 border border-gray-700">
            <label htmlFor="emailFuncionario">Email</label>
            <input className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700" 
                type="email" name="emailFuncionario" id="emailFuncionario" placeholder="Email do usuário" maxLength={100}/>
            <label htmlFor="senhaFuncionario">Senha</label>
            <input className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700" 
                type="password" name="senhaFuncionario" id="senhaFuncionario" placeholder="Senha do usuário" minLength={8}/>
            <button type="submit" className="rounded bg-gold text-darker px-8 py-3 mt-2 uppercase tracking-widest font-bold hover:bg-white transition duration-300">Login</button>
        </form>
    )

    //return <Navigate to={redirecionamento}/>
}

export default Login;