import React from "react";

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import MarkingUpdateEditor from '../../components/marking_scheme/updateMarking'
import Unauthorized from "../../components/landing/Unauthorized";

function UpdateMarking() {

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
                                        <h2>Update Marking Scheme</h2>
                                        <hr />
                                        <MarkingUpdateEditor />

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

export default UpdateMarking;