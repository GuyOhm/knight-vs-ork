import Square from './square.js';

/*
* Class that represents the board
*/
export default class Board {
    constructor(size) {
        this.size = size;
        this.squares = this.generateGrid(size);
    }

    /*
    * This function generates a a grid and an array of Squares based on the size
    * @param {integer} size - Size of the board
    * @return {Square[]} squares - Array of Squares
    */ 
    generateGrid(size) {
        const squares = [];
        const body = document.querySelector('body');
        // Add a row to the page
        for(let i = 0; i < size; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            rowDiv.id = i;
            body.appendChild(rowDiv);
            // Add columns to the row
            for(let j = 0; j < size; j++) {
                const row = i;
                const col = j;
                const div = `.row[id='${row}'] .col[id='${col}']`;
                squares.push(new Square(row, col, div));
                const colDiv = document.createElement('div');
                colDiv.classList.add('col');
                colDiv.id = j;
                rowDiv.appendChild(colDiv);
            }
        }
        return squares;
    }

    /*
    *
    */
    getSquare(row, col) {
        // check if square exists, if not return null
        return this.squares[row * this.size + col];
    }
}