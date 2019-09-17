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
    * This function generates a grid and an array of Squares based on the size
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
            body.appendChild(rowDiv);
            // Add columns to the row
            for(let j = 0; j < size; j++) {
                const row = i;
                const col = j;
                const div = document.createElement('div');
                div.classList.add('col');
                squares.push(new Square(row, col, div));
                rowDiv.appendChild(div);
            }
        }
        return squares;
    }
    
    /*
    *
    */
    getSquare(row, col) {
        // TODO: check if square exists, if not return null
        return this.squares[row * this.size + col];
    }
    
    // This function randomly picks an element of an array and pops it
    // @param {integer[]} array
    // @return {integer} elt - the randomly picked element
    pickAndPop(array) {
        const randomIdx = Math.floor(Math.random() * array.length);
        const elt = array[randomIdx];
        array.splice(randomIdx, 1);
        return elt;
    }
    
    placePlayers(players, squaresCopy) {
        // Place randomly 2 players on the board
        for (let player of players) {
            const square = this.pickAndPop(squaresCopy);
            square.player = player;
            square.refresh();
        }
    }
    
    placeWeapons(weapons, squaresCopy) {
        for (let weapon of weapons) {
            const square = this.pickAndPop(squaresCopy);
            square.weapon = weapon;
            square.refresh();
        }
    }
    
    placeWalls(nbOfWalls, squaresCopy) {
        for (let i = 0; i < nbOfWalls; i++) {
            const square = this.pickAndPop(squaresCopy);
            square.isWall = true;
            square.refresh();
        }
    }
}