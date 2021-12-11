import { readFileSync } from 'fs';

class Matrix {
    constructor(data) {
        this.data = data;
        this.N = data.length;
    }

    get(i, j) {
        if (i < 0 || i >= this.N) return -1;
        if (j < 0 || j >= this.N) return -1;
        return this.data[i][j];
    }

    inc(i, j) {
        if (i < 0 || i >= this.N) return 0;
        if (j < 0 || j >= this.N) return 0;
        return ++this.data[i][j];
    }

    toString() {
        return this.data.map(a => a.join());
    }
}

const field = new Matrix(readFileSync('./input11.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(s => s.split('').map(Number)));

let step = 0;
for (let flashes = 0; flashes !== 100; step++) {
    flashes = next();
}

console.log(step);

function next() {
    const bangs = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (field.inc(i, j) === 10) {
                bangs.push([i, j]);
            }
        }
    }

    for (let p = 0; p < bangs.length; p++) {
        const [a, b] = bangs[p];
        for (let i = a - 1; i <= a + 1; i++) {
            for (let j = b - 1; j <= b + 1; j++) {
                if (field.inc(i, j) === 10) {
                    bangs.push([i, j]);
                }
            }
        }
    }

    for (let p = 0; p < bangs.length; p++) {
        const [a, b] = bangs[p];
        field.data[a][b] = 0;
    }

    return bangs.length;
}
