import { readFileSync } from 'fs';

const data = readFileSync('./input08.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(s => {
        const [ D, S ] = s.split(' | ').map(s => s.split(' ').map(s => s.split('').sort().join('')));
        return [
            D.sort((a, b) => a.length - b.length),
            S
        ];
    });

/**
 * 2 seg → 1
 * 3 seg → 7
 * 4 seg → 4
 * 7 seg → 8
 * 5 seg has «cf» → 3
 * 5 seg has «bd» → 5
 * 5 seg → 2
 * 6 seg has «cbdf» → 9
 * 6 seg has «cf» → 0
 * 6 seg → 6
 */
function guess(D) {
    const checkCF = (s) => new RegExp(D[0].split('').join('.*')).test(s);
    const checkBD = (s) => new RegExp(D[2].split('').filter(c => !D[0].includes(c)).join('.*')).test(s);

    const res = {
        [D[0]]: 1, // 2 seg
        [D[1]]: 7, // 3 seg
        [D[2]]: 4, // 4 seg
        [D[9]]: 8, // 7 seg
    };

    for (let i = 3; i < 6; i++) {
        const s = D[i];
        if (checkCF(s)) {
            res[s] = 3;
        } else if (checkBD(s)) {
            res[s] = 5;
        } else {
            res[s] = 2;
        }
    }

    for (let i = 6; i < 9; i++) {
        const s = D[i];
        if (checkCF(s)) {
            if (checkBD(s)) {
                res[s] = 9;
            } else {
                res[s] = 0;
            }
        } else {
            res[s] = 6;
        }
    }

    return res;
}

for (let i = 0; i < data.length; i++) {
    const D = guess(data[i][0]);
    data[i][2] = Number(data[i][1].map(s => D[s]).join(''));
}

const res = data.reduce((sum, d) => sum + d[2], 0);

console.log(res);
