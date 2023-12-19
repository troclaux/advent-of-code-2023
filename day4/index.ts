import * as fs from 'fs';

const input: string[] = fs.readFileSync('input1.txt', 'utf8').split('\n');
input.pop();

function part1(cards: string[]) {
    let sum: number = 0;
    let list_of_winning_numbers: string[] = [];
    let list_of_numbers: string[] = [];
    for (let card of cards) {
        const [curr_winning_numbers, curr_numbers] = card.split(':')[1].split('|');
        console.log( { curr_winning_numbers } );
        console.log( { curr_numbers } );
        // get both lists as strings
        // separate the two lists
        // separate the numbers
        // add numbers to hashmap
        // list_of_winning_numbers.push(
    }
    return sum;
}

// console.dir(partNumbers, {'maxArrayLength': null});

// console.log('part 1 solution:', part1(input));
console.log( part1(input) );
