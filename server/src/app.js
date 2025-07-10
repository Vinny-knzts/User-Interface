const express = require('express')
const userRouter = require('./routes/userRouter')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('src/public/uploads'))

app.use('/user', userRouter)

module.exports = app
