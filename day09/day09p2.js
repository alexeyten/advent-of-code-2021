import { readFileSync } from 'fs';

const cave = readFileSync('./input09.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(s => `9${s}9`.split(''));

cave.unshift('9'.repeat(cave[0].length).split(''));
cave.push('9'.repeat(cave[0].length).split(''));

const basins = [];
for (let i = 1; i < cave.length - 1; i++) {
    for (let j = 1; j < cave[i].length; j++) {
        if (cave[i][j] !== '9') {
            basins.push(findBasin(i, j));
        }
    }
}
basins.sort((a, b) => b - a);
// console.log(basins);
console.log(basins[0] * basins[1] * basins[2]);

function findBasin(i0, j0) {
    const q = [[i0, j0]];
    cave[i0][j0] = '9';
    for (let a = 0; a < q.length; a++) {
        const [i, j] = q[a];
        if (cave[i - 1][j] !== '9') { q.push([i - 1, j]); cave[i - 1][j] = '9'; }
        if (cave[i + 1][j] !== '9') { q.push([i + 1, j]); cave[i + 1][j] = '9'; }
        if (cave[i][j - 1] !== '9') { q.push([i, j - 1]); cave[i][j - 1] = '9'; }
        if (cave[i][j + 1] !== '9') { q.push([i, j + 1]); cave[i][j + 1] = '9'; }
    }
    return q.length;
}
