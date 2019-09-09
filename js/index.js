import Board from './class/board.js';
import Player from './class/player.js';
import Weapon from './class/weapon.js';

const board = new Board(10);
const nbOfPlayers = 2;
const nbOfWalls = 12;
const nbOfWeapons = 3;
const weapons = Weapon.exportWeaponsData();

// Create an array of index of the same length than squares
const listOfIndex = [];
for (let i = 0; i < board.squares.length; i++) {
    listOfIndex.push(i);
}

// This function randomly picks an element of an array and pops it
// @param {integer[]} array
// @return {integer} elt - the randomly picked element
function pickAndPop(array) {
    const randomIdx = Math.floor(Math.random() * array.length);
    const elt = array[randomIdx];
    array.splice(randomIdx, 1);
    return elt;
}

// Place randomly 2 players on the board
for (let i = 0; i < nbOfPlayers; i++) {
    const square = board.squares[pickAndPop(listOfIndex)];
    square.player = new Player(square, `player${i + 1}`);
    document.querySelector(square.div).classList.add(square.player.cssClass);
}

// Place randomly 3 weapons
for (let i = 0; i < nbOfWeapons; i++) {
    const square = board.squares[pickAndPop(listOfIndex)];
    square.weapon = new Weapon(
        weapons[i].name,
        weapons[i].damage,
        weapons[i].cssClass);
    document.querySelector(square.div).classList.add(square.weapon.cssClass);
}

// Place randomly 12 walls
for (let i = 0; i < nbOfWalls; i++) {
    const square = board.squares[pickAndPop(listOfIndex)];
    square.isWall = true;
    document.querySelector(square.div).classList.add('wall');
}

console.log(board.squares);