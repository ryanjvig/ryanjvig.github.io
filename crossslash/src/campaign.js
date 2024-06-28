// campaign.js
class Campaign {
    constructor(name, levelList) {
        this.name = name;
        this.levelList = levelList;
    }
}

class NormalMode extends Campaign {
    constructor() {
        super('Normal Mode', [new MerryMeadows, new FiestyForest, new MagicalMountains, new WackyWoodlands, new FinalFrontier]);
    }
}