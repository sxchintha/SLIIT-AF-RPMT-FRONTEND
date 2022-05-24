import React from "react";

import Footer from "../Footer";
import Sidebar from "../Sidebar";

import "./StaffReg.scss"

export default function RegisterStaff() {
    

    return(
        <div>
            <div>
                <div className="container-fluid overflow-hidden">
                    <div className="row vh-100 overflow-auto">
                        <Sidebar />

                        <div className="col d-flex flex-column h-sm-100">
                            <main className="row overflow-auto">
                                <div className="col pt-4 ps-4">

                                <div className="container py-5 h-100">
                                    <div className="row justify-content-center align-items-center h-100">
                                    <div className="col-12 col-lg-9 col-xl-7">
                                        <div className="card shadow-2-strong card-registration">
                                        <div className="card-body p-4 p-md-5">
                                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Staff Registration Form</h3>
                                            <form>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <label className="form-label" for="firstName">First Name</label>
                                                    <input type="text" id="firstName" className="form-control form-control-lg" />
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <label className="form-label" for="lastName">Last Name</label>
                                                    <input type="text" id="lastName" className="form-control form-control-lg" />
                                                </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 d-flex align-items-center">

                                                <div className="form-outline datepicker w-100">
                                                    <label for="birthdayDate" className="form-label">Username</label>
                                                    <input type="text" className="form-control form-control-lg" id="birthdayDate" />
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <label className="form-label" for="lastName">Phone Number</label>
                                                    <input type="text" id="lastName" className="form-control form-control-lg" />
                                                </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="emailAddress">Email</label>
                                                    <input type="email" id="emailAddress" className="form-control form-control-lg" />
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="phoneNumber">Password</label>
                                                    <input type="tel" id="phoneNumber" className="form-control form-control-lg" />
                                                </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="emailAddress">Email</label>
                                                    <input type="email" id="emailAddress" className="form-control form-control-lg" />
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="phoneNumber">Password</label>
                                                    <input type="tel" id="phoneNumber" className="form-control form-control-lg" />
                                                </div>

                                                </div>
                                            </div>

                                            <div className="mt-4 pt-2">
                                                <center><input className="btn btn-primary btn-lg" type="submit" value="Register" /></center>
                                            </div>

                                            </form>
                                        </div>
                                        </div>
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
            </div>

            {/* <section className="vh-100 gradient-custom"> */}
            
        </div>
    )
}