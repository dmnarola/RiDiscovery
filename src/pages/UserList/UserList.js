import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FeatherIcon from "feather-icons-react";
import Table from "../../components/Tables/Table";
import AddModal from "../../components/Modals/AddModal";

const UserList = () => {
  document.title = "Role Management | Minia - React Admin & Dashboard Template";

  const columns = [
    {
      selector: (row) => (
        <img
          src="images/bg-1.jpg"
          style={{ borderRadius: "50%" }}
          width="35px"
          height="35px"
          alt="logo"
        />
      ),
    },
    {
      name: "Full Name",
      selector: (row) => row["fullname"],
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
      cell: (row) => <FeatherIcon icon="toggle-right" />,
    },
  ];

  const data = [
    {
      fullname: "ABC",
      email: "a@gmail.com",
      startdate: "12/06/2000",
      enddate: "22/10/2021",
    },
    {
      fullname: "XYZ",
      email: "x@gmail.com",
      startdate: "12/06/2000",
      enddate: "22/10/2021",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Role Management" breadcrumbItem="User List" />

          <AddModal>hhhhh</AddModal>
        </Container>
        <Card className="card-h-100">
          <CardBody>
            <Table columns={columns} data={data} />
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserList;
