var vt_guardar_nomes = [];
var ax_total_corridas = 0
var div_cadastro_cavalo = document.getElementById('div_cadastro_cavalo')
var div_cadastro_voltas = document.getElementById('div_cadastro_voltas')
function cadastrar() {

    var nome_cavalo = ipt_nome_cavalo.value;

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
        div_cadastrados.innerHTML += `<button onclick="comecar_jogo()">Começar</button> `
    }
}
function cadastrar_voltas() {
    var ax_voltas = ipt_cadastrar_voltas.value
    if (ax_voltas < 5 || ax_voltas > 10) {
        div_erros(`Total de voltas: ${ax_voltas} Invalido. Insira um numero entre 5 e 10   `)
    } else if (ax_voltas > 10) {
        div_erros("Nome do cavalo já cadastrado")
    }
    ax_total_corridas = ax_voltas
    preencher_painel()
}
function voltar_cadastro() {
    div_cadastro_voltas.style.display = "none"
    div_cadastro_cavalo.style.display = "none"
}
function gerar_aleatorio() {
    return Number((Math.random() * 2 + 4).toFixed(1))
}
var js_voltas = {}
var vt_resultado_final = []
function comecar_jogo() {
    alert()
    for (let i = 0; i < ax_total_corridas; i++) {
        js_voltas[`vt_volta_${i + 1}`] = [];
        for (let index_2 = 0; index_2 < vt_guardar_nomes.length; index_2++) {
            let aleatorio = gerar_aleatorio()
            js_voltas[`vt_volta_${i + 1}`].push(aleatorio);
            if (vt_resultado_final.length == vt_guardar_nomes.length) {
                vt_resultado_final[index_2] = vt_resultado_final[index_2] + aleatorio
            } else {
                vt_resultado_final.push(aleatorio)
            }
        }
    }
    mostrar_podium()
}
function mostrar_podium() {
    for (let i = 0; i < vt_resultado_final.length - 1; i++) {
        for (let index_2 = 0; index_2 < vt_resultado_final.length - 1 - i; index_2++) {
            if (vt_resultado_final[index_2] > vt_resultado_final[index_2 + 1]) {
                var tempTotal = vt_resultado_final[index_2];
                vt_resultado_final[index_2] = vt_resultado_final[index_2 + 1];
                vt_resultado_final[index_2 + 1] = tempTotal;

                var tempNome = vt_guardar_nomes[index_2];
                vt_guardar_nomes[index_2] = vt_guardar_nomes[index_2 + 1];
                vt_guardar_nomes[index_2 + 1] = tempNome;
            }
        }
    }

    resultado.innerHTML += `
        1º lugar: ${vt_guardar_nomes[0]} (Tempo: ${vt_resultado_final[0].toFixed(1)})<br>
        2º lugar: ${vt_guardar_nomes[1]} (Tempo: ${vt_resultado_final[1].toFixed(1)})<br>
        3º lugar: ${vt_guardar_nomes[2]} (Tempo: ${vt_resultado_final[2].toFixed(1)})<br>
        `;
    console.log('fdsafdsaf')
}