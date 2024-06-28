// level.js
class Level {
    constructor(name, enemyList) {
        this.name = name;
        this.enemyList = enemyList;
    }
}

class MerryMeadows extends Level {
    constructor() {
        super('Merry Meadows', [new Slime(), new Slime(), new SlimeQueen()]);
    }
}

class FiestyForest extends Level {
    constructor() {
        super('Fiesty Forest', [new Goblin(), new Goblin(), new GoblinKing()]);
    }
}

class MagicalMountains extends Level {
    constructor() {
        super('Magical Mountains', [new Unicorn(), new Unicorn(), new RainbowPhoenix()]);
    }
}

class WackyWoodlands extends Level {
    constructor() {
        super('Wacky Woodlands', [new Imp(), new Imp(), new GreatEnt()]);
    }
}

class FinalFrontier extends Level {
    constructor() {
        super('Final Frontier', [new Knight(), new Knight(), new Him()]);
    }
}


