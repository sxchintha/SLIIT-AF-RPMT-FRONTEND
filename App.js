import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import './src/style/Primary.scss'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

import HomePage from './src/pages/homePage';
import StaffRegister from './src/components/staff/StaffRegister'

import App from './src/components/main';
import Header from './src/components/Header';
import CreateMarking from './src/pages/MarkingSchemes/createMarking'
import MarkingSchemes from './src/pages/MarkingSchemes/markingSchemes'
import UserManagement from './src/pages/userManagement'
import AdminsManagement from './src/pages/UserManagement/admins'
import NewAdmin from './src/pages/UserManagement/newAdmin'
import AcceptTopics from './src/components/staff/AcceptTopics';


createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <div>
            {/* <Header /> */}
            <Routes>
                <Route exact path='/' element={< App />} />
                <Route path='/home' element={<HomePage />} />


                <Route path='/register' element={<StaffRegister />} />
                <Route path='/accepttopics' element={<AcceptTopics />} />


                <Route path='/usermanagement' element={< UserManagement />} />
                <Route path='/admins' element={< AdminsManagement />} />
                <Route path='/admins/new' element={< NewAdmin />} />
                <Route path='/markingschemes' element={< MarkingSchemes />} />
                <Route path='/markingschemes/create' element={<CreateMarking />} />
            </Routes>

        </div>
    </BrowserRouter>
)
