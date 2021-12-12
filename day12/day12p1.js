import { readFileSync } from 'fs';

const nodes = readFileSync('./input12.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(s => s.split('-'))
    .reduce((nodes, [a, b], i) => {
        nodes[a] = nodes[a] ?? { name: a, small: /[a-z]/.test(a), links: new Set() };
        nodes[b] = nodes[b] ?? { name: b, small: /[a-z]/.test(b), links: new Set() };
        if (b !== 'start' && a !== 'end') nodes[a].links.add(b);
        if (a !== 'start' && b !== 'end') nodes[b].links.add(a);
        return nodes;
    }, {});

let n = 0;
visit('start');
console.log(n);

function visit(name, visited = new Set(), list = []) {
    const node = nodes[name];

    if (node.small) {
        if (visited.has(name)) {
            return;
        } else {
            visited.add(name);
        }
    }

    list.push(name);

    for (const next of node.links) {
        if (next === 'end') {
            n++;
            // console.log(list.concat(next).join());
            continue;
        }
        visit(next, visited, list);
    }

    list.pop();

    if (node.small) {
        visited.delete(name);
    }
}
