const express = require('express')
require('dotenv').config()
const recordRoutes = require('./modules/student-records-management/recordRoutes')

const app = express()
app.use(express.json())

app.use('/students', recordRoutes)

module.exports = app