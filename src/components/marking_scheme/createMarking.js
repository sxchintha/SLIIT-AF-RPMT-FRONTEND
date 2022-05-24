import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import * as api from '../../index.api'

export default function SunEditor() {

    const navigate = useNavigate()
    const [markingName, setMarkingName] = useState('')
    const [textMarking, setTextMarking] = useState('')


    const onSave = (marking) => {
        console.log(marking)
    }

    const onSubmit = (marking) => {
        marking.preventDefault()

        const newMarking = {
            name: markingName,
            marking: textMarking
        }

        api.createNewMarking(newMarking)
            .then(res => {
                if (!res.error) {
                    window.alert(res.status)
                    navigate('/marking-schemes')
                }
                else {
                    window.alert(res.error)
                }
            })

    }

    return (
        <div>
            <h1>Editor</h1>
            <form onSubmit={onSubmit} method="POST">
                <input name='markingName' type="text"
                    onChange={(e) => {
                        setMarkingName(e.target.value)
                    }} />
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

                <input type="submit" id="btnSubmit" />
            </form>
        </div>
    )
}
