import React, { useRef, useState } from 'react'
import { FormFeedback, Label } from 'reactstrap';
import RHFButton from './RHFButton';



const RHFUpload = ({ inputRef, name, id, label, errorobj, getFileData, setValue, isValidate = false }) => {

    let isError = false;
    let errorMessage = '';

    if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
        isError = true;
        errorMessage = errorobj[name]?.message;
    }

    const handleUpload = () => {
        inputRef && inputRef?.current?.click();
    };

    const onFileUpload = (e) => {
        const objectUrl = URL.createObjectURL(e?.target?.files[0]);
        getFileData({ file: e?.target?.files[0], base64: objectUrl })
        setValue(name, e?.target?.files[0])

    }
    console.log('isError :>> ', isError);
    console.log('errorobj :>> ', errorobj);

    return (
        <>
            <div className="profile-container">
                <div className='d-flex justify-content-between'>

                    <Label htmlFor={name} className="form-Label">
                        {label}
                    </Label>
                    <input
                        className="d-none"
                        ref={inputRef}
                        name={name}
                        id={id}
                        type="file"
                        onChange={(e) => onFileUpload(e)}
                    />
                    <RHFButton
                        btnName="Upload"
                        type='button'
                        onClick={() => handleUpload()} />

                </div>
                {isError && isValidate && <FormFeedback type="invalid">{errorMessage}</FormFeedback>}

            </div>

        </>
    )
}

export default RHFUpload
