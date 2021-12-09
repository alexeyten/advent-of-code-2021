import { readFileSync } from 'fs';

const data = readFileSync('./input09.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(s => s.split('').map(Number));

let sum = 0;
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (isMin(data, i, j)) {
            // dump(data, i, j);
            sum += data[i][j] + 1;
        }
    }
}

console.log(sum);

function isMin(data, i, j) {
    if (i > 0) {
        if (data[i][j] >= data[i - 1][j]) return false;
    }
    if (j > 0) {
        if (data[i][j] >= data[i][j - 1]) return false;
    }
    if (i < data.length - 1) {
        if (data[i][j] >= data[i + 1][j]) return false;
    }
    if (j < data[i].length - 1) {
        if (data[i][j] >= data[i][j + 1]) return false;
    }
    return true;
}

function dump(data, i, j) {
    let s = '';
    for (let p = i - 1; p <= i + 1; p++) {
        if (p < 0 || p >= data.length) {
            s += '⋅⋅⋅\n';
            continue;
        }
        for (let q = j - 1; q <= j + 1; q++) {
            s += (q < 0 || q >= data[i].length) ? '⋅' : data[p][q];
        }
        s += '\n';
    }
    console.log(s);
}
