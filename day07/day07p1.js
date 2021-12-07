import { readFileSync } from 'fs';

const data = readFileSync('./input07.txt', 'utf8')
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);

const L = data.length;
const res = [ data.reduce((a, n) => a + n) ];

for (let i = 1; i < L; i++) {
    const d = data[i] - data[i - 1];
    res[i] = res[i - 1] + d * (2 * i - L);
}

res.sort((a, b) => a - b);
console.log(res[0]);
