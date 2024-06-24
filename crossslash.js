// crossslash.js

// Complete logic of game inside this function
const game = () => {
    let playerHealth = 10;
    let computerHealth = 10;
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
    let computerArmorPerm = 0;
    let playerStrength = 0;
    let playerStrengthTemp = 0;
    let playerStrengthPerm = 0;
    let computerStrength = 0;
    let computerStrengthTemp = 0;
    let computerStrengthPerm = 0;
    if(Number(localStorage.getItem('schmeckles')) !== 0) {
        document.getElementById('displaySchmeckles').innerText = `Schmeckles: ${localStorage.getItem('schmeckles')}`;
    }
    document.getElementById('displayCollection').addEventListener('click', function () {
        if(document.getElementById('collection').style.display == 'block') {
            document.getElementById('collection').style.display = 'none';
        }
        else {
            if(Number(localStorage.getItem('bronzeDucks')) == 0) {
                document.getElementById('displayBronzeDuck').style.display = 'none';
                document.getElementById('noBronzeDuck').style.visibility = 'visible';
            }
            else {
                document.getElementById('displayBronzeDuck').style.display = 'block';
                document.getElementById('noBronzeDuck').style.visibility = 'hidden';
                document.getElementById('numBronzeDucks').innerText = `Quantity: ${localStorage.getItem('bronzeDucks')}`;
            }

            if(Number(localStorage.getItem('silverDucks')) == 0) {
                document.getElementById('displaySilverDuck').style.display = 'none';
                document.getElementById('noSilverDuck').style.visibility = 'visible';
            }
            else {
                document.getElementById('displaySilverDuck').style.display = 'block';
                document.getElementById('noSilverDuck').style.visibility = 'hidden';
                document.getElementById('numSilverDucks').innerText = `Quantity: ${localStorage.getItem('silverDucks')}`;
            }

            if(Number(localStorage.getItem('goldDucks')) == 0) {
                document.getElementById('displayGoldDuck').style.display = 'none';
                document.getElementById('noGoldDuck').style.visibility = 'visible';
            }
            else {
                document.getElementById('displayGoldDuck').style.display = 'block';
                document.getElementById('noGoldDuck').style.visibility = 'hidden';
                document.getElementById('numGoldDucks').innerText = `Quantity: ${localStorage.getItem('goldDucks')}`;
            }

            if(Number(localStorage.getItem('diamondDucks')) == 0) {
                document.getElementById('displayDiamondDuck').style.display = 'none';
                document.getElementById('noDiamondDuck').style.visibility = 'visible';
            }
            else {
                document.getElementById('displayDiamondDuck').style.display = 'block';
                document.getElementById('noDiamondDuck').style.visibility = 'hidden';
                document.getElementById('numDiamondDucks').innerText = `Quantity: ${localStorage.getItem('diamondDucks')}`;
            }
            
            document.getElementById('collection').style.display = 'block';
        }
    })

	// Function to 
	const playGame = () => {
        document.getElementById('gachaRoll').addEventListener('click', function () {
            roll = Math.floor(Math.random() * 1000);
            let prize = '';
            if (roll < 500) {
                prize = 'Nothing :(';
            }
            else if (roll < 750) {
                prize = '10 schmeckles!';
                curSchmeckles = Number(localStorage.getItem('schmeckles'))
                localStorage.setItem('schmeckles', String(curSchmeckles + 10))
            }
            else if (roll < 900) {
                prize = '25 schmeckles!';
                curSchmeckles = Number(localStorage.getItem('schmeckles'))
                localStorage.setItem('schmeckles', String(curSchmeckles + 25))
            }
            else if (roll < 960) {
                prize = 'A Mystical Bronze Lemon Duck!';
                curBronzeDucks = Number(localStorage.getItem('bronzeDucks'))
                localStorage.setItem('bronzeDucks', String(curBronzeDucks + 1))
            }
            else if (roll < 990) {
                prize = 'A Mystical Silver Lemon Duck!!';
                curSilverDucks = Number(localStorage.getItem('silverDucks'))
                localStorage.setItem('silverDucks', String(curSilverDucks + 1))
            }
            else if (roll < 999){
                prize = 'A Mystical Golden Lemon Duck!!!';
                curGoldDucks = Number(localStorage.getItem('goldDucks'))
                localStorage.setItem('goldDucks', String(curGoldDucks + 1))
            }
            else {
                prize = 'A Mystical Galaxy Diamond Lemon Duck!!!!';
                curDiamondDucks = Number(localStorage.getItem('diamondDucks'))
                localStorage.setItem('diamondDucks', String(curDiamondDucks + 1))
            }
            document.getElementById('gachaResult').innerText = `You got: ${prize}`;
            document.getElementById('gachaRoll').style.display = 'none';
            if(Number(localStorage.getItem('schmeckles')) !== 0) {
                document.getElementById('displaySchmeckles').innerText = `Schmeckles: ${localStorage.getItem('schmeckles')}`;
            }
        })
        document.getElementById('gacha').style.display = 'none';

		const lightAttackBtn = document.getElementById('lightAttack');
		const defendBtn = document.getElementById('defend');
		const healBtn = document.getElementById('heal');
        const sharpenBtn = document.getElementById('sharpen');
		const heavyAttackBtn = document.getElementById('heavyAttack');
		const stabBtn = document.getElementById('stab');
        const counterBtn = document.getElementById('counter');
		const bulkUpBtn = document.getElementById('bulkUp');
		const armorUpBtn = document.getElementById('armorUp');
        const clearEnhancementsBtn = document.getElementById('clearEnhancements');
		const playerOptions = [lightAttackBtn, defendBtn, healBtn, sharpenBtn, heavyAttackBtn,
            stabBtn, counterBtn, bulkUpBtn, armorUpBtn, clearEnhancementsBtn];
		const computerOptions = ['lightAttack', 'defend', 'heal', 'sharpen', 'heavyAttack', 'stab', 'counter', 'bulkUp', 'armorUp', 'clearEnhancements'];
        const optionToText = {'lightAttack': 'Light Attack', 'defend': 'Defend', 'heal': 'Heal', 'sharpen': 'Sharpen', 'heavyAttack': 'Heavy Attack',
            'stab': 'Stab', 'counter': 'Counter', 'bulkUp': 'Bulk Up', 'armorUp': 'Armor Up', 'clearEnhancements': 'Clear Enhancements'
        };
        const textToOption = {'Light Attack': 'lightAttack', 'Defend': 'defend', 'Heal': 'heal', 'Sharpen': 'sharpen', 'Heavy Attack': 'heavyAttack',
            'Stab': 'stab', 'Counter': 'counter', 'Bulk Up': 'bulkUp', 'Armor Up': 'armorUp', 'Clear Enhancements': 'clearEnhancements'
        };
        const twoTurnOptions = ['heavyAttack', 'stab', 'counter', 'bulkUp', 'armorUp', 'clearEnhancements'];
        let computerLog = [];
        let turnCount = 0;
		// Function to start playing game
		playerOptions.forEach(option => {
			option.addEventListener('click', function () {
                if(!computerCharged) {
                    computerChoiceNumber = Math.floor(Math.random() * 10);
                }
				let computerChoice = computerOptions[computerChoiceNumber];

                let playerChoice = '';
                playerChoice = this.id;
                let twoTurn = twoTurnOptions.includes(playerChoice);
                
                while(playerStunTurns > 0 && playerHealth >= 0 && computerHealth >= 0) {
                    updateState('stunned', computerChoice);
                    if(playerHealth >= 0 && computerHealth >= 0) {
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
                            computerChoiceNumber = Math.floor(Math.random() * 10);
                            computerChoice = computerOptions[computerChoiceNumber];
                        }
                        playerStunTurns -= 1;
                    }
                }
				// function to update state
                if(twoTurn) {
                    updateState(playerChoice, computerChoice);

                    if(playerCharged && playerHealth >= 0 && computerHealth >= 0) {
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
                            computerChoiceNumber = Math.floor(Math.random() * 10);
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
				computerHealthDisplay.innerText = `Computer Health: ${computerHealth}`;
				const computerArmorDisplay = document.getElementById('computerarmor');
				computerArmorDisplay.innerText = `Computer Armor: ${computerArmor}`;
				const computerStrengthDisplay = document.getElementById('computerstrength');
				computerStrengthDisplay.innerText = `Computer Strength: ${computerStrength}`;

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

                const computerMove1 = document.getElementById('computermove1')
                const computerMove2 = document.getElementById('computermove2')
                const computerMove3 = document.getElementById('computermove3')
                const computerMove4 = document.getElementById('computermove4')
                const computerMove5 = document.getElementById('computermove5')

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
					gameOver(playerOptions, playerHealth, computerHealth);
				}
			})
		})

	}

	// Function to decide winner
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
		// const result = document.querySelector('.result');
		// const playerScoreBoard = document.querySelector('.p-count');
		// const computerScoreBoard = document.querySelector('.c-count');
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
                computerCharged = false;
                let damage = 2 + computerStrengthPerm + computerStrengthTemp;
                computerStrengthTemp = 0;
                applyDamage(damage, false);
                if(playerCounter) {
                    applyDamage(damage * 2, true);
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

	// Function to run when game is over
	const gameOver = (playerOptions, playerHealth, computerHealth) => {

		const chooseMove = document.getElementById('move');
		const result = document.querySelector('.result');
		const reloadBtn = document.querySelector('.reload');

		playerOptions.forEach(option => {
			option.style.display = 'none';
		})


		chooseMove.innerText = 'Game Over!!'

		if (playerHealth > computerHealth) {
			result.style.fontSize = '2rem';
			result.innerText = 'You Won The Game'
			result.style.color = '#308D46';
            document.getElementById('gacha').style.display = 'block';
            document.getElementById('gachaRoll').style.display = 'block';
		}
		else if (playerHealth < computerHealth) {
			result.style.fontSize = '2rem';
			result.innerText = 'You Lost The Game';
			result.style.color = 'red';
		}
		else {
			result.style.fontSize = '2rem';
			result.innerText = 'Tie';
			result.style.color = 'grey'
		}
        document.getElementById('gameInterface').style.display = 'none';
		reloadBtn.innerText = 'Restart';
		reloadBtn.style.display = 'flex'
		reloadBtn.addEventListener('click', () => {
			window.location.reload();
		})
	}


	// Calling playGame function inside game
	playGame();

}

// Calling the game function
game();
