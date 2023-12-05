import * as fs from 'fs';
// const util = require('util')

const lines: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');
lines.pop();

function part1(strings: string[]): number {
    const filteredLines: string[] = new Array( strings.length ).fill('');
    const output: number[] = [];

    for (let idx = 0; idx < strings.length; idx++) {

        for (let char = 0; char < strings[idx].length; char++) {

            if ( !isNaN( Number( strings[idx][char] ) ) ) {
                filteredLines[idx] = filteredLines[idx] + strings[idx][char];
                break;
            }
        }

        for (let char = strings[idx].length - 1; char >= 0; char--) {

            if ( !isNaN( Number( strings[idx][char] ) ) ) {
                filteredLines[idx] = filteredLines[idx] + strings[idx][char];
                break;
            }
        }
        output.push( Number( filteredLines[idx] ) );
    }
    return output.reduce(( acc, curr ) => acc + curr, 0);
}

// console.log( util.inspect( part1(lines), { maxArrayLength: null } ) );
console.log(part1(lines));
