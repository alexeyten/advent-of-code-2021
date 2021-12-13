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

const f = Number(folds[0][1]);
for (let k of dots.keys()) {
    let [x, y] = dots.get(k);
    if(x > f) {
        x = 2 * f - x;
        dots.set(`${x},${y}`, [x, y]);
        dots.delete(k);
    }
}

console.log(dots.size);
