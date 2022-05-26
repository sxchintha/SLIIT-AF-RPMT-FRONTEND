import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { getPanelDetails } from '../../index.api'

function PanelDetails() {

    const navigate = useNavigate()
    const { panelId } = useParams()
    const [panelDetails, setPanelDetails] = useState({
        panelName: "",
        panelDesc: "",
        panelMembers: [],
    })

    useEffect(() => {
        getPanelDetails(panelId)
            .then(res => {
                setPanelDetails(res.data.panel)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <div>
            <h1>Panel name: {panelDetails.panelName}</h1>
            <h1>Description: {panelDetails.panelDesc}</h1>
            <h1>Members:</h1>

            {
                panelDetails.panelMembers.map(member => {
                    return (
                        <h3 key={member}>{member}</h3>
                    )
                })
            }
        </div>
    )
}

export default PanelDetails;