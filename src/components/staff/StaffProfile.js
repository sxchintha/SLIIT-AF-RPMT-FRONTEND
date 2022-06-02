import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import './StaffProfile.css'
import Sidebar from "../Sidebar";
import Footer from "../Footer";
// import profileImage from '../../assets/img/profile-staff.png';

export default function StaffProfile() {

    const {id} = useParams();
    const [staffMember, setStaffmember] = useState([]);

    useEffect(() => {

        const getStaffMember = () =>{
            
            axios.get(`http://localhost:8070/staff/get/${id}`).then((res) => {
                setStaffmember(res.data.staff)
                console.log(res.data)
            }).catch((er) => {
                alert(er.message);
           })
            
        }
        getStaffMember();
    },[])

    return(
        <div>
{/* 
<div className="container">
    <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{staffMember.firstname} {staffMember.lastname}</h4>
                      <p className="text-muted font-size-sm">{staffMember.researcharea}</p> */}


                      {/* <Link to = "/mybookings">
                        <button className="btn">My Bookings</button>
                      </Link> */}
{/*                       
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">First Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {staffMember.firstname}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Last Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {staffMember.lastname}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {staffMember.telephone}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {staffMember.email}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {staffMember.researcharea}
                    </div>
                  </div>
                  <hr></hr>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div> */}


              <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h2>Staff Profile</h2>
                                <hr />

                                  <div class="container rounded bg-white mt-5 mb-5">
                                    <div class="row">
                                        <div class="col-md-3 profile-border">
                                            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                              {/* <img class="rounded-circle profile-image" src={profileImage} /> */}
                                                <span class="font-weight-bold profile-name">{staffMember.firstname} {staffMember.lastname}</span>
                                                <span class="text-black-50 profile-email">{staffMember.email}</span><span> </span>
                                                <p class="p-edit-profile">Edit profile &emsp;<i class="bi bi-gear"></i></p>
                                            </div>
                                        </div>
                                              <div class="col-md-5 profile-border">
                                                  <div class="p-3 py-5">
                                                      <div class="d-flex justify-content-between align-items-center mb-3">
                                                          <h5 class="text-right">Profile Settings</h5>
                                                      </div>
                                                      <div class="row mt-2">
                                                          <div class="col-md-6">
                                                            <label class="labels">First Name</label>
                                                            <input type="text" class="form-control" value={staffMember.firstname} readOnly/></div>
                                                          <div class="col-md-6"><label class="labels">Last Name</label>
                                                          <input type="text" class="form-control" value={staffMember.lastname} readOnly/></div>
                                                      </div>
                                                      <div class="row mt-3">

                                                          <div class="col-md-12"><label class="labels">Username</label>
                                                            <input type="text" class="form-control" value={staffMember.username} readOnly/>                     
                                                          </div>

                                                          <div class="col-md-12"><label class="labels label-pd-top">Research Area</label>
                                                            <input type="text" class="form-control" value={staffMember.researcharea} readOnly/>
                                                          </div>

                                                          <div class="col-md-12"><label class="labels label-pd-top">Email ID</label>
                                                            <input type="text" class="form-control" value={staffMember.email} readOnly/>                       
                                                          </div>

                                                          <div class="col-md-12"><label class="labels label-pd-top">Mobile Number</label>
                                                            <input type="text" class="form-control" value={staffMember.telephone} readOnly/>                       
                                                          </div>

                                                      </div>
                                                      
                     
                                                </div>
                                              </div>
                                              <div class="col-md-4">
                                            <div class="p-3 py-5">
                                                <div class="d-flex justify-content-between align-items-center experience">
                                                  <h5>Allocated Student Groups</h5>
                                                  {/* <span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;Experience</span> */}
                                                </div><br />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
</div>

    )
}


