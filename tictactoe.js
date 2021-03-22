const gameBoard = (() => {
    let board = [];

    const boardDictionary = {
        'topL': 0,
        'topM': 1,
        'topR': 2,
        'midL': 3,
        'midM': 4,
        'midR': 5,
        'botL': 6,
        'botM': 7,
        'botR': 8,
    };

    function init() {
        bindEvents();
    }

    function bindEvents() {
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.addEventListener('click', function(e) {
                e.stopPropagation();
                addMove(cell, boardDictionary[cell.id], gameFlow.getTurn());
            });
        })
    }

    function addMove(elem, pos, char) {
        board.splice(pos, 1, char);
        elem.innerHTML = char;
        gameFlow.switchTurn();
    }

    function currentBoard() {
        return board;
    }

    return {
        init,
        addMove,
        currentBoard,
    }
})();

const gameFlow = (() => {
    let currentTurn = 'X';

    function getTurn() {
        return currentTurn;
    }

    function switchTurn() {
        currentTurn = currentTurn === 'X' ? 'O': 'X';
    }

    return {
        getTurn,
        switchTurn,
    }
})();

const startGame = (() => {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', gameBoard.init);
})();
