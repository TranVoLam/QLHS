import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import '../css/root.css'
import Sidebar from './layout/sidebar'

export default function Root() {
    return (
        <div className='flex w-screen h-screen'>
                <Sidebar/>
            <div className='w-full h-full'>
                <Outlet/>
            </div>
        </div>
    )
}