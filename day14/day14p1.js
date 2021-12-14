import { readFileSync } from 'fs';

let [ poly, ...ins ] = readFileSync('./input14.txt', 'utf8')
    .split('\n').filter(Boolean);

ins = ins
    .map(s => s.split(' -> '))
    .reduce((ins, [ from, to ]) => {
        ins[from] = to;
        return ins;
    }, {});

function step(str) {
    let res = str[0];
    for (let i = 0; i < str.length - 1; i++) {
        res += ins[str.slice(i, i + 2)] + str[i + 1];
    }
    return res;
}

let res = poly;
for (let i = 0; i < 10; i++) {
    res = step(res);
}

const els = {};
for (const c of res) {
    els[c] = (els[c] || 0) + 1;
}

const a = Object.values(els).sort((a, b) => a - b);
console.log(a.slice(-1) - a[0]);

