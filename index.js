const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person.js")
const app = express()

const phonebook = require("./db.json")

app.use(express.static("./build"))
app.use(express.json())

morgan.token("payload", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : ""
})
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
)

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = phonebook.persons.find((person) => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post("/api/persons", (request, response) => {
  const person = request.body
  if (!person?.name || !person?.number) {
    console.log("invalid person", JSON.stringify(person))
    return response.status(400).json({
      error: `missing ${!person?.name ? "name" : "number"}`,
    })
  }
  const newPerson = new Person({
    name: person.name,
    number: person.number,
  })
  newPerson.save().then((result) => {
    response.json(newPerson)
  })
})

app.put("/api/persons/:id", (request, response, next) => {
  const update = {
    number: request.body.number,
  }
  Person.findByIdAndUpdate(request.params.id, update, { new: true })
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.get("/info", (request, response) => {
  response.send(`
        <p>Phonebook has info for ${phonebook.persons.length} people</p>
        <p>${new Date()}</p>
    `)
})

const errorHandler = (error, request, response, next) => {
  console.error(error)
  if (error.name === "CastError") {
    return response.status(400).json({ error: "Malformatted ID" })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))
