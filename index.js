const express = require('express')
const app = express()

const notes = require('./db.json')

app.get('/api/persons', (request,response) => {
    response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))