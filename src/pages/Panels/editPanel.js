import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom"

import { getPanelDetails } from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import EditPanelForm from '../../components/panels/editPanelForm'

function EditPanel() {

    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto h-100">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h2>Edit Panel</h2>
                                <hr />
                                <EditPanelForm />

                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPanel;