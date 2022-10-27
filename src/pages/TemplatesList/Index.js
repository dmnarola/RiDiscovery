import RHFButton from "components/form-controls/RHFButton";
import RHFTextField from "components/form-controls/RHFTextField";
import FeatherIcon from "feather-icons-react";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/Tables/Table";

const TemplatesList = () => {
  document.title = "Reporting Template | RiDiscovery";

  const columns = [
    {
      name: "Template Name",
      selector: (row) => row?.templatename,
      sortable: true,
    },
    {
      name: "Edit",
      selector: (row) => <FeatherIcon icon="edit" />,
    },
  ];
  const data = [
    {
      templatename: "default Template",
    },
    {
      templatename: "ABC Template",
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
          <Breadcrumbs
            title="Reporting Template"
            breadcrumbItem="Templates List"
          />

          <Card className="card-h-100">
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
                <Col>
                  <div className="col d-flex justify-content-end align-items-end">
                    <div className="me-2"></div>
                    <RHFButton btnName="Add Template" icon="plus" />
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

export default TemplatesList;
