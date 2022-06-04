import React from "react";

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import StudentGroupDetailsComp from "../../components/StudentGroups/groupDetails";

export default function StudentGroupDetails() {

    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h2>Group Details</h2>
                                <hr />
                                <StudentGroupDetailsComp />

                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
