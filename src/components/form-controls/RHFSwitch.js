import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import Switch from "react-switch";
import { FormFeedback } from 'reactstrap';


const RHFSwitch = (props) => {
    const { isController = false, name, label, checked = false, errorobj, control, defaultValue, onChange, ...extraProps } = props;

    let isError = false;
    let errorMessage = '';
    let disabled = props?.disabled;
    let someValue = false;

    if (!isController) {
        return (
            <Fragment>
                <div>
                    <Switch
                        {...extraProps}
                        name={name}
                        checked={checked}
                        disabled={disabled}
                        onChange={onChange}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#5156be"
                        onHandleColor="#fff"
                        className="react-switch"
                        height={24}
                        handleDiameter={18}
                    />
                    {label && <span>&nbsp;{label}</span>}
                </div>
            </Fragment>
        )
    }

    if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
        isError = true;
        errorMessage = errorobj[name].message;
    }

    disabled = (props.disabled === undefined) ? false : props.disabled;

    if (defaultValue !== undefined) {
        someValue = defaultValue;
    }

    return <Controller
        name={name}
        control={control}
        defaultValue={someValue}
        render={({ field }) => {
            return (
                <Fragment>
                    <div className='d-flex align-items-center'>
                        <Switch
                            {...field}
                            {...extraProps}
                            name={name}
                            checked={field.value || checked}
                            disabled={disabled}
                            onChange={(e,) => {
                                return !onChange ? field.onChange(e) : onChange(e);
                            }}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#5156be"
                            offColor="#dfdfdf"
                            onHandleColor="#fff"
                            offHandleColor="#bfbfbf"
                            className="react-switch"
                            height={22}
                            handleDiameter={16}
                        />
                        {label && <span>&nbsp;{label}</span>}
                        {isError && <FormFeedback type="invalid">{errorMessage}</FormFeedback>}
                    </div>
                </Fragment>
            )
        }}
    />
}

export default RHFSwitch;
