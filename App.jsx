import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './src/components/main';
import Header from './src/components/Header';
import CreateMarking from './src/pages/createMarking'
import HomePage from './src/pages/homePage';
import Sidebar from './src/components/Sidebar';
import StaffRegister from './src/components/staff/StaffRegister'


createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <div>
            {/* <Header /> */}
            
            <Routes>
                <Route exact path='/' element={< App />} />
                    <Route path='/marking-schemes' element={< App />} >
                    <Route path='create' element={<CreateMarking />} />

                </Route>
                <Route path='/home' element={<HomePage/>}>

                </Route>
                    <Route path='/register' element={<StaffRegister />} />
            </Routes>

        </div>
    </BrowserRouter>
)
