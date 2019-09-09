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
        const screenSize = (window.innerWidth < window.innerHeight) ? window.innerWidth : window.innerHeight;
        // Add a row to the page
        for(let i = 0; i < size; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            rowDiv.id = i;
            rowDiv.style.height = screenSize / size + 'px';
            body.appendChild(rowDiv);
            // Add columns to the row
            for(let j = 0; j < size; j++) {
                const row = i;
                const col = j;
                squares.push(new Square(row, col, null));
                const colDiv = document.createElement('div');
                colDiv.classList.add('col');
                colDiv.id = j;
                rowDiv.appendChild(colDiv);
                colDiv.style.width = screenSize / size + 'px';
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