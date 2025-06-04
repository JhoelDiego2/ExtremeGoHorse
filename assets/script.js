var vt_guardar_nomes = [];
var ax_total_corridas = 0
var div_cadastro_cavalo = document.getElementById('div_cadastro_cavalo')
var div_cadastro_voltas = document.getElementById('div_cadastro_voltas')
function cadastrar() {

    var nome_cavalo = (ipt_nome_cavalo.value);

    if (nome_cavalo == "") {
        div_erros("Por favor, preencha os campos corretamente!")
    } else if (vt_guardar_nomes.includes(nome_cavalo)) {
        div_erros("Nome do cavalo já cadastrado")
    } else {
        vt_guardar_nomes.push(nome_cavalo)
        ipt_nome_cavalo.value = '';
        preencher_painel()
    }
}
function avancar_cadastro_voltas() {

    if (vt_guardar_nomes.length < 2) {
        div_erros("Por favor, insira no minimo 2 cavalos")
    } else if (vt_guardar_nomes.length > 6) {
        div_erros("Por favor, insira no máximo 6 cavalos")
    } else {
        div_cadastro_cavalo.style.display = "none"
        div_cadastro_voltas.style.display = "flex"
    }
}
// parametro sera criado na hora que criar a div_cadastrados (lixeirinha)
function deletar_cavalo(nome) {

    for (let i = vt_guardar_nomes.length - 1; i >= 0; i--) {

        if (vt_guardar_nomes[i] == nome) {
            vt_guardar_nomes.splice(i, 1)
            preencher_painel();

        }
    }
}

function div_erros(texto) {
    var div_erros = document.querySelector('.div_erros')
    div_erros.style.display = "flex"
    texto_erro.innerHTML = texto;

}
function fechar_modal() {
    var div_erros = document.querySelector('.div_erros')
    div_erros.style.display = "none"
}
function preencher_painel() {
    var div_cadastrados = document.querySelector('.div_cadastrados')
    div_cadastrados.innerHTML = ''

    for (let i = 0; i < vt_guardar_nomes.length; i++) {

        div_cadastrados.innerHTML += `     <div>
                <img src="" alt="">
                <p> ${vt_guardar_nomes[i]}</p>
                <img src="assets/img/sair.png" alt="" onclick="deletar_cavalo('${vt_guardar_nomes[i]}')">
            </div>`
    }
    if (ax_total_corridas != 0) {
          div_cadastrados.innerHTML += `<p> Voltas Cadastradas: ${ax_total_corridas}</p>`  
    }
}
function cadastrar_voltas() {
    var ax_voltas =ipt_cadastrar_voltas.value
    if (ax_voltas < 5  || ax_voltas > 10) {
        div_erros(`Total de voltas: ${ax_voltas} Invalido. Insira um numero entre 5 e 10   `)
    }else if (ax_voltas > 10) {
        div_erros("Nome do cavalo já cadastrado")
    }
    ax_total_corridas = ax_voltas
    preencher_painel()
}
function voltar_cadastro() {
    div_cadastro_voltas.style.display = "none"
    div_cadastro_cavalo.style.display = "none"
}