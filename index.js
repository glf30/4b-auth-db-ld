const express = require('express')
const app = express()
const logger = require('morgan')

const connectToMongoDB = require('./database/connectToMongoDB')

app.use(express.json())
app.use(logger('dev'))

const usersRouter = require('./routes/usersRouter')
app.use('/api/v1/users', usersRouter)


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  connectToMongoDB()
})