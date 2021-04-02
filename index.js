const express = require('express')
const app = express()

const phonebook = require('./db.json')

app.get('/api/persons', (request,response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request,response) => {
    console.log(`person ${JSON.stringify(request.params)}`)
    const id = Number(request.params.id)
    const person = phonebook.persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request,response) => {
    response.send(`
        <p>Phonebook has info for ${phonebook.persons.length} people</p>
        <p>${new Date()}</p>
    `)
})


const PORT = 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))