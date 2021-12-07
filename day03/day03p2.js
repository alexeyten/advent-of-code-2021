import { readFileSync } from 'fs';

const data = readFileSync('./input03.txt', 'utf8')
    .split('\n');

const L = data[0].length;

let oxygen = data.slice();
for (let q = 0; q < L; q++) {
    const counts = [ 0, 0 ];
    for (let i = 0; i < oxygen.length; i++) {
        counts[oxygen[i][q]]++;
    }
    const f = counts[1] < counts[0] ? '0' : '1';
    oxygen = oxygen.filter(s => s[q] === f);
    if (oxygen.length === 1) break;
}

console.log(oxygen);

let co2 = data.slice();
for (let q = 0; q < L; q++) {
    const counts = [ 0, 0 ];
    for (let i = 0; i < co2.length; i++) {
        counts[co2[i][q]]++;
    }
    const f = counts[1] < counts[0] ? '1' : '0';
    co2 = co2.filter(s => s[q] === f);
    if (co2.length === 1) break;
}

console.log(co2);
console.log(parseInt(oxygen, 2) * parseInt(co2, 2));
