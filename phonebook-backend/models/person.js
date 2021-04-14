const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

require("dotenv").config()
const db_username = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD

const url = `mongodb+srv://${db_username}:${db_password}@sandbox.lypcw.mongodb.net/phonebook-app`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
})
personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Person", personSchema)
