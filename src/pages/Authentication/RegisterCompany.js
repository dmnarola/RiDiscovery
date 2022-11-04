import React, { useState } from "react";
import PropTypes from "prop-types";

import { Card, CardBody, Container, Form } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import companyDefaultLogo from "assets/images/Default-User-Image.jpeg";

import RHFTextField from "components/form-controls/RHFTextField";
import RHFButton from "components/form-controls/RHFButton";
import RHFFileUpload from "components/form-controls/RHFFileUpload";
import RHFInputTags from "components/form-controls/RHFInputTags";
import { registerCompany } from "store/actions";


const RegisterCompany = (props) => {

  const dispatch = useDispatch();

  const [cmpLogo, setCompanyLogo] = useState(null)

  const [visible,] = useState(true);

  const { loading, company } = useSelector((state) => state.Account);

  const companySchema = yup.object().shape({
    companyLogo: yup.mixed().required("Company logo is required"),
    companyName: yup.string().required("Company is required"),
    tenantName: yup.string().required("Tenant name is required"),
    domain: yup.array().min(1, "Domain is required"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(companySchema),
  });

  const getFileData = (fileData) => {
    setCompanyLogo(fileData?.base64)
  };

  const onAddCompany = (values) => {
    const payload = {
      ...values,
      companyLogo: cmpLogo
    };
    dispatch(registerCompany(payload, props.history));
    reset();
  };

  document.title = "Register Company | RiDiscovery";

  return (

    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="Certificate" breadcrumbItem="Project List" /> */}

          {!company?.status ?
            <Card>
              <CardBody>
                <Form
                  className="custom-form mt-4 pt-2"
                  onSubmit={handleSubmit(onAddCompany)}
                >
                  <div className="mb-3 d-flex justify-content-center">
                    <RHFFileUpload
                      name="companyLogo"
                      defaultImage={companyDefaultLogo}
                      getFileData={getFileData}
                      setValue={setValue}
                      errorobj={errors}
                      isValidate={true}
                    />
                  </div>

                  <div className="mb-3">
                    <RHFTextField
                      id="companyName"
                      label="Company Name"
                      name="companyName"
                      placeholder="Enter Company Name"
                      errorobj={errors}
                      control={control}
                      isController={true}
                    />
                  </div>

                  <div className="mb-3">
                    <RHFTextField
                      id="tenantName"
                      label="Tenant Name"
                      name="tenantName"
                      placeholder="Enter Tenant Name For Your Company"
                      errorobj={errors}
                      control={control}
                      isController={true}
                    />
                  </div>
                  <div className="mb-3">
                    <RHFInputTags
                      id="domain"
                      label="Domain"
                      name="domain"
                      placeholder="Add Domain"
                      errorobj={errors}
                      control={control}
                      isController={true}
                    />
                  </div>

                  <div className="row mb-4">
                    <div className="col">
                      <div className="mt-3 d-flex justify-content-end">
                        <RHFButton btnName="Submit" type="submit" />
                      </div>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
            :
            <Card>
              <CardBody>
                <p className="d-flex justify-content-center fw-normal fs-5 text">
                  Thank yor for onboarding with RiDiscovery. Your tanent is creating once it will done we, will notify you via email.
                  Thank you for your patience.
                </p>
              </CardBody>
            </Card>
          }

        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(RegisterCompany);

RegisterCompany.propTypes = {
  history: PropTypes.object,
};
