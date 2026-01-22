//Função de Validacao de CPF
export function validarCPF(cpf){
    cpf = cpf.replace(/\D/g, '') //Regex, remove qualquer caractere não númerico da string
    
    if(cpf.length !== 11){
        console.error("CPF Inválido. Documento não possui 11 caracteres.") 
        return false; // Verificar se há 11 digitos no CPF
    }

    let numerosIguais = true;

    for (let i = 0; i < cpf.length; i++) {
        if (cpf[i] !== cpf[0]){
            numerosIguais = false;
            break; // Percorre o cpf para ver se todos os números são repetidos. Se não forem, ele para
        }
        
    }

    if (numerosIguais) {
        console.error("CPF inválido. Todos os dígitos são iguais.");
        return false;
    }

    function proximoDigitoVerificador(cpfIncompleto){ //Função que pecorre todo o CPF atual e o valida
        let somatoria = 0
        for(let i = 0; i < cpfIncompleto.length; i++){
            let digitoAtual = cpfIncompleto.charAt(i) // Resgata o caractere atual
            let constante = (cpfIncompleto.length + 1 - i)
            somatoria += Number(digitoAtual) * constante
        }

        const resto = somatoria % 11

        return resto < 2 ? "0" : (11 - resto).toString()
    } // Se o resto da divisão for 0 ou 1, o digito verificador será 0. Caso contrário = 11 - resto

    let primeiroDigitoVerificador = proximoDigitoVerificador(cpf.substring(0,9))
    let segundoDigitoVerificador = proximoDigitoVerificador(cpf.substring(0,9) + primeiroDigitoVerificador)

    let cpfValidado = cpf.substring(0,9) + primeiroDigitoVerificador + segundoDigitoVerificador
    if (cpf !== cpfValidado){
        console.error("CPF Invalido");
        return false;
    }else{
        console.log("CPF Valido");
        return true;
    } // Compara o CPF informado pelo CPF calculado
}