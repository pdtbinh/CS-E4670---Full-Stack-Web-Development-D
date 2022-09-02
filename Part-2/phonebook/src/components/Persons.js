export const Filter = ({handleSearchChange, search}) => (
    <div>
        filter shown with <input onChange={handleSearchChange} value={search}/>
    </div>
)

export const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => (
    <form onSubmit={addPerson}>
        <div>
            name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
            number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export const Persons = ({persons, search, handleDelete}) => (
    <>
        {persons.map(person => (
            (person.name.toLowerCase().indexOf(search.toLowerCase()) > -1) ? 
            <div key={person.id}>
                <span>{person.name} {person.number}</span> <button onClick={() => handleDelete(person)}>delete</button>
            </div>
            : null
        ))}
    </>
)