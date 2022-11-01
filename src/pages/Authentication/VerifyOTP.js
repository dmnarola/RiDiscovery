import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, withRouter } from "react-router-dom";

// Formik Validation
import * as yup from "yup";

// import images
import logo from "../../assets/images/logo-sm-ri.svg";
import CarouselPage from "./CarouselPage";
import RHFTextField from "components/form-controls/RHFTextField";
import RHFButton from "components/form-controls/RHFButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { verifyOtp } from "store/auth/twoFA/actions";

const VerifyOTP = (props) => {

  //meta title
  document.title = "2 Factor Auth | RiDiscovery ";

  const dispatch = useDispatch()

  const { loading, user } = useSelector((state) => state.Login);

  const OtpSchema = yup.object().shape({
    otp: yup.string().required('Otp is required')
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(OtpSchema)
  });


  const handleOtp = (values) => {
    const payload = { otp: values?.otp, userId: user?.user?.id };
    dispatch(verifyOtp(payload, props.history));
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
                        <h5 className="mb-0">OTP</h5>
                        <p className="text-muted mt-2">Verify Otp with RiDiscovery</p>
                      </div>

                      <Form
                        className="custom-form mt-4"
                        onSubmit={handleSubmit(handleOtp)}
                      >
                        <div className="mb-3">
                          <RHFTextField
                            id="otp"
                            label="OTP"
                            name="otp"
                            placeholder="Enter Otp"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>

                        <Row className="mb-3">
                          <Col>
                            <div className="mt-3 d-grid">
                              <RHFButton btnName="Send" type="submit" />
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

VerifyOTP.propTypes = {
  history: PropTypes.object,
}

export default withRouter(VerifyOTP);