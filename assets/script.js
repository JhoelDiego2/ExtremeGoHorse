var vt_guardar_nomes = [];

function cadastrar() {

    var nome_cavalo = (ipt_nome_cavalo.value);

    if (nome_cavalo == "") {
        div_erros("Por favor, preencha os campos corretamente!")
    } else {
        vt_guardar_nomes.push(nome_cavalo)
        ipt_nome_cavalo.value = '';

        if (vt_guardar_nomes.length < 2) {
            div_erros("Por favor, insira no minimo 2 cavalos")
        } else if (vt_guardar_nomes.length > 6) {
            div_erros("Por favor, insira no máximo 6 cavalos")
        } else if (vt_guardar_nomes.includes(nome_cavalo)) {
            div_erros("Nome do cavalo já cadastrado")
        }
    }
}
// parametro sera criado na hora que criar a div_cadastrados (lixeirinha)
function deletar_cavalo(nome) {
    for (let i = vt_guardar_nomes; i >= 0; i--) {
        if (vt_guardar_nome[i] = nome) {
            vt_guardar_nomes.splice(1, 1)
        }
    }
}

function div_erros(texto) {
    texto_erro.innerHTML = texto;

}