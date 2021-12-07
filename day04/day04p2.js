import { readFileSync } from 'fs';

function Board() {
    this.rows = [];
    this.cols = Array.from({ length: 5 }, () => new Set());
    this.sum = 0;
    this.win = false;
}

const data = readFileSync('./input04.txt', 'utf8').split('\n');

const seq = data[0].split(',').map(Number);
const boards = new Set();

for (let i = 1, board; i < data.length - 1; i++) {
    if (!data[i]) {
        board = new Board();
        boards.add(board);
        continue;
    }
    const nums = data[i].trim().split(/\s+/).map(Number);
    board.rows.push(new Set(nums));
    nums.forEach((n, q) => {
        board.cols[q].add(n);
        board.sum += n;
    });
}

all: for (const n of seq) {
    for(const board of boards) {
        for (const row of board.rows) {
            if (row.delete(n)) {
                board.sum -= n;
                if (!row.size) {
                    board.win = true;
                    break;
                }
            }
        }
        for (const col of board.cols) {
            if (col.delete(n)) {
                if (!col.size) {
                    board.win = true;
                    break;
                }
            }
        }
        if (board.win) {
            if (boards.size === 1) {
                console.log(n, board.sum, n * board.sum);
                break all;
            }
            boards.delete(board);
        }
    }
}
