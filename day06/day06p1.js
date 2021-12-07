import { readFileSync } from 'fs';

const data = readFileSync('./input06.txt', 'utf8')
    .split(',')
    .map(Number)
    .reduce((data, v) => {
        data[v]++;
        return data;
    }, [0, 0, 0, 0, 0, 0, 0, 0, -0]);

for (let i = 0; i < 80; i++) {
    const b = data[0];
    for (let q = 0; q < 8; q++) {
        data[q] = data[q + 1];
    }
    data[8] = b;
    data[6] += b;
}
console.log(data.reduce((a,b) => a + b));
