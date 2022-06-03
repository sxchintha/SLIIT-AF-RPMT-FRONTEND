import React, { useState, useEffect } from 'react'
import { MDBDataTableV5 } from 'mdbreact'

import { getAllGroups } from '../../index.api'
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
        label: 'Member 2',
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

    useEffect(() => {
        getAllGroups()
            .then(res => {
                // console.log(res.data);
                res.data.groups.forEach(group => {
                    group.clickEvent = () => {
                        navigate(
                            `/studentgroups/${group._id}`,
                            { state: { group } }
                        )
                    }
                });

                setDatatable({
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

export default GroupTable