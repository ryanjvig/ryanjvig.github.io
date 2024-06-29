// campaign.js
// helpers for restarting campaign and moving to next round
// end of round
const gameOver = () => {
    document.getElementById('endScreen').style.display = 'block';

    playerOptions.forEach(option => {
        option.style.display = 'none';
    })

    document.getElementById('move').innerText = 'Round Over';
    document.getElementById('resultText').style.fontSize = '2rem';

    if(playerHealth > 0) {
        document.getElementById('resultText').innerText = 'You Win'
        document.getElementById('resultText').style.color = '#308D46';
        document.getElementById('gachaResult').innerText = 'You got:';
        document.getElementById('gacha').style.display = 'block';
        document.getElementById('gachaRoll').style.display = 'block';
        document.getElementById('restartButton').style.display = 'none';
        document.getElementById('nextRoundButton').style.display = 'flex';
    }
    else {
        document.getElementById('resultText').innerText = 'You Lose';
        document.getElementById('resultText').style.color = 'red';
        document.getElementById('restartButton').style.display = 'flex';
        document.getElementById('nextRoundButton').style.display = 'none';
    }
    document.getElementById('gameInterface').style.display = 'none';
}

// constant battle reset behavior
const basicBattleReset = () => {
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

    document.getElementById('playerhealth').innerText = `Player Health: ${playerHealth}`;
    document.getElementById('playerarmor').innerText = `Player Armor: ${playerArmor}`;
    document.getElementById('playerstrength').innerText = `Player Strength: ${playerStrength}`;


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

    computerHealth = campaign.levelList[curLevel].enemyList[curEnemy].health;
    computerMaxHealth = campaign.levelList[curLevel].enemyList[curEnemy].health;
    computerStrengthPerm = campaign.levelList[curLevel].enemyList[curEnemy].strength;
    computerArmorPerm = campaign.levelList[curLevel].enemyList[curEnemy].armor;
    document.getElementById('computerhealth').innerText = `Enemy Health: ${computerHealth}`;
    document.getElementById('computerarmor').innerText = `Enemy Armor: ${computerArmorPerm}`;
    document.getElementById('computerstrength').innerText = `Enemy Strength: ${computerStrengthPerm}`;

    document.getElementById('enemyDisplay').src = campaign.levelList[curLevel].enemyList[curEnemy].sprite;
    document.getElementById('enemyName').innerText = campaign.levelList[curLevel].enemyList[curEnemy].name;
    document.getElementById('levelName').innerText = `Level ${curLevel + 1}: ${campaign.levelList[curLevel].name}`;
    document.getElementById('enemyNum').innerText = `Enemy ${curEnemy + 1}`;
}

const restartCampaign = () => {
    campaign = new NormalMode();
    curLevel = 0;
    curEnemy = 0;
    basicBattleReset();
    playerHealth = 10;
    playerMaxHealth = 10;
    document.getElementById('playerhealth').innerText = `Player Health: ${playerHealth}`;
}

// dont modify player health, increment round/level
const nextRound = () => {
    if (campaign.levelList[curLevel].enemyList.length > curEnemy + 1) {
        curEnemy++;
    }
    else if(campaign.levelList.length > curLevel + 1) {
        curLevel++;
        curEnemy = 0;
    }
    // won campaign: just reset for now until further implemented
    else {
        // // display campaign win screen
        // document.getElementById('endScreen').style.display = 'none';
        // document.getElementById('winScreen').style.display = 'block';
        curLevel = 0;
        curEnemy = 0;
    }
    basicBattleReset();
    // temporary until player scales more in later versions
    playerHealth = 10;
    document.getElementById('playerhealth').innerText = `Player Health: ${playerHealth}`;
}