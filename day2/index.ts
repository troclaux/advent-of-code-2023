import * as fs from 'fs';

const input: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');
input.pop();


let defaultBag: Map<string,number> = new Map([
    [ 'red', 12 ],
    [ 'green', 13 ],
    [ 'blue', 14 ]
]);

function isGamePossible(gameStr: string, bag: Map<string, number>): boolean {
    let gameSets: string[] = gameStr
        .split(': ')[1]
        .split('; ');
    let singleColorCubes: string[] = [];
    for (let idx = 0; idx < gameSets.length; idx++) {
        singleColorCubes.push( ...gameSets[idx].split(', ') );
    }

    for (let idx = 0; idx < singleColorCubes.length; idx++) {
        const [count, color] = singleColorCubes[idx].split(' ');
        if (bag.get(color) && bag.get(color)! < Number(count)) {
            return false;
        }
    }
    return true;
}

function part1(games: string[], bag: Map<string, number>): number {

    let sum:number = 0;

    for (let game of games) {

        if (isGamePossible(game, bag) ) {

            let gameID: number = Number( 
                game.split(':')[0]
                .split(' ')[1]
            );

            sum += gameID;
        }

    }
    return sum;
}

function getMinimumSetOfCubes(gameStr: string): (number | undefined)[] {
    // const RED = 0;
    // const GREEN = 1;
    // const BLUE = 2;

    let minSetForEachColor: Map<string,number> = new Map();

    minSetForEachColor.set( 'red', 0 );
    minSetForEachColor.set( 'green', 0 );
    minSetForEachColor.set( 'blue', 0 );

    let singleColorCubes: string[] = [];
    let gameSets: string[] = gameStr
        .split(': ')[1]
        .split('; ');

    for (let idx = 0; idx < gameSets.length; idx++) {
        singleColorCubes.push( ...gameSets[idx].split(', ') );
    }

    for ( let singleColorCube of singleColorCubes) {

        let [countStr, color] = singleColorCube.split(' ');
        let count: number = Number( countStr );

        if ( minSetForEachColor.get(color)! < Number( count ) ) {

            minSetForEachColor.set(color, count);

        }
    }

    let minimums: (number | undefined)[] = [ 
        minSetForEachColor.get('red'), 
        minSetForEachColor.get('green'), 
        minSetForEachColor.get('blue')
    ];

    return minimums;
}

function part2(games: string[]): number | undefined {

    const powersOfEachGame = [];

    for (let game of games) {
        const power = getMinimumSetOfCubes(game).reduce(
            (acc: any, curr: any) => acc * curr,
            1
        );
        powersOfEachGame.push(power);

    }

    return powersOfEachGame.reduce( (acc, curr: any) => acc + curr, 0);
}

part1(input, defaultBag);
console.log( part2(input) );
