var vt_guardar_nomes = [];
var ax_total_corridas = 0
var div_cadastro_cavalo = document.getElementById('div_cadastro_cavalo')
var div_cadastro_voltas = document.getElementById('div_cadastro_voltas')
var tela_carregamento = document.getElementById('tela_carregamento')
var section_cadastro = document.getElementById('section_cadastro')
var section_corrida = document.getElementById('section_corrida')
var tela_aposta = document.getElementById('tela_aposta')
var js_voltas = {}
var vt_resultado_final = []
var cavalo_aposta = ''
var aposta = document.querySelector('.aposta')
var cavalos = {
    0: ['assets/img/11.png', 'assets/img/raonm.jpeg', 'assets/img/2.gif'],
    1: ['assets/img/12.png', 'assets/img/fluttershy.jpeg', 'assets/img/6.gif'],
    2: ['assets/img/13.png', 'assets/img/ponk.jpeg', 'assets/img/3.gif'],
    3: ['assets/img/14.png', 'assets/img/rox.jpeg', 'assets/img/1.gif'],
    4: ['assets/img/15.png', 'assets/img/chap.jpeg', 'assets/img/5.gif'],
    5: ['assets/img/16.png', 'assets/img/branc.jpeg', 'assets/img/4.gif'],
}
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

    for (let i = vt_guardar_nomes.length - 1; i >= 0; i--) {
        if (i > 5) {
            div_erros("Numero máximo de cavalos cadastrados! Clique em Avançar")
        } else {
            div_cadastrados.innerHTML += `
        <div>
                    <img src="${cavalos[i][1]}" alt="">
                    <p> ${vt_guardar_nomes[i]}</p>
                    <img src="assets/img/lixeira.png" id="lixeira" alt="" onclick="deletar_cavalo('${vt_guardar_nomes[i]}')">
         </div>
        `
        }
    }

}
function cadastrar_voltas() {
    var ax_voltas = ipt_cadastrar_voltas.value
    if (ax_voltas < 5 || ax_voltas > 10) {
        div_erros(`Total de voltas: ${ax_voltas} Invalido. Insira um numero entre 5 e 10   `)
    } else {
        ax_total_corridas = ax_voltas
        if (ax_total_corridas != 0) {
            total_voltas.innerHTML = ax_total_corridas
        }
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
    vt_resultado_final = []
    if (cavalo_aposta == '') {
        div_erros('Selecione um personagem')
        return;
    }
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
    tela_aposta.style.display = 'none'
    setTimeout(() => {
        tela_carregamento.style.display = "none"
        section_corrida.style.display = 'flex'
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
    var section_corrida = document.querySelector('.espaco_corrida')
    for (let i = 0; i < vt_guardar_nomes.length; i++) {
        section_corrida.innerHTML += `
        <div class="espaco_total" id="espaco_id_${i}">
            <div class="espaco_cavalo">
                <p>${vt_guardar_nomes[i]}</p>
                <img src="${cavalos[i][2]}" alt="">
            </div>
        </div>
       `
    }
}
var json_somatoria = {};

function animar_cavalos() {
    let espaco_disponivel_total = 90;
    let espaco_total = document.querySelectorAll('.espaco_total');

    for (let i = 0; i < vt_guardar_nomes.length; i++) {
        json_somatoria[`soma_${i}`] = 0;
    }

    const multiplicadores = {
        5: 3,
        6: 2.7,
        7: 2.5,
        8: 2.2,
        9: 2
    };
    let multipicador = multiplicadores[ax_total_corridas] || 1.8;

    let volta_atual = 0;

    let intervalo = setInterval(() => {
        if (volta_atual >= ax_total_corridas) {
            clearInterval(intervalo);

            for (let i = 0; i < vt_guardar_nomes.length; i++) {
                let finalPos = (json_somatoria[`soma_${i}`] * multipicador).toFixed(2);
                espaco_total[i].style.transition = "transform 1s ease";
                espaco_total[i].style.transform = `translateX(${finalPos}%)`;
            }

            setTimeout(() => mostra_resultado_aposta(), 1000)
            return;
        }


        for (let i = 0; i < vt_guardar_nomes.length; i++) {

            let tempo_volta = js_voltas[`vt_volta_${volta_atual}`][i];
            json_somatoria[`soma_${i}`] += tempo_volta;

            let novaPos = (json_somatoria[`soma_${i}`] * multipicador).toFixed(2);
            espaco_total[i].style.transition = "transform 1s ease";
            espaco_total[i].style.transform = `translateX(${novaPos}%)`;
        }

        volta_atual++;

    }, 2000);


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
function ir_aposta() {
    if (vt_guardar_nomes.length >= 2) {
        if (ax_total_corridas >= 5 && ax_total_corridas <= 10) {
            section_cadastro.style.display = "none"
            tela_aposta.style.display = "flex"
            mostrar_apostas()
        }
        else {
            div_erros('Cadastre um número de voltas valido')
        }
    } else {
        div_erros('Cadastre mais cavalos')
    }

}

function mostrar_apostas() {
    aposta.innerHTML = ''
    for (let i = 0; i < vt_guardar_nomes.length; i++) {
        aposta.innerHTML += `
            <div>
                <p>${vt_guardar_nomes[i]}</p>
                <img src="${cavalos[i][0]}" alt="" onclick="escolher_cavalo('${vt_guardar_nomes[i]}')" id="${vt_guardar_nomes[i]}">
            </div>
        `
    }
}
function escolher_cavalo(nome) {
    for (let i = 0; i < vt_guardar_nomes.length; i++) {
        let imagem = document.getElementById(`${vt_guardar_nomes[i]}`)
        imagem.style.filter = 'grayscale(60%)'
    }
    let imagem_escolhida = document.getElementById(`${nome}`)
    imagem_escolhida.style.filter = 'grayscale(0%)'
    cavalo_aposta = nome
}

function mostra_resultado_aposta() {
    let resultado = ''
    if (cavalo_aposta == vt_guardar_nomes[0]) {
        resultado = 'Uia!!! Você ganhou a aposta!!'
    } else {
        resultado = 'Que pena, você perdeu a aposta!!'
    }
    div_erros(resultado)
}