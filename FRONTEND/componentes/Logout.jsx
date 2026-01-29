import {useNavigate} from "react-router-dom"
import {POST} from "../MetodosHTTP.js"

//Função de logout
function Logout(){
    const navigate = useNavigate();

    async function Deslogar(){
        try{
            const confirmacaoLogout = confirm("Deseja prosseguir com o logout?");
            if(confirmacaoLogout){
                const respostaLogout = await POST("/funcionarios/logout", { executarLogout: true });
                if(respostaLogout.logout === true){
                    navigate("/login");
                } else {
                    console.error("Erro no processo de deslogue.");
                    alert("Erro no processo de deslogue.");
                }
            }

        } catch (error){
            console.error("Erro no processo de deslogue.");
            alert("Erro no processo de deslogue.");
        }
    }

    return <div className="text-center text-red-500 font-bold cursor-default" onClick={async () => { await Deslogar();}}>Logout</div>
}

export default Logout