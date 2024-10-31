import React from "react";

export default function Header({name, date = null}) {
    return (
    <div className="grid grid-cols-3 py-3 border-b ps-4 border-slate-700/60">
            <h1 className="text-2xl font-bold">{name}</h1>
            {date != null && <p className="flex items-center ms-20">{date}</p>}
            <div className="flex items-center h-full col-start-3 ml-auto me-8">
                <img src="../img/avatar.PNG" alt="" 
                style={{marginRight: '1rem', width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover'}} />
                <p>Trần Võ Lâm</p>
            </div>
    </div>
    )
}