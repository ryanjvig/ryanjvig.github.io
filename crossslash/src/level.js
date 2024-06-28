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

