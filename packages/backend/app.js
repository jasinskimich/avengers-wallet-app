const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const usersRouter = require('./routes/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

require('./config/config-passport')

app.use(usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'nie dziauaaa' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app