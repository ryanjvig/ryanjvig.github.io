// constants.js
// enum for move types
const Move = {
    lightAttack: 0,
    defend: 1,
    heal: 2,
    sharpen: 3,
    heavyAttack: 4,
    stab: 5,
    counter: 6,
    bulkUp: 7,
    armorUp: 8,
    clearEnhancements: 9,
    stunned: 10
}
const playerOptions = [document.getElementById('lightAttack'), document.getElementById('defend'),
    document.getElementById('heal'), document.getElementById('sharpen'),
    document.getElementById('heavyAttack'), document.getElementById('stab'),
    document.getElementById('counter'), document.getElementById('bulkUp'),
    document.getElementById('armorUp'), document.getElementById('clearEnhancements')];
const moveOptions = [Move.lightAttack, Move.defend, Move.heal, Move.sharpen, Move.heavyAttack, Move.stab, Move.counter, Move.bulkUp, Move.armorUp, Move.clearEnhancements];
const optionToText = ['Light Attack', 'Defend', 'Heal', 'Sharpen', 'Heavy Attack',
    'Stab', 'Counter', 'Bulk Up', 'Armor Up', 'Clear Enhancements'];
const idToOption = {'lightAttack': Move.lightAttack, 'defend': Move.defend, 'heal': Move.heal, 'sharpen': Move.sharpen, 'heavyAttack':  Move.heavyAttack,
    'stab': Move.stab, 'counter': Move.counter, 'bulkUp': Move.bulkUp, 'armorUp': Move.armorUp, 'clearEnhancements': Move.clearEnhancements
};
const twoTurnOptions = [Move.heavyAttack, Move.stab, Move.counter, Move.bulkUp, Move.armorUp, Move.clearEnhancements];
const song = new beepbox.Synth('9n43sbk0l00e0zt3ia7g0Hj0nr1i0o4333T8v1u1af10r9q012d02x670W7E0T1v1u52f0qwx10v311d08A1F2B4Q00b0Pf519E3b662876T1v0u92f30o21962pcq0x10w02d16A8F4B3Qd107P5a93E2b9639T5v3u54f0qwx10w411d03H__RyjsIisArsJJh0E1b6T3v0uf8f0q0x10p71d08S-IqiiiiiiiiiiiiE1biT3v0uf7f0qwx10m711d08SZIztrsrzrqiiiiiE1b6T2v3u15f10w4qw02d03w0E0b2w00008p2y6gNM9kJylbo8p2y6hHDM0000000001248gx248gw048xA28ogx248xw00000000000000000000002lboBiS26gExAqVY000000000000000000000000000048gx28o0000000000gx248gx248gx248gx248gx248g00000000000000000000004ggx448h0000000000000000000048gx248gw048gx248gx248g0000000000p2gYKqf825dll4tlkhRlh6VILGG8Td7VOtKX03Feq_06iWCJxPuhUGqJPhUaagzGGydPnWBkhVtkhRlh7jdAt6vm9JS3ndBY-GUEv-PdbukECye2LieRdqRw5w4B2eGG8WGGTdLYqyGN4FyhjlAkBbQBaGEzCgwGJw4w5NaGEzGGyeGGGGHtTN_G3O_B2yjPLll8pfOdPsv_T6mVE-9GRjrtSTtAtlkhSVJCqhVKqq_4kQAByp7DbSpullm9rrCSXIzGGyeLdJTifdTjnVV2EGGyeGG8WGEzWGG8YMteTtw1AHsSTdSVGGG8WGEzGGyfaGyf4xAHtS0Z9PnUOiDaGKHu52H2iTyocEBnCM2qjCnTt5GGxqGEnBlgzGGyeGG8V1haTtw54ITd5EGxsGq8UhhaLtw54w2Cz-4sg4th7lhhkhR4tdYDF4sehT4tl55h7khQOlKMhRAtx7lghQAs4hQQM604tN70AsMQkl4th7jv9w002VILKYerOf6jlKqf1hi4tlkhKq_kGyfbGyeGG8WpIzLDqNdKUrNfGKa7_IPiTBa9EzwHQzJjmJo1o19gzGGyeGGJPp59iyqNgFihjlAkBbQBaGEzCgwGJw4w5NaGEzGGyeGGGGHtTN_G3OZO9FmCEhKrzZwXzbsQv4Rr-SXJKX8WGEzJPrcQzOYQR-19F9bkOffnIOYGGIiSTdJTp7ll4turrKAurKCLMC8R5lkhRlh7ll4vllh7yh2DrKM0WiqfTbGZuWGGyeGG8WGEzSGEzN8paTtwfibYcAFNrMEloimYj1B4GYS0jisO-XEJlkbll2YGG4tlkhRlhUm0kQvMzy0zG8WGaayeEzFLAZ8zxOeUzGEEG8WyeCiJS2eIzI8WG2eAzwyeCC0M0zK8U4zC6yyEzG8WrVc000FHPGpi1q1sz85E5Ocwmwn8O1q1g000kQpMLEbW2ewLEbW2fg8W2ewzE8QOA2Q2Qkkkk2Q2Q2Q2w001jjB2tcV0-gjV0Z0Z0-gjV0-h9Ywuwuwv89Ywv89Ywuwuwvg7O2v87E7EE7O3zWqc04t16Ckyywmwmwn88W2f85E5E5E50000');