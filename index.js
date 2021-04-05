const express = require('express')
const morgan = require('morgan')
const app = express()

const phonebook = require('./db.json')

app.use(express.json())

morgan.token('payload', function (req, res) { return req.method === 'POST' ? JSON.stringify(req.body) : ''})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :payload'))

app.get('/api/persons', (request,response) => {
    response.json(phonebook.persons)
})

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = phonebook.persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request,response) => {
    const person = request.body
    if (!person?.name || !person?.number) {
        console.log('invalid person',JSON.stringify(person))
        return response.status(400).json({
            error: `missing ${!person?.name ? 'name' : 'number'}`
        })
    } else if (phonebook.persons.find(existing => existing.name === person.name)) {
        return response.status(409).json({
            error: `person ${person.name} already exists`
        })
    }
    const newPerson = {
        name: person.name,
        number: person.number,
        id: Math.floor(Math.random()*1000)
    }
    phonebook.persons.push(newPerson)

    response.json(newPerson)
})

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    phonebook.persons = phonebook.persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request,response) => {
    response.send(`
        <p>Phonebook has info for ${phonebook.persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

app.use(express.static('./build'))

const PORT = 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))