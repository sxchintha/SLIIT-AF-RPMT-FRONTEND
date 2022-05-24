import React from "react";

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import MarkingEditor from '../../components/marking_scheme/createMarking'

function CreateMarking() {
    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                <MarkingEditor />

                            </div>
                        </main>
                        <footer className="row bg-light py-4 mt-auto">
                            <Footer />

                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMarking;