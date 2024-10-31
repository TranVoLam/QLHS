const scoreModel = require('./scoreModel')

exports.getScores = async(req,res) => {
    try {
        const result = await scoreModel.getScores(req.body)  
        return res.json(result)
    } catch(err) {
        console.log(`scoreController: ${err}`)
    }
}

exports.updateScore = async(req,res) => {
    try {
        // await scoreModel.updateScore(req.body)
        console.log(req.body)
    } catch(err) {
        console.log(`controller update: ${err}`)
    }
}