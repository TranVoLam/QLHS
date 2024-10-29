const db = require('../../config/database')

exports.getStudentRecords = async(req_body) => {
    // const query = 'SELECT * FROM Students'
    // const result = await db.executeQuery(query)
    const sp = 'sp_select_class_id_Students'
    const output = {
        count: db.types.int
    }
    const params = {
        class_id: {
            type: db.types.varchar(4),
            value: req_body.data
        }
    }
    const result = await db.executeSP(sp, params)
    // console.log(`model: ${Array.isArray(result)} - result: ${reuslt}`)
    return result
}

exports.postStudentRecord = async(req_body) => {
    const regexPhone = /^(0[1-9]{1}[1-9]{8}[1-9]?)$|^\s*$/
    const regexFullName = /^[A-Za-zĐđáàảãạâấầẩẫậăắằẳẵặóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựíìỉĩịếềểễệýỳỷỹ\s]+$/
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^$/

    const checkError = {}
    if(req_body.full_name == "")
        checkError.full_name = '"Họ và tên" không được để trống!'
    else if (!regexFullName.test(req_body.full_name)) 
        checkError.full_name = '"Họ và tên" chỉ chứa chữ cái!'
    if (req_body.date_of_birth == '')
        checkError.date_of_birth = 'Chọn ngày sinh!'
    if (req_body.gender == '')
        checkError.gender = 'Chọn giới tính!'
    if (req_body.nationality == '')
        checkError.nationality = 'Chọn quốc tịch!'
    if (!regexEmail.test(req_body.email))
        checkError.email = '"Email" phải đúng định dạng example@gmail.com!'
    if (!regexPhone.test(req_body.phone))
        checkError.phone = '"Số điện thoại" phải là số hợp lệ!'
    if (req_body.class_id == '')
        checkError.class_id = 'Chọn lớp học!'
    if(Object.keys(checkError).length == 0) {
        const sp = "sp_insert_Students"
        const params = {
            full_name: {
                type: db.types.nvarchar(50),
                value: req_body.full_name
            },
            date_of_birth: {
                type: db.types.date,
                value: req_body.date_of_birth
            },
            gender: {
                type: db.types.nvarchar(3),
                value: req_body.gender
            }, 
            nationality: {
                type: db.types.nvarchar(50),
                value: req_body.nationality
            },
            ethnicity: {
                type: db.types.nvarchar(12),
                value: req_body.ethnicity
            },
            religion: {
                type: db.types.nvarchar(50),
                value: req_body.religion
            }, 
            email: {
                type: db.types.varchar(40),
                value: req_body.email
            },
            phone: {
                type: db.types.varchar(11),
                value: req_body.phone
            },
            class_id: {
                type: db.types.varchar(4),
                value: req_body.class_id
            }
        }
        await db.executeSP(sp, params)
    } else {
        return checkError
    }
}