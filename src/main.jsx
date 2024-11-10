import React from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './components/root';
import StudentRecords from './components/studentRecords';
import Form from './components/add-student/form';
import ScoreTable from './components/post_score/ScoreTable';
import WeeklyConductTable from './components/weekly-conduct/weeklyConductTable';
import BehaviorTable from './components/behavior/behaviorTable';

const route = createBrowserRouter([{
    path: '/',
    element: <Root/>,
    children: [
        {
            index: true,
            element: <StudentRecords/>
        },
        {
            path: '/add',
            element: <Form/>
        },
        {
            path: '/score',
            element: <ScoreTable/>
        },
        {
            path: '/behavior',
            element: <BehaviorTable/>
        },
        {
            path: '/weekly-conduct',
            element: <WeeklyConductTable/>
        }
    ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={route}></RouterProvider>
)
