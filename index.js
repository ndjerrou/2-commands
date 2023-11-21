const yargs = require('yargs');
const { loadNotes, saveNotes } = require('./utils/files');
const {
  addNote,
  readAllNotes,
  readOneNote,
  removeOneNote,
} = require('./notes');

loadNotes();

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      demandOption: true,
      type: 'string',
      describe: `note's title`,
    },
    desc: {
      demandOption: true,
      type: 'string',
      describe: `note's desc`,
    },
    resolved: {
      type: 'string',
      describe: `note accomplishment`,
    },
  },
  handler({ title, desc, resolved = false }) {
    addNote(title, desc);
  },
});
yargs.command({
  command: 'readAll',
  describe: 'Read all notes',
  handler() {
    readAllNotes();
  },
});
yargs.command({
  command: 'readOne',
  describe: 'Read one note',
  handler({ title }) {
    readOneNote(title);
  },
  builder: {
    title: {
      demandOption: true,
      type: 'string',
      describe: 'title of the note to look for',
    },
  },
});
yargs.command({
  command: 'removeOne',
  describe: 'Remove one note',
  handler({ title }) {
    removeOneNote(title);
  },
  builder: {
    title: {
      demandOption: true,
      type: 'string',
      describe: 'title of the note to remove',
    },
  },
});

yargs.parse();
