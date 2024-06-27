// level class
class Level {
    constructor(name, enemyList) {
        this.name = name;
        this.enemyList = enemyList;
    }
}

class MerryMeadows extends Level {
    constructor() {
        super('Merry Meadows', [new Goblin(), new Goblin(), new GoblinKing()]);
    }
}
