let jogador = 'X';

function clique(id) {
    let celula = document.getElementById(id);
    if (celula.innerHTML === '&nbsp;') {
        celula.innerHTML = jogador;
        if (verificarVitoria()) {
            alert('Jogador ' + jogador + ' venceu!');
            reiniciarJogo();
        } else if (verificarEmpate()) {
            alert('Empate!');
            reiniciarJogo();
        } else {
            jogador = jogador === 'X' ? 'O' : 'X';
        }
    } else {
        alert('Célula ocupada!');
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


// Obter elementos do DOM
var modal = document.getElementById('myModal');
var closeModalSpan = document.getElementsByClassName('close')[0];

// Quando o usuário clicar no 'x', fechar o modal
closeModalSpan.onclick = function() {
  modal.style.display = 'none';
}

// Quando o usuário clicar fora do modal, fechar o modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}