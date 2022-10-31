import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Row, Col, Container, Form } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
import logo from "../../assets/images/logo-sm-ri.svg";

//Import config
import { facebook, google } from "../../config";
import CarouselPage from "../Authentication/CarouselPage";
import RHFTextField from "components/form-controls/RHFTextField";
import RHFButton from "components/form-controls/RHFButton";
import RHFCheckbox from "components/form-controls/RHFCheckbox";


const Login = (props) => {
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, user } = useSelector((state) => state.Login);

  console.log('user resp  ==>', user);

  const loginSchema = yup.object().shape({
    email: yup.string().email().max(150).required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.history, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.history, type));
    }
  };

  useEffect(() => {
    if (user?.status && user?.user['2FAEnabled']) {
      history.push('/verify-otp')
    }
  }, [user])


  const handleCheckboxChange = (val) => {
    setIsRemember(val);
    setValue("isRemember", val);
  };

  const onLogin = (values) => {
    const payload = { ...values, isRemember };
    dispatch(loginUser(payload, props.history));
  };

  //handleGoogleLoginResponse
  const googleResponse = (response) => {
    signIn(response, "google");
  };

  //handleFacebookLoginResponse
  const facebookResponse = (response) => {
    signIn(response, "facebook");
  };

  document.title = "Login | RiDiscovery";

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
                        <img src={logo} alt="" height="35" />{" "}
                        {/* <span className="logo-txt">Minia</span> */}
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Welcome Back !</h5>
                        <p className="text-muted mt-2">
                          Sign in to continue to RiDiscovery
                        </p>
                      </div>
                      <Form
                        className="custom-form mt-4 pt-2"
                        onSubmit={handleSubmit(onLogin)}
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
                        <div className="mb-3">
                          <RHFTextField
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>

                        <div className="row mb-4">
                          <div className="col">
                            <div className="d-flex justify-content-between">
                              <div className="form-check">
                                <RHFCheckbox
                                  name="isRemember"
                                  label="Remember me"
                                  checked={isRemember}
                                  isController={false}
                                  onChange={handleCheckboxChange} // mostly useful when isController === false
                                />
                              </div>
                              <div>
                                <p className="text-muted mb-0">
                                  <Link
                                    to="/forgot-password"
                                    className="text-primary fw-semibold"
                                  >
                                    Forgot Password ?
                                  </Link>{" "}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 d-grid">
                              <RHFButton btnName="Log In" type="submit" />
                            </div>
                          </div>
                        </div>
                      </Form>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <FacebookLogin
                              appId={facebook.APP_ID}
                              autoLoad={false}
                              callback={facebookResponse}
                              render={(renderProps) => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-facebook" />
                                </Link>
                              )}
                            />
                          </li>
                          {google.CLIENT_ID && (
                            <li className="list-inline-item">
                              <GoogleLogin
                                clientId={google.CLIENT_ID}
                                render={(renderProps) => (
                                  <Link
                                    to="#"
                                    className="social-list-item bg-danger text-white border-danger"
                                    onClick={renderProps.onClick}
                                  >
                                    <i className="mdi mdi-google" />
                                  </Link>
                                )}
                                onSuccess={googleResponse}
                                onFailure={() => { }}
                              />
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">
                          Don't have an account ?{" "}
                          <Link
                            to="/register"
                            className="text-primary fw-semibold"
                          >
                            {" "}
                            Signup now{" "}
                          </Link>{" "}
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
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
