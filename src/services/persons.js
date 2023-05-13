import axios from 'axios'
const url = 'http://localhost:3001/api/persons'

export const getAll = () => {
    return axios.get(url)
}

export const create = (person) => {
    return axios.post(url, person)
}

export const remove = (id) => {
    return axios.delete(`${url}/${id}`)
}

export const update = (id, person) => {
    return axios.put(`${url}/${id}`, person)
}