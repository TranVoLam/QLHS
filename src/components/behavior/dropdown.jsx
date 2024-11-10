import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/behavior/dropdown.css"

export default function Dropdown({apiEndpoint, text, behavior, student_id, getActivityId}) {
    const [isSelected, setIsSelected] = useState(false)
    const [optionSelected, setOptionSelected] = useState(null)
    const [options, setOptions] = useState([])


    useEffect(() => {
        const selectAPI = async () => {
            try {
                const data = (await axios.post(apiEndpoint, {
                    student_id: student_id
                })).data
                setOptions(data)
            } catch (err) {
                console.log(err)
            }
        }
        selectAPI()
    }, [])

    const deleteAPI = async (behavior_id) => {
        try {
            console.log(behavior_id)
            await axios.post('api/activities/deleteBehaviors', {
                behavior_id: behavior_id
            })
        } catch (err) {
            console.log(`${err}`)
        }
    }

    const handleClickDropdown = () => {
        setIsSelected(!isSelected)
    }

    const handleClickSelect = (option) => {
        setIsSelected(!isSelected)
        setOptionSelected(option)
        if (!behavior)
            getActivityId(option.activity_id)
    }

    const handleClickDelete = (behavior_id) => {
        deleteAPI(behavior_id)
        setOptions(prevOptions => prevOptions.filter(option => option.behavior_id != behavior_id))
    }

    return (
        <>
            <div className="dropdown" onClick={handleClickDropdown}>
                <div className="dropdown_header">
                    {optionSelected ? optionSelected.activity_name : 
                    (behavior && options.length > 0 ?  `Có ${options.length} ghi nhận` : text )}
                </div>
                {options.length > 0 && isSelected && <div className="z-10 dropdown_list">
                    {options.map((option, index) => (
                        <div key={index} className="grid grid-cols-6 mt-2 mb-2">
                        <span onClick={() => {
                            if (!behavior) 
                                handleClickSelect(option) 
                            }} className="col-span-5 dropdown_option">
                            {option.activity_name}
                        </span>
                        {behavior && <button type="button" className="col-span-1 btn_delete" 
                        onClick={() => handleClickDelete(option.behavior_id)}>
                            Xoá</button>}
                        </div>
                    ))}
                </div>}
            </div>
        </>
    )
}