import { readFileSync } from 'fs';

const data = readFileSync('./input03.txt', 'utf8')
    .split('\n');

let gamma = '';
let epsilon = '';

for (let q = 0; q < data[0].length; q++) {
    const counts = [ 0, 0 ];
    for (let i = 0; i < data.length; i++) {
        counts[data[i][q]]++;
    }
    if (counts[0] > counts[1]) {
        gamma = gamma + '0';
        epsilon = epsilon + '1';
    } else {
        gamma = gamma + '1';
        epsilon = epsilon + '0';
    }
}

console.log(gamma, epsilon);
gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);
console.log(gamma * epsilon);
