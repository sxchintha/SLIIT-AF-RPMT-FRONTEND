import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

import { getAllStaff, createNewPanel } from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

function NewPanel() {

    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [staff, setStaff] = useState([]) // All staff details
    const [staffSelect, setStaffSelect] = useState([]) // Staff details in select fiels

    // Panel details
    const [panelData, setPanelData] = useState({
        panelName: "",
        panelDesc: "",
        panelMembers: []
    })

    useEffect(() => {
        getAllStaff()
            .then((res) => {
                setStaff(res.data)

            })
    }, []);

    useEffect(() => {
        var allStaff = []
        staff.forEach((member) => {
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

    const allert = (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <div>
                {error}
            </div>
            {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
        </div>
    )

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

        createNewPanel(panelData)
            .then((res) => {
                navigate("/panels")
            })
            .catch(err => {
                setError(err.response.data.error)
                console.log(err.response.data.error);
            })
    }

    return (
        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto h-100">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h2>New Panel</h2>
                                <hr />

                                <div className="d-flex justify-content-center m-5">
                                    <form className="row w-75 g-3 sxch-glass-back " onSubmit={onSubmit}>

                                        {
                                            error ? allert : ""
                                        }

                                        <div className="form-floating col-6">
                                            <input type="text" className="form-control" id="panelname" name="panelName"
                                                placeholder="Panel name" required onChange={handlePanelName} />
                                            <label htmlFor="panelname" className="ms-2 text-secondary">Panel name *</label>
                                        </div>
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a note here"
                                                id="panelDesc" name="panelDesc" onChange={handlePanelDesc}></textarea>
                                            <label htmlFor="floatingTextarea" className="text-secondary">Description / Notes</label>
                                        </div>

                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            name="panelMembers"
                                            // value={panelData.panelMembers}
                                            isMulti
                                            options={staffSelect}
                                            onChange={handlePanelMembers}
                                            required
                                        />

                                        <button type="submit" className="btn btn-outline-primary col-2 ms-2 mt-4">Submit</button>
                                    </form>
                                </div>

                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPanel;
