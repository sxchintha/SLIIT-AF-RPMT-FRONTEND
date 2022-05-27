import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Select from 'react-select'
import Swal from 'sweetalert2'

import { creatSubmission } from '../../index.api'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

const subSelect = [
    {
        label: "Final Thesis",
        value: "Final Thesis"
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
        label: "Presentation",
        value: "Presentation"
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
        label: "PDF",
        value: ".pdf"
    },
    {
        label: "PPTX / PPT",
        value: ".pptx, .ppt"
    },
    {
        label: "DOCX / DOC",
        value: ".docx, .doc"
    },
    {
        label: "ZIP / RAR",
        value: ".zip, .rar"
    },

]

function NewSubmission() {

    const navigate = useNavigate()
    const [error, setError] = useState("");

    const [submissionData, setSubmissionData] = useState({
        submissionName: "",
        submissionType: "",
        description: "",
        deadline: new Date(),
        fileTypes: [],

    });

    const handleSubmissionData = (e) => {
        setSubmissionData({ ...submissionData, [e.target.name]: e.target.value })
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
                setError(err.message.data.error)
                console.log(err.response.data.error);
            })
    }

    return (
        <div>
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
                                    <form className="row w-75 g-3 sxch-glass-back" onSubmit={onSubmit}>

                                        {
                                            error ? allert : ""
                                        }

                                        <div className="form-floating col-6">
                                            <input type="text" className="form-control" id="submissionName" name="submissionName"
                                                placeholder="Panel name" required onChange={handleSubmissionData} />
                                            <label htmlFor="panelname" className="ms-2 text-secondary">Submission name</label>
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
                                        <input type="datetime-local" className="col-5 m-1"
                                            name="deadline" id="deadline" onChange={handleSubmissionData} />

                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a note here"
                                                id="description" name="description" onChange={handleSubmissionData}></textarea>
                                            <label htmlFor="floatingTextarea" className="text-secondary">Description / Notes</label>
                                        </div>

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

export default NewSubmission;