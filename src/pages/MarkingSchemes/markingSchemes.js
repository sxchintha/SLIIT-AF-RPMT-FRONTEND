import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

import * as api from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css';


function MarkingSchemes() {

    const location = useLocation();
    const [markings, setMarkings] = useState([]);
    // const [markings, setMarkings] = useState([{_id: '34'}, {_id: '53'}]);

    useEffect(() => {
        api.getAllMarkings()
            .then((res) => {
                setMarkings(res.data.markings)
            })
    }, [])

    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h1>Available Marking Schemes</h1>
                                <Link to='/markingschemes/create' className="btn btn-outline-sliit-primary">
                                    <i className="bi bi-plus-circle"></i> New
                                </Link>

                                <hr />
                                <div className="container-fluid">
                                    <div className="row">

                                        {
                                            markings.map((marking) => (
                                                <div className="col-sm-4" key={marking._id}>
                                                    <SunEditor
                                                        disable={true}
                                                        disableToolbar={true}
                                                        hideToolbar={true}
                                                        defaultValue={marking.marking}
                                                        // width="40%"
                                                        height="400px"
                                                    />
                                                    <p>{marking.name}</p>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>


                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkingSchemes;