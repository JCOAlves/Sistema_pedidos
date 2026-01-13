import {Navigate} from "react-router-dom"

//Função que verifica e o usuário está logado no sistema.
function VerificacaoLogin({logado=false, rota, children}){
    if(logado){
        return children;

    } else {
        return <Navigate to={rota} replace/>
    }
}

export default VerificacaoLogin;