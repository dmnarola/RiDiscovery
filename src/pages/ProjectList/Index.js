import FeatherIcon from "feather-icons-react";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import RHFTextField from "../../components/form-controls/RHFTextField";
import Table from "../../components/Tables/Table";

const ProjectList = () => {
  document.title = "Certificate| RiDiscovery";

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

  const handleOnChange = (data, name) => {
    console.log({ data, name });
  };

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
                    isController={false}
                    handleOnChange={handleOnChange}
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
