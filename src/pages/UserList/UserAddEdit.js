import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import RHFAutoCompleteSelect from "../../components/form-controls/RHFAutoCompleteSelect";
import RHFDatePicker from "../../components/form-controls/RHFDatePicker";
import RHFTextField from "../../components/form-controls/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import RHFButton from "components/form-controls/RHFButton";

//constant for dropdown
const DropDownData = [
  {
    value: "red",
    label: "Red",
    color: "#FF5630",
    isFixed: true,
  },
  {
    value: "orange",
    label: "Orange",
    color: "#FF8B00",
  },
  {
    value: "yellow",
    label: "Yellow",
    color: "#FFC400",
  },
  {
    value: "green",
    label: "Green",
    color: "#36B37E",
  },
  {
    value: "forest",
    label: "Forest",
    color: "#00875A",
  },
  {
    value: "slate",
    label: "Slate",
    color: "#253858",
  },
];

const InternalData = [{
  value: "SA",
  label: "SA",
}, {
  value: "DA",
  label: "DA",
}]

const RoleData = [{
  value: "OMA-Owner Admin",
  label: "OMA-Owner Admin",
}, {
  value: "CSM-Company Senior Manager",
  label: "CSM-Company Senior Manager",
}, {
  value: "DAPM-DA Project Manager",
  label: "DAPM-DA Project Manager",
}, {
  value: "SAPM-SA Project Manager",
  label: "SAPM-SA Project Manager",
}, {
  value: "DATM-DA Team Member",
  label: "DATM-DA Team Member",
}, {
  value: "SAPM-SA Pentester Member",
  label: "SAPM-SA Pentester Member",
}, {
  value: "SATL-SA Team Lead",
  label: "SATL-SA Team Lead",
}, {
  value: "Executive",
  label: "Executive",
}]

const UserAddEdit = (props) => {
  const { editUserData, setFormData, handleToggle } = props;
  const isEditMode = editUserData ? true : false;

  const userSchema = yup.object().shape({
    internal: !isEditMode && yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .nullable()
      .required("Select atleast one option"),

    firstName: yup.string().required("firstName is required"),
    lastName: yup.string().required("lastName is required"),
    companyName: !isEditMode && yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .nullable()
      .required("Select atleast one option"),

    mobileNumber: !isEditMode && yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "mobile number is not valid"
      ).required("mobile no. is required"),
    role: !isEditMode && yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .nullable()
      .required("Select atleast one option"),
    domainName: !isEditMode && yup.string().required("Domain Name is required"),
    email: yup.string().email().max(150).required("Email is required"),
    startDate: yup.date().required("Date is required"),
    endDate: yup.date().required("Date is required"),
  });

  const {
    handleSubmit,
    control,
    setValue,
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
    setFormData(data);
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      {!isEditMode && <Row className="mb-3 col d-flex justify-content-end align-items-end">
        <Col sm="4">
          <RHFAutoCompleteSelect
            id="internal"
            label="Internal"
            name="internal"
            options={InternalData}
            setValue={setValue}
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
          <RHFTextField
            id="firstName"
            label="First Name"
            name="firstName"
            placeholder="Enter valid First Name"
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
            placeholder="Enter valid Last Name"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>

      {!isEditMode && <Row className="mb-3">
        <Col sm="12">
          <RHFAutoCompleteSelect
            id="companyName"
            label="Company Name"
            name="companyName"
            options={DropDownData}
            isMultiple={false}
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>
      }

      {!isEditMode && <Row className="mb-3">
        <Col sm="12">
          <RHFTextField
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            placeholder="Enter valid Mobile Number"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>
      }

      {!isEditMode && <Row className="mb-3">
        <Col sm="6">
          <RHFAutoCompleteSelect
            id="role"
            label="Role"
            name="role"
            options={RoleData}
            isMultiple={false}
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
        <Col sm="6">
          <RHFTextField
            id="domainName"
            label="Domain Name"
            name="domainName"
            placeholder="Enter valid Domain Name"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>
      }

      <Row className="mb-3">
        <Col sm="12">
          <RHFTextField
            id="email"
            label="Email"
            name="email"
            placeholder="Enter valid email"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>

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
