import { readFileSync } from 'fs';

const data = readFileSync('./input08.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(s => s.split(' | ')[1].split(' '));

const uniq = new Set([2, 3, 4, 7]);

const res = data.reduce((res, l) => {
    return res + l.filter(s => uniq.has(s.length)).length;
}, 0);

console.log(res);
