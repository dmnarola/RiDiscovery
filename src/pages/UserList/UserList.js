import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FeatherIcon from "feather-icons-react";
import Table from "../../components/Tables/Table";
import DialogBox from "../../components/Modals/DialogBox";
import RHFButton from "../../components/form-controls/RHFButton";
import { useForm } from "react-hook-form";
import RHFTextField from "../../components/form-controls/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFSwitch from "../../components/form-controls/RHFSwitch";
import RHFAutoCompleteSelect from "../../components/form-controls/RHFAutoCompleteSelect";
import RHFDatePicker from "../../components/form-controls/RHFDatePicker";

const UserList = () => {
  document.title = "Role Management | Minia - React Admin & Dashboard Template";

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const userSchema = yup.object().shape({
    internal: yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .nullable()
      .required("Select atleast one option"),

    firstName: yup.string().required("firstName is required"),
    lastName: yup.string().required("lastName is required"),
    companyName: yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .nullable()
      .required("Select atleast one option"),

    mobileNumber: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "mobile number is not valid"
      )
      .required("mobile no. is required"),
    role: yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .nullable()
      .required("Select atleast one option"),
    domainName: yup.string().required("Domain Name is required"),

    email: yup.string().email().max(150).required("Email is required"),
    startDate: yup.date().required("Date is required"),
    endDate: yup.date().required("Date is required"),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(userSchema),
  });

  const handleToggle = () => {
    setIsModelOpen(!isModelOpen);
    // removeBodyCss();
  };

  const onSubmit = (values) => {
    console.log("values =>", values);
  };

  const handleSwitchChange = (value) => {
    // console.log("_id :>> ", _id, value);
    // console.log("isActive :>> ", isActive);
    // setIsActive(!value);
    // // setIsModelOpen(!isModelOpen);

    setValue("isActive", value);
  };

  const columns = [
    {
      name: "Full Name",
      selector: (row) => (
        <div>
          <img
            src={row["image"]}
            style={{ borderRadius: "50%" }}
            width="35px"
            height="35px"
            alt="logo"
          />{" "}
          <span className="m-3">{row["fullname"]}</span>
        </div>
      ),

      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row["email"],
    },
    {
      name: "Start Date",
      selector: (row) => row["startdate"],
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row["enddate"],
      sortable: true,
    },
    {
      name: "Edit",
      selector: (row) => <FeatherIcon icon="edit" />,
    },
    {
      name: "Active/Deactive",
      cell: (row) => (
        <RHFSwitch
          name="isActive"
          label="Is Active"
          isController={true}
          checked={isActive}
          errorObj={errors}
          control={control}
          // onChange={async () => {
          //   const s_id = row["_id"];
          //   await dispatch(handleActiveStatus(`/shop/deactive/${s_id}`));
          //   await dispatch(handleDisplay());
          // }}
          onChange={handleSwitchChange}
        />
      ),
    },
  ];

  const data = [
    {
      _id: 1,
      image: "images/bg-1.jpg",
      fullname: "ABC",
      email: "a@gmail.com",
      startdate: "12/06/2000",
      enddate: "22/10/2021",
      isActive: isActive,
    },
    {
      _id: 2,
      image: "images/bg-3.jpg",
      fullname: "XYZ",
      email: "x@gmail.com",
      startdate: "12/06/2000",
      enddate: "22/10/2021",
      isActive: isActive,
    },
  ];

  const DropDownData = [
    {
      value: "red",
      label: "Red",
      color: "#FF5630",
      isFixed: true,
    },
    {
      value: "orange",
      label: "Orange",
      color: "#FF8B00",
    },
    {
      value: "yellow",
      label: "Yellow",
      color: "#FFC400",
    },
    {
      value: "green",
      label: "Green",
      color: "#36B37E",
    },
    {
      value: "forest",
      label: "Forest",
      color: "#00875A",
    },
    {
      value: "slate",
      label: "Slate",
      color: "#253858",
    },
  ];
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Role Management" breadcrumbItem="User List" />
          <Card>
            <CardHeader>
              <Row>
                <Col md="3">
                  <RHFTextField
                    id="search"
                    name="search"
                    placeholder="Search here"
                    errorObj={errors}
                    control={control}
                    isController={false}
                  />
                </Col>
                <Col>
                  <div className="col d-flex justify-content-end align-items-end">
                    <RHFButton
                      btnName="Add User"
                      icon="plus"
                      onClick={handleToggle}
                    />

                    <DialogBox
                      isModelOpen={isModelOpen}
                      setIsModelOpen={setIsModelOpen}
                      handleToggle={handleToggle}
                      handleSubmit={handleSubmit(onSubmit)}
                      btnName="Save"
                      title="New User"
                    >
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="col d-flex justify-content-end align-items-end">
                          <Col sm="4">
                            <RHFAutoCompleteSelect
                              id="internal"
                              label="Internal"
                              name="internal"
                              options={DropDownData}
                              isMultiple={false}
                              errorObj={errors}
                              control={control}
                              isController={true}

                              // handleOnChange={handleOnChange} // when isController === false
                            />
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col sm="6">
                            <RHFTextField
                              id="firstName"
                              label="First Name"
                              name="firstName"
                              placeholder="Enter valid First Name"
                              errorObj={errors}
                              control={control}
                              isController={true}
                            />
                          </Col>
                          <Col sm="6">
                            <RHFTextField
                              id="lastName"
                              label="Last Name"
                              name="lastName"
                              placeholder="Enter valid Last Name"
                              errorObj={errors}
                              control={control}
                              isController={true}
                            />
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col sm="12">
                            <RHFAutoCompleteSelect
                              id="companyName"
                              label="Company Name"
                              name="companyName"
                              options={DropDownData}
                              isMultiple={false}
                              errorObj={errors}
                              control={control}
                              isController={true}
                              // handleOnChange={handleOnChange} // when isController === false
                            />
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col sm="12">
                            <RHFTextField
                              id="mobileNumber"
                              label="Mobile Number"
                              name="mobileNumber"
                              placeholder="Enter valid Mobile Number"
                              errorObj={errors}
                              control={control}
                              isController={true}
                            />
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col sm="6">
                            <RHFAutoCompleteSelect
                              id="role"
                              label="Role"
                              name="role"
                              options={DropDownData}
                              isMultiple={false}
                              errorObj={errors}
                              control={control}
                              isController={true}
                              // handleOnChange={handleOnChange} // when isController === false
                            />
                          </Col>
                          <Col sm="6">
                            <RHFTextField
                              id="domainName"
                              label="Domain Name"
                              name="domainName"
                              placeholder="Enter valid Domain Name"
                              errorObj={errors}
                              control={control}
                              isController={true}
                            />
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col sm="12">
                            <RHFTextField
                              id="email"
                              label="Email"
                              name="email"
                              placeholder="Enter valid email"
                              errorObj={errors}
                              control={control}
                              isController={true}
                            />
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col sm="6">
                            <RHFDatePicker
                              name="startDate"
                              label="Start Date"
                              errorObj={errors}
                              control={control}
                              isController={true}
                            />
                          </Col>
                          <Col sm="6">
                            <RHFDatePicker
                              name="endDate"
                              label="End Date"
                              errorObj={errors}
                              control={control}
                              isController={true}
                            />
                          </Col>
                        </Row>

                        {/* <RHFButton btnName="Save" type="submit" /> */}
                      </form>
                    </DialogBox>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table columns={columns} data={data} />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserList;
