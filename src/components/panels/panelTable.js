import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"


import { getAllPanels } from '../../index.api'

function PanelTable() {

    const navigate = useNavigate()
    const [datatable, setDatatable] = useState([]);

    useEffect(() => {
        getAllPanels()
            .then((res) => {
                setDatatable(res.data)
                // console.log(res.data[0].panelMembers);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    return (
        <table className="table table-hover w-75">
            <thead>
                <tr>
                    <th>Panel name</th>
                    <th>Members</th>
                    <th>Description / Notes</th>
                </tr>
            </thead>
            <tbody>
                {
                    datatable.map((row) => {
                        // console.log(row._id);
                        return (
                            // <tr key={row._id} id={row._id} onClick={(e) => { onClickRow(e) }}>
                            <tr key={row._id} id={row._id} onClick={() => { navigate(`/panels/${row._id}`) }}>
                                <td>{row.panelName}</td>
                                <td>{row.panelMembers.length}</td>
                                <td>{row.panelDesc}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default PanelTable;