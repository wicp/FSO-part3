import React from 'react'

const Form = ({handleSubmit, setNewName, setNewNumber, newName, newNumber}) => {
    return (
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name: </label>
          <input name="name" onChange={event => setNewName(event.target.value)} value={newName}/>     
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input name="number" onChange={event => setNewNumber(event.target.value)} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default Form