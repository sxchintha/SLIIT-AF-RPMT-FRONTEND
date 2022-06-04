import React, { useState } from "react";
import axios from "axios";
import Select from 'react-select'
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
    
    const options = [
        { value: 'Robotics and Artificial Intelligence', label: 'Robotics and Artificial Intelligence' },
        { value: 'Graphics and Immersive Computing', label: 'Graphics and Immersive Computing' },
        { value: 'Bioinformatics and Computational Biology', label: 'Bioinformatics and Computational Biology' },
        { value: 'High Performance Computing', label: 'High Performance Computing' },
        { value: 'Theoretical Foundations', label: 'Theoretical Foundations' },
        { value: 'Information and System Security', label: 'Information and System Security' }
      ]

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

    const customStyles = {
        control: base => ({
          ...base,
          height: 58,
          minHeight: 35,
          
        })
      };

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

    const onChange = (e) => {
        setNewStaffMember({ ...newStaffMember, [e.target.name]: e.target.value })
        //console.log(e);
    }

    const onSelect = (e) => {
        setNewStaffMember({ ...newStaffMember, ['researchArea']: e.value })
        //console.log(e);
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

        axios.post("http://localhost:8070/staff/add", newStaff,  {
            headers: { Authorization: `Bearer ${token}` },
          }).then (() =>{
            console.log(newStaff);
            alert("successful");
        }).catch((e) =>{
            setError(err.response.data.error)
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

                                                <div className="form-floating">
                                                    <input type="text" 
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="First name"
                                                    className="form-control" 
                                                    onChange={onChange} />
                                                    <label className="ms-2 text-secondary" for="firstName">First Name</label>

                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4">

                                                <div className="form-floating">
                                                    <input type="text" 
                                                    id="lastName"
                                                    name="lastName" 
                                                    placeholder="Last name"
                                                    className="form-control"
                                                    onChange={onChange} />
                                                    <label className="ms-2 text-secondary" for="lastName">Last Name</label>
                                                </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 d-flex align-items-center">

                                                <div className="form-floating datepicker w-100">
                                                    <input type="text" 
                                                    className="form-control" 
                                                    id="username"
                                                    name="username"
                                                    placeholder="Username"
                                                    onChange={onChange} />
                                                    <label for="username" className="ms-2 text-secondary">Username</label>
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4">

                                                <div className="form-floating">
                                                    <input type="tel" 
                                                    id="telephone"
                                                    name="telephone" 
                                                    placeholder="Telephone No"
                                                    className="form-control"
                                                    onChange={onChange} />
                                                    <label className="ms-2 text-secondary" for="telephone">Phone Number</label>
                                                </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-floating">
                                                    <input type="email" 
                                                    id="emailAddress"
                                                    name="email"
                                                    placeholder="Email" 
                                                    className="form-control" 
                                                    onChange={onChange}/>
                                                    <label className="ms-2 text-secondary" for="emailAddress">Email</label>
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-floating">
                                                    <Select      
                                                        closeMenuOnSelect={true}
                                                        name="researchArea"
                                                        options={options}
                                                        onChange={onSelect}
                                                        styles={customStyles}
                                                        required
                                                    />

                                                    {/* <label className="ms-2 text-secondary" for="researchArea">Research Area</label> */}
                                                </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-floating">
                                                    <input type="password" 
                                                    id="password"
                                                    name="password" 
                                                    placeholder="Password"
                                                    className="form-control"
                                                    onChange={onChange} />
                                                    <label className="ms-2 text-secondary" for="password">Password</label>
                                                </div>

                                                </div>
                                                <div className="col-md-6 mb-4 pb-2">

                                                <div className="form-floating">
                                                    <input type="password" 
                                                    id="confirm-password" 
                                                    name="cpassword"
                                                    placeholder="Confirm Password"
                                                    className="form-control"
                                                    onChange={onChange} />
                                                    <label className="ms-2 text-secondary" for="confirm-password">Confirm Password</label>
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