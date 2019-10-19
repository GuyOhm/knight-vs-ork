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
        this.isDefending = false;
    }

    /**
    * This function display a player on a square by updating both player and square and refreshing the square
    * 
    * @param {Square} square - the square we want to place the player on
    */
    placeOn(square) {
        square.player = this;
        this.square = square;
        square.refresh();
    }

    /**
     * This functions moves a player from one square to another
     * 
     * @param {Square} destinationSquare 
     */
    move(destinationSquare) {
        const previousSquare = this.square;
        this.square = destinationSquare;
        this.square.player = this;
        previousSquare.player = null;
        previousSquare.refresh();
        this.square.refresh();
    }

    /**
     * This function allows the player to attack the other player
     * 
     * @param {Player} player 
     */
    attack(player) {
        let damage = this.weapon.damage;
        if(player.isDefending) {
            // cut damage by 50%
            damage = damage / 2;
            // reinit isDefending state
            player.isDefending = false;
        }
        player.life -= damage;
        console.log(player.cssClass + ' looses ' + damage + ' points of life.')
        console.log(player.cssClass + ' has ' + player.life + ' points of life left.')

    }

    /**
     * This function allows the player to defend
     */
    defend() {
        this.isDefending = true;
        console.log(this.cssClass + ' is defending');
    }

    /**
     * This function displays a life bar on the combat UI
     */
    displayLife() {
        if(this.life < 0) this.life = 0;
        $('#' + this.cssClass + '-life').css('width', this.life + "%");
    }

    /**
     * This function displays the player's current weapon on the combat UI
     */
    displayWeapon() {
        $('#' + this.cssClass + '-weapon-info').addClass(this.weapon.cssClass);
    }

    /**
     * This function handles animation when the player dies 
     */
    die() {
        if(this.cssClass === 'knight') {
            $('.knight-char').css('animation', 'play-knight 0.4s steps(6) forwards');
        }
        else {
            $('.orc-char').css('animation', 'play-orc 0.4s steps(6) forwards');
        }
    }
}