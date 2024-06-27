// enum for move types
// const Move = {
//     lightAttack: 0,
//     defend: 1,
//     heal: 2,
//     sharpen: 3,
//     heavyAttack: 4,
//     stab: 5,
//     counter: 6,
//     bulkUp: 7,
//     armorUp: 8,
//     clearEnhancements: 9
// }

// enemy class
class Enemy {
    constructor(name, sprite, health, strength, armor, behavior) {
        this.name = name;
        this.sprite = sprite;
        this.health = health;
        this.strength = strength;
        this.armor = armor;
        this.behavior = behavior;
    }

    getMove() {
        const roll = Math.random();
        let moveNum = 0;
        let curVal = 0.0;
        while(curVal < 1.0 && moveNum < 10) {
            let nextVal = curVal + this.behavior[moveNum];
            if (roll < nextVal) {
                return moveNum;
            }
            curVal = nextVal;
            moveNum++;
        }
        if(moveNum === 10) {
            console.error('error: enemy move roll made, but no move selected');
        }
    }
}

class Goblin extends Enemy {
    constructor() {
        super('Goblin', 'goblin.webp', 5, 0, 0, [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
}

class GoblinKing extends Enemy {
    constructor() {
        super('Goblin King', 'goblinking.webp', 10, 1, 0, [0, 0, 0, 0, 0.5, 0, 0.5, 0, 0, 0]);
    }
}