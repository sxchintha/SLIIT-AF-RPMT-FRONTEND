import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'
import axios from "axios";


function SubmissionList() {


    const navigate = useNavigate()
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: [],
    });
    

    const tableColumns = [
        {
            label: 'Leader ID',
            field: 'itNumber'
        },
        {
            label: 'Topic',
            field: 'topic'
        },

        {
            label: 'Presentation Link',
            field: 'Link'
        },

        {
            label: 'Date',
            field: 'date'
        },
    ]

    useEffect(() => {
        axios
        .get(`http://localhost:8070/presentation/presentationview`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((res) => {
                // console.log(res.data);
                res.data.forEach(row => {
                    row.clickEvent = () => {
                        navigate(`/student/presentationview/${row.itNumber}`)
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