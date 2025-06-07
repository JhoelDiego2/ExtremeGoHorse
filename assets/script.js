var vt_guardar_nomes = [];
var ax_total_corridas = 0
var div_cadastro_cavalo = document.getElementById('div_cadastro_cavalo')
var div_cadastro_voltas = document.getElementById('div_cadastro_voltas')
var tela_carregamento = document.getElementById('tela_carregamento')
var section_cadastro = document.getElementById('section_cadastro')

var js_voltas = {}
var vt_resultado_final = []
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
    } else if (vt_guardar_nomes.length > 7) {
        div_erros("Por favor, insira no máximo 7 cavalos")
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
    var div_erros = document.querySelector('.section_erros')
    div_erros.style.display = "flex"
    texto_erro.innerHTML = texto;

}
function fechar_modal() {
    var div_erros = document.querySelector('.section_erros')
    div_erros.style.display = "none"
}
function preencher_painel() {
    var div_cadastrados = document.querySelector('.div_cadastrados')
    div_cadastrados.innerHTML = ''

    for (let i = 0; i < vt_guardar_nomes.length; i++) {
        if (i > 6) {
            div_erros("Numero máximo de cavalos cadastrados! Clique em Avançar")
        } else {
            div_cadastrados.innerHTML += `
        <div>
                    <img src="assets/img/images.jpeg" alt="">
                    <p> ${vt_guardar_nomes[i]}</p>
                    <img src="assets/img/lixeira.png" id="lixeira" alt="" onclick="deletar_cavalo('${vt_guardar_nomes[i]}')">
         </div>
        `
        }
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
    } else {
        ax_total_corridas = ax_voltas
        preencher_painel()
    }

}
function voltar_cadastro() {
    div_cadastro_voltas.style.display = "none"
    div_cadastro_cavalo.style.display = "none"
}
function gerar_aleatorio() {
    return Number((Math.random() * 2 + 4).toFixed(1))
}
function comecar_jogo() {
    for (let i = 0; i < ax_total_corridas; i++) {
        js_voltas[`vt_volta_${i}`] = [];
        for (let index_2 = 0; index_2 < vt_guardar_nomes.length; index_2++) {
            let aleatorio = gerar_aleatorio()
            js_voltas[`vt_volta_${i}`].push(aleatorio);
            if (vt_resultado_final.length == vt_guardar_nomes.length) {
                vt_resultado_final[index_2] = vt_resultado_final[index_2] + aleatorio
            } else {
                vt_resultado_final.push(aleatorio)
            }
        }
    }
    gerar_espaco_cavalo()
    tela_carregamento.style.display = "flex"
    setTimeout(() => {
        tela_carregamento.style.display = "none"
        animar_cavalos()
    }, 3000);
    // mostrar_podium()
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
}
function gerar_espaco_cavalo() {
    var section_corrida = document.getElementById('section_corrida')
    for (let i = 0; i < vt_guardar_nomes.length; i++) {
        section_corrida.innerHTML += `
        <div class="espaco_total" id="espaco_id_${i}">
            <div class="espaco_cavalo">
                <p>${vt_guardar_nomes[i]}</p>
                <img src="assets/img/MLP Walking by The-Paper-Pony.gif" alt="">
            </div>
        </div>
       `
    }
}
// var json_somatoria = {}
// function animar_cavalos() {
//     let espaco_disponivel_total = 90;
//     let espaco_volta = espaco_disponivel_total / ax_total_corridas;
//     let espaco_total = document.querySelectorAll('.espaco_total')
//     for (let i = 0; i < vt_guardar_nomes; i++) {
//         json_somatoria[`soma_${i}`] = 0
//     }
//     for (let i_dois = 0; i_dois < ax_total_corridas; i_dois++) {
//         for (let i_tres = 0; i_tres < vt_guardar_nomes.length; i_tres++) {
//             json_somatoria[`soma_${i_dois}`] += js_voltas[`vt_volta_${i_dois}`][i_tres];
//             espaco_total[i_tres].style.transform =`translateX(${json_somatoria[`soma_${i_dois}`]}vw)`;
//         }
//     }
// }
var json_somatoria = {};

function animar_cavalos() {
    let espaco_disponivel_total = 90;
    let espaco_volta = espaco_disponivel_total / ax_total_corridas;
    let espaco_total = document.querySelectorAll('.espaco_total');

    // Inicializa a somatória dos cavalos
    for (let i = 0; i < vt_guardar_nomes.length; i++) {
        json_somatoria[`soma_${i}`] = 0;
    }

    let volta_atual = 0;

    let intervalo = setInterval(() => {
        var multipicador = 0
        if (volta_atual >= ax_total_corridas) {
            clearInterval(intervalo);
            return;
        }
        if (ax_total_corridas == 5) {
            multipicador = 3
        } else if (ax_total_corridas == 6) {
            multipicador = 2.7
        } else if (ax_total_corridas == 7) {
            multipicador = 2.6
        } else if (ax_total_corridas == 8) {
            multipicador = 2.2
        } else if (ax_total_corridas == 9) {
            multipicador = 2
        } else {
            multipicador = 1.8
        }

        for (let i = 0; i < vt_guardar_nomes.length; i++) {
            let tempo_volta = js_voltas[`vt_volta_${volta_atual}`][i];

            // Soma o tempo da volta ao cavalo
            json_somatoria[`soma_${i}`] += tempo_volta;

            // Move o cavalo proporcionalmente
            espaco_total[i].style.transition = "transform 1s ease";
            espaco_total[i].style.transform = `translateX(${(json_somatoria[`soma_${i}`] * multipicador).toFixed(2)}vw)`;
        }

        volta_atual++;

    }, 1000);
}
const tela_inicial = document.getElementById('tela_inicial')
function abrir_cadastro() {
    tela_carregamento.style.display = "flex"
    tela_inicial.style.display = "none"
    setTimeout(() => {
        tela_carregamento.style.display = "none"
        section_cadastro.style.display = "flex"
    }, 2000);
}