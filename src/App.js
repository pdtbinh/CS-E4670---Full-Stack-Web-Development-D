import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons, SuccessMessage, ErrorMessage } from './components/Persons'
import { getAll, create, remove, update } from './services/persons'

const App = () => {

  const hook = () => {
    getAll().then(response => {
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

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
    const index = persons.map(person => person.name).indexOf(newName)
    if (index > -1) {
      const target = persons[index]
      if (window.confirm(`${target.name} is already added to phonebook, replace the old number with new one?`)) {
        const updatedPerson = {...target, number: newNumber}
        update(target.id, updatedPerson)
          .then(() => {
            setNewName('')
            setNewNumber('')
            setPersons(persons.map(p => p.id === target.id ? updatedPerson : p))
            setSuccess(`Updated ${target.name}`)
            setTimeout(() => setSuccess(null), 5000)
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setError(`Information about ${target.name} has already been removed from server`)
              setTimeout(() => setError(null), 5000)
              setPersons(persons.filter(p => p.id !== target.id))
            }
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }
    const person = { name: newName, number: newNumber }
    create(person).then((response) => {
      setNewName('')
      setNewNumber('')
      setPersons(persons.concat(response.data))
      setSuccess(`Added ${response.data.name}`)
      setTimeout(() => setSuccess(null), 5000)
    })
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      const id = person.id
      remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccess(`Deleted ${person.name}`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <SuccessMessage message={success}/>
      <ErrorMessage message={error}/>

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
      
      <Persons persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )

}

export default App