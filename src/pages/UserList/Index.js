import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FeatherIcon from "feather-icons-react";
import Table from "../../components/Tables/Table";
import DialogBox from "../../components/Modals/DialogBox";
import RHFButton from "../../components/form-controls/RHFButton";
import RHFTextField from "../../components/form-controls/RHFTextField";
import RHFSwitch from "../../components/form-controls/RHFSwitch";
import UserAddEdit from "./UserAddEdit";
import { useForm } from "react-hook-form";

const UserList = () => {
  document.title = "Role Management | Minia - React Admin & Dashboard Template";

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [formData, setFormData] = useState(null);

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleToggle = () => {
    setIsModelOpen(!isModelOpen);
  };

  const handleSwitchChange = (value) => {
    setValue("isActive", value);
  };

  useEffect(() => {
    if (formData) {
      console.log('formData :>> ', formData);
    }
  }, [formData])

  const columns = [
    {
      name: "Full Name",
      selector: (row) => (
        <div>
          <img
            src={row?.image}
            style={{ borderRadius: "50%" }}
            width="35px"
            height="35px"
            alt="logo"
          />{" "}
          <span className="m-3">{row?.firstName} {row?.lastName}</span>
        </div>
      ),

      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row?.email,
    },
    {
      name: "Start Date",
      selector: (row) => row?.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row?.endDate,
      sortable: true,
    },
    {
      name: "Edit",
      selector: (row) => (
        <FeatherIcon
          icon="edit"
          size="18"
          onClick={(e) => {
            handleToggle();
            setEditUserData(row);
          }}
        />
      ),
    },
    {
      name: "Active/Deactive",
      cell: (row) => (
        <RHFSwitch
          name="isActive"
          label="Is Active"
          isController={true}
          checked={isActive}
          errorobj={errors}
          control={control}
          onChange={handleSwitchChange}
        />
      ),
    },
  ];

  const data = [
    {
      _id: 1,
      internal: "Red",
      image: "images/bg-1.jpg",
      firstName: "ABC",
      lastName: "vdgs",
      email: "a@gmail.com",
      companyName: "Narola",
      domainName: "dadada",
      mobileNumber: 9849375666,
      role: "Slate",
      startDate: "2000-06-12",
      endDate: "2021-10-22",
      isActive: isActive,
    },
    {
      _id: 2,
      internal: "Orange",
      image: "images/bg-3.jpg",
      firstName: "XYZ",
      lastName: "vdgs",
      email: "x@gmail.com",
      companyName: "Narola",
      domainName: "fsdfe",
      mobileNumber: 9849375666,
      role: "Slate",
      startDate: "2000-06-12",
      endDate: "2021-10-22",
      isActive: isActive,
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
                    errorobj={errors}
                    control={control}
                    isController={false}
                  />
                </Col>
                <Col>
                  <div className="col d-flex justify-content-end align-items-end">
                    <RHFButton
                      btnName="Add User"
                      icon="plus"
                      onClick={() => {
                        handleToggle()
                        setEditUserData(null)
                        setFormData(null)
                      }}
                    />
                    <DialogBox
                      isModelOpen={isModelOpen}
                      handleToggle={handleToggle}
                      modelSize="lg"
                      title={editUserData === null ? "New User" : "Edit User"}
                      actions={null}
                    >
                      <UserAddEdit
                        editUserData={editUserData}
                        setFormData={setFormData}
                        handleToggle={handleToggle}
                      />
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
