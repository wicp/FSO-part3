import React from 'react'

const PersonDisplay = ({persons, searchText, deletePerson}) => {
    const confirmDelete = (person) => {
        const confirmation = window.confirm(`Delete ${person.name}?`)
        if (confirmation) deletePerson(person)
    }
    return (
        <div>
            {persons.map(person => {
                if (person.name.toLowerCase().includes(searchText) || searchText === '')
                return (
                    <p key={person.id}>{person.name} {person.number}
                        <button onClick={() => confirmDelete(person)}>Delete</button>
                    </p>
                )
                else return ""
              })
            }
        </div>
    )
}

export default PersonDisplay