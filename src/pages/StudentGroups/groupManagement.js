import React, { useState } from "react";
import { Link } from "react-router-dom"

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Alert, { alertError, alertSuccess } from '../../components/Alerts'
import GroupData from '../../components/StudentGroups/groupsTable'
import { randomAllocate } from "../../index.api";

function Blank() {

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const allocateRandom = (e) => {
        e.preventDefault()
        randomAllocate()
            .then(res => {
                console.log(res);
                if (!res.data.error) {
                    setSuccess(res.data.status)
                    setError('')
                } else { setError(res.data.error); setSuccess('') }
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message)
            })
        // console.log("Random allocate clicked!");
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
                                <h2>Student Groups</h2>
                                <button type="button" className="btn btn-outline-sliit-primary" onClick={allocateRandom}>
                                    <i className="bi bi-plus-circle"></i> Allocate Panels Randomly
                                </button>
                                <hr />
                                {
                                    success ? alertSuccess(success)
                                        : (error ? alertError(error)
                                            : "")
                                }
                                <GroupData />

                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blank;