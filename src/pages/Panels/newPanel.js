import React from "react";
import { useNavigate } from "react-router-dom"


import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import NewPanelForm from '../../components/panels/newPanelForm'
import Unauthorized from "../../components/landing/Unauthorized";

function NewPanel() {

    const localToken = JSON.parse(localStorage.getItem("localToken"));

    return (
        <div>
            {
                localToken.role == 2001 ?
                    <div className="container-fluid overflow-hidden">
                        <div className="row vh-100 overflow-auto">
                            <Sidebar />

                            <div className="col d-flex flex-column h-sm-100">
                                <main className="row overflow-auto h-100">
                                    <div className="col pt-4 ps-4">
                                        {/* Body */}
                                        <h2>New Panel</h2>
                                        <hr />
                                        <NewPanelForm />

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

export default NewPanel;
