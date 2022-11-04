import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, FormFeedback, Input, Label } from 'reactstrap';

const RHFButtonGroup = ({ ...props }) => {

    const {
        name,
        data,
        label,
        errorobj,
        control,
        checked = false,
        disabled = false,
        onChange,
        ...extraProps
    } = props;

    let isError = false;
    let errorMessage = '';

    if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
        isError = true;
        errorMessage = errorobj[name].message;
    }

    const handleChange = (e) => {
        console.log('e.target.value :>> ', e.target.value);
        console.log('e.target.value :>> ', e.target.name);

    }

    return (
        <div className='my-3'>
            <Label className="form-Label d-block">
                {label}
            </Label>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group" onChange={handleChange}>
                {data.map((d, index) => {
                    return <>
                        <Input type="radio" className="btn-check"
                            name={name}
                            value={`${name + ' ' + d.id}`} id={d.id}
                            invalid={isError}
                            disabled={disabled}
                            key={index}
                        />
                        <label className="btn btn-outline-primary" htmlFor={d.id}>{d.labelName}</label>
                    </>
                })}
            </div>
            {isError && <FormFeedback type="invalid">{errorMessage}</FormFeedback>}
        </div>
    )
}

export default RHFButtonGroup
