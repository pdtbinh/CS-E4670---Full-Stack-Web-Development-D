import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

export const getAll = () => {
    return axios.get(baseUrl)
}

export const create = (person) => {
    return axios.post(baseUrl, person)
}

export const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export const update = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
}