const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { 
            title: 1,
            author: 1,
            url: 1,
            likes: 1
        })
    response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (password.length < 3) 
        return response.status(400).json(
            { error: 'passowrd must have at least 3 characters.' }
        )
    const saltRound = 10
    const passwordHashed = await bcrypt.hash(password, saltRound)

    const user = new User({ username, name, passwordHashed })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter