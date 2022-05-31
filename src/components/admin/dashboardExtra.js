import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailableSubmissions } from "../../index.api";

function DashboardExtra() {

    const navigate = useNavigate()
    const [datatable, setDatatable] = useState([])

    useEffect(() => {
        getAvailableSubmissions()
            .then(res => {
                // console.log(res.data.submissions);
                setDatatable(res.data.submissions)
            })
    }, [])
    return (
        <div className="row">
            <div className="col-lg-8">
                <div className="card mb-3">
                    <div className="card-header">
                        <i className="fa fa-bar-chart"></i> Improtant</div>
                    <div className="card-body">
                        {/* Body */}
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card mb-3">
                    <div className="card-header">
                        <i className="fa fa-pie-chart"></i> Submissions</div>
                    <div className="card-body">
                        {/* Body */}
                        <table className="table">
                            <tbody>
                                {
                                    datatable.map(submission => {
                                        return (
                                            <tr key={submission._id}>
                                                <td>{submission.submissionName}</td>
                                                <td>{new Date(submission.deadline).toDateString()}</td>
                                                <td onClick={() => { navigate(`/submissions/${submission._id}`) }}
                                                className="text-primary ">
                                                    <i role="button" class="bi bi-pencil"></i>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardExtra