import React, { Fragment, useState } from 'react'
import { Controller } from 'react-hook-form';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormFeedback, Label } from 'reactstrap';

const RHFTextEditor = (props) => {

    const {
        onTextEditorChange,
        name,
        errorobj,
        control,
        defaultValue,
        label = "label",
        isRequired = true,
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
    let someValue = "";

    if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
        isError = true;
        errorMessage = errorobj[name].message;
    }
    if (defaultValue !== undefined) {
        someValue = defaultValue;
    }

    return (
        <Controller
            render={({ field }) => (
                <Fragment>
                    {label && <Label htmlFor="example-text-input" className="form-Label">
                        {label} {isRequired && <span>*</span>}
                    </Label>
                    }
                    <ReactQuill
                        name="sasssas"
                        theme="snow"
                        onChange={(e) => field.onChange(e)}
                        modules={modules}
                        formats={formats}
                    />
                    {isError && (
                        <FormFeedback type="invalid">{errorMessage}</FormFeedback>
                    )}
                </Fragment>
            )}
            name={name}
            control={control}
            id={name}
            defaultValue={someValue}
        />

    )
}

export default RHFTextEditor
