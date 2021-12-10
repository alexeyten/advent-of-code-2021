import { readFileSync } from 'fs';

const lines = readFileSync('./input10.txt', 'utf8')
    .split('\n')
    .filter(Boolean);

function findError(line) {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        switch(c) {
            case ')': if (stack.pop() !== '(') return c; break;
            case ']': if (stack.pop() !== '[') return c; break;
            case '}': if (stack.pop() !== '{') return c; break;
            case '>': if (stack.pop() !== '<') return c; break;
            default: stack.push(c); break;
        }
    }
    return false;
}

const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

const res = lines
    .map(findError)
    .filter(Boolean)
    .reduce((res, c) => res + scores[c], 0);

console.log(res);
