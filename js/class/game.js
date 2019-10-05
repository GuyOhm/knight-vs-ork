import Weapon from './weapon.js';
import Player from './player.js';
import Board from './board.js';

export default class Game {
    constructor () {
        this.board = new Board(10);
        this.players = [
            new Player(null, 'knight'),
            new Player(null, 'orc')
        ];
        this.weapons = [
            new Weapon('Sword', 13, 'sword'),
            new Weapon('Axe', 15, 'axe'),
            new Weapon('Hammer', 17, 'hammer'),
            new Weapon('Double Axe', 21, 'double-axe')
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