import React, { useState } from "react";
import axios from "axios";

import Footer from "../Footer";
import Sidebar from "../Sidebar";

import "./StaffReg.scss"

export default function RegisterStaff() {

    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [telephone, setTelephone] = useState("");
    // const [researchArea, setResearchArea] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmpassword, setConfirmPasswoprd] = useSate("");


    const [newStaffMember, setNewStaffMember] = useState({
        firstName:'',
        lastName:'',
        username:'',
        email:'',
        telephone:'',
        researchArea:'',
        password:'',
        cpassword:''
    })

    const onChange = (e) => {
        setNewStaffMember({ ...newStaffMember, [e.target.name]: e.target.value })
        //console.log(newStaffMember);
    }

    function sendData(e) {
        e.preventDefault();

        if (newStaffMember.password === newStaffMember.cpassword) {
            //console.log(newStaffMember)

        const newStaff = {
            firstName: newStaffMember.firstName,
            lastName: newStaffMember.lastName,
            username: newStaffMember.username,
            email: newStaffMember.email,
            telephone: newStaffMember.telephone,
            researchArea: newStaffMember.researchArea,
            password: newStaffMember.password
        }

        axios.post("http://localhost:8070/staff/add", newStaff).then (() =>{
            console.log(newStaff);
            alert("successful");
        }).catch((e) =>{
            alert(e);
        })
    } else {
        window.alert("Passwords do not match.")
    }

}
    

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
                                            <center><h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Staff Registration Form</h3></center>

                                            <form onSubmit={sendData}>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <label className="form-label" for="firstName">First Name</label>
                                                    <input type="text" 
                                                    id="firstName"
                                                    name="firstName" 
                                                    className="form-control form-control-lg" 
                                                    onChange={onChange} />

                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <label className="form-label" for="lastName">Last Name</label>
                                                    <input type="text" 
                                                    id="lastName"
                                                    name="lastName" 
                                                    className="form-control form-control-lg"
                                                    onChange={onChange} />
                                                </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 d-flex align-items-center">

                                                <div className="form-outline datepicker w-100">
                                                    <label for="birthdayDate" className="form-label">Username</label>
                                                    <input type="text" 
                                                    className="form-control form-control-lg" 
                                                    id="username"
                                                    name="username"
                                                    onChange={onChange} />
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4">

                                                <div className="form-outline">
                                                    <label className="form-label" for="telephone">Phone Number</label>
                                                    <input type="tel" 
                                                    id="telephone"
                                                    name="telephone" 
                                                    className="form-control form-control-lg"
                                                    onChange={onChange} />
                                                </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="emailAddress">Email</label>
                                                    <input type="email" 
                                                    id="emailAddress"
                                                    name="email" 
                                                    className="form-control form-control-lg" 
                                                    onChange={onChange}/>
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="researchArea">Research Area</label>
                                                    <input type="text" 
                                                    id="researchArea"
                                                    name="researchArea" 
                                                    className="form-control form-control-lg" 
                                                    onChange={onChange}/>
                                                </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="password">Password</label>
                                                    <input type="password" 
                                                    id="password"
                                                    name="password" 
                                                    className="form-control form-control-lg"
                                                    onChange={onChange} />
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-outline">
                                                    <label className="form-label" for="confirm-password">Confirm Password</label>
                                                    <input type="password" 
                                                    id="confirm-password" 
                                                    name="cpassword"
                                                    className="form-control form-control-lg"
                                                    onChange={onChange} />
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

           
            
        </div>
    )
}