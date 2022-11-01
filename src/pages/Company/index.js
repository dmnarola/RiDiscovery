import Breadcrumb from "components/Common/Breadcrumb";
import ActionButtons from "components/form-controls/ActionButtons";
import RHFButton from "components/form-controls/RHFButton";
import DialogBox from "components/Modals/DialogBox";
import Table from "components/Tables/Table";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
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
      companyName: "Aether Industries",
      score: "1.1",
      domainName: "domain 1",
      category: "Development Agency",
      companyLogo: "/images/bg-1.jpg",
    },
    {
      id: 2,
      companyName: "Aether Industries",
      score: "1.1",
      domainName: "domain 2",
      category: "Security Agency",
      companyLogo: "/images/bg-3.jpg",
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
            src={row?.companyLogo}
            className="rounded-circle"
            width="35px"
            height="35px"
            alt="logo"
          />
          <span className="m-3">{row?.companyName}</span>
        </div>
      ),
    },
    {
      id: "score",
      name: "Score",
      selector: (row) => (
        <span className="badge-soft-danger badge fs-6">{row?.score}</span>
      ),
      isVisible: true,
    },
    {
      name: "Edit",
      isVisible: true,
      selector: (row) => {
        return (
          <ActionButtons
            edit={{
              handleClick: () => { handleToggle(); setEditCompanyData(row) }
            }}
          />
        );
      },
    },
  ];

  return (

    <div className="page-content">

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


      <Row>
        <Col sm="6">
          <Card>
            <CardHeader >
              <h5 className="m-0">Development Agency </h5>
            </CardHeader>
            <CardBody>
              <Table columns={columns} data={developmentCompany} />
            </CardBody></Card>
        </Col>
        <Col sm="6">
          <Card>
            <CardHeader>
              <h5 className="m-0">Security Agency </h5>
            </CardHeader>
            <CardBody>
              <Table columns={columns} data={securityCompany} />
            </CardBody></Card>
        </Col>
      </Row>
    </div>

  );
};

export default Company;