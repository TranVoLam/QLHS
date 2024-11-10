import React, { useState, useEffect } from "react";
import axios from 'axios'
import Header from "../layout/header";
import "../../css/behavior/behavior.css"
import Popup from "./popup";

export default function BehaviorTable() {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const dateNow = `Ngày ${day} tháng ${month} năm ${year}`

    const [time, setTime] = useState(new Date())
    const [class_id, setClassId] = useState('')
    const [data, setData] = useState([])
    const [activtePopup, setActivePopup] = useState(null)
    const [student_id, setStudentId] = useState('')
    const [full_name, setFullName] = useState('')

    const hours = String(time.getHours()).padStart(2,0)
    const minutes = String(time.getMinutes()).padStart(2,0)
    const seconds = String(time.getSeconds()).padStart(2,0)

    const timeNow = `${hours}:${minutes}:${seconds}`

    const combine = `${timeNow}, ${dateNow}`

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => intervalId
    }, [time])

    useEffect(() => {
        const selectAPI = async () => {
            try {
                const response = (await axios.post('/api/students', {
                    data: class_id
                })).data
                setData(response)      
            } catch (err) {
                console.log(`${err}`)
            }
        }
        selectAPI()
    }, [class_id])

    const handleClickAllStudents = () => {
        setClassId('')
    }
    
    const handleSelectClass = (e) => {
        setClassId(e.target.value)
    }


    const showPopupGood = (student_id, full_name) => {
        setFullName(full_name)
        setStudentId(student_id)
        setActivePopup(1)
    }
    
    const showPopupBad = (student_id, full_name) => {
        setFullName(full_name)
        setStudentId(student_id)
        setActivePopup(2)
    }
    const closePopup = () => setActivePopup(null)
    
    
    
    return (
        <>
            <Header name={'Điểm danh hằng ngày'} date={combine}/>
            <div className="relative grid grid-cols-12 mt-3 ml-5">
                {activtePopup == 1 && <Popup handleClick={closePopup} apiEndpoint_1="api/activities/behaviorsgood" 
                apiEndpoint_2="api/activities/activitiesgood" text={`Ghi nhận hoạt động của ${full_name}`} 
                student_id={student_id}/>}
                {activtePopup == 2 && <Popup handleClick={closePopup} apiEndpoint_1="api/activities/behaviorsbad" 
                apiEndpoint_2="api/activities/activitiesbad" text={`Xác nhận vi phạm của ${full_name}`} 
                student_id={student_id}/>}
                <div className="col-span-2">
                    <button className="class" onClick={handleClickAllStudents}>Tất cả học sinh</button>
                    <select className="class" defaultValue={""} onChange={handleSelectClass} >
                        <option value="" hidden disabled>Lớp 6</option>
                        <option value="6A">6A</option>
                        <option value="6B">6B</option>
                        <option value="6C">6C</option>
                        <option value="6D">6D</option>
                        <option value="6E">6E</option>
                    </select>
                    <select className="class" defaultValue={""} onChange={handleSelectClass}>
                    <option value="" hidden disabled>Lớp 7</option>
                        <option value="7A">7A</option>
                        <option value="7B">7B</option>
                        <option value="7C">7C</option>
                        <option value="7D">7D</option>
                        <option value="7E">7E</option>
                    </select>
                    <select className="class"  defaultValue={""} onChange={handleSelectClass}>
                    <option value="" hidden disabled>Lớp 8</option>
                        <option value="8A">8A</option>
                        <option value="8B">8B</option>
                        <option value="8C">8C</option>
                        <option value="8D">8D</option>
                        <option value="8E">8E</option>
                    </select>
                    <select className="class" defaultValue={""} onChange={handleSelectClass}>
                    <option value="" hidden disabled>Lớp 9</option>
                        <option value="9A">9A</option>
                        <option value="9B">9B</option>
                        <option value="9C">9C</option>
                        <option value="9D">9D</option>
                        <option value="9E">9E</option>
                    </select>
                </div>
                <div className="col-span-10 mr-8 h-80 ms-4">
                    <div className="grid grid-cols-6 mb-6 font-semibold text-md ms-5">
                    {class_id == '' ? (<p className="col-start-1">Tất cả học sinh</p>) 
                    : (<p className="col-start-1">Lớp hiện tại: {class_id}</p>)}
                    <p className="col-start-2 ms-16">Sĩ số: {data.length}</p>
                    <p className="col-start-3 ms-16">Vắng: </p>
                    </div>
                    <div className="w-full overflow-auto" id="table">
                        <table className="w-full table-auto" id="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã học sinh</th>
                                    <th>Họ và tên</th>
                                    <th>Giới tính</th>
                                    <th>Ngày sinh</th>
                                    {class_id == '' && <th>Lớp học</th>}
                                    <th>Điểm danh</th>
                                    <th>Hoạt động tốt</th>
                                    <th>Vi phạm</th>
                                    <th>Lý do</th>
                                    <th>Ghi chú</th>
                                    <th>Điểm hạnh kiểm</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {data.map((student, index) =>
                                (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.student_id}</td>
                                    <td>{student.full_name}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.date_of_birth.slice(0,10)}</td>
                                    <td>{student.class_id}</td>
                                    <td className="text-center">
                                    <button type="button" className="noted" 
                                        >Điểm danh</button>
                                    </td>
                                    <td className="text-center">
                                        <button type="button" className="noted" 
                                        onClick={() => showPopupGood(student.student_id, student.full_name)}>
                                            Ghi nhận</button>
                                    </td>
                                    <td className="text-center">
                                        <button type="button" className="noted" 
                                        onClick={() => showPopupBad(student.student_id, student.full_name)}>
                                            Vi phạm</button>
                                    </td>
                                    <td className="text-center">
                                        <button type="button" className="noted">Ghi</button>
                                    </td>
                                    <td className="text-center">
                                        <button type="button" className="noted">Ghi</button>
                                    </td>
                                    <td></td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}