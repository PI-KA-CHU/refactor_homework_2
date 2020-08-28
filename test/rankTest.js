const rankTest = require('ava');
const {rating} = require('../src/rank')

rankTest('ranting case 1, User has 1 voyage', t => {
    const voyage = {
        zone: 'west-indies',
        length: 10,
    };
    const history = [
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'china',
            profit: -2,
        }, {
            zone: 'west-africa',
            profit: 7,
        },
    ];

    const result = rating(voyage, history);

    t.is(result, 'B')
})

rankTest('ranting case 2, User has 8 voyage', t => {
    const voyage = {
        zone: 'east-indies',
        length: 8,
    };
    const history = [
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'china',
            profit: -2,
        }, {
            zone: 'west-africa',
            profit: 7,
        },
    ];

    const result = rating(voyage, history);

    t.is(result, 'B')
})

rankTest('ranting case 3, User has 8 voyage and the zone is china and the history length is 10 has china', t => {
    const voyage = {
        zone: 'china',
        length: 8,
    };

    const history = [
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'china',
            profit: -2,
        }, {
            zone: 'west-africa',
            profit: 7,
        }, {
            zone: 'north-indies',
            profit: 5,
        }, {
            zone: 'south-indies',
            profit: 15,
        }, {
            zone: 'china',
            profit: -2,
        }, {
            zone: 'north-africa',
            profit: 7,
        }, {
            zone: 'south-africa',
            profit: -2,
        }, {
            zone: 'west-europe',
            profit: 7,
        },
    ];

    const result = rating(voyage, history);

    t.is(result, 'A');
})

rankTest('ranting case 4, User has 8 voyage and the zone is china and the history length is 10 does not has chins', t => {
    const voyage = {
        zone: 'china',
        length: 8,
    };

    const history = [
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'west-europe',
            profit: 7,
        }, {
            zone: 'china',
            profit: -2,
        }, {
            zone: 'west-africa',
            profit: 7,
        }, {
            zone: 'north-indies',
            profit: 5,
        }, {
            zone: 'south-indies',
            profit: 15,
        }, {
            zone: 'china',
            profit: -2,
        }, {
            zone: 'north-africa',
            profit: 7,
        }, {
            zone: 'south-africa',
            profit: -2,
        },
    ];

    const result = rating(voyage, history);

    t.is(result, 'A');
})

rankTest('ranting case 5, User has 8 voyage and the zone is east-indies and the history length is 9 does not has chins', t => {
    const voyage = {
        zone: 'east-indies',
        length: 8,
    };

    const history = [
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'west-europe',
            profit: 7,
        }, {
            zone: 'west-africa',
            profit: 7,
        }, {
            zone: 'north-indies',
            profit: 5,
        }, {
            zone: 'south-indies',
            profit: 15,
        }, {
            zone: 'north-africa',
            profit: 7,
        }, {
            zone: 'south-africa',
            profit: -2,
        }, {
            zone: 'south-africa',
            profit: -2,
        },
    ];

    const result = rating(voyage, history);

    t.is(result, 'B');
})

rankTest('ranting case 6, User has 8 voyage and the zone is east-indies and the history length is 15 does not has chins', t => {
    const voyage = {
        zone: 'east-indies',
        length: 8,
    };

    const history = [
        {
            zone: 'east-indies',
            profit: 5,
        }, {
            zone: 'west-indies',
            profit: 15,
        }, {
            zone: 'west-europe',
            profit: 7,
        }, {
            zone: 'west-africa',
            profit: 7,
        }, {
            zone: 'north-indies',
            profit: 5,
        }, {
            zone: 'south-indies',
            profit: 15,
        }, {
            zone: 'north-africa',
            profit: 7,
        }, {
            zone: 'south-africa',
            profit: -2,
        }, {
            zone: 'south-africa',
            profit: -2,
        }, {
            zone: 'west-africa',
            profit: 7,
        }, {
            zone: 'north-indies',
            profit: 5,
        }, {
            zone: 'south-indies',
            profit: 15,
        }, {
            zone: 'north-africa',
            profit: 7,
        }, {
            zone: 'south-africa',
            profit: -2,
        }, {
            zone: 'south-africa',
            profit: -2,
        },
    ];

    const result = rating(voyage, history);

    t.is(result, 'B');
})