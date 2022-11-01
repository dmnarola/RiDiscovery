import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';

const RHFButtonGroup = ({ data, label, handleClick, name }) => {

    return (
        <div className='my-3'>
            <Label className="form-Label d-block">
                {label}
            </Label>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                {data.map((d, index) => {
                    return <>
                        <input type="radio" className="btn-check" name={name} id={d.id}
                            onClick={handleClick} key={index}
                        />
                        <label className="btn btn-outline-primary" htmlFor={d.id}>{d.labelName}</label>
                    </>
                })}
            </div>
        </div>
    )
}

export default RHFButtonGroup
