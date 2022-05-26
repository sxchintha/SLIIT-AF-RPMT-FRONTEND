import React from "react";
import { Link } from "react-router-dom"

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import PanelDetails from '../../components/panels/panelDetails'

function ShowPanelDetails() {
    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <PanelDetails/>

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