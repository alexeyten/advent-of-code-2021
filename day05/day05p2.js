import { readFileSync } from 'fs';

const data = readFileSync('./input05.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(s => s.split(/\D+/).map(Number));

const s1 = new Set();
const s2 = new Set();

data.forEach(([x1, y1, x2, y2], p) => {
    const dx = (x1 < x2) ? 1 : ((x1 > x2) ? -1 : 0);
    const dy = (y1 < y2) ? 1 : ((y1 > y2) ? -1 : 0);

    for (let x = x1, y = y1; x !== (x2 + dx) || y !== (y2 + dy); x += dx, y += dy) {
        const k = `${x},${y}`;
        if (s1.has(k)) {
            s2.add(k);
        } else {
            s1.add(k);
        }
    }

});

console.log(s2.size);
