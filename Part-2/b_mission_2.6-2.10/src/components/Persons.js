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

export const Persons = ({persons, search}) => (
    <>
        {persons.map(person => (
            (person.name.indexOf(search) > -1) ? 
            <p key={person.name}>{person.name} {person.number}</p> 
            : null
        ))}
    </>
)