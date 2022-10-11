import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import Switch from "react-switch";
import { FormFeedback } from 'reactstrap';


const RHFSwitch = (props) => {
    const { isController = false, name, label, checked = false, errorObj, control, defaultValue, onChange, ...extraProps } = props;

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
                </div>
            </Fragment>
        )
    }

    if (errorObj && Object.prototype.hasOwnProperty.call(errorObj, name)) {
        isError = true;
        errorMessage = errorObj[name].message;
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
                    <div>
                        <Switch
                            {...field}
                            {...extraProps}
                            name={name}
                            checked={field.value}
                            disabled={disabled}
                            onChange={(e,) => {
                                return !onChange ? field.onChange(e.target.checked) : onChange(e);
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
                        {isError && <FormFeedback type="invalid">{errorMessage}</FormFeedback>}
                    </div>
                </Fragment>
            )
        }}
    />
}

export default RHFSwitch;
