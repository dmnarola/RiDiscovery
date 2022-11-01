import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Spinner } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useParams, useHistory } from "react-router-dom";

import { emailVerify } from "store/actions";


// import images
import logo from "../../assets/images/RiDiscovery_Icon.png";
import CarouselPage from "./CarouselPage";

const EmailVerification = () => {

  //meta title
  document.title = "Email Verification | RiDiscovery";

  const dispatch = useDispatch()

  const { token } = useParams();
  const history = useHistory();

  const { user, isLoading, message } = useSelector(state => state?.Account);

  useEffect(() => {
    if (token) {
      dispatch(emailVerify({ token }))
    }
  }, [token])

  /** Note - Dipesh (After email verification there should be one email send to User (From that link user can open reset pwd page)) */
  useEffect(() => {
    if (user?.status) {
      history.push(`/set-password/${user?.token}`)
    }
  }, [user])

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
                      {isLoading ?
                        <div className="text-center">
                          <h5 className="mb-5">We are verifying your email....</h5>
                          <Spinner
                            color="primary"
                            type="grow"
                            style={{
                              height: '4rem',
                              width: '4rem'
                            }}
                          >
                            Loading...
                          </Spinner>
                        </div> : message
                      }
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

EmailVerification.propTypes = {
  history: PropTypes.object,
}

export default EmailVerification;