import React, { useEffect } from "react"
import { Row, Col, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap"

// Formik Validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom"

// import images
import logo from "../../assets/images/logo-sm.svg"
import CarouselPage from "../Authentication/CarouselPage"
import RHFTextField from "components/form-controls/RHFTextField";
import RHFButton from "components/form-controls/RHFButton";


const Register = props => {

  //meta title
  document.title = "Register | Minia - React Admin & Dashboard Template";

  const dispatch = useDispatch()

  const { user, registrationError } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }))


  const registerSchema = yup.object().shape({
    email: yup.string().email().max(150).required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });


  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });


  const onRegister = (values) => {
    console.log({ values })
    reset();
    dispatch(registerUser(values));
  }

  useEffect(() => {
    dispatch(apiError(""))
  }, [dispatch])

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
                        <img src={logo} alt="" height="28" /> <span className="logo-txt">Minia</span>
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0">Register Account</h5>
                        <p className="text-muted mt-2">Get your free Minia account now.</p>
                      </div>

                      <Form
                        className="needs-validation custom-form mt-4 pt-2"
                        onSubmit={handleSubmit(onRegister)}
                      >
                        {user && user ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}

                        {registrationError && registrationError ? (
                          <Alert color="danger">{registrationError}</Alert>
                        ) : null}

                        <div className="mb-3">
                          <RHFTextField
                            id="email"
                            label="Email"
                            name="email"
                            placeholder="Enter valid email"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>

                        <div className="mb-3">
                          <RHFTextField
                            id="username"
                            label="Username"
                            name="username"
                            placeholder="Enter username"
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
                            placeholder="Enter password"
                            errorobj={errors}
                            control={control}
                            isController={true}
                          />
                        </div>

                        <div className="mb-4">
                          <p className="mb-0">
                            By registering you agree to the Minia{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                        <div className="mb-3">
                          <RHFButton
                            className="btn btn-primary w-100 waves-effect waves-light"
                            btnName="Register"
                            type='submit'
                          />
                        </div>
                      </Form>

                      <div className="mt-5 text-center">
                        <p className="text-muted mb-0">Already have an account ? <Link to="/login"
                          className="text-primary fw-semibold"> Login </Link> </p>
                      </div>
                    </div>
                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">© {new Date().getFullYear()} Minia . Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
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

export default Register