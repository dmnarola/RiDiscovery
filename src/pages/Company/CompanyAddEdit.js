import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFAutoCompleteSelect from "components/form-controls/RHFAutoCompleteSelect";
import RHFButton from "components/form-controls/RHFButton";
import RHFFileUpload from "components/form-controls/RHFFileUpload";
import RHFTextField from "components/form-controls/RHFTextField";
import { Col, Row } from "reactstrap";
import * as yup from "yup";
import defaultImage from "../../assets/images/Default-User-Image.jpeg";

const CompanyAddEdit = (props) => {
  const { editCompanyData, setFormData, handleToggle } = props;
  const isEditMode = editCompanyData ? true : false;
  const [fileData, setFileData] = useState();

  const CategoryData = [
    {
      value: "Development Agency",
      label: "Development Agency",
    },
    {
      value: "Security Agency",
      label: "Security Agency",
    },
  ];

  const userSchema = yup.object().shape({
    companyName: yup.string().required("Company Name is required"),
    domainName: yup.string().required("Domain is required"),
    category:
      !isEditMode &&
      yup
        .object()
        .shape({ label: yup.string(), value: yup.string() })
        .nullable()
        .required("Select atleast one option"),
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

  const onSubmit = (data) => {
    console.log("data", data);
    setFormData(data);
  };

  useEffect(() => {
    if (isEditMode) {
      const formFields = Object.keys(editCompanyData);
      formFields.forEach((field) => {
        setValue(field, editCompanyData[field]);
      });
    }
    else {
      setValue(null)
    }
  }, [editCompanyData]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex mb-3 justify-content-center">
          <div className="">
            <RHFFileUpload
            name="companyLogo"
              defaultImage={defaultImage}
              errorobj={errors}
              setValue={setValue}
              getFileData={setFileData}
            />
          </div>
        </div>

        <Row className="mb-3">
          <Col sm="12">
            <RHFTextField
              id="companyName"
              label="Company Name"
              name="companyName"
              placeholder="Enter valid Company Name"
              errorobj={errors}
              control={control}
              isController={true}
            />
          </Col>
      </Row>

        <Row className="mb-3">
          <Col sm="12">
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

      <Row className="mb-3">
        <Col sm="12">
          <RHFAutoCompleteSelect
            id="category"
            label="Category"
            name="category"
            options={CategoryData}
            setValue={setValue}
            isMultiple={false}
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>

      <Row>
        <div className="modal-footer">
          <RHFButton btnName="Submit" type="submit" />
          <RHFButton btnName="Cancel" outline={true} onClick={handleToggle} />
        </div>
      </Row>
    </form>
  );
};

export default CompanyAddEdit;
