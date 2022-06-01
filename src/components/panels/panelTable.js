import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MDBDataTableV5 } from 'mdbreact'

import { getAllPanels } from '../../index.api'

function PanelTable() {

    const navigate = useNavigate()
    const [datatable, setDatatable] = useState({
        columns: [],
        rows: [],
    });

    const tableColumns = [
        {
            label: 'Panel name',
            field: 'panelName'
        },
        {
            label: 'Members',
            field: 'panelMembers'
        },
        {
            label: 'Description / Notes',
            field: 'panelDesc'
        },
    ]

    useEffect(() => {
        getAllPanels()
            .then((res) => {
                // console.log(res.data);
                res.data.forEach(row => {
                    row.clickEvent = () => {
                        navigate(`/panels/${row._id}`)
                    }
                    row.panelMembers = row.panelMembers.length
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

export default PanelTable;