/*
* Class that represents the board
*/
export default class Board {
    constructor(size) {
        this.coordinates = [];
        this.generateCoord(size);
    }

    /*
    * This function generates a list of coordinates based on the size
    * @param {integer} size - Size of the board
    */ 
    generateCoord(size) {
        for(let i = 1; i < size + 1; i++) {
            for(let j = 1; j < size + 1; j++) {
                const row = i;
                const col = j;
                this.coordinates.push([row, col]);
            }
        }
    }
}