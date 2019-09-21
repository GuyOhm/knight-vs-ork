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
    
    /*
    * This function randomly picks an element of an array and pops it
    * @param {integer[]} array
    * @param {boolean} pop - do we want to pop the element from the array (optional)
    * @return {integer} elt - the randomly picked element
    */
    pickAndPop(array, pop) {
        pop = pop === undefined ? true : pop;
        const randomIdx = Math.floor(Math.random() * array.length);
        const elt = array[randomIdx];
        if(pop) {
            array.splice(randomIdx, 1);
        }
        return elt;
    }

    /*
    * This function checks if 2 squares are nearby
    * @param {Square} square1 - the first square
    * @param {Square} square2 - the second square
    * @return {boolean} - true if squares are nearby, false otherwise
    * 
    * The squares are nearby (horizontally, verticaly or diagonally) if their coordinates are different from 1 or -1
    * as a consequence if the absolute value of their substraction is <= to 1
    */
    areSquaresNearby(square1, square2) {
        return Math.abs(square1.col - square2.col) <= 1 && Math.abs(square1.row - square2.row) <= 1;
    }

    /* 
    * This function places randomly players on the board
    * @param {Player} players
    * @param {Square[]} squaresCopy
    */
    placePlayers(players, squaresCopy) {
        const square = this.pickAndPop(squaresCopy);
        // Place the first player
        players[0].placeOn(square);
        let otherSquare = this.pickAndPop(squaresCopy, false);
        // Pick anoter square as long as it's nearby
        while(this.areSquaresNearby(square, otherSquare)) {
            otherSquare = this.pickAndPop(squaresCopy, false);
        }
        // Pop the second square once we know it is not nearby
        const index = squaresCopy.indexOf(otherSquare);
        squaresCopy.splice(index, 1);
        // Place the second player
        players[1].placeOn(otherSquare);
    }
    
    /* 
    * This function places randomly weapons on the board
    * @param {Weapon} weapons
    * @param {Square[]} squaresCopy
    */
    placeWeapons(weapons, squaresCopy) {
        for (let weapon of weapons) {
            const square = this.pickAndPop(squaresCopy);
            square.weapon = weapon;
            square.refresh();
        }
    }
    
    /* 
    * This function places randomly walls on the board
    * @param {interger} nbOfWalls
    * @param {Square[]} squaresCopy
    */
    placeWalls(nbOfWalls, squaresCopy) {
        for (let i = 0; i < nbOfWalls; i++) {
            const square = this.pickAndPop(squaresCopy);
            square.isWall = true;
            square.refresh();
        }
    }
}