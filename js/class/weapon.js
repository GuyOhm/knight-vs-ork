/*
* Class that represents a weapon
*/
export default class Weapon {
    constructor(name, damage, cssClass) {
        this.name = name;
        this.damage = damage;
        this.cssClass = cssClass;
    }

    static exportWeaponsData() {
        return [
            {
                name: 'katana',
                damage: 13,
                cssClass: 'katana'
            },
            {
                name: 'axe',
                damage: 15,
                cssClass: 'axe'
            },
            {
                name: 'chainsaw',
                damage: 17,
                cssClass: 'chainsaw'
            }
        ];
    }
}