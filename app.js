require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/user')
const env = require('./utils/config')
const logger = require('./utils/logger')
const { errorHandler } = require('./utils/middleware')

const url = env.MONGODB_URI
mongoose.set('strictQuery',false)
mongoose
  .connect(url)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(error => logger.error('Failed to connect to MongoDB: ', error.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

module.exports = app