// helpers for startup functions
const initializeGame = () => {
    let song = new beepbox.Synth('9n43sbk0l00e0zt3ia7g0Hj0nr1i0o4333T8v1u1af10r9q012d02x670W7E0T1v1u52f0qwx10v311d08A1F2B4Q00b0Pf519E3b662876T1v0u92f30o21962pcq0x10w02d16A8F4B3Qd107P5a93E2b9639T5v3u54f0qwx10w411d03H__RyjsIisArsJJh0E1b6T3v0uf8f0q0x10p71d08S-IqiiiiiiiiiiiiE1biT3v0uf7f0qwx10m711d08SZIztrsrzrqiiiiiE1b6T2v3u15f10w4qw02d03w0E0b2w00008p2y6gNM9kJylbo8p2y6hHDM0000000001248gx248gw048xA28ogx248xw00000000000000000000002lboBiS26gExAqVY000000000000000000000000000048gx28o0000000000gx248gx248gx248gx248gx248g00000000000000000000004ggx448h0000000000000000000048gx248gw048gx248gx248g0000000000p2gYKqf825dll4tlkhRlh6VILGG8Td7VOtKX03Feq_06iWCJxPuhUGqJPhUaagzGGydPnWBkhVtkhRlh7jdAt6vm9JS3ndBY-GUEv-PdbukECye2LieRdqRw5w4B2eGG8WGGTdLYqyGN4FyhjlAkBbQBaGEzCgwGJw4w5NaGEzGGyeGGGGHtTN_G3O_B2yjPLll8pfOdPsv_T6mVE-9GRjrtSTtAtlkhSVJCqhVKqq_4kQAByp7DbSpullm9rrCSXIzGGyeLdJTifdTjnVV2EGGyeGG8WGEzWGG8YMteTtw1AHsSTdSVGGG8WGEzGGyfaGyf4xAHtS0Z9PnUOiDaGKHu52H2iTyocEBnCM2qjCnTt5GGxqGEnBlgzGGyeGG8V1haTtw54ITd5EGxsGq8UhhaLtw54w2Cz-4sg4th7lhhkhR4tdYDF4sehT4tl55h7khQOlKMhRAtx7lghQAs4hQQM604tN70AsMQkl4th7jv9w002VILKYerOf6jlKqf1hi4tlkhKq_kGyfbGyeGG8WpIzLDqNdKUrNfGKa7_IPiTBa9EzwHQzJjmJo1o19gzGGyeGGJPp59iyqNgFihjlAkBbQBaGEzCgwGJw4w5NaGEzGGyeGGGGHtTN_G3OZO9FmCEhKrzZwXzbsQv4Rr-SXJKX8WGEzJPrcQzOYQR-19F9bkOffnIOYGGIiSTdJTp7ll4turrKAurKCLMC8R5lkhRlh7ll4vllh7yh2DrKM0WiqfTbGZuWGGyeGG8WGEzSGEzN8paTtwfibYcAFNrMEloimYj1B4GYS0jisO-XEJlkbll2YGG4tlkhRlhUm0kQvMzy0zG8WGaayeEzFLAZ8zxOeUzGEEG8WyeCiJS2eIzI8WG2eAzwyeCC0M0zK8U4zC6yyEzG8WrVc000FHPGpi1q1sz85E5Ocwmwn8O1q1g000kQpMLEbW2ewLEbW2fg8W2ewzE8QOA2Q2Qkkkk2Q2Q2Q2w001jjB2tcV0-gjV0Z0Z0-gjV0-h9Ywuwuwv89Ywv89Ywuwuwvg7O2v87E7EE7O3zWqc04t16Ckyywmwmwn88W2f85E5E5E50000');
    if(Number(localStorage.getItem('schmeckles')) !== 0) {
        document.getElementById('displaySchmeckles').innerText = `Schmeckles: ${localStorage.getItem('schmeckles')}`;
    }
    document.getElementById('startGame').addEventListener('click', function () {
        if (!song.isPlayingSong) {
            song.play();
        }
        document.getElementById('startGame').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        document.getElementById('enemyDisplay').src = campaign.levelList[curLevel].enemyList[curEnemy].sprite;
        document.getElementById('enemyName').innerText = campaign.levelList[curLevel].enemyList[curEnemy].name;
        document.getElementById('levelName').innerText = `Level ${curLevel + 1}: ${campaign.levelList[curLevel].name}`;
        document.getElementById('enemyNum').innerText = `Enemy ${curEnemy + 1}`;
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
}