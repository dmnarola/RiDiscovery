import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Table from "../../components/Tables/Table";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FeatherIcon from "feather-icons-react";
import RHFTextField from "components/form-controls/RHFTextField";
import RHFButton from "components/form-controls/RHFButton";
import ActionButtons from "components/form-controls/ActionButtons";

const TemplatesList = () => {
  document.title =
    "Reporting Template | Minia - React Admin & Dashboard Template";


  const editHandler = (obj) => {
    console.log({ obj })
    handleToggle();
  };


  const handleActionClick = (payload, actionType) => {
    const actionMapper = {
      edit: editHandler,
    };
    if (actionMapper[actionType]) {
      actionMapper[actionType](payload);
    }
  };


  const columns = [
    {
      name: "Template Name",
      selector: (row) => row?.templatename,
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
  }

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
                    <div className="me-2">
                    </div>
                    <RHFButton
                      btnName="Add Template"
                      icon="plus"
                    />
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
