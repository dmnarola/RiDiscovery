import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Formik Validation
import * as yup from "yup";

// import images
import logo from "../../assets/images/logo-sm-ri.svg";
import CarouselPage from "../Authentication/CarouselPage";
import RHFTextField from "components/form-controls/RHFTextField";
import RHFButton from "components/form-controls/RHFButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userForgetPassword } from "store/actions";

const ForgetPasswordPage = () => {

  //meta title
  document.title = "Forget Password | RiDiscovery ";

  const dispatch = useDispatch()

  const { isLoading } = useSelector(state => state?.ForgetPassword);

  const ForgetPasswordSchema = yup.object().shape({
    email: yup.string().email().max(150).required('Email is required')
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ForgetPasswordSchema)
  });


  const handleForgetPassword = (values) => {
    const payload = { email: values?.email };
    dispatch(userForgetPassword(payload));
    reset();
  };


  return (
    <React.Fragment>
      <div className="auth-page">
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={4} md={5} className="col-xxl-3">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5 text-center">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={logo} alt="" height="35" />
                        {/* <span className="logo-txt">Minia</span> */}
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Forget Password</h5>
                        <p className="text-muted mt-2">Forget Password with RiDiscovery.</p>
                      </div>

                      <Form
                        className="custom-form mt-4"
                        onSubmit={handleSubmit(handleForgetPassword)}
                      >
                        <div className="mb-3">
                          <RHFTextField
                            id="email"
                            label="Email"
                            name="email"
                            placeholder="Enter valid Email"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>

                        <Row className="mb-3">
                          <Col>
                            <div className="mt-3 d-grid">
                              <RHFButton btnName="Forget Password" type="submit" />
                            </div>
                          </Col>
                        </Row>

                      </Form>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">Remember It ?
                          <Link to="/login" className="text-primary fw-semibold"> Login</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <CarouselPage />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default ForgetPasswordPage;