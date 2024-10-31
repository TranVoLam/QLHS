import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import Header from "../layout/header";


export default function ScoreTable() {

    const styleInputCell = {
        width: '100%',
        border: 'none',
        outline: 'none',
    }

    const [data, setData] = useState([])
    const [class_id, setClassId] = useState('')
    const [subject_id, setSubjectId] = useState('t6')
    const [text, setText] = useState('')
    const [edit, setEdit] = useState(false)
    const [student_id, SetStudentId] = useState('')
    const [save, setSave] = useState(false)
    const [score, setScore] = useState({
        s_1_1: '',
        s_1_2: '',
        s_1_3: '',
        S_2: '',
        s_3: '',
        subject_id: subject_id,
        student_id: ''
    })



    const selectAPI = async () => {
        try {
            const response = await axios.post('/api/scores', {
                class_id: class_id,
                subject_id: subject_id
            })
            setData(response.data)
        } catch(err) {}
    }

    useEffect(() => {
        selectAPI()
    }, [])

    useEffect(() => {
        selectAPI()
    }, [subject_id, class_id])

    useEffect(() => {
        if (save) {
            updateAPI()
            selectAPI()
        }
    }, [save])

    useEffect(() => {
        if (student_id != '') {
            setScore({...score, student_id: student_id})
            setSave(true)
        }
    }, [student_id])



    const updateAPI = async() => {
        try {
            setSave(false)
            setText("")
            await axios.post('api/scores/update', score)
        } catch(err) {}
    }

    useEffect(() => {
        console.log(save)
    }, [save])
    useEffect(() => {
        if (text != "")
            console.log(text)
    }, [text])

    const handleChangeCells = (e) => {
        const { name, value } = e.target
        setScore({...score, [name]: value})
    }

    const handleClickSave = () => {
        if (!isNaN(text)) {
            const i = parseInt(text) - 1
            if (i >= 0 && i < data.length) {
                SetStudentId(data[i].student_id)
            }
        }
        setEdit(false)
    }


    const handleClickAllStudents = () => {
        setClassId('')
    }

    const handleChangeSubject = (e) => {
        setSubjectId(e.target.value)
    }

    const handleChangeText = (e) => {
        setText(e.target.value)
    }

    const handleClickSetEdit = (e) => {
        if (edit) 
            {
                setEdit(false)
                setScore({
                    s_1_1: '',
                    s_1_2: '',
                    s_1_3: '',
                    S_2: '',
                    s_3: '',
                    subject_id: '',
                    student_id: ''
                })
            }
        else setEdit(true)
    }

    const handleSelectClass = (e) => {
        setClassId(e.target.value)
    }

    function handleNothing() {
        
    }

    return (
        <>
            <Header name={'Nhập điểm học sinh'}/>
            <div className="grid grid-cols-12 mt-3 ms-5">
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
                <div className="flex items-center mb-6">
                    <label htmlFor="subject_id" className="text-lg font-medium">Môn học:</label>
                    <select name="subject_id" id="subject_id" className="ms-4 h-7" 
                    onChange={handleChangeSubject}>
                        <option value="t6">Toán 6</option>
                        <option value="nv6">Ngữ văn 6</option>
                        <option value="nn1">Ngoại ngữ 1</option>
                        <option value="th">Tin học 6</option>
                        <option value="cn6">Công nghệ 6</option>
                    </select>
                    {class_id == '' ? (<p className="text-lg font-semibold ms-5">Tất cả học sinh</p>) 
                    : (<p className="text-lg font-semibold ms-5">Lớp hiện tại {class_id}</p>)}
                    <input type="text" style={{marginLeft: '32px'}} className="normal" 
                    placeholder="Nhập số cần sửa" disabled={edit} value={text} onChange={handleChangeText}/>
                    { !edit ? (<button type="button" className="ms-8" onClick={handleClickSetEdit}>Sửa</button>) : (
                        <button type="button" className="text-white bg-red-500 ms-8" onClick={handleClickSetEdit}
                        id ="cancel">
                            Huỷ</button>
                    )} 
                    { edit ? (<button type="button" className="bg-green-400 shadow-md shadow-green-500/50 ms-8 hover:bg-green-700" 
                    onClick={handleClickSave}>Lưu</button>) : (
                        <button type="button" className="ms-8" disabled id="dis">Lưu</button>
                    )} 
                </div>
                <div className="w-full overflow-auto" id="studentRecords">
                    <table className="w-full table-auto" id="studentRecords">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã học sinh</th>
                            <th>Họ và tên</th>
                            <th>Giới tính</th>
                            <th>Lớp học</th>
                            <th>Điểm hệ số 1 lần 1</th>
                            <th>Điểm hệ số 1 lần 2</th>
                            <th>Điểm hệ số 1 lần 3</th>
                            <th>Điểm hệ giữa kỳ </th>
                            <th>Điểm hệ cuối kỳ </th>
                            <th>Điểm hệ trung bình </th>
                            <th>Học kỳ</th>
                            <th>Năm học</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {data != null && Array.isArray(data) ? data.map((score, index) => 
                        (<tr key={index} style={edit && text == (index + 1) ? {outline: '1px solid blue'} : {outline: 'none'}}>
                            <td>{index + 1}</td>
                            <td>{score.student_id}</td>
                            <td>{score.full_name}</td>
                            <td>{score.gender}</td>
                            <td>{score.class_id}</td>
                            <td>{edit && text == (index + 1) ? (<input name="s_1_1" style={styleInputCell}
                            defaultValue={score.f_score_coefficient_1} onChange={handleChangeCells}/>) 
                            : (<span>{score.f_score_coefficient_1}</span>)}
                            </td>
                            <td>{edit && text == (index + 1) ? (<input name="s_1_2" style={styleInputCell}
                            defaultValue={score.s_score_coefficient_1} onChange={handleChangeCells}/>) 
                            : (<span>{score.s_score_coefficient_1}</span>)}</td>
                            <td>{edit && text == (index + 1) ? (<input name="s_1_3" style={styleInputCell}
                            defaultValue={score.t_score_coefficient_1} onChange={handleChangeCells}/>) 
                            : (<span>{score.t_score_coefficient_1}</span>)}</td>
                            <td>{edit && text == (index + 1) ? (<input name="s_2" style={styleInputCell}
                            defaultValue={score.score_coefficient_2} onChange={handleChangeCells}/>) 
                            : (<span>{score.score_coefficient_2}</span>)}</td>
                            <td>{edit && text == (index + 1) ? (<input name="s_3" style={styleInputCell}
                            defaultValue={score.score_final} onChange={handleChangeCells}/>) 
                            : (<span>{score.score_final}</span>)}</td>
                            <td>{score.avarage_score}</td>
                            <td>{score.term}</td>
                            <td>{score.academic_year}</td>
                        </tr>)) : <tr></tr>}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}