import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

import { updateAdmin } from '../../index.api'
import LoadingSpiner from "../LoadingSpinner";

function UpdateAdminForm(props) {

    const location = useLocation()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState("");
    const [formdata, setFormdata] = useState([]);

    useEffect(() => {
        location.state ?
            setFormdata(location.state.profiledata)
            // console.log(location.state.profiledata)
            : navigate('/admins/profile')
        setIsLoaded(true)
    }, [])

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
        // console.log(formdata);

        updateAdmin(formdata)
            .then(res => {
                console.log(res.status)
                navigate("/admins/profile")
            })
            .catch(err => {
                setError(err.response.data.error)
            })
    }

    return (

        <div className="d-flex justify-content-center m-5">
            {
                isLoaded ?

                    <form className="row g-3 sxch-glass-back " onSubmit={onSubmit}>
                        <i className="bi bi-arrow-left-circle fs-4" onClick={() => navigate(-1)}> Go back</i>
                        {
                            error ? allert : ""
                        }
                        <div className="form-floating col-6">
                            <input type="text" className="form-control" id="firstname" name="firstname"
                                placeholder="First name" onChange={handleChange} value={formdata.firstname} required />
                            <label htmlFor="firstname" className="ms-2 text-secondary">First name</label>
                        </div>

                        <div className="form-floating col-md-6">
                            <input type="text" className="form-control" id="lastname" name="lastname"
                                placeholder="Last name" onChange={handleChange} value={formdata.lastname} required />
                            <label htmlFor="lastname" className="ms-2 text-secondary">Last name</label>
                        </div>

                        <div className="form-floating col-md-6">
                            <input type="text" className="form-control" id="namewithinitials" name="nameWithInitials"
                                placeholder="Name with initials" onChange={handleChange} value={formdata.nameWithInitials} required />
                            <label htmlFor="namewithinitials" className="ms-2 text-secondary">Name with initials</label>
                        </div>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="address" name="address"
                                placeholder="Address" onChange={handleChange} value={formdata.address} required />
                            <label htmlFor="address" className="ms-2 text-secondary">Address</label>
                        </div>

                        <div className="form-floating col-md-6">
                            <input type="text" className="form-control" id="nic" name="nic"
                                placeholder="NIC" onChange={handleChange} value={formdata.nic} required />
                            <label htmlFor="nic" className="ms-2 text-secondary">NIC</label>
                        </div>

                        <div className="form-floating col-md-6">
                            <input type="email" className="form-control" id="email" name="email"
                                placeholder="Email" onChange={handleChange} value={formdata.email} required />
                            <label htmlFor="email" className="ms-2 text-secondary">Email</label>
                        </div>

                        <div className="form-floating col-md-6">
                            <input type="tel" className="form-control" id="mobileno" name="mobile"
                                placeholder="Mobile number" onChange={handleChange} value={formdata.mobile} required />
                            <label htmlFor="mobileno" className="ms-2 text-secondary">Mobile number</label>
                        </div>

                        <div className="form-floating col-md-6">
                            <input type="tel" className="form-control" id="homeno" name="landline"
                                placeholder="Landline" onChange={handleChange} value={formdata.landline} required />
                            <label htmlFor="homeno" className="ms-2  text-secondary">Landline</label>
                        </div>

                        <button type="submit" className="btn btn-outline-primary ms-2 mt-4">Submit</button>

                    </form>
                    : <LoadingSpiner />
            }
        </div>

    )
}

export default UpdateAdminForm;