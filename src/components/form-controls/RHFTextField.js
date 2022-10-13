import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { FormFeedback, Input, Label } from "reactstrap";

const RHFTextField = ({ isController = true, ...props }) => {
  const {
    name,
    label,
    errorObj,
    control,
    defaultValue,
    multiline,
    rows,
    onChange,
    autoFocus = false,
    bsSize = "md",
    type = "text",
    ...extraProps
  } = props;

  if (!isController) {
    return (
      <Fragment>
        <div className="mb-3">
          <Label htmlFor="example-text-input" className="form-Label">
            {label}
          </Label>
          <Input
            autoFocus={autoFocus}
            className="form-control"
            type={type}
            {...props}
          />
        </div>
      </Fragment>
    );
  }

  let isError = false;
  let errorMessage = "";
  let disabled = false;
  let multilineDetails = {};
  let someValue = "";

  if (errorObj && Object.prototype.hasOwnProperty.call(errorObj, name)) {
    isError = true;
    errorMessage = errorObj[name]?.message;
  }

  if (multiline && rows) {
    multilineDetails = { multiline: true, rows: `${rows}` };
  }

  disabled = props.disabled === undefined ? false : props.disabled;

  if (defaultValue !== undefined) {
    someValue = defaultValue;
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={someValue}
      render={({ field }) => (
        <Fragment>
          <Label htmlFor="example-text-input" className="form-Label">
            {label}
          </Label>
          <Input
            autoComplete="off"
            {...field}
            {...extraProps}
            autoFocus={autoFocus}
            bsSize={bsSize}
            type={type}
            invalid={isError}
            disabled={disabled}
            onChange={(_) => {
              if (_?.target?.type === "text") {
                field.onChange(_.target.value);
                return !onChange ? field.onChange(_.target.value) : onChange(_);
              }
              field.onChange(_.target.value);
              return !onChange ? field.onChange(_.target.value) : onChange(_);
            }}
            {...multilineDetails}
          />
          {isError && (
            <FormFeedback type="invalid">{errorMessage}</FormFeedback>
          )}
        </Fragment>
      )}
    />
  );
};

export default RHFTextField;
