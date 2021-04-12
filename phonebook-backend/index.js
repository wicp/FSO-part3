const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person.js")
const app = express()

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

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result)
    })
    .catch(next)
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      response.json(result)
    })
    .catch(next)
})

app.post("/api/persons", (request, response, next) => {
  const person = request.body
  const newPerson = new Person({
    name: person.name,
    number: person.number,
  })
  newPerson
    .save()
    .then((result) => {
      response.json(result)
    })
    .catch(next)
})

app.put("/api/persons/:id", (request, response, next) => {
  const update = {
    number: request.body.number,
  }
  Person.findByIdAndUpdate(request.params.id, update, { new: true, runValidators: true})
    .then((result) => {
      response.json(result)
    })
    .catch(next)
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch(next)
})

app.get("/info", (request, response, next) => {
  Person.countDocuments()
    .then((result) => {
      response.send(`
      <p>Phonebook has info for ${result} people</p>
      <p>${new Date()}</p>`)
    })
    .catch(next)
})

const errorHandler = (error, request, response, next) => {
  console.error(error)
  if (error.name === "CastError") {
    return response.status(400).json({ error: "Malformatted ID" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))
