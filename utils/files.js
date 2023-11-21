const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const NOTES_FILE = path.join(__dirname, '..', 'output', 'notes.json');

module.exports = {
  loadNotes() {
    try {
      const notes = fs.readFileSync(NOTES_FILE);
      console.log(chalk.bold.green('Successfully loaded the notes'));

      return JSON.parse(notes);
    } catch (err) {
      return [];
    }
  },
  saveNotes(notes) {
    try {
      fs.writeFileSync(NOTES_FILE, JSON.stringify(notes));
      console.log(chalk.bold.green('Successfully written the notes'));
    } catch (err) {
      console.error(chalk.bold.red('Impossible to create the notes'));
      console.error(err.message);
    }
  },
};
