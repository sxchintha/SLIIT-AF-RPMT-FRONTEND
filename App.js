import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min'
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

import "./src/style/Primary.scss";

// import { AuthProvider } from "./src/context/AuthProvider";

import "./src/style/Dashboard.css";
import "./src/style/AdminProfile.css";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import HomePage from "./src/pages/homePage";
import StudentManagement from "./src/pages/UserManagement/students";

import StaffRegister from "./src/components/staff/StaffRegister";
import StaffManagement from "./src/pages/UserManagement/staff";
import StaffProfile from "./src/components/staff/StaffProfile";

import App from "./src/components/main";
import Header from "./src/components/Header";

import CreateMarking from "./src/pages/MarkingSchemes/createMarking";
import MarkingSchemes from "./src/pages/MarkingSchemes/markingSchemes";
import UpdateMarking from "./src/pages/MarkingSchemes/updateMarking";

import CreateSubmission from "./src/pages/Submissions/newSubmission";
import SubmissionManagement from "./src/pages/Submissions/submissions";
import UpdateSubmission from "./src/pages/Submissions/updateSubmission";

import UserManagement from "./src/pages/userManagement";
import AdminsManagement from "./src/pages/UserManagement/admins";
import NewAdmin from "./src/pages/UserManagement/newAdmin";

import AdminDashboard from "./src/pages/admin/adminDashboard";
import AdminProfile from "./src/pages/admin/adminProfile";
import AdminProfileUpdate from "./src/pages/admin/adminUpdate";
import AdminPassChange from "./src/pages/admin/changePassword";

import RequestSupervisor from "./src/components/staff/RequestSupervisor";

import NewPanel from "./src/pages/Panels/newPanel";
import PanelManagement from "./src/pages/Panels/panels";
import PanelDetails from "./src/pages/Panels/panelDetails";
import EditPanel from "./src/pages/Panels/editPanel";

import StudentGroups from "./src/pages/StudentGroups/groupManagement";

import StudentDashboard from "./src/pages/studentDashboard";
import GroupCard from "./src/components/GroupDetails/GroupDetails";
import StudentRegsiter from "./src/pages/Student/studentRegister";
import GroupRegister from "./src/pages/Student/groupRegister";
import MyGroup from "./src/pages/Student/groupDetails";
import SupervisorRequest from "./src/pages/Student/supervisorRequest";
import CoSupervisorRequest from "./src/pages/Student/coSupervisorRequest";
import CoSupervisorStatus from "./src/components/CoSupervisorStatus/coSupervisorStatus";
import Submissions from "./src/components/SubmissionDetails/submissionItems";
import SubmissionDetails from "./src/components/SubmissionDetails/submissionDetails";
import StudentProfile from "./src/pages/Student/studentProfile";
import RequestCoSupervisor from "./src/components/staff/RequestCoSupervisor";
import UpdateStaffProfile from "./src/components/staff/UpdateStaffDetails";

import StudentLogin from "./src/pages/UserManagement/login"
import RequireAuth from "./src/components/landing/RequireAuth"
import Unauthorized from "./src/components/landing/Unauthorized"
createRoot(document.getElementById("app")).render(
  <BrowserRouter>
    <div>
      {/* <AuthProvider> */}
      {/* <Header /> */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/students" element={<StudentManagement />} />

        <Route path="/staff/profile/update/:id" element={<UpdateStaffProfile />} />
        <Route path="/staff" element={<StaffManagement />} />
        <Route path="/register" element={<StaffRegister />} />


        <Route path="/request-supervisor" element={<RequestSupervisor />} />
        <Route path='/staff/profile/:id' element={<StaffProfile />} />
        <Route path="/request-cosupervisor" element={<RequestCoSupervisor />} />



        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/admins/new" element={<NewAdmin />} />
        <Route path="/admins" element={<AdminsManagement />} />
        <Route path="/admins/home" element={<AdminDashboard />} />
        <Route path="/admins/profile" element={<AdminProfile />} />
        <Route path="/admins/profile/update" element={<AdminProfileUpdate />} />
        <Route path="/admins/profile/changepassword" element={<AdminPassChange />} />

        <Route path="/markingschemes/create" element={<CreateMarking />} />
        <Route path="/markingschemes" element={<MarkingSchemes />} />
        <Route
          path="/markingschemes/update/:markingId"
          element={<UpdateMarking />}
        />

        <Route path="/submissions/new" element={<CreateSubmission />} />
        <Route path="/submissions" element={<SubmissionManagement />} />
        <Route
          path="/submissions/:submissionId"
          element={<UpdateSubmission />}
        />

        <Route path="/panels" element={<PanelManagement />} />
        <Route path="/panels/new" element={<NewPanel />} />
        <Route path="/panels/:panelId" element={<PanelDetails />} />
        <Route path="/panels/edit/:panelId" element={<EditPanel />} />

        <Route path="/studentgroups" element={<StudentGroups />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/group" element={<GroupCard />} />
        <Route path="/student/register" element={<StudentRegsiter />} />
        <Route path="/student/groupRegister" element={<GroupRegister />} />
        <Route path="/student/groupDetails" element={<MyGroup />} />
        <Route
          path="/student/supervisorRequest"
          element={<SupervisorRequest />}
        />
        <Route
          path="/student/coSupervisorRequest"
          element={<CoSupervisorRequest />}
        />
        <Route
          path="/student/groupDetailsCo"
          element={<CoSupervisorStatus />}
        />
        <Route path="/student/submissions" element={<Submissions />} />
        <Route path="/student/submission/:id" element={<SubmissionDetails />} />


        <Route path="/login" element={<StudentLogin/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        <Route path="/RequiedAuth" element={<RequireAuth/>}/>

        <Route path="/student/profile" element={<StudentProfile />} />
          
        <Route exact path="/" element={<App />} />
      </Routes>
      {/* </AuthProvider> */}
    </div>
  </BrowserRouter>
);