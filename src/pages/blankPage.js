import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function Blank() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(-1)
    })
    
    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}

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