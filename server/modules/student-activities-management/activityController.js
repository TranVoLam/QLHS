const activityModel = require("./activityModel")

exports.getActivities = async (sp) => {
    try {
        const result = await activityModel.getActivities(sp)
        return result
    } catch (err) {
        console.log(`C - getActivities: ${err}`)
    }
}

exports.getBehaviors = async (req_body, sp) => {
    try {
        const result = await activityModel.getBehaviors(req_body, sp)
        return result
    } catch (err) {
        console.log(`C - getBehaviors: ${err}`)
    }
}

exports.postBehaviors = async (req, res) => {
    try {
        await activityModel.postBehaviors(req.body)
    } catch (err) {

    }
}

exports.deleteBehaviors = async (req, res) => {
    try {
        await activityModel.deleteBehaviors(req.body)
    } catch (err) {

    }
}