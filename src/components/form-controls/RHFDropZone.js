import React, { Fragment, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { Button, Card, FormFeedback, Label } from 'reactstrap';
import FeatherIcon from "feather-icons-react";

const RHFDropZone = ({ control, errorobj, label, name, isRequired = true, pocSetvalue, }) => {
    let isError = false;
    let errorMessage = "";

    if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
        isError = true;
        errorMessage = errorobj[name]?.message;
    }

    return (

        <Controller
            render={({ field: onChange }) => (
                <Fragment>
                    {label && <Label htmlFor="example-text-input" className="form-Label">
                        {label} {isRequired && <span>*</span>}
                    </Label>}
                    <Dropzone
                        onChange={onChange}
                        label={label}
                        id="file"
                        pocSetvalue={pocSetvalue}
                        name={name}
                    />
                    {isError && (
                        <FormFeedback type="invalid">{errorMessage}</FormFeedback>
                    )}
                </Fragment>
            )}
            name={name}
            control={control}
            defaultValue={[]}
            id={name}
        />

    );
};

const Dropzone = ({ onChange, name, pocSetvalue, }) => {

    const [files, setfiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        // console.log({ acceptedFiles });
        pocSetvalue(name, files)

        setfiles(
            acceptedFiles.map((file) =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            )
        );

    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } =
        useDropzone({
            accept: "image/png, image/jpg, image/jpeg, image/gif",
            // accept: "image/*,audio/*,video/*",
            onDrop,
        });

    const additionalClass = isDragAccept
        ? "accept"
        : isDragReject
            ? "reject"
            : "";

    const deleteFile = (e) => {
        const deleted = files.filter((item, index) => index !== e);
        setfiles(deleted);
    }

    const images = files.map((file, index) => (

        <div className='file-preview' key={index}>
            <div>
                <FeatherIcon
                    className="delete-preview-image" size="20" icon="x"
                    onClick={() => { deleteFile(index) }}
                />
            </div>
            <img
                src={file.preview}
                alt="image"
            />
        </div>
    ));

    return (
        <>

            <div {...getRootProps({
                className: `droparea ${additionalClass}`

            })}>
                <input {...getInputProps({ onChange })} />
                <input {...getInputProps()} />
                <span>{isDragActive ? <FeatherIcon
                    icon="upload"
                /> : <FeatherIcon
                    icon="upload"
                />}</span>
                <p>Drag'n'drop images, or click to select files</p>
            </div>
            {
                files ?
                    <div>
                        {images}
                    </div> : ""
            }
        </>
    );
};

export default RHFDropZone
