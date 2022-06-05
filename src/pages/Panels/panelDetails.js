import React, { useState } from "react";
import { alertError } from '../../components/Alerts'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import PanelDetails from '../../components/panels/panelDetails'
import PanelData from '../../components/panels/panelTable'
import Unauthorized from "../../components/landing/Unauthorized";

function ShowPanelDetails() {

    const [error, setError] = useState("");
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
                                        <h2>Panel Details</h2>
                                        <hr />
                                        {
                                            error ? alertError(error) : ""
                                        }
                                        <div className="row flex">
                                            <div className="col-6">
                                                <PanelDetails />
                                            </div>
                                            <div className="col-6" style={{ borderLeft: "1px solid #323A45" }}>
                                                <PanelData />
                                            </div>
                                        </div>

                                    </div>
                                </main>
                                <Footer />
                            </div>
                        </div>
                    </div>
                    : <Unauthorized />
            }
        </div>
    )
}

export default ShowPanelDetails;