import * as fs from 'fs';

const input: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');
input.pop();

function isNumber(char: string) {
    return !isNaN(Number(char));
}
function isDot(char: string) {
    return char === '.';
}

function isSymbol(char: string) {
    return !isNumber(char) && !isDot(char);
}
function addCoordinates(col: number, row: number, coordinate: number[]) {
    const result: [number, number] = [ coordinate[0] + col, coordinate[1] + row ];
    return result;
}
const coordinates: number[][] = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
]

const [
    upLeft, up, upRight,
    left, right,
    downLeft, down, downRight
] = coordinates;
