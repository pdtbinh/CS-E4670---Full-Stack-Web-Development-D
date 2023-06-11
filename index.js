require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Entry = require('./models/entry')

app.use(cors())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :req[content-length] - :response-time ms :body'));
app.use(express.json())
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res, next) => {
  Entry.find({})
    .then(entries => res.json(entries))
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  } 

  // Check if entry's name already exists
  Entry.findOne({ name: body.name })
    .then(result => {
      if (result)
        // POST redirects to PUT instead of GET
        res.redirect(`/api/persons/${result.id}`)
    })
    .catch(error => next(error))

  const entry = new Entry({
    name: body.name,
    number: body.number
  })

  entry.save().then(savedEntry => res.json(savedEntry))
})

app.get('/api/persons/:id', (req, res, next) => {
  Entry.findById(req.params.id)
    .then(entry => {
      if (entry)
        res.json(entry)
      else
        res.status(404).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const entry = { name, number }
  Entry.findByIdAndUpdate(req.params.id, entry, { new: true })
    .then(updatedEntry => res.status(200).json(updatedEntry))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Entry.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
  Entry.find({})
    .then(entries => {
      const count = `Phonebook has info for ${entries.length} people`
      const now = new Date()
      res.send(`<div><div>${count}</div><div>${now}</div></div>`)
    })
    .catch(error => next(error))
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformated id' })
  }
  next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})