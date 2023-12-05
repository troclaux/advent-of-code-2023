import * as fs from 'fs';
// const util = require('util')

const input1: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');
input1.pop();

const input2: string[] = fs.readFileSync('input2.txt', 'utf8').split('\n');
input2.pop();

function part1(strings: string[]): number {
    const filteredLines: string[] = new Array( strings.length ).fill('');
    const numbers: number[] = [];

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
        numbers.push( Number( filteredLines[idx] ) );
    }
    return numbers.reduce(( acc, curr ) => acc + curr, 0);
}

function part2(lines: string []): number {
    for (let idx = 0; idx < lines.length; idx++) {
        lines[idx] = lines[idx]
            .replaceAll('one', 'o1e')
            .replaceAll('two', 't2o')
            .replaceAll('three', 't3e')
            .replaceAll('four', 'f4r')
            .replaceAll('five', 'f5e')
            .replaceAll('six', 's6x')
            .replaceAll('seven', 's7n')
            .replaceAll('eight', 'e8t')
            .replaceAll('nine', 'n9e');
    }

    const filteredLines: string[] = new Array( lines.length ).fill('');
    const numbers: number[] = [];

    for (let idx = 0; idx < lines.length; idx++) {

        for (let char = 0; char < lines[idx].length; char++) {

            if ( !isNaN( Number( lines[idx][char] ) ) ) {
                filteredLines[idx] = filteredLines[idx] + lines[idx][char];
                break;
            }
        }

        for (let char = lines[idx].length - 1; char >= 0; char--) {

            if ( !isNaN( Number( lines[idx][char] ) ) ) {
                filteredLines[idx] = filteredLines[idx] + lines[idx][char];
                break;
            }
        }
        numbers.push( Number( filteredLines[idx] ) );
    }
    return numbers.reduce(( acc, curr ) => acc + curr, 0);
}

// console.log( util.inspect( part1(lines), { maxArrayLength: null } ) );

console.log(part1(input1));
console.log(part2(input2));
