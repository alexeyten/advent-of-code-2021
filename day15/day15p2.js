import { readFileSync } from 'fs';

const cave = readFileSync('./input15.txt', 'utf8')
    .split('\n').filter(Boolean)
    .map(s => s.split('').map(d => ({ v: Number(d), r: 1_000_000_000 })));

{
    const N = cave.length;
    for (let i = 0; i < N; i++) {
        for (let c = 1; c < 5; c++) {
            for (let j = 0; j < N; j++) {
                cave[i][c * N + j] = {
                    v: (cave[i][j].v + c - 1) % 9 + 1,
                    r: 1_000_000_000,
                };
            }
        }
        for (let c = 1; c < 5; c++) {
            cave[c * N + i] = cave[i].map(({ v, r }) => ({ v: (v + c - 1) % 9 + 1, r }));
        }
    }
}

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

