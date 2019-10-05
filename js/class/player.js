import Weapon from './weapon.js';

/**
* Class that represents a player
*/
export default class Player {
    constructor(square, cssClass) {
        this.square = square;
        this.cssClass = cssClass;
        this.life = 100;
        this.weapon = new Weapon('Dagger', 10, 'dagger');
    }

    /**
    * This function display a player on a square by updating both player and square and refreshing the square
    * @param {Square} square - the square we want to place the player on
    */
    placeOn(square) {
        square.player = this;
        this.square = square;
        square.refresh();
    }

    /**
    * This functions moves a player from one square to another
    */
    move(destinationSquare) {
        const previousSquare = this.square;
        this.square = destinationSquare;
        this.square.player = this;
        previousSquare.player = null;
        previousSquare.refresh();
        this.square.refresh();
    }
}