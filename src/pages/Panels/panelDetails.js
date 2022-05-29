import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'

import { deletePanel } from '../../index.api'
import { alertError } from '../../components/Alerts'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import PanelDetails from '../../components/panels/panelDetails'

function ShowPanelDetails() {

    const navigate = useNavigate()
    const { panelId } = useParams()
    const [error, setError] = useState("");

    const onDelete = (e) => {
        e.preventDefault()
        // console.log(e);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
            if (result.isConfirmed) {
                deletePanel(panelId)
                    .then(res => {
                        console.log(res)
                        navigate("/panels")
                    })
                    .catch(err => {
                        console.log(err.message.data.error)
                        setError(err.message.data.error)
                    })
            }
        })
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
                                <h2>Panel Details</h2>
                                <hr />
                                {
                                    error ? alertError(error) : ""
                                }
                                <PanelDetails />
                                <Link to={`/panels/edit/${panelId}`} className="btn btn-outline-primary ms-2 me-4 mt-4"><i className="bi bi-pencil-square"></i> Edit</Link>
                                <button onClick={onDelete} className="btn btn-outline-danger mt-4"><i className="bi bi-trash3-fill"></i> Delete</button>
                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowPanelDetails;