import React, { useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormFeedback } from 'reactstrap';

const RHFTextEditor = (props) => {

    const {
        onTextEditorChange,
        placeHolder,
        name,
        errorobj,
        control,
    } = props
    const [state, setState] = useState({ value: null });

    const handleChange = (value) => {
        setState({ value });
        console.log('object :>> ', value)
        if (onTextEditorChange) {
            onTextEditorChange(value);
        }

    };
    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [
                { align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" }
            ]
        ]
    };

    // Formats objects for setting up the Quill editor
    const formats = [
        "bold",
        "italic",
        "underline",
        "align",
        "list",
        "bullet"
    ];

    let isError = false;
    let errorMessage = '';

    if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
        isError = true;
        errorMessage = errorobj[name].message;
    }

    return (
        <>
            <ReactQuill
                name="sasssas"
                theme="snow"
                value={state.value}
                // onChange={(editor) => handleChange(editor.getText())}
                onChange={handleChange}
                placeholder={placeHolder}
                modules={modules}
                formats={formats}
            />
            {isError && <FormFeedback type="invalid">{errorMessage}</FormFeedback>}
        </>

    )
}

export default RHFTextEditor
