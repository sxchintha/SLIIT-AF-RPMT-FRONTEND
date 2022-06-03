import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Select from 'react-select'
import LoadingSpinner from '../../components/LoadingSpinner'

import { getAcceptedStaff, updatePanel } from '../../index.api'
import { alertError } from '../../components/Alerts'

function EditPanelComp(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const { panelId } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [tempSelect, setTempSelect] = useState([])

    const [error, setError] = useState("");
    const [staff, setStaff] = useState([]) // All staff details
    const [staffSelect, setStaffSelect] = useState([]) // Staff details in select fiels

    // Panel details
    const [panelData, setPanelData] = useState({
        panelName: "",
        panelMembers: []
    })

    useEffect(() => {
        getAcceptedStaff()
            .then((res) => {
                setStaff(res.data)
            })
        location.state ?
            setPanelData(location.state.panelDetails)
            : navigate(`/panels/${panelId}`)
    }, []);

    useEffect(() => {
        setIsLoaded(false)
        const allStaff = []
        staff.map((member) => {
            var memberDetails = {
                value: member._id,
                label: member.firstname + ' ' + member.lastname + ' ' + '(' + member.username + ')'
            }
            // console.log(memberDetails);
            // console.log(typeof(memberDetails));
            allStaff.push(memberDetails)

        })

        setStaffSelect(allStaff)

    }, [staff])

    useEffect(() => {
        const forward = location.state.panelDetails
        // console.log(panelData.panelMembers);
        const tempMember = []
        forward.panelMembers.forEach(member => {
            const temmem = staffSelect.filter(staff => {
                return staff.value == member
            })
            // console.log(temmem[0]);
            tempMember.push(temmem[0])
        })

        // console.log(tempMember);
        setTempSelect(tempMember)

        setIsLoaded(true)
    }, [staffSelect])


    const handlePanelName = (e) => {
        setPanelData({ ...panelData, ["panelName"]: e.target.value })
    }
    const handlePanelDesc = (e) => {
        setPanelData({ ...panelData, ["panelDesc"]: e.target.value })
    }

    const handlePanelMembers = (e) => {
        const memberIDs = []
        e.forEach((member) => {
            memberIDs.push(member.value)
        })

        setPanelData({ ...panelData, ["panelMembers"]: memberIDs })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log(panelData);

        updatePanel(panelId, panelData)
            .then((res) => {
                navigate(`/panels/${panelId}`)
            })
            .catch(err => {
                setError(err.response.data.error)
                console.log(err.response.data.error);
            })
    }

    return (
        <div>
            {
                isLoaded ?

                    <div className="d-flex justify-content-center m-5">
                        <form className="row w-75 g-3 sxch-glass-back " onSubmit={onSubmit}>
                            <i className="bi bi-arrow-left-circle fs-4" onClick={() => navigate(-1)}> Go back</i>
                            {
                                error ? alertError(error) : ""
                            }

                            <div className="form-floating col-6">
                                <input type="text" className="form-control" id="panelname" name="panelName"
                                    placeholder="Panel name" required onChange={handlePanelName} value={panelData.panelName} />
                                <label htmlFor="panelname" className="ms-2 text-secondary">Panel name *</label>
                            </div>
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Leave a note here"
                                    id="panelDesc" name="panelDesc" onChange={handlePanelDesc} value={panelData.panelDesc}></textarea>
                                <label htmlFor="floatingTextarea" className="text-secondary">Description / Notes</label>
                            </div>

                            <Select
                                closeMenuOnSelect={false}
                                // components={animatedComponents}
                                name="panelMembers"
                                defaultValue={tempSelect}
                                isMulti
                                options={staffSelect}
                                onChange={handlePanelMembers}
                                required
                            />

                            <button type="submit" className="btn btn-outline-primary col-2 ms-2 mt-4">Update</button>
                        </form>
                    </div>
                    : <LoadingSpinner />

            }
        </div>
    )
}

export default EditPanelComp;
