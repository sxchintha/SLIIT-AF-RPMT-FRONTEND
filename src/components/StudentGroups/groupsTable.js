import React, { useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'

import { getAllGroups, getHavePanelGrps, getNoPanelGrps } from '../../index.api'
import { useNavigate } from 'react-router-dom'

const tableColumns = [
    {
        label: 'Group Name',
        field: 'groupName'
    },
    {
        label: 'Group Leader',
        field: 'leaderName'
    },
    {
        label: 'Supervisor',
        field: 'firstMember'
    },
    {
        label: 'Member 3',
        field: 'secondMember'
    },
    {
        label: 'Member 4',
        field: 'thirdMember'
    },

    // {
    //     label: 'Supervisor',
    //     field: '_id'
    // },
    // {
    //     label: 'Co-Supervisor',
    //     field: '_id'
    // },
]

function GroupTable() {

    const navigate = useNavigate()

    const [datatable, setDatatable] = useState({
        columns: [],
        rows: []
    })
    const [datatable1, setDatatable1] = useState({
        columns: [],
        rows: []
    })

    useEffect(() => {
        getNoPanelGrps()
            .then(res => {
                // console.log(res.data.groups);
                // var tempData = res.data.groups
                res.data.groups.forEach(group => {
                    group.clickEvent = () => {
                        navigate(`/studentgroups/${group._id}`)
                    }
                    // group?.allocatedPanel = group.allocatedPanel.panelName
                });

                setDatatable({
                    columns: tableColumns,
                    rows: res.data.groups
                })
            })
            .catch(err => {
                console.log(err.meesge);
            })
        getHavePanelGrps()
            .then(res => {
                // console.log(res.data.groups);
                // var tempData = res.data.groups
                res.data.groups.forEach(group => {
                    group.clickEvent = () => {
                        navigate(`/studentgroups/${group._id}`)
                    }
                    // group?.allocatedPanel = group.allocatedPanel.panelName
                });

                setDatatable1({
                    columns: tableColumns,
                    rows: res.data.groups
                })
            })
            .catch(err => {
                console.log(err.meesge);
            })
    }, [])

    return (
        <div>
            <h5>No panel allocated</h5>
            <MDBDataTableV5
                hover
                entriesOptions={[5, 10, 20, 25]}
                entries={10}
                pagesAmount={4}
                data={datatable}
                searchTop
                searchBottom={false} />
            <div className='m-3'></div>
            <hr />
            <h5>Panels allocated</h5>
            <MDBDataTableV5
                hover
                entriesOptions={[5, 10, 20, 25]}
                entries={10}
                pagesAmount={4}
                data={datatable1}
                searchTop
                searchBottom={false} />
        </div>
    )
}

export default GroupTable