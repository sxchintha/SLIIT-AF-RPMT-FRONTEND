import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Select from 'react-select'
import Swal from 'sweetalert2'

import { creatSubmission } from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Unauthorized from "../../components/landing/Unauthorized";

const subSelect = [
    {
        label: "Final Thesis",
        value: "Final Thesis"
    },
    {
        label: "Presentation",
        value: "Presentation"
    },
    {
        label: "Proposal Document",
        value: "Proposal Document"
    },
    {
        label: "Topic Assessment",
        value: "Topic Assessment"
    },
    {
        label: "Other",
        value: "Other"
    },

]

const fileTypes = [
    {
        label: "Any",
        value: "any"
    },
    {
        label: "DOCX / DOC",
        value: ".docx, .doc"
    },
    {
        label: "PDF",
        value: ".pdf"
    },
    {
        label: "PPTX / PPT",
        value: ".pptx, .ppt"
    },
    {
        label: "ZIP / RAR",
        value: ".zip, .rar"
    },

]

function NewSubmission() {

    const navigate = useNavigate()
    const [error, setError] = useState("");
    const localToken = JSON.parse(localStorage.getItem("localToken"));

    const [submissionData, setSubmissionData] = useState({
        submissionName: "",
        submissionType: "",
        description: "",
        deadline: new Date(),
        fileTypes: [],
        available: false

    });

    const handleSubmissionData = (e) => {
        // console.log(e.target.value);
        setSubmissionData({ ...submissionData, [e.target.name]: e.target.value })
    }

    const handleAvailable = (e) => {
        // console.log(e.target.checked);
        setSubmissionData({ ...submissionData, ["available"]: e.target.checked })
    }

    const handleSubmissionType = (e) => {
        setSubmissionData({ ...submissionData, ["submissionType"]: e.value })
        // console.log(e.value);
    }

    const handleFileTypes = (e) => {
        const selectedTypes = []
        e.forEach(type => {
            selectedTypes.push(type.value)
        })

        setSubmissionData({ ...submissionData, ["fileTypes"]: selectedTypes })
    }

    const allert = (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <div>
                {error}
            </div>
        </div>
    )

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log(submissionData);

        creatSubmission(submissionData)
            .then(res => {
                Swal.fire(
                    'Done!',
                    'Submission successfully created!',
                    'success'
                )
                navigate("/submissions")
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message)
                // console.log(err.response.data.error);
            })
    }

    return (
        <div>
            {
                localToken.role == 2001 ?
                    <div className="container-fluid overflow-hidden">
                        <div className="row vh-100 overflow-auto">
                            <Sidebar />

                            <div className="col d-flex flex-column h-sm-100">
                                <main className="row overflow-auto">
                                    <div className="col pt-4 ps-4">
                                        {/* Body */}
                                        <h2>New Submission</h2>
                                        <hr />

                                        <div className="d-flex justify-content-center m-5">
                                            <form className="w-75 g-3 sxch-glass-back" onSubmit={onSubmit}>
                                                <i className="bi bi-arrow-left-circle fs-4" onClick={() => navigate(-1)}> Go back</i>
                                                <div className="row g-3 mt-3">

                                                    {
                                                        error ? allert : ""
                                                    }

                                                    <div className="form-floating col-6">
                                                        <input type="text" className="form-control" id="submissionName" name="submissionName"
                                                            placeholder="Panel name" required onChange={handleSubmissionData} />
                                                        <label htmlFor="panelname" className="ms-2 text-secondary">Name</label>
                                                    </div>
                                                    <Select
                                                        closeMenuOnSelect={true}
                                                        name="submissionType"
                                                        placeholder="Submission type..."
                                                        value={submissionData.submissionTypes}
                                                        // isMulti
                                                        options={subSelect}
                                                        onChange={handleSubmissionType}
                                                        required
                                                    />
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        // components={animatedComponents}
                                                        name="fileTypes"
                                                        placeholder="Requiered file type..."
                                                        // value={submissionData.fileTypes}
                                                        isMulti
                                                        options={fileTypes}
                                                        onChange={handleFileTypes}
                                                        required
                                                    />

                                                    <label className="form-label">Deadline:</label>
                                                    <input type="datetime-local" className="col-5 m-1 mydatepicker"
                                                        name="deadline" id="deadline" onChange={handleSubmissionData} />

                                                    <div className="form-floating">
                                                        <textarea className="form-control" placeholder="Leave a note here"
                                                            id="description" name="description" onChange={handleSubmissionData}></textarea>
                                                        <label htmlFor="floatingTextarea" className="text-secondary">Description / Notes</label>
                                                    </div>

                                                </div>
                                                <label className="form-lable mt-4 me-3">Available for students</label>
                                                <label className="switch">
                                                    <input type="checkbox" name="available" onChange={handleAvailable} />
                                                    <span className="slider round"></span>
                                                </label>
                                                <br />
                                                <button type="submit" className="btn btn-outline-primary ms-2 mt-4">Submit</button>
                                            </form>
                                        </div>


                                    </div>
                                </main>
                                <Footer />
                            </div>
                        </div>
                    </div>
                    : <Unauthorized />
            }
        </div>
    )
}

export default NewSubmission;