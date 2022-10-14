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
    defaultValue = null,
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
          <Input className="form-control" type="date" defaultValue={defaultValue} id="example-date-input" />
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
        <Label htmlFor="example-date-input" className="form-Label">{label}</Label>
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
