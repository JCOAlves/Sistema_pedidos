import {useNavigate} from "react-router-dom"
import {useState} from "react"
import {POST} from "../MetodosHTTP.js"

//Página de Login do sistema do restaurante
function Login(redirecionamento="/"){
    const [logado, setLogado] = useState(false);
    const [emailFuncionario, setEmail] = useState("");
    const [senhaFuncionario, setSenha] = useState("");
    const navigate = useNavigate();

    function FazerLogin(e){
        e.preventDefault();
        async () => {
            if (emailFuncionario != "" && senhaFuncionario != ""){
                const dadosLogin = { emailFuncionario: emailFuncionario, senhaFuncionario: senhaFuncionario }
                const resposta = await POST("/", dadosLogin);
            } else{
                alert("Prencha os campos corretamente.")
            }
        }
    }

    return (
        <form className="w-100 rounded mr-auto ml-auto mt-20 mb-20 p-7 border border-gray-700" onSubmit={() => {}}>
            <h1 className="text-center text-[30px] mb-3">Login</h1>
            <label htmlFor="emailFuncionario">Email</label>
            <input className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700" 
                type="email" name="emailFuncionario" id="emailFuncionario" placeholder="Email de funcionario" 
                maxLength={100} value={emailFuncionario} onInput={(e) => setEmail(e.target.value)} required/>
            <label htmlFor="senhaFuncionario">Senha</label>
            <input className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700" 
                type="password" name="senhaFuncionario" id="senhaFuncionario" placeholder="Senha de funcionario" 
                minLength={8} value={senhaFuncionario} onInput={(e) => setSenha(e.target.value)} required/>
            <button type="submit" className="rounded bg-gold text-darker px-8 py-3 mt-2 uppercase tracking-widest font-bold hover:bg-white transition duration-300">Login</button>
        </form>
    )
}

export default Login;