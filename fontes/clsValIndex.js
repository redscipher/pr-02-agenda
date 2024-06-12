//constantes globais
const form = document.querySelector("#idFormCad");
const eContato = document.querySelector('#idContato');
const sValidacao = document.querySelector('#idValidacao');
const btnEnviar = document.querySelector('#idBtnAdc');
// == classes
const clsValidacao = document.querySelector('.clsValidacao');
//variaveis globais + vetores
let linhasTab = '';
let vNomes = [], vContatos = [];

//debug
console.log(form)
/////////////////

//funcoes
let ValidaDados = function(StrNome, StrContato){
    //variavel
    let controle;
    //validacao
    controle = vNomes.includes(StrNome) || vContatos.includes(StrContato) ? false : true;
    //def retorno
    return controle;
}

let AdicionaLinha = function(){
    //objetos formulario
    const eNome = document.querySelector('#idNome');
    const tbCorpo = document.querySelector('#idTabCorpo');
    //variavel p/ linha
    let linhaTab = '';
    let StrNome, StrContato;

    //debug
    console.log(eNome);
    console.log(eContato);
    //////////////////////

    //informacoes preenchidas
    StrNome = eNome.value;
    StrContato = eContato.value;
    //valida se informacao nao esta duplicada
    if (!ValidaDados(StrNome, StrContato)) {
        alert('Já existe um linha na tabela com estas mesmas informações!')
    }else{
        //valida contato
        if (validaContato()){
             //adiciona informacoes nos vetores
            vNomes.push(StrNome);
            vContatos.push(StrContato);
            //monta linha
            linhaTab = `<tr>
            <td>${StrNome}</td>
            <td>${StrContato}</td>
            </tr>`;
            //incrementa
            linhasTab += linhaTab;
            //efetua adicionao da linha
            tbCorpo.innerHTML = linhasTab;
        }
    }
    //reseta campos
    eNome.value = '';
    eContato.value = '';
}

let AtualizaTabRodape = function(e){
    //constante + variaveis
    const etrcResumo = document.querySelector('#idTabResumo');
    let totalLinhas = 0;
    let StrResumo = '';
    // total de linhas da tabela = numero de pessoas nos vetores
    totalLinhas = vContatos.length;
    // atualiza resumo
    StrResumo = `${totalLinhas} pessoa(s) cadastrada(s)`
    //atualiza linha
    etrcResumo.innerHTML = StrResumo;
}   

let AdicionaPessoa = function(e){
    //p/ evento
    e.preventDefault();
    //reseta visualizacao
    clsValidacao.classList.add('clsValidacao');
    //monta nova linha
    AdicionaLinha();
    //atualiza rodape resumo
    AtualizaTabRodape();
    //exibe mensage
    console.log('botao pressionado');
}

let validaExibirMensagemUsuario = function(formValido){
    console.log(formValido);
    // formulario esta valido ?
    if (formValido) {
        //desabilita botao
        btnEnviar.disabled = false;
        //////////////////////////
        clsValidacao.classList.remove('clsMiniErrado');
        sValidacao.innerHTML = '';
    }else{
        //desabilita botao
        btnEnviar.disabled = true;
        //exibe mensagem de erro
        clsValidacao.classList.add('clsMiniErrado');
        sValidacao.innerHTML = '<span>O número de telefone deve ser informado somente números e mínimo de 11 caracteres</span>';
    }
}

let validaContato = function(e){
    // variaveis
    let StrContato
    let formValido;
    // retorna os valores digitados
    StrContato = document.querySelector('#idContato').value;
    //exibicao
    console.log(StrContato);
    // valida campo contato
    if (isNaN(StrContato) || StrContato.length < 11){
        formValido = false;
    }else{
        formValido = true;
    }
    // controle exibicao mensagem usuario
    validaExibirMensagemUsuario(formValido);
    // def retorno
    return formValido;
}

//adicionar um evento
form.addEventListener('submit', AdicionaPessoa);
// adiciona um ouvinte de evento p/ cada tecla pressionada, efetuando a validacao sem precisar clicar em enviar
eContato.addEventListener('keyup', validaContato);
