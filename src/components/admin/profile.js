import React, { useEffect, useState } from "react";
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
                    </div>
                    <div className="col-md-8">
                        <div className="card profile-card mb-3">
                            <div className="card-body profile-card-body">
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
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                        <a className="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
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