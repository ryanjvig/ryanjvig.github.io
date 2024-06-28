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

// 3 HP, 25% Light Attack, 75% Heal
class Slime extends Enemy {
    constructor() {
        super('Slime', 'crossslash/img/enemy/goblin.webp', 3, 0, 0, [0.25, 0, 0.75, 0, 0, 0, 0, 0, 0, 0]);
    }
}

// 8 HP, 1 Armor, 25% Light Attack, 25% Defend, 25% Heal, 25% Bulk Up
class SlimeQueen extends Enemy {
    constructor() {
        super('Slime Queen', 'crossslash/img/enemy/goblin.webp', 8, 0, 0, [0.25, 0.25, 0.25, 0, 0, 0, 0, 0.25, 0, 0]);
    }
}

// 5 HP, 50% Light Attack, 50% Defend
class Goblin extends Enemy {
    constructor() {
        super('Goblin', 'crossslash/img/enemy/goblin.webp', 5, 0, 0, [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
}

// 10 HP, 1 Strength, 50% Heavy Attack, 50% Counter
class GoblinKing extends Enemy {
    constructor() {
        super('Goblin King', 'crossslash/img/enemy/goblinking.webp', 10, 1, 0, [0, 0, 0, 0, 0.5, 0, 0.5, 0, 0, 0]);
    }
}