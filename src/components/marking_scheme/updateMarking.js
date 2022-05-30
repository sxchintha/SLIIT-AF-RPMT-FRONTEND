import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from "react-router-dom"

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import { updateMarking } from '../../index.api'

export default function SunEditor() {

    const navigate = useNavigate()
    const location = useLocation()
    const { markingId } = useParams()
    // console.log(location.state);
    const [markingName, setMarkingName] = useState('')
    const [textMarking, setTextMarking] = useState('')
    const [error, setError] = useState("");

    useEffect(() => {
        location.state ?
            setMarkingName(location.state.name) &
            setTextMarking(location.state.marking)
            : navigate(`markingschemes`)

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
            marking: textMarking
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

    return (
        <div>
            <form onSubmit={onSubmit} method="POST">
                <div className="form-floating col-6">
                    <input name='markingName' type="text" className="form-control" placeholder='Marking name'
                        onChange={(e) => { setMarkingName(e.target.value) }} value={markingName} required />
                    <label htmlFor="firstname" className="ms-2 text-secondary">Marking scheme name...</label>
                </div>

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
                        defaultValue={location.state.marking}
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

                <input type="submit" id="btnSubmit" className='btn btn-primary mt-3' />
            </form>
        </div>
    )
}
