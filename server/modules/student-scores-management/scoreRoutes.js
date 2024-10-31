const router = require('express').Router()
const scoreController = require('./scoreController')

router.post('/', scoreController.getScores)
router.post('/update', scoreController.updateScore)

module.exports = router