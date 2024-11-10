const Router = require("express").Router()
const activityController = require("./activityController")


Router.post("/activitiesgood", async (req, res) => {
    const result = await activityController.getActivities('sp_select_good_Activities')
    return res.json(result)    
})

Router.post("/activitiesbad",  async (req, res) => {
    const result = await activityController.getActivities('sp_select_bad_Activities')
    return res.json(result)    
})
Router.post("/behaviorsgood", async (req, res) => {
    const result = await activityController.getBehaviors(req.body,'sp_select_good_Behaviors')
    return res.json(result)    
})
Router.post("/behaviorsbad", async (req, res) => {
    const result = await activityController.getBehaviors(req.body, 'sp_select_bad_Behaviors')
    return res.json(result)    
})

Router.post("/postBehaviors", activityController.postBehaviors)

Router.post("/deleteBehaviors", activityController.deleteBehaviors)

module.exports = Router
