import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { POST } from "../MetodosHTTP.js"
import BarraNavegacao from "../componentes/Navegacao.jsx";

//Página de Login do sistema do restaurante
function Login() {
    const [emailFuncionario, setEmail] = useState("");
    const [senhaFuncionario, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tempoLogin, setTempo] = useState(1);
    const [numeroTentativas, setTentativa] = useState(0);
    const navigate = useNavigate();

    async function FazerLogin(e) {
        e.preventDefault();

        try {
            if (emailFuncionario != "" && senhaFuncionario != "") {
                const dadosLogin = { emailFuncionario: emailFuncionario, senhaFuncionario: senhaFuncionario };
                const resposta = await POST("/funcionarios/login", dadosLogin);
                const { login, data } = resposta;
                if (login === undefined || login === false) {
                    setTentativa(numeroTentativas+1);
                    if (numeroTentativas === 3) {
                        const novoTempo = tempoLogin*60;
                        setTempo(novoTempo);
                        setTentativa(0);
                        setMensagem(`Número de tentativas expirado. Tente novamente em ${tempoLogin/60} ${tempoLogin === 1 ? `minuto` : `minutos`}.`);
                    } else {
                        setTempo(1);
                        setMensagem("Login invalido. Tente novamente.");
                    }

                } else {
                    navigate(`/gerenciamento/${data.ID_funcionario}`);
                }

            } else {
                setMensagem("Prencha os campos corretamente.");
            }

        } catch (error) {
            console.error("Erro na conexão de login do sistema.");
            setMensagem("Erro na conexão de login do sistema.");
        }
    }

    return (<div className="min-h-155">
        <BarraNavegacao>Login</BarraNavegacao>

        {mensagem && (
            <div className={`fixed top-4 right-4 px-4 py-3 rounded text-white font-semibold z-50 ${mensagem.includes('sucesso') ? 'bg-green-600' : 'bg-red-600'
                }`}>
                {mensagem}
            </div>
        )}

        <form className="w-100 rounded mr-auto ml-auto mt-40 mb-20 p-7 border border-gray-700" onSubmit={() => {setTimeout(FazerLogin, 1000*tempoLogin)}}>
            <h1 className="text-center mb-3 font-serif text-4xl md:text-5xl text-white mt-2 uppercase tracking-wide">Login</h1>
            <label htmlFor="emailFuncionario">Email</label>
            <input className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700"
                type="email" name="emailFuncionario" id="emailFuncionario" placeholder="Email de funcionario"
                maxLength={100} value={emailFuncionario} onInput={(e) => setEmail(e.target.value)} required />
            <label htmlFor="senhaFuncionario">Senha</label>
            <input className="w-full mt-2 mb-4 p-3 rounded bg-darker text-white border border-gray-700"
                type="password" name="senhaFuncionario" id="senhaFuncionario" placeholder="Senha de funcionario"
                minLength={8} value={senhaFuncionario} onInput={(e) => setSenha(e.target.value)} required />
            <div className="text-center mt-6">
                <button type="submit" className="rounded bg-gold text-darker px-8 py-3 uppercase tracking-widest font-bold hover:bg-white transition duration-300">Login</button>
            </div>
        </form>
    </div>)
}

export default Login;