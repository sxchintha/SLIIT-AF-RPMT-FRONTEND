import React, { useState } from "react";

function NewPanel() {
    const [inputFields, setInputFields] = useState([
        { name: '', age: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = (e) => {
        e.preventDefault()
        let newfield = { name: '', age: '' }

        setInputFields([...inputFields, newfield])
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)
    }


    return (
        <div className="App">
            <form onSubmit={submit}>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            <input
                                name='name'
                                placeholder='Name'
                                value={input.name}
                                onChange={event => handleFormChange(index, event)}
                            />
                            <input
                                name='age'
                                placeholder='Age'
                                value={input.age}
                                onChange={event => handleFormChange(index, event)}
                            />
                            <button onClick={() => removeFields(index)}>Remove</button>
                        </div>

                    )
                })}
                <button onClick={addFields}>Add More..</button>
                <button onClick={submit}>Submit</button>
            </form>
        </div>
    );
}

export default NewPanel;