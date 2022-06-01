import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPendingStaff, staffStatus } from '../../index.api'

export default function AcceptStaff() {

    const navigate = useNavigate()
    const [datatable, setDatatable] = useState([])

    useEffect(() => {
        getPendingStaff()
            .then(res => {
                // console.log(res.data);
                setDatatable(res.data)
            })
    }, [])

    const handleAccept = (status, staffId) => {
        staffStatus(staffId, { isAccepted: status })
            .then(() => {
                setDatatable(datatable.filter(data => data._id !== staffId))
            })
    }

    return (
        <div className="card mb-3">
            <div className="card-header">
                <i className="fa fa-table"></i> Staff Register Requests</div>
            <div className="card-body">
                <div className="table-responsive">
                    {
                        datatable.length > 0 ?
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Telephone</th>
                                        <th>Research Area</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        datatable.map(staff => {
                                            return (

                                                <tr key={staff._id}>
                                                    <td>{staff.firstname} {staff.lastname}</td>
                                                    <td>{staff.username}</td>
                                                    <td>{staff.email}</td>
                                                    <td>{staff.telephone}</td>
                                                    <td>{staff.researcharea}</td>
                                                    <td>
                                                        <button className="accept" type="button" onClick={() => { handleAccept(true, staff._id) }}>Accept <span className="bi bi-check-lg"></span></button>
                                                        <button className="deny" type="button" onClick={() => { handleAccept(false, staff._id) }}>Reject <span className="bi bi-x"></span></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            : <h4>No requests available!</h4>
                    }
                </div>
            </div>
        </div >
    )
}