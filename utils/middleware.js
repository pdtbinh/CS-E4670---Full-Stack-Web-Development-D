require('dotenv').config()
const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

const userExtractor = async (request, response, next) => {
    let decodedToken = ''
    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET)
    } catch {
        decodedToken = {}
    }
    if (!decodedToken.id) {
        return next()
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }

    next(error)
}

module.exports = { tokenExtractor, userExtractor, errorHandler }