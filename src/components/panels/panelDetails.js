import React, { useState, useEffect, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from '../../components/LoadingSpinner'

import { getPanelDetails, getStaffMember } from '../../index.api'

import '../../style/PanelDetails.scss'

function PanelDetails() {

    const navigate = useNavigate()
    const { panelId } = useParams()

    const [isLoaded, setIsLoaded] = useState(false)
    const [memberDetails, setMemberDetails] = useState([])

    const [panelDetails, setPanelDetails] = useState({
        panelName: "",
        panelDesc: "",
        panelMembers: [],
    })

    useEffect(() => {
        setIsLoaded(false)
        getPanelDetails(panelId)
            .then(async res => {
                panelData = res.data.panel
                setPanelDetails(panelData)

                var memberDetails = []
                const complete = panelData.panelMembers.map(async (member) => {
                    await getStaffMember(member)
                        .then(async memberData => {
                            memberDetails.push(memberData.data.staff)
                        })


                })

                // Wait for all requests, and then setState
                Promise.all(complete).then(() => {
                    setMemberDetails(memberDetails)
                    setIsLoaded(true)
                })

            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    const cardShow = (e) => {
        if (document.getElementById(e).classList.contains('show'))
            document.getElementById(e).classList.remove('show');
        else
            document.getElementById(e).classList.add('show');
    }

    return (
        <div>
            {
                isLoaded ?
                    <div>
                        {/* <div className="d-flex justify-content-center m-5"> */}
                        <div className="sxch-container w-75 p-2">
                            <h5>Panel name: {panelDetails.panelName}</h5>
                            <h5>Description: {panelDetails.panelDesc}</h5>
                            <h5>Members:</h5>

                            <div className="member-list">
                                {
                                    panelDetails.panelMembers.map((member, key) => {
                                        return (
                                            memberDetails[key] ?
                                                <div className="card w-50" key={key} name={key}>
                                                    {/* <div className="card-header">
                                                            <h5 className="mb-0"> */}
                                                    <button className="btn card-header" onClick={() => { cardShow(key) }}>
                                                        {memberDetails[key].firstname + " " + memberDetails[key].lastname}
                                                    </button>
                                                    {/* </h5>
                                                        </div> */}
                                                    <div id={key} className="collapse">
                                                        <div className="card-body">
                                                            <p>Research area: {memberDetails[key].researcharea}</p>
                                                            <p>Email: {memberDetails[key].email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                : ""
                                        )
                                    })
                                }
                            </div>

                            {/* </div> */}
                        </div>
                    </div>
                    : <LoadingSpinner />
            }
        </div>
    )
}

export default PanelDetails;