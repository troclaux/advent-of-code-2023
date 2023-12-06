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

part1(input, defaultBag);
