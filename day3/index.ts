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

// console.log({ upLeft, up, upRight, left, right, downLeft, down, downRight });

function isSymbolAtCoordinate(col: number, row: number, matrix: string[]) {
    if (col < 0 || row < 0 || col >= matrix.length || row >= matrix[col].length ) {
        return false;
    } else {
        return isSymbol( matrix[col][row] );
    }
}

function hasAdjacentSymbol(col: number, row: number, matrix: string[]) {

    for (const coordinate of coordinates) {
        if (isSymbolAtCoordinate( ...addCoordinates(col, row, coordinate), matrix) ) {
            return true;
        }
    }
    return false;
}


function part1(engineSchematic: string[]): number {

    let partNumbers: number[] = [];
    let currWord: string = '';
    let isNumberAdjacentToSymbol: boolean = false;

    for (let col = 0; col < engineSchematic.length; col++) {
        currWord = '';
        isNumberAdjacentToSymbol = false;
        for (let row = 0; row < engineSchematic[col].length; row++) {

            // if (isSymbol(engineSchematic[col][row])) {
            //     continue;
            // }

            if (row == ( engineSchematic[col].length - 1 ) && isNumber(engineSchematic[col][row]) && isNumberAdjacentToSymbol) {
                currWord = currWord + engineSchematic[col][row];
                partNumbers.push(Number(currWord));
                continue;
            }

            if ( !isNumber(engineSchematic[col][row]) ) {

                if ( isNumberAdjacentToSymbol ) {
                    partNumbers.push(Number( currWord ));
                    isNumberAdjacentToSymbol = false;
                }
                currWord = '';
                isNumberAdjacentToSymbol = false;
            }

            if ( isNumber(engineSchematic[col][row]) ) {
                if ( hasAdjacentSymbol(col, row, engineSchematic) ) {
                    isNumberAdjacentToSymbol = true;
                }
                currWord = currWord + engineSchematic[col][row];
            }
        }
    }
    console.dir(partNumbers, {'maxArrayLength': null});
    console.log( partNumbers.length );
    return partNumbers.reduce( (acc, curr) => acc = acc + curr, 0);
}

console.log(part1(input));
