import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'

import { getAcceptedStaff } from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

function StaffManagement() {

    const navigate = useNavigate()

    const tableColumns = [
        {
            label: 'First name',
            field: 'firstname',
        },
        {
            label: 'Last name',
            field: 'lastname',
        },
        {
            label: 'Username',
            field: 'username',
        },
        {
            label: 'Email',
            field: 'email',
        },
        {
            label: 'Telephone',
            field: 'telephone',
        },
        {
            label: 'Research Area',
            field: 'researcharea',
        }
    ]
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: [],
    });

    useEffect(() => {
        getAcceptedStaff()
            .then((res) => {
                res.data.forEach(row => {
                    row.clickEvent = () => {
                        navigate(`/staff/profile/${row._id}`)
                    }
                });
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
                                <h2>Staff</h2>

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

export default StaffManagement;