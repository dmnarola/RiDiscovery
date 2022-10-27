import Breadcrumb from "components/Common/Breadcrumb";
import ActionButtons from "components/form-controls/ActionButtons";
import RHFButton from "components/form-controls/RHFButton";
import DialogBox from "components/Modals/DialogBox";
import Table from "components/Tables/Table";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Container } from "reactstrap";
import CompanyAddEdit from "./CompanyAddEdit";

const Company = () => {
  const [editCompanyData, setEditCompanyData] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleToggle = () => {
    setIsModelOpen(!isModelOpen);
  };

  const data = [
    {
      id: 1,
      name: "Aether Industries",
      score: "1.1",
      category: "Development Agency",
      image: "/images/bg-1.jpg",
    },
    {
      id: 2,
      name: "Aether Industries",
      score: "1.1",
      category: "Security Agency",
      image: "/images/bg-3.jpg",
    },
  ];

  const developmentCompany = data.filter(
    (comp) => comp.category === "Development Agency"
  );

  const securityCompany = data.filter(
    (comp) => comp.category === "Security Agency"
  );

  const columns = [
    {
      name: "Company Name",
      selector: (row) => (
        <div>
          <img
            src={row?.image}
            className="rounded-circle"
            width="35px"
            height="35px"
            alt="logo"
          />
          <span className="m-3">{row?.name}</span>
        </div>
      ),

      sortable: true,
    },
    {
      id: "score",
      name: "Score",
      selector: (row) => (
        <span className="badge-soft-danger badge fs-6">{row?.score}</span>
      ),
      sortable: true,
      isVisible: true,
    },
    {
      name: "Edit",
      isVisible: true,
      selector: (row) => {
        return (
          <ActionButtons
            edit={{
              handleClick: () => setEditUserData(row),
            }}
          />
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Company" breadcrumbItem="Company List" />

          <Col xs={6} lg={12}>
            <div className="d-flex justify-content-end mb-3">
              <RHFButton
                btnName="Add"
                icon="plus"
                onClick={() => {
                  handleToggle();
                }}
              />
              <DialogBox
                isModelOpen={isModelOpen}
                handleToggle={handleToggle}
                modelSize="md"
                title={
                  editCompanyData === null ? "Add Company" : "Edit Company"
                }
                actions={null}
              >
                <CompanyAddEdit
                  editCompanyData={editCompanyData}
                  setFormData={setFormData}
                  handleToggle={handleToggle}
                />
              </DialogBox>
            </div>
          </Col>

          <Card>
            {/* <div>
              <RHFButton color="info">Development Agency</RHFButton>
            </div> */}
            <CardHeader>
              <h5>Development Agency </h5>
            </CardHeader>
            <CardBody>
              <Table columns={columns} data={developmentCompany} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h5>Security Agency </h5>
            </CardHeader>
            <CardBody>
              <Table columns={columns} data={securityCompany} />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Company;
