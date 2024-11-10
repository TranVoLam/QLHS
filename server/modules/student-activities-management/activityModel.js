const db = require('../../config/database')

exports.getActivities = async (sp) => {
    try {
        const result = await db.executeSP(sp)
        return result
    } catch (err) {
        console.log(`${err}`)
    }
}


exports.getBehaviors = async (req_body, sp) => {
    const params = {
        student_id : {
            type: db.types.varchar(10),
            value: req_body.student_id
        }
    }
    try {
        const result = await db.executeSP(sp, params)
        return result
    } catch (err) {
        console.log(`M - getBehaviors: ${err}`)
    }
}

exports.postBehaviors = async (req_body) => {
    const params = {
        student_id: {
            type: db.types.varchar(10),
            value: req_body.student_id
        },
        activity_id: {
            type: db.types.varchar(10),
            value: req_body.activity_id
        }
    }
    const sp = 'sp_insert_Behaviors'
    try {
        await db.executeSP(sp, params)
    } catch (err) {}
}

exports.deleteBehaviors = async (req_body) => {
    const params = {
        behavior_id: {
            type: db.types.int,
            value: req_body.behavior_id
        },
    }
    const sp = 'sp_delete_Behaviors'
    try {
        await db.executeSP(sp, params)
    } catch (err) {}
}
