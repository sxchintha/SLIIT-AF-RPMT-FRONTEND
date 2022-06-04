import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import './StaffProfile.css'
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import profileImage from '../../assets/img/profile-staff.png';

export default function StaffProfile() {

    const {id} = useParams();
    const [staffMember, setStaffmember] = useState([]);

    function getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);    
        }    
      }
      return "";
    }
    var token = getCookie("usertoken");

    useEffect(() => {

        const getStaffMember = () =>{
            
            axios.get(`http://localhost:8070/staff/get/${id}`,  {
              headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
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
                                              <img class="rounded-circle profile-image" src={profileImage} />
                                                <span class="font-weight-bold profile-name">{staffMember.firstname} {staffMember.lastname}</span>
                                                <span class="text-black-50 profile-email">{staffMember.email}</span><span> </span>
                                                <p class="p-edit-profile">Edit profile &emsp;
                                                <Link to ={`/staff/profile/update/${id}`}><i class="bi bi-gear"></i></Link>
                                                </p>
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


