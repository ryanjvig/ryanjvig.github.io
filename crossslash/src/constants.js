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
// const computerOptions = ['lightAttack', 'defend', 'heal', 'sharpen', 'heavyAttack', 'stab', 'counter', 'bulkUp', 'armorUp', 'clearEnhancements'];
// const optionToText = {'lightAttack': 'Light Attack', 'defend': 'Defend', 'heal': 'Heal', 'sharpen': 'Sharpen', 'heavyAttack': 'Heavy Attack',
//     'stab': 'Stab', 'counter': 'Counter', 'bulkUp': 'Bulk Up', 'armorUp': 'Armor Up', 'clearEnhancements': 'Clear Enhancements'
// };
// const textToOption = {'Light Attack': 'lightAttack', 'Defend': 'defend', 'Heal': 'heal', 'Sharpen': 'sharpen', 'Heavy Attack': 'heavyAttack',
//     'Stab': 'stab', 'Counter': 'counter', 'Bulk Up': 'bulkUp', 'Armor Up': 'armorUp', 'Clear Enhancements': 'clearEnhancements'
// };
// const twoTurnOptions = ['heavyAttack', 'stab', 'counter', 'bulkUp', 'armorUp', 'clearEnhancements'];
const moveOptions = [Move.lightAttack, Move.defend, Move.heal, Move.sharpen, Move.heavyAttack, Move.stab, Move.counter, Move.bulkUp, Move.armorUp, Move.clearEnhancements];
const optionToText = ['Light Attack', 'Defend', 'Heal', 'Sharpen', 'Heavy Attack',
    'Stab', 'Counter', 'Bulk Up', 'Armor Up', 'Clear Enhancements'];
const idToOption = {'lightAttack': Move.lightAttack, 'defend': Move.defend, 'heal': Move.heal, 'sharpen': Move.sharpen, 'heavyAttack':  Move.heavyAttack,
    'stab': Move.stab, 'counter': Move.counter, 'bulkUp': Move.bulkUp, 'armorUp': Move.armorUp, 'clearEnhancements': Move.clearEnhancements
};
const twoTurnOptions = [Move.heavyAttack, Move.stab, Move.counter, Move.bulkUp, Move.armorUp, Move.clearEnhancements];
