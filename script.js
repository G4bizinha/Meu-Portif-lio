let jogador = 'X';


function clique(element) {
    if (element.innerHTML.trim() === "") {
        element.innerHTML = "❌";
    }
}


function verificarVitoria() {
    const linhas = [
        ['x0-1', 'x0-2', 'x0-3'],
        ['x1-1', 'x1-2', 'x1-3'],
        ['x2-1', 'x2-2', 'x2-3'],
        ['x0-1', 'x1-1', 'x2-1'],
        ['x0-2', 'x1-2', 'x2-2'],
        ['x0-3', 'x1-3', 'x2-3'],
        ['x0-1', 'x1-2', 'x2-3'],
        ['x0-3', 'x1-2', 'x2-1']
    ];

    for (let linha of linhas) {
        let marca1 = document.getElementById(linha[0]).innerHTML;
        let marca2 = document.getElementById(linha[1]).innerHTML;
        let marca3 = document.getElementById(linha[2]).innerHTML;
        if (marca1 !== '&nbsp;' && marca1 === marca2 && marca2 === marca3) {
            return true;
        }
    }

    return false;
}

function verificarEmpate() {
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            if (document.getElementById('x' + i + '-' + j).innerHTML === '&nbsp;') {
                return false;
            }
        }
    }
    return true;
}

function reiniciarJogo() {
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            document.getElementById('x' + i + '-' + j).innerHTML = '&nbsp;';
        }
    }
    jogador = 'X';
}


// Modal 


document.addEventListener("DOMContentLoaded", function() {
    // Obter elementos do DOM
    var modal = document.getElementById('myModal');
    var O = document.getElementsByClassName('bolinha')[0];
    var X = document.getElementsByClassName('xis')[0];

    // Verificar se os elementos foram encontrados antes de atribuir eventos
    if (X && O) {
        X.onclick = function() {
            modal.style.display = 'none';
            console.log("Você selecionou o ❌")
        }

        O.onclick = function() {
            modal.style.display = 'none';
            console.log("Você selecionou o ⭕")
        }
    }

    // Quando o usuário clicar fora do modal, fechar o modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});