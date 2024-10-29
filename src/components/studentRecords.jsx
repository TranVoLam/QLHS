import React, { useState, useEffect } from "react";
import axios from 'axios'
import Header from "./layout/header";

export default function StudentRecords() {
    const [data, setData] = useState([])
    const [class_id_6, setClassId6] = useState('')
    const [class_id_7, setClassId7] = useState('')
    const [class_id_8, setClassId8] = useState('')
    const [class_id_9, setClassId9] = useState('')

    const callAPI = async(class_id) => {
        const response = await axios.post('/api/students', {
            data: class_id
        })
        
        setData(response.data)
    }

    const handleSelectClass = (e) => {
        setClassId(e.target.value)
    }

    const handleSelectClass6 = (e) => {
        setClassId6(e.target.value)
        callAPI(e.target.value)
    }

    const handleSelectClass7 = (e) => {
        setClassId7(e.target.value)
        callAPI(e.target.value)
    }

    const handleSelectClass8 = (e) => {
        setClassId8(e.target.value)
        callAPI(e.target.value)
    }

    const handleSelectClass9 = (e) => {
        setClassId9(e.target.value)
        callAPI(e.target.value)
    }

    const handleClick = (e) => {
        callAPI('')
    }

    useEffect(() => {
        callAPI('')
    } , [])


    return (
        <>
        <Header name={'Hồ sơ học sinh'}/>
        <div className="grid grid-cols-12 mt-3 ms-5">
            <div className="col-span-2">
                <button className="class" onClick={handleClick}>Tất cả học sinh</button>
                <select className="class" value={class_id_6} onChange={handleSelectClass6} >
                    <option value="" hidden disabled>Lớp 6</option>
                    <option value="6A">6A</option>
                    <option value="6B">6B</option>
                    <option value="6C">6C</option>
                    <option value="6D">6D</option>
                    <option value="6E">6E</option>
                </select>
                <select className="class" value={class_id_7} onChange={handleSelectClass7}>
                <option value="" hidden disabled>Lớp 7</option>
                    <option value="7A">7A</option>
                    <option value="7B">7B</option>
                    <option value="7C">7C</option>
                    <option value="7D">7D</option>
                    <option value="7E">7E</option>
                </select>
                <select className="class" value={class_id_8} onChange={handleSelectClass8}>
                <option value="" hidden disabled>Lớp 8</option>
                    <option value="8A">8A</option>
                    <option value="8B">8B</option>
                    <option value="8C">8C</option>
                    <option value="8D">8D</option>
                    <option value="8E">8E</option>
                </select>
                <select className="class" value={class_id_9} onChange={handleSelectClass9}>
                <option value="" hidden disabled>Lớp 9</option>
                    <option value="9A">9A</option>
                    <option value="9B">9B</option>
                    <option value="9C">9C</option>
                    <option value="9D">9D</option>
                    <option value="9E">9E</option>
                </select>
            </div>
            <div className="col-span-10 mr-8 h-80 ms-4">
                <p className="mb-6 text-lg font-medium">Số học sinh: {data.length}</p>
                <div className="w-full overflow-auto" id="studentRecords">
                    <table className="w-full px-2 py-2 table-auto" id="studentRecords">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã học sinh</th>
                            <th>Họ và tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Quốc tịch</th>
                            <th>Dân tộc</th>
                            <th>Tôn giáo</th>
                            <th>Lớp</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Năm nhập học</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data != null && Array.isArray(data) ? data.map((student, index) => (
                        <tr key={student.student_id}>
                            <td>{index + 1}</td>
                            <td>{student.student_id}</td>
                            <td>{student.full_name}</td>
                            <td>{student.date_of_birth.slice(0,10)}</td>
                            <td>{student.gender}</td>
                            <td>{student.nationality}</td>
                            <td>{student.ethnicity}</td>
                            <td>{student.religion}</td>
                            <td>{student.class_id}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                            <td>{student.enrollment_year}</td>
                        </tr>
                        )) : ( <tr></tr>)}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}