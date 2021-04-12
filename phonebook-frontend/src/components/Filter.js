import React from 'react'

const Filter = ({searchText, setSearchText}) => {
    return (
    <div>
        <label htmlFor="search">filter: </label>
        <input name="search" onChange={event => setSearchText(event.target.value)} value={searchText}/>
    </div>
    )
}

export default Filter