import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'

import { getAllSubmissions } from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

const tableColumns = [
    {
        label: 'Submission',
        field: 'submissionName'
    },
    {
        label: 'Type',
        field: 'submissionType'
    },
    {
        label: 'Deadline',
        field: 'deadline'
    },
    {
        label: 'Availability for students',
        field: 'available'
    },
]

function Submission() {

    const navigate = useNavigate()
    const [forwardMessage, setForwardMessage] = useState("")
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: []
    })

    useEffect(() => {
        getAllSubmissions()
            .then(res => {
                // console.log(res.data);
                res.data.submissions.forEach(row => {
                    row.clickEvent = () => {
                        navigate(`/submissions/${row._id}`)
                    }

                    // Set toggle icon for availability
                    row.available ?
                        row.available = [
                            <label className="switch" key={row._id}>
                                <input type="checkbox" checked disabled />
                                <span className="slider round"></span>
                            </label>, '']
                        : row.available = [
                            <label className="switch" key={row._id}>
                                <input type="checkbox" disabled />
                                <span className="slider round"></span>
                            </label>, '']

                    // Format date to show
                    let hours = 0
                    let minutes = 0
                    var d = new Date(row.deadline)
                    d.getHours() < 10 ? hours = '0' + d.getHours() : hours = String(d.getHours())
                    d.getMinutes() < 10 ? minutes = '0' + d.getMinutes() : minutes = String(d.getMinutes())

                    row.deadline = d.toDateString() + ', ' + hours + ':' + minutes
                })

                setDatatable({
                    columns: tableColumns,
                    rows: res.data.submissions
                })
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
                                <h2>Submissions</h2>
                                <Link to='/submissions/new' className="btn btn-outline-sliit-primary">
                                    <i className="bi bi-plus-circle"></i> New Submission
                                </Link>
                                <hr />

                                <MDBDataTableV5
                                    hover
                                    entriesOptions={[5, 10, 20, 25]}
                                    entries={10}
                                    pagesAmount={4}
                                    data={datatable}
                                    searchTop
                                    // checkbox
                                    searchBottom={false} />

                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Submission;