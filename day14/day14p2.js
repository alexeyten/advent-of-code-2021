import { readFileSync } from 'fs';

let [ poly, ...ins ] = readFileSync('./input14.txt', 'utf8')
    .split('\n').filter(Boolean);

ins = ins
    .map(s => s.split(' -> '))
    .reduce((ins, [ from, to ]) => {
        ins[from] = [from[0] + to, to + from[1]];
        return ins;
    }, Object.create(null));

{
    const pairs = Object.create(null);
    for (let i = 0; i < poly.length - 1; i++) {
        const p = poly.slice(i, i + 2);
        pairs[p] = (pairs[p] ?? 0) + 1;
    }
    pairs['_' + poly[0]] = 1;
    pairs[poly.slice(-1) + '_'] = 1;
    ins['_' + poly[0]] = [ '_' + poly[0] ];
    ins[poly.slice(-1) + '_'] = [ poly.slice(-1) + '_' ];
    poly = pairs;
}

function step(poly) {
    let res = Object.create(null);
    for (const k in poly) {
        for (let i = 0; i < ins[k].length; i++) {
            const q = ins[k][i];
            res[q] = (res[q] ?? 0) + poly[k];
        }
    }
    return res;
}

for (let i = 0; i < 40; i++) {
    poly = step(poly);
}

const res = Object.create(null);
for (const k in poly) {
    res[k[0]] = (res[k[0]] ?? 0) + poly[k];
    res[k[1]] = (res[k[1]] ?? 0) + poly[k];
}
delete(res._);
const a = Object.values(res).sort((a, b) => a - b);
console.log((a.slice(-1) - a[0])/2);


