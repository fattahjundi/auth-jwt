const express = require('express')
const router = require('./routes/router')
const passport = require('passport')

const app = express()
const port = 3000

app.use(express.json())
// letakkan initialize passport sblm router
app.use(passport.initialize())

app.use(router)

app.listen(port, ()=>{console.log(`listening to port ${port}`)})
