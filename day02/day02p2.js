import { readFileSync } from 'fs';

/** @type {number[]} */
const data = readFileSync('./input02.txt', 'utf8')
    .split('\n')
    .map(s => s.split(' '))
    .map(([d, x]) => [d[0], Number(x)]);

const coords = {
    pos: 0,
    depth: 0,
    aim: 0
};

data.forEach(([d, x]) => {
    switch(d) {
        case 'f':
            coords.pos += x;
            coords.depth += coords.aim * x;
            break;
        case 'd':
            coords.aim += x;
            break;
        case 'u':
            coords.aim -= x;
            break;
    }
});

console.log(coords, coords.pos * coords.depth);
