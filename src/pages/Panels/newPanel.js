import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Select from 'react-select'

import { getAllStaff, createNewPanel } from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import NewPanelForm from '../../components/panels/newPanelForm'

function NewPanel() {

    return (
        <div>
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
        </div>
    )
}

export default NewPanel;
