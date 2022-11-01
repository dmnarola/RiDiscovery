import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useParams, useHistory } from "react-router-dom";

// Formik Validation
import * as yup from "yup";

// import images
import logo from "../../assets/images/RiDiscovery_Icon.png";
import CarouselPage from "./CarouselPage";
import RHFTextField from "components/form-controls/RHFTextField";
import RHFButton from "components/form-controls/RHFButton";
import { resetPassword } from "store/auth/resetPassword/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFSwitch from "components/form-controls/RHFSwitch";
import { generateQRCode } from "store/auth/twoFA/actions";


const SetPasswordPage = () => {

  //meta title
  document.title = "Set Password | RiDiscovery";

  const dispatch = useDispatch()
  const history = useHistory()
  const { token } = useParams();

  const { isLoading, message } = useSelector(state => state?.ResetPassword);
  const { isLoading: loading, qrCode } = useSelector(state => state?.TwoFA);

  console.log('QrCode -> ', qrCode);

  const [isActive, setIsActive] = useState(false);

  const ResetPasswordSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref('password'), null], 'Password and Confirm Password must match'),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(ResetPasswordSchema)
  });

  const setPasswordd = (values) => {
    const payload = {
      password: values?.password,
      token: token,
      twoFAEnabled: values?.twoFAEnabled || false,
      secret: qrCode?.secret || null,
    };
    console.log({ payload })
    dispatch(resetPassword(payload, history));
    reset();
  };


  const handleSwitchChange = (val) => {
    setIsActive(val);
    setValue('twoFAEnabled', val);
    dispatch(generateQRCode({ token: token }))
  }

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
                        <span className="logo-txt">RiDiscovery</span>
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Set New Password</h5>
                        <p className="text-muted mt-2">Set Password with RiDiscovery.</p>
                      </div>


                      <Form
                        className="custom-form mt-4"
                        onSubmit={handleSubmit(setPasswordd)}
                      >
                        <div className="mb-3">
                          <RHFTextField
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>
                        <div className="mb-3">
                          <RHFTextField
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Enter confirm password"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>
                        <div className="mb-3">
                          <RHFSwitch
                            name="twoFAEnabled"
                            label="Allow two factor verification ?"
                            checked={isActive}
                            isController={true}
                            errorobj={errors}
                            control={control}
                            onChange={handleSwitchChange}
                          />
                        </div>

                        {
                          isActive && qrCode?.QRCode &&
                          <div className="mb-3 text-center">
                            <img alt='qr-code' src={qrCode?.QRCode} width="150" height="150" />
                          </div>
                        }

                        <Row className="mb-3">
                          <Col>
                            <div className="mt-3 d-grid">
                              <RHFButton btnName="Set Password" type="submit" />
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

SetPasswordPage.propTypes = {
  history: PropTypes.object,
}

export default SetPasswordPage;