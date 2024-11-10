const db = require('../../config/database')

exports.getStudentRecords = async(req_body) => {
    const sp = 'sp_select_class_id_Students'
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
    const regexFullName = /^[A-Za-zĐđáàảãạâấầẩẫậăắằẳẵặóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựíìỉĩịếềểễệýỳỷỹẻèéẹẽ\s]+$/
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^$/
    const regexDateOfBirth = /^\d{4}-\d{2}-\d{2}$/

    const checkError = {}
    if(req_body.full_name == "")
        checkError.full_name = '**HỌ VÀ TÊN** không được để trống!'
    else if(/^\s+$/.test(req_body.full_name))
        checkError.full_name = '**HỌ VÀ TÊN** Không chứa mỗi khoảng trắng'
    else if (!regexFullName.test(req_body.full_name)) 
        checkError.full_name = '**HỌ VÀ TÊN** chỉ chứa chữ cái!'
    if(req_body.ethnicity != '') {
        if(/^\s+$/.test(req_body.ethnicity)) {
            req_body.ethnicity.trim()
        }
        else if(!regexFullName.test(req_body.ethnicity))
                checkError.ethnicity = '**DÂN TỘC** chỉ chứa chữ cái' 
    }
    if(req_body.religion != '') {
        if(/^\s+$/.test(req_body.religion)) {
            req_body.religion.trim()
        }
        else if(!regexFullName.test(req_body.religion))
                checkError.religion = '**DÂN TỘC** chỉ chứa chữ cái' 
    }

    if (req_body.date_of_birth == '') {
        checkError.date_of_birth = 'Chọn ngày sinh!' 
    } else if (!regexDateOfBirth.test(req_body.date_of_birth))
        checkError.date_of_birth = '**NGÀY SINH** không có năm sinh quá 5 kí tự số'
    else if (!isOlderThan11(req_body.date_of_birth)) {
        checkError.date_of_birth = 'Học sinh phải đủ 11 tuổi trở lên'
    }

    if (req_body.gender == '')
        checkError.gender = 'Chọn giới tính!'
    if (req_body.nationality == '')
        checkError.nationality = 'Chọn quốc tịch!'

    if (!regexEmail.test(req_body.email)) 
        checkError.email = '**EMAIL** phải đúng định dạng example@gmail.com!'
    else req_body.email.trim()

    if (!regexPhone.test(req_body.phone))
        checkError.phone = '**SỐ ĐIỆN THOẠI** phải là số hợp lệ!'
    else req_body.phone.trim()
    if (req_body.class_id == '')
        checkError.class_id = 'Chọn lớp học!'
    if(Object.keys(checkError).length == 0) {
        const sp = "sp_insert_Students"
        const params = {
            full_name: {
                type: db.types.nvarchar(50),
                value: req_body.full_name.trim().replace(/\s+/g, " ")
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
                value: req_body.ethnicity.trim().replace(/\s+/g, " ")
            },
            religion: {
                type: db.types.nvarchar(50),
                value: req_body.religion.trim().replace(/\s+/g, " ")
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
        try {
            await db.executeSP(sp, params)
        } catch(err) {
            console.log(`post student: ${err}`)
        }
    } else {
        return checkError
    }
}


const isOlderThan11 = (date_of_birth) => {
    const today = new Date()
    const dateArray = date_of_birth.split('-').map(Number)
    let yearNow = today.getFullYear()
    let age = yearNow - dateArray[0]
    if (today.getMonth() < dateArray[1] || 
    (today.getMonth() == dateArray[1] && today.getDate() < dateArray[2]))
        age -= 1
    return age >= 11
}