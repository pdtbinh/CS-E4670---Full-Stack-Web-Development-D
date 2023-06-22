require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/user')
const env = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

const url = env.MONGODB_URI
mongoose.set('strictQuery',false)
mongoose
  .connect(url)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(error => logger.error('Failed to connect to MongoDB: ', error.message))

app.use(cors())
app.use(express.json())

app.use(middleware.getTokenFrom)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app