//Funções de requisições HTTP de JSONs

const API_BASE_URL = 'http://localhost:3000/api';

//Metodo GET
export async function GET(rota){ 
    try { 
        const urlCompleta = rota.startsWith('http') ? rota : `${API_BASE_URL}${rota}`;
        let resposta = await fetch(urlCompleta, {credentials: 'include'}); // Permite que o navegador pegue cookies de sessão
        const dados = await resposta.json();
        if("mensagemServidor" in dados){
            return dados["mensagemServidor"];
        }else{
            return dados;
        }

    } catch (error) {
        console.error(`Erro na busca de dados: ${error.message || error}`);
        return `Erro na busca de dados: ${error.message || error}`;
    }
};

//Metodo POST
export async function POST(rota, objeto) {
    try {
        const urlCompleta = rota.startsWith('http') ? rota : `${API_BASE_URL}${rota}`;
        const objetoJSON = JSON.stringify(objeto);
        let resposta = await fetch(urlCompleta, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: objetoJSON,
            credentials: 'include' // Permite que o navegador envie cookies de sessão
        });
        resposta = await resposta.json();
        return resposta;
    }
    catch (error) {
        console.error(`Erro no envio de dados: ${error.message || error}`);
        return `Erro no envio de dados: ${error.message || error}`;
    }
};

//Metodo PUT
export async function PUT(rotaEspecifica, objeto) {
    try{
        const urlCompleta = rotaEspecifica.startsWith('http') ? rotaEspecifica : `${API_BASE_URL}${rotaEspecifica}`;
        const objetoJSON = JSON.stringify(objeto);
        let resposta = await fetch(urlCompleta, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: objetoJSON,
            credentials: 'include' // Permite que o navegador envie cookies de sessão
        });
        resposta = await resposta.json();
        return resposta;
    }
    catch(error){
        console.error(`Erro na atualização de dados: ${error.message || error}`);
        return `Erro na atualização de dados: ${error.message || error}`;
    }
};

//Metedo DELETE
export async function DELETE(rotaEspecifica) {
    try{
        const urlCompleta = rotaEspecifica.startsWith('http') ? rotaEspecifica : `${API_BASE_URL}${rotaEspecifica}`;
        let resposta = await fetch(urlCompleta, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include' // Permite que o navegador envie cookies de sessão
        });
        resposta = await resposta.json();
        return resposta;
    }
    catch(error){
        console.error(`Erro na excluição de dados: ${error.message || error}`);
        return `Erro na excluição de dados: ${error.message || error}`;
    }
};