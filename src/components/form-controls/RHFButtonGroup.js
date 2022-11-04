import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button, FormFeedback, Input, Label } from 'reactstrap';

const RHFButtonGroup = (props) => {

    const {
        data, control, name, label, onChange, errorobj, defaultValue
    } = props;

    let isError = false;
    let errorMessage = "";
    let someValue = "";

    if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
        isError = true;
        errorMessage = errorobj[name]?.message;
    }

    if (defaultValue !== undefined) {
        someValue = defaultValue;
    }

    const changeRadio = e => {
        let id = e.target.id.replace(name, "");
        console.log(id);
    };

    return (
        <Controller
            render={({ field }) => (
                <div className='my-3'>
                    <Label className="form-Label d-block">
                        {label}
                    </Label>
                    <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic radio toggle button group"
                    >
                        {data.map((d) => {
                            return (
                                <>
                                    <Input
                                        {...field}
                                        type="radio"
                                        className="btn-check"
                                        key={name + d.id}
                                        label={d.label}
                                        id={name + d.id}
                                        onChange={() => {
                                            setRadio(opt.id);
                                        }}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor={d.id}>{d.labelName}</label>
                                </>
                            );
                        })}
                    </div>
                    {isError && <FormFeedback type="invalid">{errorMessage}</FormFeedback>}
                </div>
            )}
            control={control}
            name={name}
            defaultValue={someValue}
            id={name}
            onChange={([e]) => {
                changeRadio(e);
            }}
        />
    );
}

export default RHFButtonGroup
