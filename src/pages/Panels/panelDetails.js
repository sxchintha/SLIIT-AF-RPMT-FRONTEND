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
    const [error, setError] = useState("");

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