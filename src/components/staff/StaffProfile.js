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



<div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                <span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6">
                      <label class="labels">Name</label>
                      <input type="text" class="form-control" placeholder="first name" value="" /></div>
                    <div class="col-md-6"><label class="labels">Surname</label>
                    <input type="text" class="form-control" value="" placeholder="surname" /></div>
                </div>
                <div class="row mt-3">

                    <div class="col-md-12"><label class="labels">Mobile Number</label>
                      <input type="text" class="form-control" placeholder="enter phone number" value="" />                     
                    </div>

                    <div class="col-md-12"><label class="labels">Address Line 1</label>
                      <input type="text" class="form-control" placeholder="enter address line 1" value="" />
                    </div>

                    <div class="col-md-12"><label class="labels">Address Line 2</label>
                      <input type="text" class="form-control" placeholder="enter address line 2" value="" />
                    </div>

                    <div class="col-md-12"><label class="labels">Postcode</label>
                      <input type="text" class="form-control" placeholder="enter address line 2" value="" />
                    </div>

                    <div class="col-md-12"><label class="labels">State</label>
                      <input type="text" class="form-control" placeholder="enter address line 2" value="" />
                    </div>

                    <div class="col-md-12"><label class="labels">Area</label>
                      <input type="text" class="form-control" placeholder="enter address line 2" value="" />
                    </div>

                    <div class="col-md-12"><label class="labels">Email ID</label>
                      <input type="text" class="form-control" placeholder="enter email id" value="" />                       
                    </div>

                    <div class="col-md-12"><label class="labels">Education</label>
                      <input type="text" class="form-control" placeholder="education" value="" />                       
                    </div>

                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label>
                      <input type="text" class="form-control" placeholder="country" value="" />
                    </div>

                    <div class="col-md-6"><label class="labels">State/Region</label>
                      <input type="text" class="form-control" value="" placeholder="state" />
                    </div>

                </div>
                <div class="mt-5 text-center">
                  <button class="btn btn-primary profile-button" type="button">Save Profile</button>
                </div>
          </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center experience">
                  <span>Edit Experience</span>
                  <span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;Experience</span>
                </div><br />

                <div class="col-md-12">
                  <label class="labels">Experience in Designing</label>
                  <input type="text" class="form-control" placeholder="experience" value="" />
                </div> <br />

                <div class="col-md-12"><label class="labels">Additional Details</label>
                  <input type="text" class="form-control" placeholder="additional details" value="" />
                </div>
            </div>
        </div>
    </div>
</div>
</div>

    )
}
