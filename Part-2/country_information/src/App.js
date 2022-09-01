import { useState, useEffect } from 'react'
import { Filter, Countries } from './components/Helpers'
import axios from 'axios'

const App = () => {

    const hook = () => {
        axios.get('https://restcountries.com/v3.1/all').then(response => {
            console.log(response.data[0])
            setCountries(response.data)
        })
    }

    useEffect(hook, [])

    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleOnClick = (country) => {
        setSearch(country)
    }

    return (<>
        {/* The app does not have any style yet, hence Fragment is enough to wrap the components */}
        <Filter handleSearchChange={handleSearchChange} value={search}/>
        <Countries countries={countries} search={search} handleOnClick={handleOnClick}/>
    </>)

}

export default App