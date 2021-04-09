const { db_username, db_password } = require("./credentials.json")
const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("Error: database password not provided")
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://${db_username}:${db_password}@sandbox.lypcw.mongodb.net/phonebook-app`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name,
    number,
  })
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number}`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    result.forEach((person) =>
      console.log(`name: ${person.name} number: ${person.number}`)
    )
    mongoose.connection.close()
  })
}
