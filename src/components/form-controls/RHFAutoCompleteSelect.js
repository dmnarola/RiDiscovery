import React, { Fragment } from "react";
import { FormFeedback, Label } from "reactstrap";
import Select from "react-select";
import { Controller } from "react-hook-form";

const RHFAutoCompleteSelect = ({
  id,
  name,
  label,
  placeholder,
  isController = true,
  control,
  defaultValue = null,
  options,
  errorobj,
  onChange,
  handleOnChange,
  isRequired = true,
  isClearable = true,
  isSearchable = true,
  isLoading = false,
  isDisabled = false,
  isMultiple = false,
  limitTags = -1,
  ...props
}) => {
  let isError = false;
  let errorMessage = "";
  let multiSelect = false;



  const customStyles = {
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: ((isError && state.isFocused) || isError)
        ? 'red'
        : base.borderColor,
      '&:hover': {
        borderColor: ((isError && state.isFocused) || isError)
          ? 'red'
          : base.borderColor,
      }
    })
  };


  if (typeof isMultiple === "undefined" || isMultiple) {
    multiSelect = true;
  }
  const disabled = isDisabled === undefined ? false : isDisabled;

  if (errorobj && errorobj[name]) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  // console.log('errors ==>', errorobj, errorMessage, isError);

  if (!isController) {
    return (
      <Fragment>
        <div className="mb-3">
          <Label htmlFor="select-input" className="form-Label">
            {label}
          </Label>
          <Select
            {...props}
            placeholder="Select"
            className={multiSelect ? "basic-multi-select bg-light" : "basic-single bg-light"}
            isMulti={multiSelect}
            id={id}
            name={name}
            isClearable={isClearable}
            isSearchable={isSearchable}
            isDisabled={disabled}
            isLoading={isLoading}
            options={options}
            defaultValue={defaultValue}
            classNamePrefix="select"
            onChange={(data) => {
              if (handleOnChange) {
                handleOnChange(
                  data?.value,
                  name
                ); /* You must pass this function while isController is false -> else you will not get selected values */
              }
            }}
          />
        </div>
      </Fragment>
    );
  }

  return (
    <>
      <Controller
        render={({ field }) => {
          let filteredOptionList = [...options];
          if (multiSelect && field?.value?.length) {
            const selectedValueArr = field.value.map((result) => result.value);
            filteredOptionList = filteredOptionList.filter(
              (item) => selectedValueArr.indexOf(item.value) === -1
            );
          }
          return (
            <Fragment>
              <Label htmlFor="select-input" className="form-Label">
                {label} {isRequired && <span>*</span>}
              </Label>
              <Select
                {...props}
                id={id}
                name={name}
                placeholder="Select"
                className={multiSelect ? "basic-multi-select " : "basic-single"}
                isMulti={multiSelect}
                isClearable={isClearable}
                isSearchable={isSearchable}
                isDisabled={disabled}
                isLoading={isLoading}
                options={options}
                defaultValue={defaultValue}
                onChange={(data) => {
                  field.onChange(data);
                  if (handleOnChange) {
                    handleOnChange(data, name);
                  }
                }}
                styles={customStyles}
              />
            </Fragment>
          );
        }}
        // className={multiSelect ? "basic-multi-select" : "basic-single"}
        id={id || name}
        name={name}
        control={control}
        defaultValue={defaultValue || []}
      />
      {isError && <FormFeedback type="invalid">{errorMessage}</FormFeedback>}
    </>
  );
};

export default RHFAutoCompleteSelect;
