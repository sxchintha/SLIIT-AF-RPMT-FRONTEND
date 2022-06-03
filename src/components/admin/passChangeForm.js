import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

import { updateAdmin } from '../../index.api'
import LoadingSpiner from "../LoadingSpinner";

function AdminPassForm(props) {

    const location = useLocation()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState("");
    const [formdata, setFormdata] = useState([]);

    useEffect(() => {
        // location.state ?
        //     setFormdata(location.state.profiledata)
        //     // console.log(location.state.profiledata)
        //     : navigate('/admins/profile')
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

                        

                        <button type="submit" className="btn btn-outline-primary ms-2 mt-4">Submit</button>

                    </form>
                    : <LoadingSpiner />
            }
        </div>

    )
}

export default AdminPassForm;