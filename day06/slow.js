import { readFileSync } from 'fs';

const data = readFileSync('./input06.txt', 'utf8')
    .split(',')
    .map(Number);

let school = data.slice();
for (let day = 0; day < 256; day++) {
    school = school.reduce((school, n) => {
        if (n) {
            school.push(n - 1);
        } else {
            school.push(6, 8);
        }
        return school;
    }, []);
    console.log(day, school.length);
}

console.log(school.length);
