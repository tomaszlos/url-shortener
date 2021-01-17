const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./router')
const db = require('./db')

app.use(bodyParser.json())
app.use('/', router)

app.db = db

module.exports = app
