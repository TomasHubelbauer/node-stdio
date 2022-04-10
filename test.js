import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(/** @type {string} */ question) {
  return new Promise(answer => rl.question(question + ' ', answer));
}

console.log('Your favorite color is', await ask('What is your favorite color?'));
console.log('Your favorite animal is', await ask('What is your favorite animal?'));
console.log('Your favorite season is', await ask('What is your favorite season?'));
console.log('Your favorite number is', await ask('What is your favorite number?'));

console.log('Thank you.');
rl.close();
