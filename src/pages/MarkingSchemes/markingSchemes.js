import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

import { getAllMarkings } from '../../index.api'
import { alertSuccess } from '../../components/Alerts'

import LoadingSpinner from '../../components/LoadingSpinner'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css';


function MarkingSchemes() {

    const location = useLocation();
    const [markings, setMarkings] = useState([]);
    const [alert, setAlert] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    // const [markings, setMarkings] = useState([{_id: '34'}, {_id: '53'}]);

    useEffect(() => {
        // console.log(location.state);
        location.state && location.state.message ?
            setAlert(location.state.message) : setAlert("")

        getAllMarkings()
            .then((res) => {
                setMarkings(res.data.markings)
                setIsLoaded(true)
            })

    }, [])

    const changeVisibility = (e) => {
        e.preventDefault()
        console.log(e);
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
                                <h2>Available Marking Schemes</h2>
                                <Link to='/markingschemes/create' className="btn btn-outline-sliit-primary">
                                    <i className="bi bi-plus-circle"></i> New
                                </Link>

                                <hr />
                                {
                                    isLoaded ?
                                        <div className="container-fluid">
                                            <div className="row">
                                                {
                                                    alert ? alertSuccess(alert) : ""
                                                }

                                                {
                                                    markings.length>0 ?
                                                    markings.map((marking) => (
                                                        <div className="col-sm-4" key={marking._id}>
                                                            <Link to={`/markingschemes/update/${marking._id}`} state={marking} className="text-decoration-none text-reset">

                                                                <SunEditor
                                                                    disable={true}
                                                                    disableToolbar={true}
                                                                    hideToolbar={true}
                                                                    defaultValue={marking.marking}
                                                                    // width="40%"
                                                                    height="400px"
                                                                />
                                                                <div>
                                                                    <p className="m-1 mb-4 float-start">{marking.name}</p>
                                                                    {
                                                                        marking.available ?
                                                                            <label className="switch float-end m-1" key={marking._id}>
                                                                                <input type="checkbox" checked disabled />
                                                                                <span className="slider round"></span>
                                                                            </label>
                                                                            :
                                                                            <label className="switch float-end m-1" key={marking._id}>
                                                                                <input type="checkbox" disabled />
                                                                                <span className="slider round"></span>
                                                                            </label>
                                                                    }
                                                                </div>
                                                                <div style={{ clear: "both" }}></div>
                                                            </Link>

                                                        </div>
                                                    ))
                                                    :<h4>No data available!</h4>
                                                }

                                            </div>
                                        </div>
                                        : <LoadingSpinner />
                                }


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