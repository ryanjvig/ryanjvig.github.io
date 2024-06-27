// attack.js
const playerOptions = [document.getElementById('lightAttack'), document.getElementById('defend'),
    document.getElementById('heal'), document.getElementById('sharpen'),
    document.getElementById('heavyAttack'), document.getElementById('stab'),
    document.getElementById('counter'), document.getElementById('bulkUp'),
    document.getElementById('armorUp'), document.getElementById('clearEnhancements')];
const computerOptions = ['lightAttack', 'defend', 'heal', 'sharpen', 'heavyAttack', 'stab', 'counter', 'bulkUp', 'armorUp', 'clearEnhancements'];
const optionToText = {'lightAttack': 'Light Attack', 'defend': 'Defend', 'heal': 'Heal', 'sharpen': 'Sharpen', 'heavyAttack': 'Heavy Attack',
    'stab': 'Stab', 'counter': 'Counter', 'bulkUp': 'Bulk Up', 'armorUp': 'Armor Up', 'clearEnhancements': 'Clear Enhancements'
};
const textToOption = {'Light Attack': 'lightAttack', 'Defend': 'defend', 'Heal': 'heal', 'Sharpen': 'sharpen', 'Heavy Attack': 'heavyAttack',
    'Stab': 'stab', 'Counter': 'counter', 'Bulk Up': 'bulkUp', 'Armor Up': 'armorUp', 'Clear Enhancements': 'clearEnhancements'
};
const twoTurnOptions = ['heavyAttack', 'stab', 'counter', 'bulkUp', 'armorUp', 'clearEnhancements'];
// attack logic
playerOptions.forEach(option => {
    option.addEventListener('click', function () {
        if(!computerCharged) {
            computerChoiceNumber = campaign.levelList[curLevel].enemyList[curEnemy].getMove();
        }
        let computerChoice = computerOptions[computerChoiceNumber];

        let playerChoice = '';
        playerChoice = this.id;
        let twoTurn = twoTurnOptions.includes(playerChoice);
        
        while(playerStunTurns > 0 && playerHealth >= 0 && computerHealth >= 0) {
            updateState('stunned', computerChoice);
            
            if(playerHealth >= 0 && computerHealth >= 0) {

                playerLog.push(`Turn ${turnCount}: You are stunned!`);

                if(computerCharged) {
                    computerLog.push(`Turn ${turnCount}: Your opponent is preparing a strong attack...`)
                }
                else if(computerStunned) {
                    computerLog.push(`Turn ${turnCount}: Your opponent is stunned!`)
                }
                else {
                    computerLog.push(`Turn ${turnCount}: Your opponent used ${optionToText[computerChoice]}!`)
                }
                turnCount++;
                if(!computerCharged) {
                    computerChoiceNumber = campaign.levelList[curLevel].enemyList[curEnemy].getMove();
                    computerChoice = computerOptions[computerChoiceNumber];
                }
            }
            playerStunTurns -= 1;
        }
        // function to update state
        if(twoTurn) {
            updateState(playerChoice, computerChoice);

            if(playerHealth >= 0 && computerHealth >= 0) {
                playerLog.push(`Turn ${turnCount}: You are preparing a strong attack...`);

                if(computerCharged) {
                    computerLog.push(`Turn ${turnCount}: Your opponent is preparing a strong attack...`);
                }
                else if(computerStunned) {
                    computerLog.push(`Turn ${turnCount}: Your opponent is stunned!`);
                }
                else {
                    computerLog.push(`Turn ${turnCount}: Your opponent used ${optionToText[computerChoice]}!`);
                }
                turnCount++;
                console.log(computerCharged);
                if(!computerCharged) {
                    computerChoiceNumber = campaign.levelList[curLevel].enemyList[curEnemy].getMove();
                    computerChoice = computerOptions[computerChoiceNumber];
                }
                updateState(playerChoice, computerChoice);
            }
        }
        else {
            updateState(playerChoice, computerChoice);
        }
        
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

        if(playerCharged) {
            playerLog.push(`Turn ${turnCount}: You are preparing a strong attack...`);
        }
        else {
            playerLog.push(`Turn ${turnCount}: You used ${optionToText[playerChoice]}!`);
        }

        if(computerCharged) {
            computerLog.push(`Turn ${turnCount}: Your opponent is preparing a strong attack...`);
        }
        else if(computerStunned) {
            computerLog.push(`Turn ${turnCount}: Your opponent is stunned!`);
        }
        else {
            computerLog.push(`Turn ${turnCount}: Your opponent used ${optionToText[computerChoice]}!`);
        }

        turnCount++;

        const playerMove1 = document.getElementById('playermove1');
        const playerMove2 = document.getElementById('playermove2');
        const playerMove3 = document.getElementById('playermove3');
        const playerMove4 = document.getElementById('playermove4');
        const playerMove5 = document.getElementById('playermove5');

        if(playerLog.length > 0) {
            playerMove1.innerText = playerLog[playerLog.length - 1]
        }
        if(playerLog.length > 1) {
            playerMove2.innerText = playerLog[playerLog.length - 2]
        }
        if(playerLog.length > 2) {
            playerMove3.innerText = playerLog[playerLog.length - 3]
        }
        if(playerLog.length > 3) {
            playerMove4.innerText = playerLog[playerLog.length - 4]
        }
        if(playerLog.length > 4) {
            playerMove5.innerText = playerLog[playerLog.length - 5]
        }

        const computerMove1 = document.getElementById('computermove1');
        const computerMove2 = document.getElementById('computermove2');
        const computerMove3 = document.getElementById('computermove3');
        const computerMove4 = document.getElementById('computermove4');
        const computerMove5 = document.getElementById('computermove5');

        if(computerLog.length > 0) {
            computerMove1.innerText = computerLog[computerLog.length - 1]
        }
        if(computerLog.length > 1) {
            computerMove2.innerText = computerLog[computerLog.length - 2]
        }
        if(computerLog.length > 2) {
            computerMove3.innerText = computerLog[computerLog.length - 3]
        }
        if(computerLog.length > 3) {
            computerMove4.innerText = computerLog[computerLog.length - 4]
        }
        if(computerLog.length > 4) {
            computerMove5.innerText = computerLog[computerLog.length - 5]
        }

        // calling gameOver function when player or computer hp has reached 0
        if (playerHealth <= 0 || computerHealth <= 0) {
            gameOver(playerOptions, playerHealth);
        }
    })
})

// update state after user inputs action
const updateState = (player, computer) => {
    if (playerHealth <= 0 || computerHealth <= 0) {
        return
    }
    if (computerStunTurns > 0) {
        computer = 'stunned';
        computerStunTurns -= 1;
        computerStunned = true;
    }
    else {
        computerStunned = false;
    }

    if(player == 'heal') {
        if (playerHealth < 10) {
            playerHealth += 1;
        }
    }
    else if(player == 'defend') {
        playerArmor1 += 2;
    }
    else if(player == 'sharpen') {
        playerStrengthTemp += 1;
    }
    else if(player == 'bulkUp') {
        if(playerCharged) {
            playerStrengthPerm += 1;
            playerCharged = false;
        } else {
            playerCharged = true;
        }
    }
    else if(player == 'armorUp') {
        if(playerCharged) {
            playerArmorPerm += 1;
            playerCharged = false;
        } else {
            playerCharged = true;
        }
    }

    if(computer == 'heal') {
        if (computerHealth < 10) {
            computerHealth += 1;
        }
    }
    else if(computer == 'defend') {
        computerArmor1 += 2;
    }
    else if(computer == 'sharpen') {
        computerStrengthTemp += 1;
    }
    else if(computer == 'bulkUp') {
        if(computerCharged) {
            computerStrengthPerm += 1;
            computerCharged = false;
        } else {
            computerCharged = true;
        }
    }
    else if(computer == 'armorUp') {
        if(computerCharged) {
            computerArmorPerm += 1;
            computerCharged = false;
        } else {
            computerCharged = true;
        }
    }

    if(player == 'clearEnhancements') {
        if(playerCharged) {
            computerArmor1 = 0;
            computerArmor2 = 0;
            computerArmor3 = 0;
            computerArmorPerm = 0;
            computerStrengthPerm = 0;
            computerStrengthTemp = 0;
            playerCharged = false;
        } else {
            playerCharged = true;
        }
    }
    if(computer == 'clearEnhancements') {
        if(computerCharged) {
            playerArmor1 = 0;
            playerArmor2 = 0;
            playerArmor3 = 0;
            playerArmorPerm = 0;
            playerStrengthPerm = 0;
            playerStrengthTemp = 0;
            computerCharged = false;
        } else {
            computerCharged = true;
        }
    }
    let playerCounter = false;
    let computerCounter = false;
    if(player == 'counter') {
        if(playerCharged) {
            playerCounter = true;
            playerCharged = false;
        }   
        else {
            playerCharged = true;
        }
    }
    if(computer == 'counter') {
        if(computerCharged) {
            computerCounter = true;
            computerCharged = false;
        }   
        else {
            computerCharged = true;
        }
    }
    if(player == 'lightAttack') {
        let damage = 1 + playerStrengthPerm + playerStrengthTemp;
        playerStrengthTemp = 0;
        applyDamage(damage, true);
        if(computerCounter) {
            applyDamage(damage * 2, false);
        }
    }
    else if(player == 'heavyAttack') {
        if(playerCharged) {
            computerStartHealth = computerHealth;
            playerCharged = false;
            let damage = 2 + playerStrengthPerm + playerStrengthTemp;
            playerStrengthTemp = 0;
            applyDamage(damage, true);
            // apply stun
            if (computerHealth < computerStartHealth) {
                computerStunTurns += 1;
            }
            if(computerCounter) {
                playerStartHealth = playerHealth;
                applyDamage(damage * 2, false);
                if (playerHealth < playerStartHealth) {
                    playerStunTurns += 2;
                }
            }
        }
        else {
            playerCharged = true;
        }
    }
    else if(player == 'stab') {
        if(playerCharged) {
            playerCharged = false;
            let damage = 2 + playerStrengthPerm + playerStrengthTemp;
            playerStrengthTemp = 0;
            computerHealth -= damage;
            if(computerCounter) {
                playerHealth -= damage * 2;
            }
        }
        else {
            playerCharged = true;
        }
    }
    if(computer == 'lightAttack') {
        let damage = 1 + computerStrengthPerm + computerStrengthTemp;
        computerStrengthTemp = 0;
        applyDamage(damage, false);
        if(playerCounter) {
            applyDamage(damage * 2, true);
        }
    }
    else if(computer == 'heavyAttack') {
        if(computerCharged) {
            let playerStartHealth = playerHealth;
            computerCharged = false;
            let damage = 2 + computerStrengthPerm + computerStrengthTemp;
            computerStrengthTemp = 0;
            applyDamage(damage, false);
            if (playerHealth < playerStartHealth) {
                playerStunTurns += 1;
            }
            if(playerCounter) {
                applyDamage(damage * 2, true);
                computerStunTurns += 2;
            }
        }
        else {
            computerCharged = true;
        }
    }
    else if(computer == 'stab') {
        if(computerCharged) {
            computerCharged = false;
            let damage = 2 + computerStrengthPerm + computerStrengthTemp;
            computerStrengthTemp = 0;
            playerHealth -= damage;
            if(playerCounter) {
                computerHealth -= damage * 2;
            }
        }
        else {
            computerCharged = true;
        }
    }

    if (playerStunTurns > 0 && playerCharged) {
        playerStunTurns--;
        playerCharged = false;
    }
    if (computerStunTurns > 0 && computerCharged) {
        computerStunTurns--;
        computerCharged = false;
    }

    playerArmor3 = playerArmor2;
    playerArmor2 = playerArmor1;
    playerArmor1 = 0;
    playerArmor = playerArmor2 + playerArmor3 + playerArmorPerm;
    playerStrength = playerStrengthPerm + playerStrengthTemp;

    computerArmor3 = computerArmor2;
    computerArmor2 = computerArmor1;
    computerArmor1 = 0;
    computerArmor = computerArmor2 + computerArmor3 + computerArmorPerm;
    computerStrength = computerStrengthPerm + computerStrengthTemp;
}

const applyDamage = (damage, playerAttacking) => {
    if(playerAttacking) {
        if(damage > computerArmorPerm) {
            damage -= computerArmorPerm;
            if(damage > computerArmor3) {
                damage -= computerArmor3;
                computerArmor3 = 0;
                if(damage > computerArmor2) {
                    damage -= computerArmor2;
                    computerArmor2 = 0;
                    if(damage > computerArmor1) {
                        damage -= computerArmor1;
                        computerArmor1 = 0;
                        computerHealth -= damage;
                    }
                    else {
                        computerArmor1 -= damage;
                    }
                }
                else {
                    computerArmor2 -= damage;
                }
            }
            else {
                computerArmor3 -= damage;
            }
        }
    }
    else {
        if(damage > playerArmorPerm) {
            damage -= playerArmorPerm;
            if(damage > playerArmor3) {
                damage -= playerArmor3;
                playerArmor3 = 0;
                if(damage > playerArmor2) {
                    damage -= playerArmor2;
                    playerArmor2 = 0;
                    if(damage > playerArmor1) {
                        damage -= playerArmor1;
                        playerArmor1 = 0;
                        playerHealth -= damage;
                    }
                    else {
                        playerArmor1 -= damage;
                    }
                }
                else {
                    playerArmor2 -= damage;
                }
            }
            else {
                playerArmor3 -= damage;
            }
        }
    }
}
