import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <div className='w-48 h-full bg-gray-600/80' >
        <Link to='/' className= "link">Hồ sơ học sinh</Link>
        <Link to='/add' className="link">Thêm học sinh</Link>
        <Link to='/score' className="link">Nhập điểm học sinh</Link>
        <Link to='/behavior' className="link">Điểm danh học sinh</Link>
        <Link to='/weekly-conduct' className='link'>Hạnh kiểm tuần</Link>
        </div>
    )
}