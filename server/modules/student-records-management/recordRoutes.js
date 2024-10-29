const router = require('express').Router()
const recordController = require('./recordController')

router.post('/', recordController.getStudentRecords)
router.post('/post', recordController.postStudentRecord)

module.exports = router
