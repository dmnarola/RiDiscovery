import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
import FeatherIcon from "feather-icons-react";

// actions
import RHFFileUpload from "components/form-controls/RHFFileUpload";
import RHFTextField from "components/form-controls/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import RHFButton from "components/form-controls/RHFButton";
import DialogBox from "components/Modals/DialogBox";
import ChangePasswordForm from "./Profile/ChangePasswordForm";
import Switch from "react-switch";
import TwoFactorVerification from "./Profile/TwoFactorVerification";
import AuthenticationVerified from "./Profile/AuthenticationVerified";
import { isModulePermisssion } from "helpers/util";
import { ROLE_PERMISSIONS } from "constants/RolePermissions";

const UserProfile = props => {
  //meta title
  document.title = "Profile | Minia - React Admin & Dashboard Template";

  const dispatch = useDispatch()

  const profileSchema = yup.object().shape({
    firstName: yup.string().required("firstName is required"),
    lastName: yup.string().required("lastName is required"),
    position: yup.string().required("position is required"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(profileSchema),
  });


  const [isModelOpen, setIsModelOpen] = useState(false);
  const [checked, setChecked] = useState(false)
  const [isMode, setIsMode] = useState({
    isChangePasswordMode: false,
    isTwoFactorVerificationMode: false,
    isAuthenticationVerifiedMode: false
  });

  const handleToggle = () => {
    setIsMode({
      isChangePasswordMode: false,
      isTwoFactorVerificationMode: false,
      isAuthenticationVerifiedMode: false
    })
    setIsModelOpen(!isModelOpen)
  };

  const handleChange = () => {
    setChecked(!checked)
  }

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  // const [email, setemail] = useState("")
  // const [name, setname] = useState("")
  // const [idx, setidx] = useState(1)

  // useEffect(() => {
  //   const authUser = localStorage.getItem("authUser");
  //   if (authUser) {
  //     const obj = JSON.parse(authUser);
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       setname(obj.displayName);
  //       setemail(obj.email);
  //       setidx(obj.uid);
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       setname(obj.username);
  //       setemail(obj.email);
  //       setidx(obj.uid);
  //     }
  //     setTimeout(() => {
  //       dispatch(resetProfileFlag());
  //     }, 3000);
  //   }
  // }, [dispatch, success]);  

  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     username: name || '',
  //     idx: idx || '',
  //   },
  //   validationSchema: Yup.object({
  //     username: Yup.string().required("Please Enter Your UserName"),
  //   }),
  //   onSubmit: (values) => {
  //     dispatch(editProfile(values));
  //   }
  // });    //@Foram API call and Validation

  const onSubmit = (data) => {
    console.log('data :>> ', data);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Minia" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex ">
                    <div className="ms-3">
                      <RHFFileUpload
                        name="userProfile"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center ms-3">
                      <div className="text-muted">
                        <h5>Kishan Jotangiya</h5>
                        <p className="mb-1">kishan@gmail.com</p>
                        <p className="mb-0">XYZ</p>
                      </div>
                    </div>
                    <div>
                      {isModulePermisssion(ROLE_PERMISSIONS?.CHANGE_PASSWORD) &&
                        <RHFButton btnName="Change Password" onClick={() => {
                          handleToggle()
                          setIsMode({ isChangePasswordMode: true })
                        }} />}

                      <DialogBox
                        isModelOpen={isModelOpen}
                        handleToggle={handleToggle}
                        modelSize="sm-100"
                        title={isMode?.isChangePasswordMode ? "Change your password" :
                          isMode?.isTwoFactorVerificationMode ? "Two Factor Authentication" :
                            isMode?.isAuthenticationVerifiedMode ? "Two Factor Authentication" : ""}
                        actions={isMode?.isChangePasswordMode ?
                          null :
                          isMode?.isTwoFactorVerificationMode ?
                            <RHFButton
                              btnName="Verify"
                              onClick={() => {
                                setIsMode({ isAuthenticationVerifiedMode: true })
                              }}
                            /> :
                            isMode?.isAuthenticationVerifiedMode ?
                              <RHFButton
                                btnName="Close"
                                onClick={() => {
                                  handleToggle()
                                }}
                              /> :
                              ""
                        }
                      >
                        {isMode?.isChangePasswordMode && <ChangePasswordForm handleToggle={handleToggle} />}
                        {isMode?.isTwoFactorVerificationMode && <TwoFactorVerification />}
                        {isMode?.isAuthenticationVerifiedMode && <AuthenticationVerified />}
                      </DialogBox>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Row className="mb-3">
                  <Col sm="12">
                    <RHFTextField
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      // value="Kishan"
                      errorobj={errors}
                      control={control}
                      isController={true}
                    // readOnly
                    />
                  </Col></Row>
                <Row className="mb-3">
                  <Col sm="12">
                    <RHFTextField
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      // value="Jotangiya"
                      errorobj={errors}
                      control={control}
                      isController={true}
                    // readOnly
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm="12">
                    <RHFTextField
                      id="position"
                      label="Position"
                      name="position"
                      // value="Admin"
                      errorobj={errors}
                      control={control}
                      isController={true}
                    // readOnly
                    />
                  </Col>
                </Row>
                {isModulePermisssion(ROLE_PERMISSIONS?.UPDATE_2FA_MECHANISM) &&
                  <Row className="mb-3">
                    <Col sm="12">
                      <label htmlFor="small-radius-switch" className="form-Label me-2">
                        Two Step-Verification
                      </label>
                      {checked === true &&
                        <FeatherIcon icon="settings" size={15}
                          onClick={() => {
                            handleToggle()
                            setIsMode({ isTwoFactorVerificationMode: true })
                          }} />
                      }
                      <Switch
                        className="react-switch d-flex"
                        checked={checked}
                        onChange={handleChange}
                        handleDiameter={28}
                        id="small-radius-switch"
                        onColor="#5156be"
                        offColor="#a2a1ff"
                        onHandleColor="#fff"
                        height={40}
                        width={100}
                        borderRadius={6}
                        activeBoxShadow="0px 0px 1px 2px white"
                        uncheckedIcon={
                          <div
                            className="d-flex justify-content-center align-items-center p-2"
                            style={{ color: "white" }}
                          >Disable</div>
                        }
                        checkedIcon={
                          <div
                            className="d-flex justify-content-center align-items-center p-2"
                            style={{ color: "white" }}
                          >Enble</div>
                        }
                      />
                    </Col>
                  </Row>
                }
                <Row className="me-1">
                  <div className="modal-footer m-auto">
                    <RHFButton
                      className="me-1"
                      btnName="Save"
                      type="submit"
                    />
                    <RHFButton
                      btnName="Cancel"
                      outline={true}
                    />
                  </div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default UserProfile;