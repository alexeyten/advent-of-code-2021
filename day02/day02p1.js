import { readFileSync } from 'fs';

/** @type {number[]} */
const data = readFileSync('./input02.txt', 'utf8')
    .split('\n')
    .map(s => s.split(' '))
    .map(([d, n]) => [d[0], Number(n)]);

const pos = [0, 0];

data.forEach(([d, n]) => {
    switch(d) {
        case 'f':
            pos[0] += n;
            break;
        case 'd':
            pos[1] += n;
            break;
        case 'u':
            pos[1] -= n;
            break;
    }
});
console.log(pos, pos[0] * pos[1]);
