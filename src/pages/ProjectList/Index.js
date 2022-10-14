import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FeatherIcon from "feather-icons-react";
import Table from "../../components/Tables/Table";
import RHFTextField from "../../components/form-controls/RHFTextField";

const ProjectList = () => {
  document.title = "Certificate| Minia - React Admin & Dashboard Template";

  const columns = [
    {
      name: "Project Name",
      selector: (row) => row?.projectname,
      sortable: true,
    },
    {
      name: "Pen ID",
      selector: (row) => row?.penid,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => <FeatherIcon icon="download" />,
    },
  ];

  const data = [
    {
      projectname: "ABC",
      penid: "A1234",
    },
    {
      projectname: "XYZ",
      penid: "X1234",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Certificate" breadcrumbItem="Project List" />
          <Card>
            <CardHeader>
              <Row>
                <Col md="3">
                  <RHFTextField
                    id="search"
                    name="search"
                    placeholder="Search here"
                    // errorobj={errors}
                    // control={control}
                    isController={false}
                  />
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

export default ProjectList;
