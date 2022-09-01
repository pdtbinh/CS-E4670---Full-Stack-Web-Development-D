import { useState, useEffect } from 'react'
import axios from 'axios'

export const Filter = ({handleSearchChange, search}) => (
    <div>
        filter countries <input onChange={handleSearchChange} value={search}/>
    </div>
)

export const Country = ({country}) => {
    const [weather, setWeather] = useState()

    const hook = (lat, lng) => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`)
            .then(res => {
                setWeather(res.data)
            })
    }
    useEffect(() => hook(country.latlng[0], country.latlng[1]), [])
    
    return (<>
        <h2>{country.name.common}</h2>

        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>

        <h4>languages:</h4>
        <ul>
            {Object.values(country.languages).map(lg => <li>{lg}</li>)}
        </ul>

        <h1 style={{'fontSize': '5rem'}}>{country.flag}</h1>
        <h2>Weather in {country.capital[0]}</h2>

        <Weather weather={weather}/>
    </>)
}

export const Weather = ({weather}) => {
    if (weather) {
        return (<>
            <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
            <p>wind {weather.wind.speed} m/s</p>
        </>)
    } else {
        return <>Loading</>
    }
}

export const Button = ({showCountry}) => (<button onClick={showCountry}>show</button>)

export const Countries = ({countries, search, handleOnClick}) => {
    const searchedCountries = countries.filter(c => c.name.common.toLowerCase().indexOf(search.toLowerCase()) > -1)

    if (searchedCountries.length === 0)
        return <p>No country matches the searched keyword</p>

    else if (searchedCountries.length === 1)
        return <Country country={searchedCountries[0]}/>

    else if (searchedCountries.length < 11) 
        return <>{searchedCountries.map( c => <div key={c.name.common}>
            <span>{c.name.common}</span>
            <Button showCountry={() => handleOnClick(c.name.common)}/>
        </div> )}</>

    else
        return <p>Too many matches, specify another filter</p>
}