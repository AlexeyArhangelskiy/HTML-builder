const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Hello! Please enter text:');

function getInput() {
  rl.question('', (enteredText) => {
    if (enteredText.toLowerCase() === 'exit') {
      rl.close();
    } else {
      const filePath = path.join(__dirname, 'output.txt');
      fs.appendFile(filePath, enteredText + '\n', (err) => {
        if (err) {
          console.error('Error appending to file:', err);
        } else {
          getInput();
        }
      });
    }
  });
}

getInput();

rl.on('close', () => {
  console.log('Bye, close terminal');
  process.exit(0);
});
process.on('SIGINT', () => {
  console.log('Bye, close terminal');
  rl.close();
});
