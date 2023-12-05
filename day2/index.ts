import * as fs from 'fs';

const input: string[] = fs.readFileSync('input.txt', 'utf8').split('\n');
input.pop();


let defaultBag: Map<string,number> = new Map([
    [ 'red', 12, ],
    [ 'green', 13, ],
    [ 'blue', 14 ]
]);
