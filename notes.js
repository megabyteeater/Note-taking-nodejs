const fs = require('fs')
const chalk = require('chalk');


const getNotes = () => {
    return 'The notes..'
}

//ading notes

const addNotes = (title, body) => {
    const notes = loadNotes()
    //not adding duplicate title 
    //const duplicateTitle = notes.filter((oneNote) => oneNote.title === title)
    //array.find is efficient version
    const duplicateTitle = notes.find((oneNote) => oneNote.title === title)

    if(!duplicateTitle){ // we can also use duplicateTitle === undefined
        //writting a new note as an object on the array
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    } else {
        console.log(chalk.red.inverse("Duplicate title detected"))
    }
   
}


//removing a note
const removeNote = (title) => {
    const notes = loadNotes()
    const unmatchedNotes = notes.filter((oneNote) => oneNote.title !== title)
    if(unmatchedNotes.length < notes.length){
        console.log(chalk.green.inverse('Note removed :)'))
        saveNotes(unmatchedNotes)
    } else {
        console.log(chalk.red.inverse('No note found :('))
    }
}


//listing notes
const listNote = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes -> '));

    notes.forEach((note) => {
        console.log(note.title)
    })
}

//reading note
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((oneNote) => oneNote.title === title)

    if(note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note NOT Found!!"))
    }
}

//saving a nte to the json file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//reading the json file to append the new note
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(err) { // return an empty array if the file is empty / starting the array empty and not getting any error
        return []
    }
}


module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}