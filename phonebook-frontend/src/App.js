import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Notification from './components/Notification'
import PersonDisplay from './components/PersonDisplay'
import dbservice from './services/dbservice'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchText, setSearchText] = useState('')
  const [ notification, setNotification] = useState([null, null])

  useEffect(()=> {
    dbservice.getAll()
    .then(response => setPersons(response.data))
  },[])

  const newNotification = (message, kind, timeout) => {
    setNotification([message,kind])
    if (timeout) setTimeout(() => setNotification([null, null]),timeout)
  }

  const inPersons = (name) => {
    for (let person of persons) {
      if (person.name === name) return person
    }
    return false
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const oldPerson = inPersons(newName)
    if (oldPerson) {
      const confirmation = window.confirm(
        `${newName} is already in the phonebook, replace old number with new?`
      )
      if (confirmation) {
        dbservice.update({...oldPerson, number: newNumber})
        .then(response => {
          setPersons(persons.map( person => {
            if (person.name === newName) return response.data
            else return person
          }))
          newNotification(`Updated number for ${response.data.name}`,'info',3000)
        }
        )
        .catch(error => newNotification('Could not update number','error'))
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      dbservice.create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        newNotification(`Added ${response.data.name}`,'info',3000)
      })
      .catch(error => newNotification('Could not update phonebook','error'))
    }
    setNewName('')
    setNewNumber('')
  }
  const deletePerson = (deletedPerson) => {
    dbservice.delete(deletedPerson)
    .then(setPersons(persons.filter(person => person.id !== deletedPerson.id)))
    .catch(error => newNotification(`Could not delete ${deletedPerson.name}`,'error'))
  }

  return (
    <div>
      <Notification message={notification[0]} kind={notification[1]}/>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} setSearchText={setSearchText} />
      <h2>Add a new</h2>
      <Form handleSubmit={handleSubmit} setNewName={setNewName} setNewNumber={setNewNumber}
            newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <PersonDisplay persons={persons} searchText={searchText} deletePerson={deletePerson}/>
    </div>
  )
}

export default App