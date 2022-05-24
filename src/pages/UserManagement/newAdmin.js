import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

import { addNewAdmin } from '../../index.api'

function NewAdmin() {

    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [formdata, setFormdata] = useState({
        firstname: '',
        lastname: '',
        nameWithInitials: '',
        address: '',
        nic: '',
        email: '',
        mobile: '',
        landline: '',
    });

    const allert = (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <div>
                {error}
            </div>
        </div>
    )

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        addNewAdmin(formdata)
            .then(res => {
                console.log(res.status)
                navigate("/admins")
            })
            .catch(err => {
                setError(err.response.data.error)
            })
    }

    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col p-4">
                                {/* Body */}

                                <h1>New Admin</h1>
                                <hr />
                                <div className="d-flex justify-content-center m-5">
                                    <form className="row w-75 g-3 sxch-glass-back " onSubmit={onSubmit}>

                                        {
                                            error ? allert : ""
                                        }
                                        <div className="form-floating col-6">
                                            <input type="text" className="form-control" id="firstname" name="firstname"
                                                placeholder="First name" onChange={handleChange} required />
                                            <label htmlFor="firstname" className="ms-2 text-secondary">First name</label>
                                        </div>

                                        <div className="form-floating col-md-6">
                                            <input type="text" className="form-control" id="lastname" name="lastname"
                                                placeholder="Last name" onChange={handleChange} required />
                                            <label htmlFor="lastname" className="ms-2 text-secondary">Last name</label>
                                        </div>

                                        <div className="form-floating col-md-6">
                                            <input type="text" className="form-control" id="namewithinitials" name="nameWithInitials"
                                                placeholder="Name with initials" onChange={handleChange} required />
                                            <label htmlFor="namewithinitials" className="ms-2 text-secondary">Name with initials</label>
                                        </div>

                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="address" name="address"
                                                placeholder="Address" onChange={handleChange} required />
                                            <label htmlFor="address" className="ms-2 text-secondary">Address</label>
                                        </div>

                                        <div className="form-floating col-md-6">
                                            <input type="text" className="form-control" id="nic" name="nic"
                                                placeholder="NIC" onChange={handleChange} required />
                                            <label htmlFor="nic" className="ms-2 text-secondary">NIC</label>
                                        </div>

                                        <div className="form-floating col-md-6">
                                            <input type="email" className="form-control" id="email" name="email"
                                                placeholder="Email" onChange={handleChange} required />
                                            <label htmlFor="email" className="ms-2 text-secondary">Email</label>
                                        </div>

                                        <div className="form-floating col-md-6">
                                            <input type="tel" className="form-control" id="mobileno" name="mobile"
                                                placeholder="Mobile number" onChange={handleChange} required />
                                            <label htmlFor="mobileno" className="ms-2 text-secondary">Mobile number</label>
                                        </div>

                                        <div className="form-floating col-md-6">
                                            <input type="tel" className="form-control" id="homeno" name="landline"
                                                placeholder="Landline" onChange={handleChange} required />
                                            <label htmlFor="homeno" className="ms-2  text-secondary">Landline</label>
                                        </div>

                                        <button type="submit" className="btn btn-outline-primary col-2 ms-2 mt-4">Submit</button>

                                    </form>
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

export default NewAdmin;