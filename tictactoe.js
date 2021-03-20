//gameBoard manages game state
const gameBoard = (() => {
    let board = ['X', 'O'];
    
    const player1 = Player('X');
    const player2 = Player('O');

    const addMove = (player, pos) => board.insert(pos, player.getChar());
})();

//displayController manages html
const displayController = () => {

}

const Player = (char) => {
    const getChar = () => char;
    return {char}
}