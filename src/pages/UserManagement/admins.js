import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'

import * as api from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

function AdminsManagement() {

    const tableColumns = [
        {
            label: 'Name',
            field: 'name',
        },
        {
            label: 'Email',
            field: 'email',
        },
        {
            label: 'Username',
            field: 'userName',
        }
    ]
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: [],
    });

    useEffect(() => {
        api.getAllAdmins()
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
                                <h1>Admins</h1>
                                <Link to='/admins/new' className="btn btn-outline-sliit-primary">
                                    <i className="bi bi-plus-circle"></i> Add new Admin
                                </Link>

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

export default AdminsManagement;