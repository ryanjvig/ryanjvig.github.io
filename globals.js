// globals.js
let playerHealth = 10;
let playerCharged = false;
let playerStunTurns = 0;
let computerCharged = false;
let computerStunned = false;
let computerStunTurns = 0;
let computerChoiceNumber = 0;
let playerArmor = 0;
let playerArmor1 = 0;
let playerArmor2 = 0;
let playerArmor3 = 0;
let playerArmorPerm = 0;
let computerArmor = 0;
let computerArmor1 = 0;
let computerArmor2 = 0;
let computerArmor3 = 0;
let playerStrength = 0;
let playerStrengthTemp = 0;
let playerStrengthPerm = 0;
let computerStrength = 0;
let computerStrengthTemp = 0;
let computerLog = [];
let playerLog = [];
let turnCount = 0;
let campaign = new NormalMode();
let curLevel = 0;
let curEnemy = 0;
let computerHealth = campaign.levelList[0].enemyList[0].health;
let computerStrengthPerm = campaign.levelList[0].enemyList[0].strength;
let computerArmorPerm = campaign.levelList[0].enemyList[0].armor;
let playerChoice = '';
let computerChoice = '';