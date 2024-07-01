// attack.js
const writeToLog = () => {
    if(playerChoice == Move.stunned) {
        playerLog.push(`Turn ${turnCount}: You are stunned!`);
    }
    else if(playerCharged) {
        playerLog.push(`Turn ${turnCount}: You are preparing a strong attack...`);
    }
    else {
        playerLog.push(`Turn ${turnCount}: You used ${optionToText[playerChoice]}!`);
    }

    if(computerChoice == Move.stunned) {
        computerLog.push(`Turn ${turnCount}: Your opponent is stunned!`);
    }
    else if(computerCharged) {
        computerLog.push(`Turn ${turnCount}: Your opponent is preparing a strong attack...`);
    }
    else {
        computerLog.push(`Turn ${turnCount}: Your opponent used ${optionToText[computerChoice]}!`);
    }

    turnCount++;
}

const updateInterface = () => {
    document.getElementById('playerhealth').innerText = `Player Health: ${playerHealth}`;
    document.getElementById('playerarmor').innerText = `Player Armor: ${playerArmor}`;
    document.getElementById('playerstrength').innerText = `Player Strength: ${playerStrength}`;

    const computerHealthDisplay = document.getElementById('computerhealth');
    computerHealthDisplay.innerText = `Enemy Health: ${computerHealth}`;
    const computerArmorDisplay = document.getElementById('computerarmor');
    computerArmorDisplay.innerText = `Enemy Armor: ${computerArmor}`;
    const computerStrengthDisplay = document.getElementById('computerstrength');
    computerStrengthDisplay.innerText = `Enemy Strength: ${computerStrength}`;

    if(playerLog.length > 0) {
        document.getElementById('playermove1').innerText = playerLog[playerLog.length - 1]
    }
    if(playerLog.length > 1) {
        document.getElementById('playermove2').innerText = playerLog[playerLog.length - 2]
    }
    if(playerLog.length > 2) {
        document.getElementById('playermove3').innerText = playerLog[playerLog.length - 3]
    }
    if(playerLog.length > 3) {
        document.getElementById('playermove4').innerText = playerLog[playerLog.length - 4]
    }
    if(playerLog.length > 4) {
        document.getElementById('playermove5').innerText = playerLog[playerLog.length - 5]
    }

    if(computerLog.length > 0) {
        document.getElementById('computermove1').innerText = computerLog[computerLog.length - 1]
    }
    if(computerLog.length > 1) {
        document.getElementById('computermove2').innerText = computerLog[computerLog.length - 2]
    }
    if(computerLog.length > 2) {
        document.getElementById('computermove3').innerText = computerLog[computerLog.length - 3]
    }
    if(computerLog.length > 3) {
        document.getElementById('computermove4').innerText = computerLog[computerLog.length - 4]
    }
    if(computerLog.length > 4) {
        document.getElementById('computermove5').innerText = computerLog[computerLog.length - 5]
    }
}

// helper for performing main turn functions once player move is known
const performTurn = () => {
    if(!computerCharged) {
        computerChoice = campaign.levelList[curLevel].enemyList[curEnemy].getMove();
    }
    updateState();
    writeToLog();
}

// attack logic
playerOptions.forEach(option => {
    option.addEventListener('click', function () {

        playerChoice = idToOption[this.id];
        let twoTurn = twoTurnOptions.includes(playerChoice);
        
        while(playerStunTurns > 0 && playerHealth >= 0 && computerHealth >= 0) {
            let tempPlayerChoice = playerChoice;
            playerChoice = Move.stunned;
            performTurn();
            playerChoice = tempPlayerChoice;
            if(!computerCharged) {
                computerChoice = campaign.levelList[curLevel].enemyList[curEnemy].getMove();
            }
            playerStunTurns -= 1;
        }

        if(playerHealth >= 0 && computerHealth >= 0) {
            performTurn();
            if(twoTurn && playerCharged && playerHealth >= 0 && computerHealth >= 0) {
                performTurn();
            }
        }

        updateInterface();

        if (playerHealth <= 0 || computerHealth <= 0) {
            gameOver(playerHealth);
        }
    })
})

// update state after user inputs action
const updateState = () => {
    if (playerHealth <= 0 || computerHealth <= 0) {
        return
    }
    if (computerStunTurns > 0) {
        // console.log('setting computer to stunned...');
        computerChoice = Move.stunned;
        computerStunTurns -= 1;
    }

    switch(playerChoice) {
        case Move.heal:
            if (playerHealth < playerMaxHealth) {
                playerHealth += 1;
            }
            break;
        case Move.defend:
            playerArmor1 += 2;
            break;
        case Move.sharpen:
            playerStrengthTemp += 1;
            break;
        case Move.bulkUp:
            if(playerCharged) {
                playerStrengthPerm += 1;
                playerCharged = false;
            } else {
                playerCharged = true;
            }
            break;
        case Move.armorUp:
            if(playerCharged) {
                playerArmorPerm += 1;
                playerCharged = false;
            } else {
                playerCharged = true;
            }
            break;
    }

    switch(computerChoice) {
        case Move.heal:
            if (computerHealth < computerMaxHealth) {
                computerHealth += 1;
            }
            break;
        case Move.defend:
            computerArmor1 += 2;
            break;
        case Move.sharpen:
            computerStrengthTemp += 1;
            break;
        case Move.bulkUp:
            if(computerCharged) {
                computerStrengthPerm += 1;
                computerCharged = false;
            } else {
                computerCharged = true;
            }
            break;
        case Move.armorUp:
            if(computerCharged) {
                computerArmorPerm += 1;
                computerCharged = false;
            } else {
                computerCharged = true;
            }
            break;
    }

    if(playerChoice == Move.clearEnhancements) {
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
    if(computerChoice == Move.clearEnhancements) {
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
    if(playerChoice == Move.counter) {
        if(playerCharged) {
            playerCounter = true;
            playerCharged = false;
        }   
        else {
            playerCharged = true;
        }
    }
    if(computerChoice == Move.counter) {
        if(computerCharged) {
            computerCounter = true;
            computerCharged = false;
        }   
        else {
            computerCharged = true;
        }
    }

    switch(playerChoice) {
        case Move.lightAttack:
            let damage = 1 + playerStrengthTemp + playerStrengthPerm + playerStrengthConst;
            playerStrengthTemp = 0;
            applyDamage(damage, true);
            if(computerCounter) {
                applyDamage(damage * 2, false);
            }
            break;
        case Move.heavyAttack:
            if(playerCharged) {
                playerCharged = false;
                let computerStartHealth = computerHealth;
                let damage = 2 + playerStrengthTemp + playerStrengthPerm + playerStrengthConst;
                playerStrengthTemp = 0;
                applyDamage(damage, true);
                // apply stun
                if (computerHealth < computerStartHealth) {
                    computerStunTurns++;
                }
                if(computerCounter) {
                    let playerStartHealth = playerHealth;
                    applyDamage(damage * 2, false);
                    if (playerHealth < playerStartHealth) {
                        playerStunTurns += 2;
                    }
                }
            }
            else {
                playerCharged = true;
            }
            break;
        case Move.stab:
            if(playerCharged) {
                playerCharged = false;
                let damage = 2 + playerStrengthTemp + playerStrengthPerm + playerStrengthConst;
                playerStrengthTemp = 0;
                computerHealth -= damage;
                if(computerCounter) {
                    playerHealth -= damage * 2;
                }
            }
            else {
                playerCharged = true;
            }
            break;
    }

    switch(computerChoice) {
        case Move.lightAttack:
            let damage = 1 + computerStrengthTemp + computerStrengthPerm + computerStrengthConst;
            computerStrengthTemp = 0;
            applyDamage(damage, false);
            if(playerCounter) {
                applyDamage(damage * 2, true);
            }
            break;
        case Move.heavyAttack:
            if(computerCharged) {
                computerCharged = false;
                let playerStartHealth = playerHealth;
                let damage = 2 + computerStrengthTemp + computerStrengthPerm + computerStrengthConst;
                computerStrengthTemp = 0;
                applyDamage(damage, false);
                if (playerHealth < playerStartHealth) {
                    playerStunTurns++;
                }
                if(playerCounter) {
                    let computerStartHealth = computerHealth;
                    applyDamage(damage * 2, true);
                    if(computerHealth < computerStartHealth) {
                        computerStunTurns += 2;
                    }
                }
            }
            else {
                computerCharged = true;
            }
            break;
        case Move.stab:
            if(computerCharged) {
                computerCharged = false;
                let damage = 2 + computerStrengthTemp + computerStrengthPerm + computerStrengthConst;
                computerStrengthTemp = 0;
                playerHealth -= damage;
                if(playerCounter) {
                    computerHealth -= damage * 2;
                }
            }
            else {
                computerCharged = true;
            }
            break;
    }

    if (playerStunTurns > 0 && playerCharged) {
        playerStunTurns--;
        playerCharged = false;
        playerChoice = Move.stunned;
    }
    if (computerStunTurns > 0 && computerCharged) {
        computerStunTurns--;
        computerCharged = false;
        computerChoice = Move.stunned;
    }

    playerArmor3 = playerArmor2;
    playerArmor2 = playerArmor1;
    playerArmor1 = 0;
    playerArmor = playerArmor2 + playerArmor3 + playerArmorPerm + playerArmorConst;
    playerStrength = playerStrengthPerm + playerStrengthTemp + playerStrengthConst;

    computerArmor3 = computerArmor2;
    computerArmor2 = computerArmor1;
    computerArmor1 = 0;
    computerArmor = computerArmor2 + computerArmor3 + computerArmorPerm + computerArmorConst;
    computerStrength = computerStrengthPerm + computerStrengthTemp + computerStrengthConst;
}

const applyDamage = (damage, playerAttacking) => {
    if(playerAttacking) {
        if(damage > computerArmorPerm + computerArmorConst) {
            damage -= computerArmorPerm + computerArmorConst;
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
        if(damage > playerArmorPerm + playerArmorConst) {
            damage -= playerArmorPerm + playerArmorConst;
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
