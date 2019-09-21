import Weapon from './weapon.js';

/*
* Class that represents a player
*/
export default class Player {
    constructor(square, cssClass) {
        this.square = square;
        this.cssClass = cssClass;
        this.life = 100;
        this.weapon = new Weapon('Knife', 10, 'knife');
    }

    /*
    * This function display a player on a square by updating both player and square and refreshing the square
    * @param {Square} square - the square we want to place the player on
    */
    placeOn(square) {
        square.player = this;
        this.square = square;
        square.refresh();
    }
}