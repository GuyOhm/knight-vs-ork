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
        this.isAccessible = false;
    }

    /*
    * This functions refreshes the css classes of the square depending on its properties
    */
    refresh() {
        // reinit the class attribute
        this.div.attr('class', 'col');
        // add weapon class to class list if there is a weapon
        if (this.weapon !== null) {
            this.div.addClass(this.weapon.cssClass);
        }
        // add player class to class list if there is a player
        if (this.player !== null) {
            this.div.addClass(this.player.cssClass);
        }
        // add wall class to class list if there is a wall
        if (this.isWall) {
            this.div.addClass('wall');
        }
        if(this.isAccessible) {
            this.div.addClass('showMove');
        }
    }
}