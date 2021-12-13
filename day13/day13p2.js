import { readFileSync } from 'fs';

const { dots, folds } = readFileSync('./input13.txt', 'utf8')
    .split('\n').filter(Boolean)
    .reduce((res, s) => {
        if (/^fold/.test(s)) {
            res.folds.push(/(.)=(\d+)/.exec(s).slice(1,3));
        } else {
            res.dots.set(s, s.split(',').map(Number));
        }
        return res;
    }, { dots: new Map, folds: [] });

for (let i = 0; i < folds.length; i++) {
    const f = Number(folds[i][1]);
    if (folds[i][0] === 'x') {
        for (let k of dots.keys()) {
            let [x, y] = dots.get(k);
            if(x > f) {
                x = 2 * f - x;
                dots.set(`${x},${y}`, [x, y]);
                dots.delete(k);
            }
        }
    } else {
        for (let k of dots.keys()) {
            let [x, y] = dots.get(k);
            if(y > f) {
                y = 2 * f - y;
                dots.set(`${x},${y}`, [x, y]);
                dots.delete(k);
            }
        }
    }
}

let X = 0;
let Y = 0;
for (let [x, y] of dots.values()) {
    Y = Y < y ? y : Y;
    X = X < x ? x : X;
}

const L = Array.from({ length: Y + 1 }, _ => Array.from({ length: X + 1 }, _ => ' '));
for (let [x, y] of dots.values()) {
    L[y][x] = '#';
}
console.log(L.map(l=>l.join('')).join('\n'));
