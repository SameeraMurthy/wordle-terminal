// MADE BY @SameeraMurthy

import { words } from './words.js';
import chalk from 'chalk';
import inquirer from 'inquirer';

const randomNumber = Math.floor(Math.random() * words.length);
const randomWord = words[randomNumber];
// words[randomNumber]
let history = []

// SETTINGS
// console.log("WORD", randomWord); // TESTING MODE


let refresh = () => {
	console.clear();
	console.log(`\n${chalk.bgGreenBright(chalk.black(" WOR"))}${chalk.bgYellowBright(chalk.black("DLE "))} TERMINAL\n_________________`);
	for (let i in history) {
		console.log(`\n${history[i]}`);
	}
}

let win = () => {
	console.clear();
	console.log(`\n${chalk.bgGreenBright(chalk.black(" WOR"))}${chalk.bgYellowBright(chalk.black("DLE "))} TERMINAL\n_________________`);
	for (let i in history) {
		console.log(`\n${history[i]}`);
	}
	console.log(`\n${chalk.bgGreenBright(chalk.black(" " + randomWord.split("").join("  ") + " "))}`);
	console.log(`\n${chalk.magentaBright("You guessed it in " + (history.length + 1) + " tries!")}\n`);
	return;
}

let validateGuess = guess => {

	switch (guess) {
		case "giveup":
			console.log(`\n${chalk.magentaBright("You gave up 🙁")}`);
			console.log(`\n${chalk.bgGreenBright(chalk.black(" " + randomWord.split("").join("  ") + " "))}\n`);
			break;
		case "help":
			console.log(`\n${chalk.blueBright("You will try to guess a 5 letter word.")}`);
			console.log(`\n${chalk.greenBright("If a letter is highlighted GREEN, then you guessed a letter and it's place correctly!")}`);
			console.log(`\n${chalk.yellowBright("If a letter is highlighted YELLOW, then you guessed a letter but it's not in the right place.")}`);
			console.log(`\n${chalk.whiteBright("If a letter is highlighted GRAY, then the letter you guessed doesn't exist in the word.")}`);
			console.log(`\n${chalk.blueBright("If you give up, type \"giveup\" as your guess.\n")}`);
			break;
		default:
			if (guess.length == 5) {
				let payload = ``
				guess = guess.replace(/[^a-zA-Z]+/g, '').slice(0, 5);

				if (guess === randomWord) {
					win();
				} else {
					let removed = randomWord;
					for (let i in guess){
						if (randomWord.search(guess[i]) > -1) {
							if (guess[i] === randomWord[i]) {
								// Mark Green
								removed = removed.replace(guess[i],'');
								console.log(removed)
								payload += chalk.bgGreenBright(chalk.black(` ${guess[i]} `))
							} else {
								// Mark Yellow
								if (removed.search(guess[i]) > -1) {
									removed = removed.replace(guess[i],'');
									payload += chalk.bgYellowBright(chalk.black(` ${guess[i]} `))
								} else {
									payload += chalk.bgGray(chalk.black(` ${guess[i]} `))
								}
							}
						} else {
							// Mark Grey
							payload += chalk.bgGray(chalk.black(` ${guess[i]} `))
						}
					}
					history.push(payload);
					console.log(`\n${payload}`);
					refresh();
					guessInput();
				}
			} else {
				refresh();
				throwError("Your guess needs to be 5 letters long.");
				guessInput();
			}
	}

}

let guessInput = () => {
	console.log(" ");
	inquirer.prompt([
		{
			type: "input",
			name: "guess",
			message: `${chalk.yellowBright("GUESS 5 LETTER WORD:")}`
		}
	]).then((answers) => {

		validateGuess(answers.guess)

	}).catch((error) => {
		if (error.isTtyError) {
			console.log(error)
		} else {
		console.log(error)
		}
	});
}

let throwError = err => {
	console.log(`\n${chalk.redBright(err)}`);
}

console.log(`\n${chalk.bgGreenBright(chalk.black(" WOR"))}${chalk.bgYellowBright(chalk.black("DLE "))} CLI\n------------`);
// console.log(`\nMade by ${chalk.blueBright("@sameeramurthy")}.`);

guessInput();