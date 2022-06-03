import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getSummary } from '../../index.api'

function CountSummary() {

    const [summary, setSummary] = useState([])
    useEffect(() => {
        getSummary()
            .then(res => {
                // console.log(res.data);
                setSummary(res.data)
            })
    }, [])

    return (
        <div className="row">
            <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                        <div className="card-body-icon">
                            <i className="fa fa-fw bi-person"></i>
                        </div>
                        <div className="mr-5">Students <span className="fw-bold">{summary.studentCount}</span></div>
                    </div>
                    <Link className="card-footer text-white clearfix small z-1 text-decoration-none"
                        to="/students">
                        <span className="float-left">View </span>
                        <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                        </span>
                    </Link>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                        <div className="card-body-icon">
                            <i className="fa fa-fw bi-person-fill"></i>
                        </div>
                        <div className="mr-5">Staff <span className="fw-bold">{summary.staffCount}</span></div>
                    </div>
                    <Link className="card-footer text-white clearfix small z-1 text-decoration-none"
                        to="/staff">
                        <span className="float-left">View </span>
                        <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                        </span>
                    </Link>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                        <div className="card-body-icon">
                            <i className="fa fa-fw bi-people"></i>
                        </div>
                        <div className="mr-5">Student Groups <span className="fw-bold">{summary.stdGrpCount}</span></div>
                    </div>
                    <Link className="card-footer text-white clearfix small z-1 text-decoration-none"
                        to="/studentgroups">
                        <span className="float-left">View </span>
                        <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                        </span>
                    </Link>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
                <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                        <div className="card-body-icon">
                            <i className="fa fa-fw bi-person-video2"></i>
                        </div>
                        <div className="mr-5">Panels <span className="fw-bold">{summary.panelCount}</span></div>
                    </div>
                    <Link className="card-footer text-white clearfix small z-1 text-decoration-none"
                        to="/panels">
                        <span className="float-left">View </span>
                        <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CountSummary