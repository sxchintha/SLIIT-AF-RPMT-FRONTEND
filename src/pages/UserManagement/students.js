import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'

import * as api from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

function StudentManagement() {

    const tableColumns = [
        {
            label: 'Name',
            field: 'name',
        },
        {
            label: 'Registration Number',
            field: 'itNumber',
        },
        {
            label: 'Email',
            field: 'email',
        },
    ]
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: [],
    });

    useEffect(() => {
        api.getAllStudents()
            .then((res) => {
                setDatatable({
                    columns: tableColumns,
                    rows: res.data
                })
            })
    }, []);

    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h1>Students</h1>

                                <hr />

                                <MDBDataTableV5
                                    hover
                                    entriesOptions={[5, 10, 20, 25]}
                                    entries={10}
                                    pagesAmount={4}
                                    data={datatable}
                                    searchTop
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

export default StudentManagement;