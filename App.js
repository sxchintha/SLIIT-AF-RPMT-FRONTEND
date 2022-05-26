import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min'
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

import './src/style/Primary.scss'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

import HomePage from './src/pages/homePage';
import StudentManagement from './src/pages/UserManagement/students'

import StaffRegister from './src/components/staff/StaffRegister'
import StaffManagement from './src/pages/UserManagement/staff'

import App from './src/components/main';
import Header from './src/components/Header';
import CreateMarking from './src/pages/MarkingSchemes/createMarking'
import MarkingSchemes from './src/pages/MarkingSchemes/markingSchemes'
import UserManagement from './src/pages/userManagement'
import AdminsManagement from './src/pages/UserManagement/admins'
import NewAdmin from './src/pages/UserManagement/newAdmin'
import AcceptTopics from './src/components/staff/AcceptTopics';

import NewPanel from './src/pages/Panels/newPanel'
import PanelManagement from './src/pages/Panels/panels'
import StudentDashboard from "./src/pages/studentDashboard";
import GroupCard from "./src/components/GroupDetails/GroupDetails";


createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <div>
            {/* <Header /> */}
            <Routes>
                <Route exact path='/' element={< App />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/students' element={<StudentManagement />} />

                <Route path='/staff' element={<StaffManagement />} />
                <Route path='/register' element={<StaffRegister />} />
                <Route path='/accepttopics' element={<AcceptTopics />} />


                <Route path='/usermanagement' element={< UserManagement />} />
                <Route path='/admins' element={< AdminsManagement />} />
                <Route path='/admins/new' element={< NewAdmin />} />
                <Route path='/markingschemes' element={< MarkingSchemes />} />
                <Route path='/markingschemes/create' element={<CreateMarking />} />

                <Route path='/panels' element={<PanelManagement />} />
                <Route path='/panels/new' element={<NewPanel />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/group" element={<GroupCard />} />  

            </Routes>

        </div>
    </BrowserRouter>
)


