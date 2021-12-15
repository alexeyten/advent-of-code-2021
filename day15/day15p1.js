import { readFileSync } from 'fs';

let cave = readFileSync('./input15.txt', 'utf8')
    .split('\n').filter(Boolean)
    .map(s => s.split('').map(d => ({ v: Number(d), r: 1_000_000_000 })));

const N = cave.length;

const queue = [[0, 0]];
cave[0][0].r = 0;

while (queue.length) {
    const [x, y] = queue.shift();
    const r = cave[x][y].r;
    if (x > 0) { visit(x - 1, y, r); }
    if (y > 0) { visit(x, y - 1, r); }
    if (x < N - 1) { visit(x + 1, y, r); }
    if (y < N - 1) { visit(x, y + 1, r); }
}
console.log(cave[N - 1][N - 1].r);

function visit(x, y, r) {
    const s = r + cave[x][y].v;
    if (s < cave[x][y].r) {
        cave[x][y].r = s;
        queue.push([x, y]);
    }
}

