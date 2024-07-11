// starthelpers.js
// helpers for startup functions
const initializeGame = () => {
    document.getElementById('startNormalMode').style.display = 'none';
    document.getElementById('startFinalBossPractice').style.display = 'none';
    if(Number(localStorage.getItem('schmeckles')) !== 0) {
        document.getElementById('displaySchmeckles').innerText = `Schmeckles: ${localStorage.getItem('schmeckles')}`;
    }
    document.getElementById('startGame').addEventListener('click', function () {
        document.getElementById('startGame').style.display = 'none';
        document.getElementById('startNormalMode').style.display = 'block';
        document.getElementById('startFinalBossPractice').style.display = 'block';
    })
    document.getElementById('startNormalMode').addEventListener('click', function () {
        if (!song.isPlayingSong) {
            song.play();
        }
        document.getElementById('startNormalMode').style.display = 'none';
        document.getElementById('startFinalBossPractice').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        campaign = new NormalMode();
        basicBattleReset();
    })
    document.getElementById('startFinalBossPractice').addEventListener('click', function () {
        if (!song.isPlayingSong) {
            song.play();
        }
        document.getElementById('startNormalMode').style.display = 'none';
        document.getElementById('startFinalBossPractice').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        campaign = new FinalBossPractice();
        basicBattleReset();
    })
    document.getElementById('playMusic').addEventListener('click', function () {
        if (song.isPlayingSong) {
            song.pause();
        }
        else {
            song.play();
        }
    })
    document.getElementById('displayCollection').addEventListener('click', function () {
        if(document.getElementById('collection').style.display == 'flex') {
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
            
            document.getElementById('collection').style.display = 'flex';
            document.getElementById('collection').style.justifyContent = 'center';
            document.getElementById('collection').style.alignItems = 'center';
        }
    })
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
    document.getElementById('restartButton').addEventListener('click', () => {
        restartCampaign();
        playerOptions.forEach(option => {
            option.style.display = 'block';
        })
        document.getElementById('move').innerText = 'Choose your move';
        document.getElementById('restartButton').style.display = 'none';
        document.getElementById('gacha').style.display = 'none';
        document.getElementById('gachaRoll').style.display = 'none';
        document.getElementById('resultText').innerText = '';
        document.getElementById('gameInterface').style.display = 'block';
        document.getElementById('endScreen').style.display = 'none';
    })
    document.getElementById('mainMenuButton').addEventListener('click', () => {
        playerOptions.forEach(option => {
            option.style.display = 'block';
        })
        document.getElementById('move').innerText = 'Choose your move';
        document.getElementById('restartButton').style.display = 'none';
        document.getElementById('gacha').style.display = 'none';
        document.getElementById('gachaRoll').style.display = 'none';
        document.getElementById('resultText').innerText = '';
        document.getElementById('gameInterface').style.display = 'block';
        document.getElementById('endScreen').style.display = 'none';
        
    })
    document.getElementById('nextRoundButton').addEventListener('click', () => {
        nextRound();
        playerOptions.forEach(option => {
            option.style.display = 'block';
        })
        document.getElementById('move').innerText = 'Choose your move';
        document.getElementById('restartButton').style.display = 'none';
        document.getElementById('gacha').style.display = 'none';
        document.getElementById('gachaRoll').style.display = 'none';
        document.getElementById('resultText').innerText = '';
        document.getElementById('gameInterface').style.display = 'block';
        document.getElementById('endScreen').style.display = 'none';
    })
}
