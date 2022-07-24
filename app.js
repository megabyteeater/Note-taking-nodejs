const chalk = require('chalk');
const { argv } = require('yargs');
const yargs = require('yargs');
const { listNote } = require('./notes.js');
const notes = require('./notes.js')

//changing version
yargs.version('1.1.0');

//add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true, // meaning that this title argument is required
            type: 'string'
        },
        body: {
            describe: 'Body of note',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
})

//remove
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

//read
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

//list
yargs.command({
    command: 'list',
    describe: 'List of note',
    handler(){
        notes.listNote()
    }
})

yargs.parse();
//console.log(yargs.argv);