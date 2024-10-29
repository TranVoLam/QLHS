const { json } = require('express')
const recordModel = require('./recordModel')

exports.getStudentRecords = async(req, res) => {
    const result = await recordModel.getStudentRecords(req.body)
    // console.log(`controller: ${Array.isArray(result)} - result: ${result}`)
    return res.status(200).json(result)

}

exports.postStudentRecord = async(req, res) => {
    const info = req.body
    console.log(info)
    try {
        const result = await recordModel.postStudentRecord(info)
        return res.status(200).json(result)
    } catch(err) {
        console.log(`post: ${err}`)
    }
}