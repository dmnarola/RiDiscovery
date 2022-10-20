import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { FormFeedback, Input, Label } from "reactstrap";

const RHFTextField = ({ isController = true, ...props }) => {
  const {
    name,
    label,
    errorobj,
    control,
    defaultValue,
    multiline,
    rows,
    onChange,
    handleOnChange,
    backgroundColor = false,
    autoFocus = false,
    bsSize = "md",
    type = "text",
    ...extraProps
  } = props;

  if (!isController) {
    return (
      <Fragment>
        <div className={label && "mb-3"}>
          {label && (
            <Label htmlFor="example-text-input" className="form-Label">
              {label}
            </Label>
          )}
          <Input
            autoFocus={autoFocus}
            className="form-control"
            style={backgroundColor ? { background: backgroundColor, color: '#fff' } : null}
            type={type}
            {...props}
            onChange={(data) => {
              if (handleOnChange) {
                handleOnChange(
                  data?.target?.value,
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
  let errorMessage = "";
  let disabled = false;
  let multilineDetails = {};
  let someValue = "";

  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true;
    errorMessage = errorobj[name]?.message;
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
