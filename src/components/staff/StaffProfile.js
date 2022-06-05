import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

import './StaffProfile.css'
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import profileImage from '../../assets/img/profile-staff.png';
import { deleteStaff } from "../../index.api";

export default function StaffProfile() {

  const { id } = useParams();
  const [staffMember, setStaffmember] = useState([]);
  const [studentgroups, setStudentGroups] = useState([]);
  const localToken = JSON.parse(localStorage.getItem("localToken"));
  const navigate = useNavigate()

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

    const getStudentGroups = () => {

      axios.get("http://localhost:8070/studentGroups/", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setStudentGroups(res.data.groups);
        console.log(res.data.groups);

      }).catch((er) => {
        alert(er.message);
      });
    };
    getStudentGroups();
  }, [])

  useEffect(() => {

    const getStaffMember = () => {

      axios.get(`http://localhost:8070/staff/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setStaffmember(res.data.staff)
        // console.log(res.data)
      }).catch((er) => {
        alert(er.message);
      })

    }
    getStaffMember();
  }, [])

  const deleteUser = (e) => {
    e.preventDefault()

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'

    }).then((result) => {
      if (result.isConfirmed) {
        deleteStaff(id)
          .then(res => {
            console.log(res)
            navigate("/staff")
          })
          .catch(err => {
            console.log(err.message.data.error)
          })
      }
    })
  }

  return (
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

                <div className="container rounded bg-white mt-5 mb-5">
                  <div className="row">
                    <div className="col-md-3 profile-border">
                      <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle profile-image" src={profileImage} />
                        <span className="font-weight-bold profile-name">{staffMember.firstname} {staffMember.lastname}</span>
                        <span className="text-black-50 profile-email">{staffMember.email}</span><span> </span>
                        <p className="p-edit-profile">Edit profile &emsp;
                          <Link to={`/staff/profile/update/${id}`}><i className="bi bi-gear"></i></Link>
                        </p>
                        {
                          localToken.role == 2001 ?
                            // <p className="p-edit-profile">Delete user &emsp;
                            <button type="button" onClick={deleteUser} className="btn" style={{ textDecoration: "none", color: "black" }}>Delete user
                              <i className="bi bi-trash" style={{ color: "red", marginLeft: "10px" }}></i>
                            </button>
                            // </p>
                            : ''
                        }
                      </div>
                    </div>
                    <div className="col-md-5 profile-border">
                      <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="text-right">Profile Settings</h5>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-6">
                            <label className="labels">First Name</label>
                            <input type="text" className="form-control" value={staffMember.firstname} readOnly /></div>
                          <div className="col-md-6"><label className="labels">Last Name</label>
                            <input type="text" className="form-control" value={staffMember.lastname} readOnly /></div>
                        </div>
                        <div className="row mt-3">

                          <div className="col-md-12"><label className="labels">Username</label>
                            <input type="text" className="form-control" value={staffMember.username} readOnly />
                          </div>

                          <div className="col-md-12"><label className="labels label-pd-top">Research Area</label>
                            <input type="text" className="form-control" value={staffMember.researcharea} readOnly />
                          </div>

                          <div className="col-md-12"><label className="labels label-pd-top">Email ID</label>
                            <input type="text" className="form-control" value={staffMember.email} readOnly />
                          </div>

                          <div className="col-md-12"><label className="labels label-pd-top">Mobile Number</label>
                            <input type="text" className="form-control" value={staffMember.telephone} readOnly />
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 py-5">
                        <h5>Student Groups &emsp;<i class="fas fa-users"></i></h5>
                        <br />
                        <ul class="list-group">

                          {
                            studentgroups.map((items, key) => (
                              <li key={key} class="list-group-item">{items.groupName}</li>
                            ))
                          }
                        </ul>
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


