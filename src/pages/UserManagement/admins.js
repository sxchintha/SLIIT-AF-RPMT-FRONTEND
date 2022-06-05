import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'

import { getAllAdmins } from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Unauthorized from "../../components/landing/Unauthorized";

function AdminsManagement() {

    const navigate = useNavigate()
    const localToken = JSON.parse(localStorage.getItem("localToken"));

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
            label: 'Name with initials',
            field: 'nameWithInitials',
        },
        {
            label: 'Address',
            field: 'address',
        },
        {
            label: 'NIC',
            field: 'nic',
        },
        {
            label: 'Email',
            field: 'email',
        },
        {
            label: 'Mobile',
            field: 'mobile',
        },
        {
            label: 'Landline',
            field: 'landline',
        }
    ]
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: [],
    });

    useEffect(() => {
        getAllAdmins()
            .then((res) => {
                // console.log(res.data);
                res.data.forEach(row => {
                    row.clickEvent = () => {
                        navigate(`/admin/profile/${row._id}`)
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
            {
                localToken.role == 2001 ?
                    <div className="container-fluid overflow-hidden">
                        <div className="row vh-100 overflow-auto">
                            <Sidebar />

                            <div className="col d-flex flex-column h-sm-100">
                                <main className="row overflow-auto">
                                    <div className="col pt-4 ps-4">
                                        {/* Body */}
                                        <h2>Admins</h2>
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
                    : <Unauthorized />
            }
        </div>
    )
}

export default AdminsManagement;