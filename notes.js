const chalk = require('chalk');

const { loadNotes, saveNotes } = require('./utils/files');

const displayNote = (title, desc, resolved = false) =>
  console.log(
    chalk.bgGreen(`
    === Reading the note ====
    title : ${title}
    Desc: 
        ${desc}
    Is it resolved ? ${resolved}
    `)
  );

module.exports = {
  addNote(title, desc) {
    const notes = loadNotes();

    notes.push({
      title,
      desc,
      resolved: false,
    });

    saveNotes(notes);
  },
  readAllNotes() {
    const notes = loadNotes();

    if (!notes.length) {
      console.log(chalk.red.bold('No notes to display'));
      return;
    }
    notes.forEach(({ title, desc, resolved }) =>
      displayNote(title, desc, resolved)
    );
  },
  readOneNote(title) {
    const notes = loadNotes();

    const note = notes.find(
      note => note.title.toLowerCase() === title.toLowerCase()
    );

    if (note) {
      displayNote(note.title, note.desc, note.resolved);
    } else {
      console.log(chalk.yellow('Note not found, plz try again'));
    }
  },
  removeOneNote(title) {
    const notes = loadNotes();

    const filteredNotes = notes.filter(
      note => note.title.toLowerCase() !== title.toLowerCase()
    );

    console.log(chalk.magenta('Removed successfully the note'));

    saveNotes(filteredNotes);
  },
};
