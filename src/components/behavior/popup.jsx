import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/behavior/popup.css"
import Dropdown from "./dropdown";

export default function Popup({handleClick, apiEndpoint_1, apiEndpoint_2, text, student_id}) {

    const [activity_id, setActivityId] = useState("")
    const [save, setSave] = useState(false)

    const getActivityId = (a) => {
        setActivityId(a)
    }

    useEffect(() => {
        if (activity_id != '')
            setSave(true)
    }, [activity_id])

    const insertAPI = async () => {
        try {
            await axios.post("api/activities/postBehaviors", {
                student_id: student_id,
                activity_id: activity_id
            })
        } catch (err) {
            console.log(`${err}`)
        }
    }

    const handleClickSave = async () => {
        insertAPI()
        handleClick()
    }

    return (
        <>
            <div className="popup">
                <div className="grid w-full grid-cols-7 mb-3">
                    <span className="col-span-6">{text}</span>
                    <button id="btn_close" className="col-span-1 justify-self-end" onClick={handleClick}>X</button>
                </div>
                <Dropdown apiEndpoint={apiEndpoint_1} text="Không có ghi nhận" behavior={true} student_id={student_id}/>
                <Dropdown apiEndpoint={apiEndpoint_2} text="Chọn 1 hoạt động" behavior={false} getActivityId={getActivityId} />
                <div className="flex justify-center">
                    <button type="button" id="btn_save" onClick={handleClickSave} disabled={!save}>Lưu</button>
                </div>
            </div>
        </>
    )
}

