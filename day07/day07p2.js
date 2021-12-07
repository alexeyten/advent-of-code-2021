import { readFileSync } from 'fs';

const data = readFileSync('./input07.txt', 'utf8')
    .split(',')
    .map(Number)
    .reduce((data, n) => {
        data[n] = (data[n] ?? 0) + 1;
        return data;
    }, []);

const res = [];
for (let i = 0; i < data.length; i++) {
    res[i] = data.reduce((acc, count, n) => {
        const d = Math.abs(n - i);
        return acc + (d * (d + 1) / 2) * count;
    }, 0);
}

res.sort((a, b) => a - b);
console.log(res[0]);
