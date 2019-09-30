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
        const body = $('body');
        // Add a row to the page
        for(let i = 0; i < size; i++) {
            const rowDiv = $('<div class="row"></div>');
            body.append(rowDiv);
            // Add columns to the row
            for(let j = 0; j < size; j++) {
                const row = i;
                const col = j;
                const div = $('<div class="col"></div>');
                squares.push(new Square(row, col, div));
                rowDiv.append(div);
            }
        }
        return squares;
    }
    
    /*
    * This function randomly picks an element of an array and pops it
    * @param {array} array
    * @param {boolean} pop - do we want to pop the element from the array (optional)
    * @return elt - the randomly picked element
    */
    pickAndPop(array, pop) {
        // If there's no argument for pop set it to true
        pop = pop === undefined ? true : pop;
        // Generate a random index within the limit of the array length
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

    /*
    * This function get a Square from its row and col
    * @param {interger} row
    * @param {interger} col
    * @return {Square}
    */
    getSquare(row, col) {
        // Check if square exists, if not return null
        if (row * col < 0 ||
            row > this.size - 1 ||
            col > this.size - 1) {
            return null;
        }
        return this.squares[row * this.size + col];
    }

    /*
    * This function iterates towards a direction and find the accessibles squares from the initial square
    * @param {Square} square - the initial square
    * @param {integer} distance - how far from the initial position we want to go
    * @param {{row:integer, col:integer}} direction - an object that represents a vector
    * @return {Square[]} accessibleSquares
    */
    getAccessibleSquaresInDirection(square, distance, direction) {
        const accessibleSquares = [];
        for(let i = 1; i < distance + 1; i++) {
            const nextSquare = this.getSquare(square.row + direction.row * i, square.col + direction.col * i);
            if(nextSquare !== null && nextSquare.isWall === false && nextSquare.player === null) {
                accessibleSquares.push(nextSquare);
            } else {
                break;
            }
        }
        return accessibleSquares;
    }

    /*
    * This function iterates towards all directions and find the accessibles squares from the initial square
    * @param {Square} square - the initial square
    * @param {integer} distance - how far from the initial position we want to go
    * @return {Square[]} accessibleSquares
    */
    getAccessibleSquares(square, distance) {
        const accessibleSquares = [];
        // Declare vector objects for the 4 directions (right, left, downwards, upwards)
        const directions = [{row: 0, col: 1}, {row: 0, col: -1}, {row: 1, col: 0}, {row: -1, col: 0}];
        for(let direction of directions) {
            // Concatenate array of squares from each direction at each iteration
            accessibleSquares.splice(-1, 0, ...this.getAccessibleSquaresInDirection(square, distance, direction));
        }
        return accessibleSquares;
    }

    /*
    * This function highlights accessibles squares for a player to move to and set an event listener on each of them.
    * When a square is clicked 
    * @param {Player} player
    */
    showPossibleMoves(player, nextPlayer) {
        const initialSquare = player.square;
        const accessibleSquares = this.getAccessibleSquares(initialSquare, 3);
        for(let square of accessibleSquares) {
            square.isAccessible = true;
            square.refresh();
            square.div.on('click', () => {
                player.move(square);
                this.cleanSquares(accessibleSquares);
                this.swapWeaponsIfAny(initialSquare, square, player);
                this.showPossibleMoves(nextPlayer, player);
            });
        }
    }

    /*
    * This function cleans highlighted squares
    * @param {Square[]} accessibleSquares
    */
    cleanSquares(accessibleSquares) {
        for(let square of accessibleSquares) {
            square.isAccessible = false;
            square.refresh();
            square.div.off('click');
        }
    }

    /*
    * This function allows to swap weapons when a player is passing over another weapon.
    * @param {Square} initialSquare
    * @param {Square} destinationSquare
    * @param {Player} player
    */
    swapWeaponsIfAny(initialSquare, destinationSquare, player) {
        const crossedSquares = this.getCrossedSquares(initialSquare, destinationSquare);
        // Iterate over crossed squares and if swap weapons if any
        for(let square of crossedSquares) {
            if(square.weapon !== null) {
                const previousWeapon = player.weapon;
                const nextWeapon = square.weapon;
                player.weapon = nextWeapon;
                square.weapon = previousWeapon;
                square.refresh();
            }
        }
    }

    /*
    * This function gets all squares a player crossed when moving from one square to another
    * @param {Square} initialSquare
    * @param {Square} destinationSquare
    * @return {Square[]} crossedSquares
    */
    getCrossedSquares(initialSquare, destinationSquare) {
        const crossedSquares = [];
        // Determine the moving vector
        const vector = {
            row: destinationSquare.row - initialSquare.row,
            col: destinationSquare.col - initialSquare.col
        };
        const unitVector = {
            row: Math.sign(vector.row),
            col: Math.sign(vector.col)
        };
        // Iterate n times, n being the distance
        for(let i = 1; i < Math.abs(vector.row + vector.col) + 1; i++) {
            crossedSquares.push(this.getSquare(initialSquare.row + unitVector.row * i, initialSquare.col + unitVector.col * i));
        }
        return crossedSquares;
    }
}