import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Select from 'react-select'
import Swal from 'sweetalert2'
import LoadingSpinner from '../../components/LoadingSpinner'

import { getSubmission, updateSubmission, deleteSubmission } from '../../index.api'
import { alertError } from '../../components/Alerts'

import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

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

    const { submissionId } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false)

    // const [submissionData, setSubmissionData] = useState([{
    //     submissionName: "",
    //     submissionType: "",
    //     description: "",
    //     deadline: new Date(),
    //     fileTypes: [],

    // }]);

    const [submissionData, setSubmissionData] = useState([])
    const [subTempSelect, setSubTempSelect] = useState([]) //
    const [fileTempSelect, setFileTempSelect] = useState([])
    const [dateTempSet, setDateTempSet] = useState("")

    useEffect(() => {
        setIsLoaded(false)
        getSubmission(submissionId)
            .then(async res => {
                // console.log(res.data);
                const submission = res.data.submission
                const d = new Date(submission.deadline)

                // Formating date to set deadline
                // Date should be format for the correct type to assign it 
                // on date field
                let month = 0
                let date = 0
                let hours = 0
                let minutes = 0
                d.getMonth() < 10 ? month = '0' + (d.getMonth() + 1) : month = String(d.getMonth())
                d.getDate() < 10 ? date = '0' + d.getDate() : date = String(d.getDate())
                d.getHours() < 10 ? hours = '0' + d.getHours() : hours = String(d.getHours())
                d.getMinutes() < 10 ? minutes = '0' + d.getMinutes() : minutes = String(d.getMinutes())

                setDateTempSet(d.getFullYear() + '-' + month + '-' + date
                    + 'T' + hours + ':' + minutes)

                // console.log(submission.deadline);

                // To set submission type select field
                // Filter select option from subSelect list and assign it 
                // to submision. Otherwise we cant select it in select field
                // on page load
                const subtype = subSelect.filter((sub) => {
                    return sub.value == submission.submissionType
                })
                // console.log(subtype[0]);
                setSubTempSelect(subtype[0])
                // submission.submissionType = subtype[0]

                // To set requiered file type select field
                const filetype = []
                submission.fileTypes.forEach(ftype => {

                    const temptype = fileTypes.filter((file) => {
                        return file.value == ftype
                    })
                    // console.log(temptype[0]);
                    filetype.push(temptype[0])

                })
                setFileTempSelect(filetype)
                // submission.tempfileTypes = filetype

                setSubmissionData(submission)
                setIsLoaded(true)
                // console.log(dateTempSet);
                // console.log(submissionData);
            })
    }, [])

    const handleAvailable = (e) => {
        // console.log(e.target.checked);
        setSubmissionData({ ...submissionData, ["available"]: e.target.checked })
    }

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

        updateSubmission(submissionId, submissionData)
            .then(res => {
                Swal.fire(
                    'Done!',
                    'Submission successfully updated!',
                    'success'
                )
                // console.log(res.data.status);
                navigate("/submissions")
            })
            .catch(err => {
                setError(err.message.data.error)
                console.log(err.response.data.error);
            })
    }

    const onDelete = (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
            if (result.isConfirmed) {
                deleteSubmission(submissionId)
                    .then(res => {
                        // console.log(res)
                        navigate("/submissions")
                    })
                    .catch(err => {
                        console.log(err.message.data.error)
                        setError(err.message.data.error)
                    })
            }
        })


    }

    return (
        <div>
            {
                isLoaded ?
                    <div className="container-fluid overflow-hidden">
                        <div className="row vh-100 overflow-auto">
                            <Sidebar />

                            <div className="col d-flex flex-column h-sm-100">
                                <main className="row overflow-auto">
                                    <div className="col pt-4 ps-4">
                                        {/* Body */}
                                        <h2>Update Submission</h2>
                                        <hr />

                                        <div className="d-flex justify-content-center m-5">
                                            <form className="w-75 g-3 sxch-glass-back" onSubmit={onSubmit}>
                                                <i className="bi bi-arrow-left-circle fs-4" onClick={() => navigate(-1)}> Go back</i>
                                                <div className="row g-3 mt-3">
                                                    {
                                                        error ? alertError(error) : ""
                                                    }

                                                    <div className="form-floating col-6">
                                                        <input type="text" className="form-control" id="submissionName" name="submissionName"
                                                            placeholder="Panel name" required onChange={handleSubmissionData} value={submissionData.submissionName} />
                                                        <label htmlFor="panelname" className="ms-2 text-secondary">Name</label>
                                                    </div>
                                                    <Select
                                                        closeMenuOnSelect={true}
                                                        name="submissionType"
                                                        placeholder="Submission type..."
                                                        defaultValue={subTempSelect}
                                                        options={subSelect}
                                                        onChange={handleSubmissionType}
                                                        required
                                                    />
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        name="fileTypes"
                                                        placeholder="Requiered file type..."
                                                        defaultValue={fileTempSelect}
                                                        isMulti
                                                        options={fileTypes}
                                                        onChange={handleFileTypes}
                                                        required
                                                    />

                                                    <label className="form-label">Deadline:</label>
                                                    <input type="datetime-local" className="col-5 m-1 mydatepicker" defaultValue={dateTempSet}
                                                        name="deadline" id="deadline" onChange={handleSubmissionData} />

                                                    <div className="form-floating">
                                                        <textarea className="form-control" placeholder="Leave a note here" value={submissionData.description}
                                                            id="description" name="description" onChange={handleSubmissionData}></textarea>
                                                        <label htmlFor="floatingTextarea" className="text-secondary">Description / Notes</label>
                                                    </div>
                                                </div>

                                                <label className="form-lable mt-4 me-3">Available for students</label>
                                                <label className="switch">
                                                    <input type="checkbox" name="available" id="available" onChange={handleAvailable} defaultChecked={submissionData.available} />
                                                    <span className="slider round"></span>
                                                </label>
                                                <br />

                                                <button type="submit" className="btn btn-outline-primary ms-2 mt-4">Update</button>
                                                <button type="button" className="btn btn-outline-danger ms-2 mt-4" onClick={onDelete}>
                                                    <i className="bi bi-trash3-fill"></i> Remove
                                                    </button>
                                            </form>
                                        </div>


                                    </div>
                                </main>
                                <Footer />
                            </div>
                        </div>
                    </div>
                    : <LoadingSpinner />
            }
        </div>
    )


}

export default NewSubmission;