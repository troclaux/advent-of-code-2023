import * as fs from 'fs';

const input: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');
input.pop();

function getNumberCountMap(nums: number[]) {
    let map = new Map<number,number>();
    for (let num of nums) {
        const count = map.get(num) || 0;
        map.set(num, count + 1);
    }
    return map;
}


function part1(cards: string[]) {
    let sum: number = 0;
    let cardId: number = 1;
    let cardPoints: number[] = [];

    for (let card of cards) {

        let matchCount: number = 0;
        const [winningNumbersStr, numbersStr] = card.split(':')[1].split('|');

        let winningNumbers: number[] = winningNumbersStr
            .split(' ')
            .map(numStr => parseInt( numStr, 10 ))
            .filter( numStr => { return !Number.isNaN(numStr) } );

        let numbers: number[] = numbersStr
            .split(' ')
            .map(numStr => parseInt( numStr, 10 ))
            .filter( numStr => { return !Number.isNaN(numStr) } );

        let countMap: Map<number, number> = getNumberCountMap(numbers);
        let matches: number[] = [];

        for ( let winningNumber of winningNumbers ) {
            if ( countMap.get( winningNumber ) ) {
                matches.push(winningNumber);
                matchCount++;
            }
        }

        console.log( cardId, winningNumbers, numbers, matches );
        cardPoints.push(matchCount);
        cardId++;
    }
    
    return cardPoints;
}

// console.dir(partNumbers, {'maxArrayLength': null});

// console.log('part 1 solution:', part1(input));
console.log( part1(input) );
