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
                    // row.available ?
                    //     row.available = [
                    //         <i className="bi bi-check-circle-fill green" key={row._id}></i>, '']
                    //     : row.available = [
                    //         <i className="bi bi-x-circle red" key={row._id}></i>, '']

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
                    d = new Date(row.deadline)
                    row.deadline = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
                        + ' ' + d.getHours() + '.' + d.getMinutes()
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