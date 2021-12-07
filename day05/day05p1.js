import { readFileSync } from 'fs';

const data = readFileSync('./input05.txt', 'utf8')
    .split('\n')
    .map(s => s.split(/\D+/).map(Number))
    .filter(([x1, y1, x2, y2]) => (x1 === x2 || y1 === y2))
    .map(([x1, y1, x2, y2]) => [
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.max(x1, x2),
        Math.max(y1, y2)
    ]);

const s1 = new Set();
const s2 = new Set();

data.forEach(([x1, y1, x2, y2]) => {
    if (x1 < x2) {
        for (let x = x1; x <= x2; x++) {
            const k = `${x},${y1}`;
            if (s1.has(k)) {
                s2.add(k);
            } else {
                s1.add(k);
            }
        }
    } else {
        for (let y = y1; y <= y2; y++) {
            const k = `${x1},${y}`;
            if (s1.has(k)) {
                s2.add(k);
            } else {
                s1.add(k);
            }
        }
    }
});

console.log(s2.size);
