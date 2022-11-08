import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFAutoCompleteSelect from "components/form-controls/RHFAutoCompleteSelect";
import RHFButton from "components/form-controls/RHFButton";
import RHFFileUpload from "components/form-controls/RHFFileUpload";
import RHFTextField from "components/form-controls/RHFTextField";
import { Col, Row } from "reactstrap";
import * as yup from "yup";
import { addAgency, updateAgency } from 'store/company/agency/actions';
import RHFInputTags from 'components/form-controls/RHFInputTags';
import defaultImage from "../../assets/images/Default-User-Image.jpeg";


const CategoryData = [
  {
    value: "development_agency_internal",
    label: "Development Agency - Internal",
  },
  {
    value: "security_agency_internal",
    label: "Security Agency - Internal",
  },
  {
    value: "development_agency_external",
    label: "Development Agency - External",
  },
  {
    value: "security_agency_external",
    label: "Security Agency - External",
  },
];

const CompanyAddEdit = (props) => {
  const { editCompanyData, handleToggle, setRefresh } = props;

  const isEditMode = editCompanyData ? true : false;
  const { isLoading } = useSelector(state => state.Agency)
  const [fileData, setFileData] = useState();

  const dispatch = useDispatch();

  const userSchema = yup.object().shape({
    companyLogo: yup.mixed().required("Company logo is required"),
    companyName: yup.string().required("Company Name is required"),
    domain: yup.array().min(1, "Domain is required"),
    companyType:
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
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      companyType: data?.companyType?.value,
      companyLogo: fileData?.base64
    };
    if (isEditMode) {
      dispatch(updateAgency({ ...payload, companyId: editCompanyData?.id }));
    } else {
      dispatch(addAgency(payload));
    }
    setTimeout(() => {
      setRefresh(prevValue => !prevValue)
    }, 500)
    reset();
    handleToggle()
  };

  useEffect(() => {
    if (isEditMode) {
      const formFields = Object.keys(editCompanyData);

      formFields.forEach((field) => {
        setValue(field, editCompanyData[field]);
      });

      const domain = [];
      editCompanyData?.domains?.map(o => domain.push(o?.companyDomain))

      setValue('domain', domain)
      setValue('companyType', CategoryData?.find(o => o.value === editCompanyData?.companyType))

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
            isValidate={true}
          />
        </div>
      </div>

      <Row className="mb-3">
        <Col sm="12">
          <RHFTextField
            id="companyName"
            label="Company Name"
            name="companyName"
            placeholder="Enter Valid Company Name"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="12">
          <RHFInputTags
            id="domain"
            label="Domain"
            name="domain"
            placeholder="Add Domain"
            errorobj={errors}
            control={control}
            isController={true}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="12">
          <RHFAutoCompleteSelect
            id="companyType"
            label="Category"
            name="companyType"
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
