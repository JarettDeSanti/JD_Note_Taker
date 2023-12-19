const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const {v4:uuidv4} = require('uuid');
const getNotes = () => {
    return readFile('./db/db.json', 'utf8').then(rawNotes => [].concat(JSON.parse(rawNotes)));
}
router.get('/notes', (req, res) => {
    getNotes().then(notes => res.json(notes));
});
router.post('/notes', (req, res) => {
    const newNote = {title:req.body.title, text: req.body.text, id: uuidv4()};
    getNotes().then(notes => {
        const noteArray = [...notes, newNote];
        writeFile('./db/db.json', JSON.stringify(noteArray)).then(() => res.json({
            msg: 'Note added!'
        }))
        
    })
});
router.delete('/notes/:id', (req, res) => {
    console.log(req.params.id);
    getNotes().then(notes => {
        const filterNotes = notes.filter(note => note.id!== req.params.id);
        writeFile('./db/db.json', JSON.stringify(filterNotes)).then(() => res.json({
            msg: 'Note deleted!'
        }))
        
    })
});


module.exports = router;