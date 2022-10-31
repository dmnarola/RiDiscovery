import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { FormFeedback, Input, Label } from 'reactstrap';

const RHFDatePicker = ({ isController = false, ...props }) => {
  const {
    name,
    label,
    value = null,
    errorobj,
    control,
    handleOnChange,
    defaultValue = '',
    isRequired = true,
    disabled = false,
    onChange,
    inputFormat = 'dd/MM/yyyy',
    ...extraProps
  } = props;

  if (!isController) {
    return (
      <Fragment>
        <div className="mb-3">
          <Label htmlFor="example-date-input" className="form-Label">{label}</Label>
          <Input
            className="form-control"
            id="example-date-input"
            type="date"
            {...extraProps}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={(data) => {
              if (handleOnChange) {
                handleOnChange(
                  data.target.value,
                  name
                ); /* You must pass this function while isController is false -> else you will not get selected values */
              }
            }}
          />
        </div>
      </Fragment>
    );
  }
  let isError = false;
  let errorMessage = '';
  let someValue = '';
  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }
  if (defaultValue !== undefined) {
    someValue = defaultValue;
  }
  return <Controller
    name={name}
    control={control}
    defaultValue={someValue}
    render={({ field }) => (
      <Fragment>
        <Label htmlFor="example-date-input" className="form-Label">{label} {isRequired && <span>*</span>}</Label>
        <Input
          {...field}
          {...extraProps}
          type="date"
          invalid={isError}
          disabled={disabled}
          onChange={(_,) => {
            if (_?.target?.type === 'date') {
              field.onChange(_.target.value)
              return !onChange ? field.onChange(_.target.value) : onChange(_);
            }
          }}
        />
        {isError && <FormFeedback type="invalid">{errorMessage}</FormFeedback>}
      </Fragment>
    )}
  />
}

export default RHFDatePicker;
