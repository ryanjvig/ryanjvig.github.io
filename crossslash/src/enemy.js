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
        super('Goblin', 'crossslash/img/enemy/goblin.webp', 5, 0, 0, [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
}

class GoblinKing extends Enemy {
    constructor() {
        super('Goblin King', 'crossslash/img/enemy/goblinking.webp', 10, 1, 0, [0, 0, 0, 0, 0.5, 0, 0.5, 0, 0, 0]);
    }
}