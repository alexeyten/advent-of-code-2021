import { readFileSync } from 'fs';

const lines = readFileSync('./input10.txt', 'utf8')
    .split('\n')
    .filter(Boolean);

const scores = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
};

function calcScore(line) {
    const stack = [];
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        switch(c) {
            case ')': if (stack.pop() !== '(') return 0; break;
            case ']': if (stack.pop() !== '[') return 0; break;
            case '}': if (stack.pop() !== '{') return 0; break;
            case '>': if (stack.pop() !== '<') return 0; break;
            default: stack.push(c); break;
        }
    }
    return stack.reverse().reduce((sum, c) => sum * 5 + scores[c], 0);
}

const res = lines
    .map(calcScore)
    .filter(Boolean)
    .sort((a, b) => a - b);

console.log(res[res.length/2|0]);
