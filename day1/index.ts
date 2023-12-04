import * as fs from 'fs';

const lines: string[] = fs.readFileSync('input.txt', 'utf8').split('\n');

function getFirstAndLastNumber(strings: string[]): number[] {
    const filteredLines: string[] = new Array( lines.length ).fill('');
    const output: number[] = [];

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
        output.push( Number( filteredLines[idx] ) );
    }
    return output;
}

console.log(getFirstAndLastNumber(lines));
