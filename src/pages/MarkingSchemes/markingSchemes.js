import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

import { getAllMarkings } from '../../index.api'
import { alertSuccess } from '../../components/Alerts'

import LoadingSpinner from '../../components/LoadingSpinner'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css';
import Unauthorized from "../../components/landing/Unauthorized";


function MarkingSchemes() {

    const location = useLocation();
    const [markings, setMarkings] = useState([]);
    const [alert, setAlert] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    // const [markings, setMarkings] = useState([{_id: '34'}, {_id: '53'}]);

    const localToken = JSON.parse(localStorage.getItem("localToken"));

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
                                                            markings.length > 0 ?
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
                                                                                <div className="float-start">

                                                                                    <p className="m-0 mt-2 ms-2">{marking.name}</p>
                                                                                    <p className="m-0 ms-2 mb-3">Updated on: {new Date(marking.lastModified).toDateString()}</p>
                                                                                </div>
                                                                                {
                                                                                    marking.available ?
                                                                                        <label className="switch float-end m-2" key={marking._id}>
                                                                                            <input type="checkbox" checked disabled />
                                                                                            <span className="slider round"></span>
                                                                                        </label>
                                                                                        :
                                                                                        <label className="switch float-end m-2" key={marking._id}>
                                                                                            <input type="checkbox" disabled />
                                                                                            <span className="slider round"></span>
                                                                                        </label>
                                                                                }
                                                                            </div>
                                                                            <div style={{ clear: "both" }}></div>

                                                                        </Link>

                                                                    </div>
                                                                ))
                                                                : <h4>No data available!</h4>
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
                    : <Unauthorized />
            }
        </div>
    )
}

export default MarkingSchemes;