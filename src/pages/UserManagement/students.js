import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'

import * as api from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Unauthorized from "../../components/landing/Unauthorized";

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
    const localToken = JSON.parse(localStorage.getItem("localToken"));

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
            {
                localToken.role == 2001 ?
                    <div className="container-fluid overflow-hidden">
                        <div className="row vh-100 overflow-auto">
                            <Sidebar />

                            <div className="col d-flex flex-column h-sm-100">
                                <main className="row overflow-auto">
                                    <div className="col pt-4 ps-4">
                                        {/* Body */}
                                        <h2>Students</h2>

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
                    : <Unauthorized />
            }
        </div>
    )
}

export default StudentManagement;