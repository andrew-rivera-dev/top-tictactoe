const gameBoard = (() => {
    let board = new Array(9).fill(null);

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
        cacheDom();
        bindEvents();
        render();
    }

    function cacheDom() {
        this.gameState = document.getElementById('game-state');
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

    function render() {
        if (gameFlow.gameOver(currentBoard())[1] === true) {
            this.gameState.innerHTML = gameFlow.gameOver(currentBoard())[0];
        } else {
            this.gameState.innerHTML = 'It\'s ' + gameFlow.getTurn() + '\'s turn';
        }
    }

    function addMove(elem, pos, char) {
        if (elem.innerHTML === '') {
            board.splice(pos, 1, char);
            elem.innerHTML = char;
            gameFlow.switchTurn();
        }
        render();
    }

    function currentBoard() {
        return board;
    }

    function resetBoard() {
        board = new Array(9).fill(null);
        render();
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

    function gameOver(b) {

        function getAllIndexes(arr, val) {
            let indexes = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === val) indexes.push(i);
            }
            return indexes;
        }

        function arrayEquals(arr1, arr2) {
            return Array.isArray(arr1) &&
            Array.isArray(arr2) &&
            arr1.length === arr2.length &&
            arr1.every((val, index) => val === arr2[index]);
        }

        const winCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]

        const xBoard = getAllIndexes(b, 'X');
        const oBoard = getAllIndexes(b, 'O');

        for (let i = 0; i < winCombos.length; i++) {
            if (arrayEquals(winCombos[i], xBoard)) return ['X\'s win!', true];
            else if (arrayEquals(winCombos[i], oBoard)) return ['O\'s win!', true];
            else if (b.every(x => x !== null)) return ['It\'s a draw!', true];
        }
        return [null, false];
    }

    return {
        getTurn,
        switchTurn,
        gameOver,
    }
})();

const startGame = (() => {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', gameBoard.init);
})();
