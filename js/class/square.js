/*
* Class that represents a square of the board
*/ 
export default class Square {
    constructor(row, col, div) {
        this.row = row;
        this.col = col;
        this.div = div;
        this.isWall = false;
        this.weapon = null;
        this.player = null;
    }
    refresh() {
        // function that refreshes the prop of the square
    }
}