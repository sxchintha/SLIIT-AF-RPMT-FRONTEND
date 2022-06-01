import React from "react";
import CoSupervisorStatus from "../components/CoSupervisorStatus/coSupervisorStatus";
import Footer from "../components/Footer";
import GroupCard from "../components/GroupDetails/GroupDetails";
import Sidebar from "../components/Sidebar";
import SupervisorStatus from "../components/SupervisorRequestStatus/supervisorStatus";






 export default function StudentDashboard() {
 
    return(
    <>
<div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                
                                <div class="card text-white bg-dark mb-3">
                                    <div className="d-flex justify-content-between">
  <h1 class="card-header text-center mx-auto">
    Faculty Notices
  </h1>
  <a href="#" class="btn btn-primary h-50 mt-3 mx-5">See All</a>
  </div>
  <div class="card-body">
      <ul>
      <li><h5 class="card-title">Test Faculty Notices</h5></li>
      <li><h5 class="card-title">Test Faculty Notices</h5></li>
      <li><h5 class="card-title">Test Faculty Notices</h5></li>
      </ul>
    
   
    
  </div>
</div> 

<div class="container">
  <div class="row">
    <div class="col-md">
      <SupervisorStatus/>
    </div>
    <div class="col-sm">
      <GroupCard/>
    </div>
    <div class="col-sm">
      <CoSupervisorStatus/>
    </div>
  </div>
</div>


                            </div>
                        </main>
                        <footer className="row bg-light py-4 mt-auto">
                            <Footer />

                        </footer>
                    </div>
                </div>
            </div>
    
    </>)

 }