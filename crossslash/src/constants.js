// constants.js
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
const computerOptions = [Move.lightAttack, Move.defend, Move.heal, Move.sharpen, Move.heavyAttack, Move.stab, Move.counter, Move.bulkUp, Move.armorUp, Move.clearEnhancements];
const optionToText = {'lightAttack': 'Light Attack', 'defend': 'Defend', 'heal': 'Heal', 'sharpen': 'Sharpen', 'heavyAttack': 'Heavy Attack',
    'stab': 'Stab', 'counter': 'Counter', 'bulkUp': 'Bulk Up', 'armorUp': 'Armor Up', 'clearEnhancements': 'Clear Enhancements'
};
const textToOption = {'Light Attack': 'lightAttack', 'Defend': 'defend', 'Heal': 'heal', 'Sharpen': 'sharpen', 'Heavy Attack': 'heavyAttack',
    'Stab': 'stab', 'Counter': 'counter', 'Bulk Up': 'bulkUp', 'Armor Up': 'armorUp', 'Clear Enhancements': 'clearEnhancements'
};
const twoTurnOptions = ['heavyAttack', 'stab', 'counter', 'bulkUp', 'armorUp', 'clearEnhancements'];
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
    clearEnhancements: 9
}