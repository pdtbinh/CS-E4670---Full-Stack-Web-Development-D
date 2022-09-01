import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons } from './components/Persons'
import axios from 'axios'

const App = () => {

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).indexOf(newName) > -1) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    const person = { name: newName, number: newNumber }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearchChange={handleSearchChange} search={search}/>

      <h2>Add a new</h2>

      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <Persons persons={persons} search={search}/>
    </div>
  )

}

export default App