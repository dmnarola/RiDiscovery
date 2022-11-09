import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import RHFAutoCompleteSelect from "../../components/form-controls/RHFAutoCompleteSelect";
import RHFDatePicker from "../../components/form-controls/RHFDatePicker";
import RHFTextField from "../../components/form-controls/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import RHFButton from "components/form-controls/RHFButton";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "store/user/actions";


const UserAddEdit = (props) => {
  const { editUserData, companyList, roleList, setRefresh, handleToggle } = props;
  const isEditMode = editUserData ? true : false;

  const dispatch = useDispatch();

  const userSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    companyName: !isEditMode && yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .nullable()
      .required("Select atleast one option"),

    phone: !isEditMode && yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Mobile Number is not Valid"
      ).required("Mobile Number is required"),
    role: !isEditMode && yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .nullable()
      .required("Select atleast one option"),
    email: yup.string().email().max(150).required("Email is required"),
    startDate: yup.string().required("Date is required"),
    endDate: yup.string().required("Date is required"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    if (isEditMode) {
      const formFields = Object.keys(editUserData);
      formFields.forEach((field) => {
        setValue(field, editUserData[field]);
      });
    }
    else {
      setValue(null)
    }
  }, [editUserData]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      companyId: data?.companyName?.value,
      roleId: data?.role?.value
    }

    if (isEditMode) {
      dispatch(updateUser({ ...payload, userId: editUserData?.id }));
    } else {
      dispatch(addUser(payload))
    }
    setTimeout(() => {
      setRefresh(prevValue => !prevValue)
    }, 500)
    reset();
    handleToggle();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col sm="6">
          <RHFTextField
            id="firstName"
            label="First Name"
            name="firstName"
            placeholder="Enter Valid First Name"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
        <Col sm="6">
          <RHFTextField
            id="lastName"
            label="Last Name"
            name="lastName"
            placeholder="Enter Valid Last Name"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={!isEditMode ? "6" : "12"}>
          <RHFTextField
            id="email"
            label="Email"
            name="email"
            placeholder="Enter Valid email"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
        {!isEditMode &&
          <Col sm="6">
            <RHFTextField
              id="phone"
              label="Mobile Number"
              name="phone"
              placeholder="Enter Valid Mobile Number"
              errorobj={errors}
              control={control}
              isController={true}
            />
          </Col>
        }
      </Row>

      {!isEditMode && <Row className="mb-3">
        <Col sm="6">
          <RHFAutoCompleteSelect
            id="companyName"
            label="Company Name"
            name="companyName"
            options={companyList && companyList}
            isMultiple={false}
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
        <Col sm="6">
          <RHFAutoCompleteSelect
            id="role"
            label="Role"
            name="role"
            options={roleList}
            isMultiple={false}
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>
      }

      <Row className="mb-3">
        <Col sm="6">
          <RHFDatePicker
            name="startDate"
            label="Start Date"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
        <Col sm="6">
          <RHFDatePicker
            name="endDate"
            label="End Date"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>

      <Row>
        <div className="modal-footer">
          <RHFButton
            btnName="Submit"
            type="submit"
          />
          <RHFButton
            btnName="Cancel"
            outline={true}
            onClick={handleToggle}
          />
        </div>
      </Row>
    </form>
  );
};

export default UserAddEdit;
