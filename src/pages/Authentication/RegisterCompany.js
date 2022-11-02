import React from "react";
import PropTypes from "prop-types";

import { Card, CardBody, CardHeader, Col, Container, Form, Row } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import companyDefaultLogo from "assets/images/Default-User-Image.jpeg";

import RHFTextField from "components/form-controls/RHFTextField";
import RHFButton from "components/form-controls/RHFButton";
import RHFFileUpload from "components/form-controls/RHFFileUpload";
import RHFInputTags from "components/form-controls/RHFInputTags";


const RegisterCompany = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, user } = useSelector((state) => state.Login);

  const companySchema = yup.object().shape({
    companyLogo: yup.mixed().required("Company logo is required"),
    companyName: yup.string().required("Company is required"),
    domain: yup.array().min(1, "Domain is required"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(companySchema),
  });

  const getFileData = (fileData) => {
    console.log("FileData ->", fileData);
  };

  const onAddCompany = (values) => {
    const payload = { ...values };
    console.log('Cmp data=>', payload);
    // dispatch(loginUser(payload, props.history));
  };

  document.title = "Register Company | RiDiscovery";

  return (

    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          {/* <Breadcrumbs title="Certificate" breadcrumbItem="Project List" /> */}
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
        </Container>
      </div>
    </React.Fragment>



    // <div className="auth-page">
    //   <Container fluid className="p-0">
    //     <Row className="g-0">
    //       <Col lg={4} md={5} className="col-xxl-3">
    //         <div className="auth-full-page-content d-flex p-sm-5 p-4">
    //           <div className="w-100">
    //             <div className="d-flex flex-column h-100">
    //               <div className="mb-4 mb-md-5 text-center">
    //                 <Link to="/dashboard" className="d-block auth-logo">
    //                   <img src={logo} alt="" height="35" />{" "}
    //                   <span className="logo-txt">RiDiscovery</span>
    //                 </Link>
    //               </div>
    //               <div className="auth-content my-auto">
    //                 <div className="text-center">
    //                   <h5 className="mb-0">Welcome Back !</h5>
    //                   <p className="text-muted mt-2">
    //                     Register your company with RiDiscovery
    //                   </p>
    //                 </div>
    //                 <Form
    //                   className="custom-form mt-4 pt-2"
    //                   onSubmit={handleSubmit(onAddCompany)}
    //                 >
    //                   <div className="mb-3 d-flex justify-content-center">
    //                     <RHFFileUpload
    //                       name="companyLogo"
    //                       defaultImage={companyDefaultLogo}
    //                       getFileData={getFileData}
    //                       setValue={setValue}
    //                       errorobj={errors}
    //                       isValidate={true}
    //                     />
    //                   </div>

    //                   <div className="mb-3">
    //                     <RHFTextField
    //                       id="companyName"
    //                       label="Company Name"
    //                       name="companyName"
    //                       placeholder="Enter Company Name"
    //                       errorobj={errors}
    //                       control={control}
    //                       isController={true}
    //                     />
    //                   </div>
    //                   <div className="mb-3">
    //                     {/* <RHFTextField
    //                       id="domain"
    //                       label="Domain"
    //                       name="domain"
    //                       placeholder="Enter Domain"
    //                       errorobj={errors}
    //                       control={control}
    //                       isController={true}
    //                     /> */}
    //                     <RHFInputTags
    //                       id="domain"
    //                       label="Domain"
    //                       name="domain"
    //                       placeholder="Add Domain"
    //                       errorobj={errors}
    //                       control={control}
    //                       isController={true}
    //                     />
    //                   </div>

    //                   <div className="row mb-4">
    //                     <div className="col">
    //                       <div className="mt-3 d-grid">
    //                         <RHFButton btnName="Submit" type="submit" />
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </Form>


    //                 <div className="mt-5 text-center">
    //                   <p className="text-muted mb-0">
    //                     Don't have an account ?{" "}
    //                     <Link
    //                       to="/register"
    //                       className="text-primary fw-semibold"
    //                     >
    //                       {" "}
    //                       Signup now{" "}
    //                     </Link>{" "}
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </Col>
    //       <CarouselPage />
    //     </Row>
    //   </Container>
    // </div>

  );
};

export default withRouter(RegisterCompany);

RegisterCompany.propTypes = {
  history: PropTypes.object,
};
