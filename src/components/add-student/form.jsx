import { useEffect, useState } from "react";

import axios from "axios";
import Header from "../layout/header";
import "../../css/add-student/form.css"


export default function Form() {

    

    const [generalInfos, setGeneralInfos] = useState({
        full_name: '',
        date_of_birth: '',
        gender: "Nữ",
        nationality: "Việt Nam",
        ethnicity: '',
        religion: '',
        enrollment_year: '',
        email: '',
        phone: '',
        class_id: "6A"
    })

    // const [healthInfos, setHealthInfos] = useState({
    //     medical_history: '',
    //     health: '',
    //     vaccine_info: '',
    //     disability_status: '',
    //     allergies: '',
    //     injuries: '',
    //     notes: ''
    // })

    // const [geographicInfos, setGeographicInfos] = useState({
    //     provice_city: '',
    //     commune_ward: '',
    //     district: '',
    //     village_neighborhood_street: '',
    //     house_number: '',
    //     place_of_birth: '',
    //     hometown: '',
    //     priority_area: ''
    // })

    // const [abilityInfos, setAbilityInfos] = useState({
    //     subject_preferences: '',
    //     achievement: '',
    //     grade_skipped: '',
    //     talents: ''
    // })

    
    const postData = async (e) => {        
        try {
            const response = await axios.post('/api/students/post', generalInfos)
            
            if(response.data == '') {
                alert('OK')
            } else if(response.data != '') {
                const data = Object.values(response.data)
                const result = data.join('\n')
                alert(result)
            }
            
        } catch(err) {
            console.log(err)
        }
    }

    const postGeneralInfos = (e) => {
        const { name, value } = e.target
        setGeneralInfos({...generalInfos, [name]: value})
    }


    return (
        <>
            <Header name={"Thêm học sinh"}/>
            <div className="mt-4">
                <form>
                    <div>
                        <h1 className="text-lg font-bold ms-3">Thông tin học sinh</h1>
                        <div className="p-1 mx-4 my-6">
                            <div className="grid grid-cols-4">
                                <div>
                                    <label htmlFor="full_name" className="text-md">Họ và tên
                                        <span className="text-red-500"> *</span></label>
                                    <br />
                                    <input type="text" name="full_name" id="full_name" required 
                                    placeholder="Nhập họ và tên" maxLength={50} className="normal"
                                    onChange={postGeneralInfos} onBlur={postGeneralInfos}/>
                                </div>
                                <div>
                                    <label htmlFor="date_of_birth">Ngày sinh
                                        <span className="text-red-500"> *</span></label>
                                    <br />
                                    <input type="date" name="date_of_birth" id="date_of_birth" required
                                    className="normal" onChange={postGeneralInfos} onBlur={postGeneralInfos}/>
                                </div>
                                <div>
                                    <label htmlFor="gender">Giới tính
                                        <span className="text-red-500"> *</span></label>
                                    <br />
                                    <select name="gender" id="gender" required
                                    onChange={postGeneralInfos} onBlur={postGeneralInfos}>
                                        <option value="Nữ" className="text-red-600">Nữ</option>
                                        <option value="Nam" className="text-blue-600">Nam</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="nationality">Quốc tịch
                                        <span className="text-red-500"> *</span></label>
                                    <br />
                                    <select name="nationality" id="nationality" onChange={postGeneralInfos}
                                    onBlur={postGeneralInfos}>
                                        <option value="Việt Nam" className="text-red-600">Việt Nam</option>
                                        <option value="Mỹ">American (Mỹ)</option>
                                        <option value="Anh">British (Anh)</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Đức">German (Đức)</option>
                                        <option value="Trung Quốc">Trung quốc</option>
                                        <option value="Nhật Bản">Nhật Bản</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 mt-8">
                                <div>
                                    <label htmlFor="ethnicity">Dân tộc</label>
                                    <br />
                                    <input type="text" name="ethnicity" placeholder="Dân tộc..." id="ethnicity" 
                                    maxLength={12} onChange={postGeneralInfos} className="normal"
                                    onBlur={postGeneralInfos}/>
                                </div>
                                <div>
                                    <label htmlFor="religion">Tôn giáo</label>
                                    <br />
                                    <input type="text" name="religion" id="religion" placeholder="Tôn giáo..."
                                    maxLength={50} onChange={postGeneralInfos} className="normal"
                                    onBlur={postGeneralInfos}/>
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <br />
                                    <input type="email" name="email" id="email" placeholder="example@gmail.com"
                                    maxLength={40} onChange={postGeneralInfos} className="normal"
                                    onBlur={postGeneralInfos}/>
                                </div>
                                <div>
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <br />
                                    <input type="tel" name="phone" id="phone" placeholder="Số cá nhân"
                                    maxLength={11} onChange={postGeneralInfos} className="normal"
                                    onBlur={postGeneralInfos}/>
                                </div>
                            </div>
                            <div className="mt-5">
                                <label htmlFor="class_id">Lớp học <span className="text-red-500"> *</span></label>
                                <br />
                                <select name="class_id" id="class_id"
                                onChange={postGeneralInfos} onBlur={postGeneralInfos}>
                                    <option value="6A">6A</option>
                                    <option value="6B">6B</option>
                                    <option value="6C">6C</option>
                                    <option value="6D">6D</option>
                                    <option value="6E">6E</option>
                                    <option value="6G">6G</option>
                                </select>
                            </div>
                        </div>
                        <button type="button" id="save" onClick={postData}>Lưu</button>
                    </div>
                </form>
            </div>
        </>
    )
}