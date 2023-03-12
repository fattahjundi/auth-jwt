require('dotenv').config()
const express = require('express')
const router = require('./routes/router')
const passportLib = require('./middlewares/passport')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// letakkan initialize passport sblm router
app.use(passportLib.initialize())

app.use(router)

app.listen(port, ()=>{console.log(`listening to port ${port}`)})
