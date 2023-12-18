import * as fs from 'fs';

const input: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');
input.pop();

const chars1: string = '&+-#@$*/%=';
const chars2: string = '*';

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

function isNumber(char: string) {
    return !isNaN(Number(char));
}

function isDot(char: string) {
    return char === '.';
}

function isSymbol(char: string, symbols: string) {
    return symbols.includes(char);
}

function addCoordinates(col: number, row: number, coordinate: number[]) {
    const result: [number, number] = [ coordinate[0] + col, coordinate[1] + row ];
    return result;
}

function isSymbolAtCoordinate(col: number, row: number, matrix: string[], symbols: string) {
    if (col < 0 || row < 0 || col >= matrix.length || row >= matrix[col].length ) {
        return false;
    } else {
        return isSymbol( matrix[col][row], symbols);
    }
}

function hasAdjacentSymbol(col: number, row: number, matrix: string[], symbols: string) {

    for (const coordinate of coordinates) {
        if (isSymbolAtCoordinate( ...addCoordinates(col, row, coordinate), matrix, symbols) ) {
            return true;
        }
    }
    return false;
}

function getAdjacentSymbolCoordinates(col: number, row: number, matrix: string[], symbols: string) {

    let curr:[ number, number ] = [ -1, -1 ];
    for (const coordinate of coordinates) {
        curr = addCoordinates(col, row, coordinate);
        if (isSymbolAtCoordinate( ...curr, matrix, symbols) ) {
            return curr;
        }
    }
    return [-1, -1];
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
                if ( hasAdjacentSymbol(col, row, engineSchematic, chars1) ) {
                    isNumberAdjacentToSymbol = true;
                }
                currWord = currWord + engineSchematic[col][row];
            }
        }
    }
    console.dir(partNumbers, {'maxArrayLength': null});
    return partNumbers.reduce( (acc, curr) => acc = acc + curr, 0);
}

function saveGear(col: number, row: number, num: number, map: Map<string, number[]>) {
    const key = JSON.stringify([col, row]);

    if (map.has(key)) {
        const array: number[] = map.get(key) || [];
        array.push(num);
        map.set(key, array);
    } else {
        map.set(key, [num]);
    }
}

function part2(engineSchematic: string[]): number {

    let partNumbers: number[] = [];
    let currWord: string = '';
    let currRow: number = -1;
    let currCol: number = -1;
    let currSymbolCoordinates: number[] = [0, 0];
    let isNumberAdjacentToSymbol: boolean = false;
    let gearMap: Map<string, number[]> = new Map();

    for (let col = 0; col < engineSchematic.length; col++) {
        currWord = '';
        currSymbolCoordinates = [-1, -1];
        isNumberAdjacentToSymbol = false;
        for (let row = 0; row < engineSchematic[col].length; row++) {

            // if (isSymbol(engineSchematic[col][row])) {
            //     continue;
            // }

            if (row == ( engineSchematic[col].length - 1 ) && isNumber(engineSchematic[col][row]) && isNumberAdjacentToSymbol) {
                currWord = currWord + engineSchematic[col][row];
                partNumbers.push(Number(currWord));
                currSymbolCoordinates = getAdjacentSymbolCoordinates(col, row, engineSchematic, chars2);
                currCol = currSymbolCoordinates[0];
                currRow = currSymbolCoordinates[1];
                saveGear( currRow, currCol , Number(currWord), gearMap);
                currSymbolCoordinates = [-1, -1];
                continue;
            }

            if ( !isNumber(engineSchematic[col][row]) ) {

                if ( isNumberAdjacentToSymbol ) {
                    partNumbers.push(Number( currWord ));
                    currCol = currSymbolCoordinates[0];
                    currRow = currSymbolCoordinates[1];
                    saveGear( currRow, currCol , Number(currWord), gearMap);
                    currSymbolCoordinates = [-1, -1];
                    isNumberAdjacentToSymbol = false;
                }
                currWord = '';
                isNumberAdjacentToSymbol = false;
            }

            if ( isNumber(engineSchematic[col][row]) ) {
                if ( hasAdjacentSymbol(col, row, engineSchematic, chars2) ) {
                    currSymbolCoordinates = getAdjacentSymbolCoordinates(col, row, engineSchematic, chars2);
                    isNumberAdjacentToSymbol = true;
                }
                currWord = currWord + engineSchematic[col][row];
            }
        }
    }

    console.log( gearMap );
    // console.dir(partNumbers, {'maxArrayLength': null});
    // return partNumbers.reduce( (acc, curr) => acc = acc + curr, 0);
    return 0;
}

// console.log(part1(input));
console.log(part2(input));


