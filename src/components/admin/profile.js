import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileImage from '../../assets/img/profile.png'
import { getAdmin } from "../../index.api";

export default function AdminProfile() {

    const [profiledata, setProfiledata] = useState([])

    useEffect(() => {

        const adminId = "628d3575eec19c704fa256c5"
        getAdmin({ adminId: adminId })
            .then(res => {
                setProfiledata(res.data)
                // console.log(res.data);
            })
    }, [])

    return (
        <div className="container">
            <div className="main-body">

                <div className="row gutters-sm profile-gutters-sm">
                    <div className="col-md-3 mb-3">
                        <div className="card profile-card">
                            <div className="card-body profile-card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={profileImage} alt="Admin" className="w-25" />
                                    <div className="mt-3">
                                        <h4>{profiledata.firstname}</h4>
                                        <p className="text-secondary mb-1">Admin</p>
                                        {/* <p className="text-muted font-size-sm"></p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <Link to={'update'} state={{ profiledata }} className="text-secondary w-100 text-decoration-none">Edit Profile <i className="float-end bi-pencil" /></Link>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <Link to={''} className="text-secondary w-100 text-decoration-none">Change Password <i className="float-end bi-key" /> </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card profile-card mb-3">
                            <div className="card-body profile-card-body my-5">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {profiledata.firstname + ' ' + profiledata.lastname}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Name with initials</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {profiledata.nameWithInitials}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {profiledata.email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {profiledata.landline}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Mobile</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {profiledata.mobile}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {profiledata.address}
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
        </div>
    )
}