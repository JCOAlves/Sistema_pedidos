import {Navigate} from "react-router-dom"
import {useState} from "react"

//Página de Login do sistema do restaurante
function Login(redirecionamento="/"){
    const [logado, setLogado] = useState(false);

    return <Navigate to={redirecionamento}/>
}

export default Login;