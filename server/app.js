const express = require('express')
require('dotenv').config()
const recordRoutes = require('./modules/student-records-management/recordRoutes')
const scoreRoutes = require('./modules/student-scores-management/scoreRoutes')
const activityRoutes = require("./modules/student-activities-management/activityRoutes")

const app = express()
app.use(express.json())

app.use('/students', recordRoutes)
app.use('/scores', scoreRoutes)
app.use('/activities', activityRoutes)

module.exports = app