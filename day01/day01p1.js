import { readFileSync } from 'fs';

/** @type {number[]} */
const data = readFileSync('./input01.txt', 'utf8')
    .split('\n')
    .map(Number);

const L = data.length;
let a = 0;
for (let i = 1; i < L; i++) {
    if (data[i] > data[i - 1]) a++;
}

console.log(a);
