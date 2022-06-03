import React from "react";
import { Link } from "react-router-dom"

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Alert from '../../components/Alerts'
import GroupData from '../../components/StudentGroups/groupsTable'
import { randomAllocate } from "../../index.api";

function Blank() {
    const allocateRandom = (e) => {
        e.preventDefault()
        randomAllocate()
        console.log("Random allocate clicked!");
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