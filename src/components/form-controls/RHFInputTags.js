import React, { Fragment } from "react";
import { Controller } from "react-hook-form";
import { FormFeedback, Label } from "reactstrap";
import TagsInput from "react-tagsinput";
import classNames from 'classnames';
import "react-tagsinput/react-tagsinput.css";

const RHFInputTags = ({ isController = true, ...props }) => {
  const {
    name,
    label,
    errorobj,
    control,
    defaultValue,
    placeholder,
    onChange,
    isRequired = true,
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
          <TagsInput
            {...extraProps}
            inputProps={{ placeholder: placeholder }}
            value={[]}
            onChange={(value) => onChange(value)}
          />
        </div>
      </Fragment>
    );
  }

  let isError = false;
  let errorMessage = "";
  let disabled = false;
  let someValue = "";

  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true;
    errorMessage = errorobj[name]?.message;
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
          {label && <Label htmlFor="example-text-input" className="form-Label">
            {label} {isRequired && <span>*</span>}
          </Label>
          }
          <div className={classNames({ "tag-error": isError })}>
            <TagsInput
              {...field}
              {...extraProps}
              inputProps={{ placeholder: placeholder }}
              value={field?.value || []}
              onChange={(value) => {
                field.onChange(value);
              }}
            />
          </div>
          {isError && (
            <FormFeedback type="invalid">{errorMessage}</FormFeedback>
          )}
        </Fragment>
      )}
    />
  );
};

export default RHFInputTags;
