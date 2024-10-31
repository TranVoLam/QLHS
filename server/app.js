const express = require('express')
require('dotenv').config()
const recordRoutes = require('./modules/student-records-management/recordRoutes')
const scoreRoutes = require('./modules/student-scores-management/scoreRoutes')

const app = express()
app.use(express.json())

app.use('/students', recordRoutes)
app.use('/scores', scoreRoutes)

module.exports = app