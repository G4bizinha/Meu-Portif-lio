
let currentPlayer = '';

document.addEventListener("DOMContentLoaded", function() {
    // Obter elementos do DOM
    var modal = document.getElementById('myModal');
    var O = document.getElementsByClassName('bolinha')[0];
    var X = document.getElementsByClassName('xis')[0];

    // Verificar se os elementos foram encontrados antes de atribuir eventos
    if (X  && O) {
        X.onclick = function() {
            modal.style.display = 'none';
            console.log("Você selecionou o ❌")
            currentPlayer = 'X'
        }

        O.onclick = function() {
            modal.style.display = 'none';
            console.log("Você selecionou o ⭕")
            currentPlayer = 'O'
        }
    }
});


let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function clique(x, y) {
    const cell = document.getElementById('x' + x + '-' + y);
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        checkWin(x, y);
        gameBoard[x][y] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (!checkDraw() && currentPlayer === 'O') {
           computadorJogar()
        }
    }
}

function computadorJogar() {
    // Verificar se há uma jogada para ganhar
    const winningMove = verificarJogadaVencedora(currentPlayer);
    if (winningMove) {
        fazerJogada(winningMove[0], winningMove[1]);
        return;
    }

    // Verificar se há uma jogada para bloquear o jogador
    const blockingMove = verificarBloqueioJogador();
    if (blockingMove) {
        fazerJogada(blockingMove[0], blockingMove[1]);
        return;
    }

    // Jogar em uma célula aleatória vazia
    jogadaAleatoria();
}


function verificarJogadaVencedora(player) {
    for (const combination of winCombinations) {
        const countPlayer = combination.filter(i => cells[i].textContent === player).length;
        if (countPlayer === 2) {
            const emptyCellIndex = combination.find(i => cells[i].textContent === '');
            if (emptyCellIndex !== undefined) {
                return [Math.floor(emptyCellIndex / 3), emptyCellIndex % 3];
            }
        }
    }
    return null;
}

function verificarBloqueioJogador() {
    const opponent = currentPlayer === 'X' ? 'O' : 'X';
    return verificarJogadaVencedora(opponent);
}

function jogadaAleatoria() {
    let emptyCells = [];
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === '') {
                emptyCells.push([i, j]);
            }
        }
    }
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        fazerJogada(randomCell[0], randomCell[1]);
    }
}


function fazerJogada(x, y) {
    const cell = document.getElementById('x' + x + '-' + y);
    cell.textContent = currentPlayer;
    checkWin();
    gameBoard[x][y] = currentPlayer; // Atualiza o tabuleiro gameBoard
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}


function checkWin() {
    const winCombinations = [
        // Linhas
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Colunas
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonais
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combination of winCombinations) {
        const symbol1 = getSymbol(combination[0]);
        const symbol2 = getSymbol(combination[1]);
        const symbol3 = getSymbol(combination[2]);
        
        if (symbol1 !== '' && symbol1 === symbol2 && symbol2 === symbol3) {
            return symbol1; // Retorna o símbolo do vencedor
        }
    }

    return ''; // Nenhum vencedor encontrado
}

function getSymbol(position) {
    const cell = document.getElementById(`x${position[0]}-${position[1]}`);
    return cell.textContent;
}


function checkDraw() {
    for (let row of gameBoard) {
        for (let cell of row) {
            if (cell === '') {
                return false; // Se ainda houver uma célula vazia, o jogo não está empatado
            }
        }
    }
    alert('Empate!');
    return true;
}

function resetBoard() {
    const buttons = document.querySelectorAll('.cell');
    buttons.forEach(button => {
        button.textContent = ''; // Remover o conteúdo de cada botão
    });
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = ''; // Resetar o jogador atual
}


// Restante do seu código...
