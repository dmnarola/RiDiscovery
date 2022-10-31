import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import RHFAutoCompleteSelect from "components/form-controls/RHFAutoCompleteSelect";
import RHFDatePicker from "components/form-controls/RHFDatePicker";
import FeatherIcon from "feather-icons-react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import RHFButton from "../../components/form-controls/RHFButton";
import RHFSwitch from "../../components/form-controls/RHFSwitch";
import DialogBox from "../../components/Modals/DialogBox";
import Table from "../../components/Tables/Table";
import UserAddEdit from "./UserAddEdit";
import ActionButtons from "components/form-controls/ActionButtons";

// constant for dropdown
const StatusData = [
  {
    value: true,
    label: "Active",
  },
  { value: false, label: "Deactive" },
];
const RoleData = [
  {
    value: "OMA-Owner Admin",
    label: "OMA-Owner Admin",
  },
  {
    value: "CSM-Company Senior Manager",
    label: "CSM-Company Senior Manager",
  },
  {
    value: "DAPM-DA Project Manager",
    label: "DAPM-DA Project Manager",
  },
  {
    value: "SAPM-SA Project Manager",
    label: "SAPM-SA Project Manager",
  },
  {
    value: "DATM-DA Team Member",
    label: "DATM-DA Team Member",
  },
  {
    value: "SAPM-SA Pentester Member",
    label: "SAPM-SA Pentester Member",
  },
  {
    value: "SATL-SA Team Lead",
    label: "SATL-SA Team Lead",
  },
  {
    value: "Executive",
    label: "Executive",
  },
];

export const tabledata = [
  {
    _id: 1,
    internal: "Red",
    image: "/images/bg-1.jpg",
    firstName: "ABC",
    lastName: "vdgs",
    email: "a@gmail.com",
    companyName: "Narola",
    domainName: "dadada",
    mobileNumber: 9849375666,
    role: "Slate",
    startDate: "2000-06-12",
    endDate: "2021-10-22",
    isActive: true,
    category: "Security Agency",
  },
  {
    _id: 2,
    internal: "Orange",
    image: "/images/bg-3.jpg",
    firstName: "XYZ",
    lastName: "vdgs",
    email: "x@gmail.com",
    companyName: "Narola",
    domainName: "fsdfe",
    mobileNumber: 9849375666,
    role: "Slate",
    startDate: "2000-06-12",
    endDate: "2021-10-22",
    isActive: false,
    category: "Application Agency",
  },
];

const UserList = () => {
  document.title = "Role Management | RiDiscovery";

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isFilterModelOpen, setIsFilterModelOpen] = useState(false);
  const [dropdownData, setDropdownData] = useState();
  let history = useHistory();
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

  const handleFilterToggle = () => {
    setIsFilterModelOpen(!isFilterModelOpen);
  };

  const handleSwitchChange = (value) => {
    setValue("isActive", value);
  };

  const editHandler = (obj) => {
    console.log({ obj })
    handleToggle();
    setEditUserData(obj);
  };

  const handleActionClick = (payload, actionType) => {
    const actionMapper = {
      edit: editHandler,
    };
    if (actionMapper[actionType]) {
      actionMapper[actionType](payload);
    }
  };

  useEffect(() => {
    if (formData) {
      console.log("formData :>> ", formData);
    }
  }, [formData]);

  const columns = [
    {
      name: "Full Name",
      selector: (row) => (
        <div>
          <img
            src={row?.image}
            className="rounded-circle"
            width="35px"
            height="35px"
            alt="logo"
          />
          <span
            className="m-3"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              const _id = row["_id"];
              history.push(`/user-list/user/${_id}`);
            }}
          >
            {row?.firstName} {row?.lastName}
          </span>
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
      name: "Actions",
      minWidth: "150px",
      isVisible: true,
      selector: (row) => {
        return (
          <ActionButtons
            edit={{
              handleClick: () => handleActionClick(row, 'edit'),
            }}
          />
        );
      },
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

  const handleOnChange = (data, name) => {
    const value = data;
    setDropdownData((prevValue) => {
      const prev = {
        ...prevValue,
      };
      if (value === undefined || value === "") {
        delete prev[name];
      } else {
        prev[name] = value;
      }
      return prev;
    });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Role Management" breadcrumbItem="User List" />
          <Card>
            <CardHeader>
              <Row>
                {isFilterModelOpen && (
                  <>
                    <Col md="2">
                      <RHFAutoCompleteSelect
                        id="role"
                        label="Role"
                        name="role"
                        options={RoleData}
                        isMultiple={false}
                        isController={false}
                        handleOnChange={handleOnChange}
                      />
                    </Col>
                    <Col md="2">
                      <RHFAutoCompleteSelect
                        id="status"
                        label="Status"
                        name="status"
                        options={StatusData}
                        isMultiple={false}
                        isController={false}
                        handleOnChange={handleOnChange}
                      />
                    </Col>
                    <Col md="2">
                      <RHFDatePicker
                        name="startDate"
                        label="Start Date"
                        isController={false}
                        handleOnChange={handleOnChange}
                      />
                    </Col>
                    <Col md="2">
                      <RHFDatePicker
                        name="endDate"
                        label="End Date"
                        isController={false}
                        handleOnChange={handleOnChange}
                      />
                    </Col>
                  </>
                )}
                <Col>
                  <div className="col d-flex justify-content-end align-items-end">
                    <div className="me-2">
                      <RHFButton
                        btnName="Filter"
                        icon="filter"
                        onClick={() => {
                          handleFilterToggle();
                        }}
                      />
                    </div>
                    <RHFButton
                      btnName="Add User"
                      icon="plus"
                      onClick={() => {
                        handleToggle();
                        setEditUserData(null);
                        setFormData(null);
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
            <CardBody className="table-responsive">
              <Table columns={columns} data={tabledata} className="table mb-0" />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserList;
