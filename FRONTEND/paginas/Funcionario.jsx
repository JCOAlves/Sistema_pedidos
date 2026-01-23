import {useState, useEffect} from "react"
import {useSearchParams} from "react-router-dom"
import BarraNavegacao from "../componentes/Navegacao.jsx"
import {GET} from "../MetodosHTTP.js"

//Página de usuário do funcionario
function Funcionario(){
    const {id} = useSearchParams();

    useEffect(() => {

    }, [id])

    return (<>
        <BarraNavegacao>Funcionario</BarraNavegacao>
    </>)
}

export default Funcionario;