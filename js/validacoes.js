function envia_dados(){
    let erro;

    erro = valida_atleta();

    if(erro.length > 0){
        mensagem_erro.innerHTML = erro;
    }else{
        //Enviar dados para o banco
    }
}

function valida_atleta(){
    if(!id_nome.value || !id_idade.value || !id_nacionalidade.value || !id_clube.value || !id_selecao.value
       || !posicao.value || !ranking.value){

        return alert("Preencha todos os campos!");
    }
}

function envia_add_user(){
    let erro;

    erro = valida_cadastro();

    if(erro.length > 0){

        ul_valida.innerHTML = erro;
        
    }else{
        //Enviar dados para o banco
    }
}

function valida_cadastro(){
        if(id_pass.value != id_pass_confirm.value){
            return "As senhas não conferem"; 
        }
}



//USANDO ARRAY

//Função para busar "caractere" -> idnome.value.search("a") == -1

//Função para criar "elemento" -> var li = document.createElement("li");
//li.innerHTML = erro;
//appendChuild = joga o elemento 'filho' no elemento pai
//mensagemErro.appendChild("li");

// let erros = [];


// if(!id_nome.value){
//     erros.push("Preencha o nome!");
// }

// if(!id_idade.value ){
//     erros.push("Preencha a idade!");
// }

// if(!id_nacionalidade.value ){
//     erros.push("Preencha a nacionalidade!");
// }

// if(!id_clube.value){
//     erros.push("Preencha o clube!");
// }

// if(!id_selecao.value){
//     erros.push("Preencha a seleção!");
// }

// if(!posicao.value){
//     erros.push("Preencha todos os campos!");
// }

// if(!ranking.value){
//     erros.push("Preencha todos os campos!");
// }

// return erros;