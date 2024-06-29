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
        super('Slime', 'crossslash/img/enemy/slime.webp', 3, 0, 0, [0.25, 0, 0.75, 0, 0, 0, 0, 0, 0, 0]);
    }
}

// 8 HP, 1 Armor, 25% Light Attack, 25% Defend, 25% Heal, 25% Bulk Up
class SlimeQueen extends Enemy {
    constructor() {
        super('Slime Queen', 'crossslash/img/enemy/slimequeen.webp', 8, 0, 0, [0.25, 0.25, 0.25, 0, 0, 0, 0, 0.25, 0, 0]);
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

// 8 HP, 1 Armor, 50% Stab, 40% Heal, 10% Clear Enhancements
class Unicorn extends Enemy {
    constructor() {
        super('Unicorn', 'crossslash/img/enemy/unicorn.webp', 10, 0, 1, [0, 0, 0.4, 0, 0, 0.5, 0, 0, 0, 0.1]);
    }
}

// 15 HP, 1 Strength, 1 Armor, 30% Light Attack, 30% Heal, 15% Bulk Up, 15% Armor Up, 10% Clear Enhancements
class RainbowPhoenix extends Enemy {
    constructor() {
        super('Rainbow Phoenix', 'crossslash/img/enemy/rainboxphoenix.webp', 15, 1, 1, [0.3, 0, 0.3, 0, 0, 0, 0, 0.15, 0.15, 0.1]);
    }
}

// 12 HP, 2 Strength, 40% Counter, 40% Light Attack, 20% Clear Enhancements
class Imp extends Enemy {
    constructor() {
        super('Imp', 'crossslash/img/enemy/imp.webp', 12, 2, 0, [0.4, 0, 0, 0, 0, 0, 0.4, 0, 0, 0.2]);
    }
}

// 50 HP, 5 Armor, 50% Light Attack, 20% Heal, 20% Bulk Up, 10% Clear Enhancements
class GreatEnt extends Enemy {
    constructor() {
        super('Great Ent', 'crossslash/img/enemy/greatent.webp', 50, 0, 5, [0.5, 0, 0.2, 0, 0, 0, 0, 0.2, 0, 0.1]);
    }
}

// 20 HP, 1 Strength, 2 Armor, 20% Light Attack, 10% Sharpen, 20% Heavy Attack, 20% Counter, 10% Bulk Up, 10% Armor Up, 10% Clear Enhancements
class Knight extends Enemy {
    constructor() {
        super('Knight', 'crossslash/img/enemy/knight.webp', 20, 1, 2, [0.2, 0, 0, 0.1, 0.2, 0, 0.2, 0.1, 0.1, 0.1]);
    }
}

// 30 HP, 3 Strength, 3 Armor, Uniformly Random
class Him extends Enemy {
    constructor() {
        super('Him', 'crossslash/img/enemy/him.webp', 30, 3, 3, [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]);
    }
}