import Weapon from './weapon.js';
import Player from './player.js';
import Board from './board.js';

export default class Game {
    constructor () {
        this.board = new Board(10);
        this.players = [
            new Player(null, 'player1'),
            new Player(null, 'player2')
        ];
        this.weapons = [
            new Weapon('Katana', 13, 'katana'),
            new Weapon('Knife', 10, 'knife'),
            new Weapon('Chainsaw', 17, 'chainsaw'),
            new Weapon('Axe', 15, 'axe')
        ];
        this.nbOfWalls = 12;
    }

    /**
    * This method initialize the game by placing players, weapons and walls onto the board
    */
    init() {
        const squaresCopy = this.board.squares.slice(0);
        this.board.placePlayers(this.players, squaresCopy);
        this.board.placeWeapons(this.weapons, squaresCopy);
        this.board.placeWalls(this.nbOfWalls, squaresCopy);
    }

    start() {
        this.board.showPossibleMoves(this.players[0], this.players[1]);
    }
}