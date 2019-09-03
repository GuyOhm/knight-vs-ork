import Square from './square.js';

/*
* Class that represents the board
*/
export default class Board {
    constructor(size) {
        this.size = size;
        this.squares = [];
        this.generateGrid(size);
    }

    /*
    * This function generates a list of coordinates based on the size
    * @param {integer} size - Size of the board
    */ 
    generateGrid(size) {
        
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                const row = i;
                const col = j;
                this.squares.push([row, col]);
            }
        }
    }
    getSquare(row, col) {
        // check if square exists, if not return null
        return this.squares[col * this.size + row]
    }
}