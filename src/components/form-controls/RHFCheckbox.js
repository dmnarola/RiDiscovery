import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { FormFeedback, Input, Label } from 'reactstrap';

const RHFCheckbox = ({ isController = false, ...props }) => {
  const {
    name,
    label,
    errorObj,
    control,
    checked = false,
    disabled = false,
    onChange,
    ...extraProps
  } = props;

  if (!isController) {
    return (
      <Fragment>
        <div className="mb-3">
          <Label htmlFor="example-checkbox-input" className="form-Label">{label}</Label>
          <Input type="checkbox" onChange={(e) => onChange(e.target.checked)} id="example-checkbox-input"  {...extraProps} />
        </div>
      </Fragment>
    );
  }
  let isError = false;
  let errorMessage = '';

  if (errorObj && Object.prototype.hasOwnProperty.call(errorObj, name)) {
    isError = true;
    errorMessage = errorObj[name].message;
  }

  return <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Fragment>
        <Label htmlFor="example-checkbox-input" className="form-Label">{label}</Label>
        <Input
          {...field}
          {...extraProps}
          type="checkbox"
          invalid={isError}
          disabled={disabled}
          onChange={(_,) => {
            return !onChange ? field.onChange(_.target.checked) : onChange(_.target.checked);
          }}
        />
        {isError && <FormFeedback type="invalid">{errorMessage}</FormFeedback>}
      </Fragment>
    )}
  />
}

export default RHFCheckbox;
