import Weapon from './weapon.js';

/*
* Class that represents a player
*/
export default class Player {
    constructor(square, cssClass) {
        this.square = square;
        this.cssClass = cssClass;
        this.life = 100;
        this.weapon = new Weapon('knife', 10, 'knife');
    }
}