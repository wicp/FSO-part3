const express = require('express')
const app = express()

const notes = require('./db.json')

app.get('/api/persons', (request,response) => {
    response.json(notes)
})

app.get('/info', (request,response) => {
    response.send(`
        <p>Phonebook has info for ${notes.persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

const PORT = 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))