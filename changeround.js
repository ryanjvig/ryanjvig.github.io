// helpers for restarting campaign and moving to next round
const restartCampaign = () => {
    playerHealth = 10;
    playerCharged = false;
    playerStunTurns = 0;
    playerArmor = 0;
    playerArmor1 = 0;
    playerArmor2 = 0;
    playerArmor3 = 0;
    playerArmorPerm = 0;
    computerCharged = false;
    computerStunned = false;
    computerStunTurns = 0;
    computerChoiceNumber = 0;
    computerArmor = 0;
    computerArmor1 = 0;
    computerArmor2 = 0;
    computerArmor3 = 0;
    playerStrength = 0;
    playerStrengthTemp = 0;
    playerStrengthPerm = 0;
    computerStrength = 0;
    computerStrengthTemp = 0;
    computerLog = [];
    playerLog = [];
    turnCount = 0;

    campaign = new NormalMode();
    curLevel = 0;
    curEnemy = 0;
    computerHealth = campaign.levelList[0].enemyList[0].health;
    computerStrengthPerm = campaign.levelList[0].enemyList[0].strength;
    computerArmorPerm = campaign.levelList[0].enemyList[0].armor;

    const playerHealthDisplay = document.getElementById('playerhealth');
    playerHealthDisplay.innerText = `Player Health: ${playerHealth}`;
    const playerArmorDisplay = document.getElementById('playerarmor');
    playerArmorDisplay.innerText = `Player Armor: ${playerArmor}`;
    const playerStrengthDisplay = document.getElementById('playerstrength');
    playerStrengthDisplay.innerText = `Player Strength: ${playerStrength}`;

    const computerHealthDisplay = document.getElementById('computerhealth');
    computerHealthDisplay.innerText = `Enemy Health: ${computerHealth}`;
    const computerArmorDisplay = document.getElementById('computerarmor');
    computerArmorDisplay.innerText = `Enemy Armor: ${computerArmor}`;
    const computerStrengthDisplay = document.getElementById('computerstrength');
    computerStrengthDisplay.innerText = `Enemy Strength: ${computerStrength}`;

    document.getElementById('playermove1').innerText = '';
    document.getElementById('playermove2').innerText = '';
    document.getElementById('playermove3').innerText = '';
    document.getElementById('playermove4').innerText = '';
    document.getElementById('playermove5').innerText = '';

    document.getElementById('computermove1').innerText = '';
    document.getElementById('computermove2').innerText = '';
    document.getElementById('computermove3').innerText = '';
    document.getElementById('computermove4').innerText = '';
    document.getElementById('computermove5').innerText = '';
}