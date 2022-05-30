import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import { createNewMarking } from '../../index.api'
import { alertError } from '../../components/Alerts'

export default function SunEditor() {

    const navigate = useNavigate()
    const [markingName, setMarkingName] = useState('')
    const [textMarking, setTextMarking] = useState('')
    const [availability, setAvailability] = useState(false)
    const [error, setError] = useState("");


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
        createNewMarking(newMarking)
            .then(res => {
                // console.log(res);
                if (!res.error) {
                    navigate('/markingschemes', { state: { message: res.data.status } })
                }
                else {
                    setError(res.response.data.error)
                    console.log(res.response.data.error);
                }
            })
            .catch(err => {
                // console.log(err.response.data.error);
                setError(err.response.data.error)
            })

    }

    return (
        <div>
            <h2>Editor</h2>
            <hr />
            {
                error ? alertError(error) : ""
            }
            <form onSubmit={onSubmit} method="POST">
                <div className="form-floating col-6">
                    <input name='markingName' type="text" className="form-control" placeholder='Marking name'
                        onChange={(e) => { setMarkingName(e.target.value) }} required />
                    <label htmlFor="firstname" className="ms-2 text-secondary">Marking scheme name...</label>
                </div>
                <label className="form-lable mt-4 me-3">Available for others</label>
                <label className="switch">
                    <input type="checkbox" name="available" id="available" onChange={(e) => { setAvailability(e.target.checked) }} />
                    <span className="slider round"></span>
                </label>

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

                <input type="submit" id="btnSubmit" className='btn btn-primary mt-3' />
            </form>
        </div>
    )
}
