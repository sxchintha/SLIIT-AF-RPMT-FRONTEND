import React from "react";
import { Link, useNavigate } from "react-router-dom"

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import PanelData from '../../components/panels/panelTable'

function PanelsManagement() {

    const navigate = useNavigate();
    const localToken = JSON.parse(localStorage.getItem("localToken"));

    return (
        <div>
            {
                localToken.role == 2001 ?
                    <div className="container-fluid overflow-hidden">
                        <div className="row vh-100 overflow-auto">
                            <Sidebar />

                            <div className="col d-flex flex-column h-sm-100">
                                <main className="row overflow-auto">
                                    <div className="col pt-4 ps-4">
                                        {/* Body */}
                                        <h2>Panels</h2>
                                        <Link to='/panels/new' className="btn btn-outline-sliit-primary">
                                            <i className="bi bi-plus-circle"></i> New Panel
                                        </Link>
                                        <hr />

                                        <PanelData />

                                    </div>
                                </main>
                                <Footer />
                            </div>
                        </div>
                    </div>
                    : navigate("/unauthorized")
            }
        </div>
    )
}

export default PanelsManagement;