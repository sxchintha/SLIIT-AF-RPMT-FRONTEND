import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom"
import Swal from 'sweetalert2'

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import { updateMarking, deleteMarking } from '../../index.api'
import LoadingSpiner from '../LoadingSpinner';

export default function SunEditor() {

    const navigate = useNavigate()
    const location = useLocation()
    const { markingId } = useParams()
    // console.log(location.state);
    const [markingName, setMarkingName] = useState('')
    const [textMarking, setTextMarking] = useState('')
    const [availability, setAvailability] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState("");

    useEffect(() => {
        location.state ?
            setTextMarking(location.state.marking) &
            setAvailability(location.state.available) &
            setMarkingName(location.state.name) &
            setIsLoaded(true)
            : navigate(`/markingschemes`)

    }, [])

    // console.log(markingName);
    // console.log(textMarking);

    const onSave = (marking) => {
        console.log(marking)
    }

    const onSubmit = (marking) => {
        marking.preventDefault()

        const newMarking = {
            name: markingName,
            marking: textMarking,
            available: availability
        }

        // console.log(newMarking);
        // console.log(markingId);
        updateMarking(markingId, newMarking)
            .then(res => {
                if (!res.error) {
                    // console.log(res.data.status);
                    navigate('/markingschemes', { state: { message: res.data.status } })
                }
                else {
                    setError(err.response.data.error)
                    console.log(err.response.data.error);
                }
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
                deleteMarking(markingId)
                    .then(res => {
                        if (!res.error) {
                            // console.log(res)
                            navigate("/markingschemes", { state: { message: res.data.status } })
                        }
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
                    <form onSubmit={onSubmit} method="POST">
                        <div className="form-floating col-6">
                            <input name='markingName' type="text" className="form-control" placeholder='Marking name'
                                onChange={(e) => { setMarkingName(e.target.value) }} value={markingName} required />
                            <label htmlFor="firstname" className="ms-2 text-secondary">Marking scheme name...</label>
                        </div>
                        <label className="form-lable mt-4 me-3">Available for others</label>
                        <label className="switch">
                            <input type="checkbox" name="available" id="available"
                                defaultChecked={availability} onChange={(e) => { setAvailability(e.target.checked) }} />
                            <span className="slider round"></span>
                        </label>
                        <label>
                            <i className="bi bi-trash3-fill red ms-5" onClick={onDelete}> Remove</i>
                        </label>
                        <br />

                        <div className='mt-3'>
                            <SunEditor
                                // onSave={onSave}
                                width='90%'
                                height='500px'
                                name='textMarking'
                                onChange={(e) => {
                                    setTextMarking(e)
                                }}
                                placeholder="Please type here..."
                                defaultValue={textMarking}
                                // defaultValue={location.state.marking}
                                // defaultValue="<p>sdfasdf sd</p>"
                                autoFocus={false}
                                setOptions={{

                                    charCounter: true,
                                    charCounterLable: 'Characters :',
                                    buttonList: [
                                        ["undo", "redo"],
                                        ["font", "fontSize", "formatBlock"],
                                        ["bold", "underline", "italic", "strike", "subscript", "superscript", "fontColor", "hiliteColor", "textStyle", "removeFormat",],
                                        ["outdent", "indent",],
                                        ["align",],
                                        ["horizontalRule", "list", "lineHeight",],
                                        ["table", "link", "image",],
                                        ["fullScreen", "showBlocks", "codeView", "preview",],
                                        ["print", "save",]
                                    ],
                                }}
                            />
                        </div>

                        <input type="submit" id="btnSubmit" value="Update" className='btn btn-primary mt-3' />
                    </form>
                    : <LoadingSpiner />
            }
        </div>
    )
}
