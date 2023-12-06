import * as fs from 'fs';

const input: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');
input.pop();

function sumOfIdsOfPossibleGames(games: string[]): number {

    let sum:number = 0;

    let defaultBag: Map<string,number> = new Map([
        [ 'red', 12 ],
        [ 'green', 13 ],
        [ 'blue', 14 ]
    ]);

    for (let game of games) {
        console.log(game);
    }

    return sum;
}

sumOfIdsOfPossibleGames(input);
