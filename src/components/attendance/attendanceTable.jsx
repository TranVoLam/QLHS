import React, { useState, useEffect } from "react";
import axios from 'axios'
import Header from "../layout/header";

export default function AttendanceTable() {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    const dateNow = `Ngày ${day} tháng ${month} năm ${year}`

    const [date, setDate] = useState(dateNow)
    const [time, setTime] = useState(new Date())


    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => intervalId
    }, [time])

    const hours = String(time.getHours()).padStart(2,0)
    const minutes = String(time.getMinutes()).padStart(2,0)
    const seconds = String(time.getSeconds()).padStart(2,0)

    const timeNow = `${hours}:${minutes}:${seconds}`

    const combine = `${timeNow}, ${date}`
    return (
        <>
            <Header name={'Điểm danh hằng ngày'} date={combine}/>
        </>
    )
}