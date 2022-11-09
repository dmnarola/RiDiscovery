import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import RHFAutoCompleteSelect from "components/form-controls/RHFAutoCompleteSelect";
import RHFDatePicker from "components/form-controls/RHFDatePicker";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import RHFButton from "../../components/form-controls/RHFButton";
import RHFSwitch from "../../components/form-controls/RHFSwitch";
import DialogBox from "../../components/Modals/DialogBox";
import Table from "../../components/Tables/Table";
import UserAddEdit from "./UserAddEdit";
import ActionButtons from "components/form-controls/ActionButtons";
import { USER } from "helpers/services/User";
import { COMPANY } from "helpers/services/Company";
import { makeAPICall } from "helpers/api_helper";
import { ROLE } from "helpers/services/Role";
import { useDispatch } from "react-redux";
import { updateUser } from "store/user/actions";

// constant for dropdown
const StatusData = [
  {
    value: true,
    label: "Active",
  },
  { value: false, label: "De-Active" },
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
  {
    _id: 3,
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
    _id: 4,
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
  const [editUserData, setEditUserData] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [userRoleList, setUserRoleList] = useState([]);
  const [allRoleList, setAllRoleList] = useState([]);
  const [isFilterModelOpen, setIsFilterModelOpen] = useState(false);
  const [filterFields, setFilterData] = useState();
  const [isRefresh, setRefresh] = useState(false);


  let history = useHistory();
  const dispatch = useDispatch();
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

  const handleSwitchChange = (value, row) => {
    const payload = {
      userId: row?.id,
      activated: !row?.activated
    }

    dispatch(updateUser({ ...payload }));
    setTimeout(() => {
      setRefresh(prevValue => !prevValue)
    }, 500)
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
    const payload = {
      "limit": 10,
      "page": 1,
      "type": [
        "development_agency_external",
        "security_agency_external",
        "security_agency_internal",
        "development_agency_internal"
      ]
    }
    Promise.all([
      makeAPICall({ option: COMPANY.listAllCompany, data: payload }),
      makeAPICall({ option: ROLE.getRoles })
    ]).then(([companies, roles]) => {
      setCompanyList(companies?.data?.map(cmp => ({ value: cmp?.id, label: cmp?.companyName })));
      setUserRoleList(roles?.data?.userRoles?.map(role => ({ value: role?.roleSlug, label: role?.roleName })));
      setAllRoleList(roles?.data?.allRoles?.map(role => ({ value: role?.roleSlug, label: role?.roleName })));
    })
  }, []);


  const handleOnChange = (data, name) => {
    const value = data;
    setFilterData((prevValue) => {
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
              // history.push(`/user-list/user/${id}`);
              history.push({ pathname: `/user-list/user/${row?.id}`, state: { userDetails: row } });
            }}
          >
            {row?.firstName} {row?.lastName}
          </span>
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row?.email,
    },
    {
      name: "Start Date",
      selector: (row) => row?.startDate,

    },
    {
      name: "End Date",
      selector: (row) => row?.endDate,

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
          name="activated" // isActive
          isController={false}
          checked={row?.activated}
          rowData={row}
          onChange={(val, row) => handleSwitchChange(val, row)}
        />
      ),
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
                {isFilterModelOpen && (
                  <>
                    <Col md="2">
                      <RHFAutoCompleteSelect
                        id="roleId"
                        label="Role"
                        name="roleId"
                        options={allRoleList}
                        isMultiple={false}
                        isController={false}
                        handleOnChange={handleOnChange}
                      />
                    </Col>
                    <Col md="2">
                      <RHFAutoCompleteSelect
                        id="activated"
                        label="Status"
                        name="activated"
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
                        handleToggle={handleToggle}
                        setRefresh={setRefresh}
                        companyList={companyList}
                        roleList={userRoleList}
                      />
                    </DialogBox>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="table-responsive">
              <Table
                columns={columns}
                dataURL={USER.listAllUser}
                isRefresh={isRefresh}
                filter={filterFields}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserList;
