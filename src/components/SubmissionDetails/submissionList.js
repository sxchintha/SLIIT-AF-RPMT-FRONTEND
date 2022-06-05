import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'

import { getItems } from '../../components/SubmissionDetails/api/index';

import Sidebar from "../Sidebar";
import Footer from "../Footer";

function SubmissionList() {


    const navigate = useNavigate()
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: [],
    });
    

    const tableColumns = [
        {
            label: 'Leader ID',
            field: '_id'
        },
        {
            label: 'LeaderID',
            field: 'itNumber'
        },
        {
            label: 'Date',
            field: 'date'
        },
    ]

    useEffect(() => {
        getItems()
            .then((res) => {
                // console.log(res.data);
                res.data.forEach(row => {
                    row.clickEvent = () => {
                        navigate(`/student/submissionview/${row.itNumber}`)
                    }
                    row._id = row._id.length
                });
                setDatatable({
                    columns: tableColumns,
                    rows: res.data
                })
            })
            .catch(err => {
                console.log(err.message);
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
                                <h2>Panel Details</h2>
                                <hr />
                               
                                <div>
                                    <MDBDataTableV5
                                        hover
                                        entriesOptions={[5, 10, 20, 25]}
                                        entries={10}
                                        pagesAmount={4}
                                        data={datatable}
                                        searchTop
                                        searchBottom={false} />
                                </div>

                            </div>
                        </main>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionList;

