import React, { useEffect } from "react"
import { Row, Col, Container, Form } from "reactstrap"

// Formik Validation
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// action
import { apiError, registerUser } from "../../store/actions";

//redux
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

// import images
import RHFButton from "components/form-controls/RHFButton";
import RHFTextField from "components/form-controls/RHFTextField";
import logo from "../../assets/images/RiDiscovery_Icon.png";
import CarouselPage from "../Authentication/CarouselPage";

const Register = (props) => {
  //meta title
  document.title = "Register | RiDiscovery";

  const dispatch = useDispatch();

  const { user, registrationError } = useSelector((state) => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  const registerSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email().max(150).required('Email is required'),
    phoneNo: yup.string().required('Phone Number is required'),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registerSchema),
  });

  const onRegister = (values) => {
    dispatch(registerUser(values));
    reset();
  }

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

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
                        <span className="logo-txt">RiDiscovery</span>
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Register Account</h5>
                        <p className="text-muted mt-2">
                          Get your free RiDiscovery account now.
                        </p>
                      </div>

                      <Form
                        className="needs-validation custom-form mt-4 pt-2"
                        onSubmit={handleSubmit(onRegister)}
                      >
                        <div className="mb-3">
                          <RHFTextField
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            placeholder="Enter First Name"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>
                        <div className="mb-3">
                          <RHFTextField
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            placeholder="Enter Last Name"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>
                        <div className="mb-3">
                          <RHFTextField
                            id="email"
                            label="Email"
                            name="email"
                            placeholder="Enter Valid Email"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>

                        <div className="mb-3">
                          <RHFTextField
                            id="phoneNo"
                            label="Phone No"
                            name="phoneNo"
                            placeholder="Enter Phone Number"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>

                        <div className="mb-4">
                          <p className="mb-0">
                            By registering you agree to the RiDiscovery{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                        <div className="mb-3">
                          <RHFButton
                            className="btn btn-primary w-100 waves-effect waves-light"
                            btnName="Register"
                            type="submit"
                          />
                        </div>
                      </Form>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">
                          Already have an account ?{" "}
                          <Link
                            to="/login"
                            className="text-primary fw-semibold"
                          >
                            {" "}
                            Login{" "}
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

export default Register;
