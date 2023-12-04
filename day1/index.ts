import * as fs from 'fs';
const util = require('util')

const lines: string[] = fs.readFileSync('input.txt', 'utf8').split('\n');

function getFirstAndLastNumber(strings: string[]): number[] {
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
    return output;
}

console.log( util.inspect( getFirstAndLastNumber(lines), { maxArrayLength: null } ) );
