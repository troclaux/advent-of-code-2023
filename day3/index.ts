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
