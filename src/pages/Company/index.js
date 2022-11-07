import React, { useState, useEffect } from "react";
import Breadcrumb from "components/Common/Breadcrumb";
import ActionButtons from "components/form-controls/ActionButtons";
import RHFButton from "components/form-controls/RHFButton";
import DialogBox from "components/Modals/DialogBox";
import Table from "components/Tables/Table";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllAgency, getAllDevAgency, getAllSecurityAgency } from "store/company/agency/actions";
import CompanyAddEdit from "./CompanyAddEdit";
import { isModulePermisssion } from "helpers/util";
import { ROLE_PERMISSIONS } from "constants/RolePermissions";

const Company = () => {
  const [editCompanyData, setEditCompanyData] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const { isLoading, devAgency, securityAgency } = useSelector(state => state.Agency)

  console.log("list =>", devAgency)

  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsModelOpen(!isModelOpen);
  };

  useEffect(() => {

    const devPayload = {
      "limit": 10,
      "offset": 0,
      "type": ["development_agency_internal", "development_agency_external"]
    }

    const securityPayload = {
      "limit": 10,
      "offset": 0,
      "type": ["security_agency_internal", "security_agency_external"]
    }

    dispatch(getAllDevAgency(devPayload))
    dispatch(getAllSecurityAgency(securityPayload))

  }, [])



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
        <span className="badge-soft-danger badge fs-6">5</span>
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
          {isModulePermisssion(ROLE_PERMISSIONS?.ADD_UPDATE_AGENCY) &&
            <RHFButton
              btnName="Add"
              icon="plus"
              onClick={() => {
                handleToggle();
              }}
            />
          }
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
              {/* <Table columns={columns} data={developmentCompany} /> */}
              <Table columns={columns} data={devAgency?.companies} />
            </CardBody></Card>
        </Col>
        <Col sm="6">
          <Card>
            <CardHeader>
              <h5 className="m-0">Security Agency </h5>
            </CardHeader>
            <CardBody>
              {/* <Table columns={columns} data={securityCompany} /> */}
              <Table columns={columns} data={securityAgency?.companies} />
            </CardBody></Card>
        </Col>
      </Row>
    </div>

  );
};

export default Company;
