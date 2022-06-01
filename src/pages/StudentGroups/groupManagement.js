import React from "react";
import { Link } from "react-router-dom"

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Alert from '../../components/Alerts'
import GroupData from '../../components/StudentGroups/groupsTable'

function Blank() {
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
                                <hr />
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