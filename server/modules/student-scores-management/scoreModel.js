const db = require('../../config/database')

exports.getScores = async(req_body) => {
    const params = {
        class_id: {
            type: db.types.varchar(4),
            value: req_body.class_id
        }, 
        subject_id: {
            type: db.types.varchar(5),
            value: req_body.subject_id
        }
    }
    const sp = 'sp_select_Scores'
    try {
        const result = await db.executeSP(sp, params)
        return result
    } catch(err) {
        console.log(`sp score: ${err}`)
    }
}

exports.updateScore = async(req_body) => {
    try {
        const params = {
            s_1_1: {
                type: db.types.decimal,
                value: req_body.f_score_coefficient_1 
            },
            s_1_2: {
                type: db.types.decimal,
                value: req_body.s_score_coefficient_1
            },
            s_1_3: {
                type: db.types.decimal,
                value: req_body.t_score_coefficient_1
            },
            S_2: {
                type: db.types.decimal,
                value: req_body.score_coefficient_2
            },
            s_3: {
                type: db.types.decimal,
                value: req_body.score_final
            }, 
            subject_id: {
                type: db.types.varchar(5),
                value: req_body.subject_id
            },
            student_id: {
                type: db.types.varchar(10),
                value: req_body.student_id
            }
        }

        const sp = 'sp_update_score'
        await db.executeSP(sp, params)
    } catch(err) {
        console.log(`update score: ${err}` )
    }
}