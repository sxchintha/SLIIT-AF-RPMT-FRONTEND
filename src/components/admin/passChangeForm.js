import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

import { adminChangePass } from '../../index.api'
import { alertError } from "../Alerts";

function AdminPassForm(props) {

    const localToken = JSON.parse(localStorage.getItem('localToken'))
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [formdata, setFormdata] = useState({ adminId: localToken.userId });

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log(formdata);

        adminChangePass(formdata)
            .then(res => {
                if (!res.data.error) {
                    // console.log(res)
                    navigate("/admins/profile", { state: { message: res.data.status } })
                } else {
                    setError(res.data.error)
                }
            })
            .catch(err => {
                setError(err.response.data.error)
            })
    }

    return (

        <div className="d-flex justify-content-center m-5">

            <form className="row g-3 sxch-glass-back podiform" onSubmit={onSubmit}>
                <i className="bi bi-arrow-left-circle fs-4" onClick={() => navigate(-1)}> Go back</i>
                {
                    error ? alertError(error) : ""
                }
                <div className="form-floating col-12">
                    <input type="password" className="form-control" id="currentPass" name="currentPass"
                        placeholder="Current Pass" onChange={handleChange} required />
                    <label htmlFor="currentPass" className="ms-2 text-secondary">Current Password</label>
                </div>
                <div className="form-floating col-md-12">
                    <input type="password" className="form-control" id="newPass" name="newPass"
                        placeholder="New Pass" onChange={handleChange} required />
                    <label htmlFor="newPass" className="ms-2 text-secondary">New Password</label>
                </div>

                <div className="form-floating col-md-12">
                    <input type="password" className="form-control" id="confirmPass" name="confirmPass"
                        placeholder="Confirm Pass" onChange={handleChange} required />
                    <label htmlFor="confirmPass" className="ms-2 text-secondary">Confirm Password</label>
                </div>

                <button type="submit" className="btn btn-outline-primary ms-2 mt-4">Change</button>
            </form>
        </div>

    )
}

export default AdminPassForm;