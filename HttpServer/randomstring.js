const lowers = 'abcdefghijklmnopqrstuvwxyz';
const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

const defaults = {
    lowersCount: 3,
    uppersCount: 3,
    numbersCount: 3,
    specialsCount: 1,
    specials: '_',
    canSpecialRepeat: true
};

function randomstring(options) {
    options = Object.assign({}, defaults, options);

    let uuid = '';

    for (var i = 0; i < options.lowersCount; i++) {
        uuid += lowers.charAt(Math.floor(Math.random() * lowers.length));
    }
    for (var i = 0; i < options.uppersCount; i++) {
        uuid += uppers.charAt(Math.floor(Math.random() * uppers.length));
    }
    for (var i = 0; i < options.numbersCount; i++) {
        uuid += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    if (!options.canSpecialRepeat) {
        if (options.specialsCount > options.specials.length) {
            options.specialsCount = options.specials.length;
        }
    }

    for (var i = 0; i < options.specialsCount; i++) {
        let spIndex = Math.floor(Math.random() * options.specials.length);
        let specialChar = options.specials.charAt(spIndex);
        uuid += specialChar
        if (!options.canSpecialRepeat) {
            options.specials = options.specials.replace(specialChar, '');
        }
    }

    let shuffled = uuid.split('').sort(function () { return 0.5 - Math.random() }).join('');
    return shuffled !== '' ? shuffled : 'yoo';
}

module.exports = randomstring;