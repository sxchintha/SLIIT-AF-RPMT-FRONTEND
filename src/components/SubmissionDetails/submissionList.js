import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'

import { getItems } from '../../components/SubmissionDetails/api/index'

function SubmissionList() {


    const navigate = useNavigate()
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: [],
    });
    

    const tableColumns = [
        {
            label: 'Panel name',
            field: '_id'
        },
        {
            label: 'Members',
            field: 'itNumber'
        },
        {
            label: 'Description / Notes',
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
            <MDBDataTableV5
                hover
                entriesOptions={[5, 10, 20, 25]}
                entries={10}
                pagesAmount={4}
                data={datatable}
                searchTop
                searchBottom={false} />
        </div>
    )
}

export default SubmissionList;