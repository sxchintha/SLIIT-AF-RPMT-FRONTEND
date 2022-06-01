import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import './StaffProfile.css'

export default function StaffProfile() {

    const {id} = useParams();
    const [staffMember, setStaffmember] = useState([]);
    //     firstname:'',
    //     lastname:'',
    //     researcharea:'',
    //     telephone:'',
    //     email:''
    // });

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


{/* <div class="row py-5 px-4">
    <div class="col-xl-4 col-md-6 col-sm-10 mx-auto">

        
        <div class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-0 pb-4 bg-dark">
                <div class="media align-items-end profile-header">
                    <div class="profile mr-3">
                        <img src="https://bootstrapious.com/i/snippets/sn-profile/teacher.jpg" alt="..." width="130" class="rounded mb-2 img-thumbnail" />
                    <a href="#" class="btn btn-dark btn-sm btn-block">Edit profile</a></div>
                    <div class="media-body mb-5 text-white">
                        <h4 class="mt-0 mb-0">{staffMember.firstname} {staffMember.lastname}</h4>
                        <p class="small mb-4"> <i class="fa fa-map-marker mr-2"></i>{staffMember.researcharea}</p>
                    </div>
                </div>
            </div>
            <div class="bg-light p-4 d-flex justify-content-end text-center"> 
            </div>
            <div class="py-4 px-4">
                <div class="d-flex align-items-center justify-content-between mb-3">  
                    </div>
                </div>
            </div>
        </div>
    </div> */}

        </div>
    )
}