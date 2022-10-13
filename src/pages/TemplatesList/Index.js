import React from "react";
import { Card, CardBody, Container } from "reactstrap";
import Table from "../../components/Tables/Table";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FeatherIcon from "feather-icons-react";

const TemplatesList = () => {
  document.title =
    "Reporting Template | Minia - React Admin & Dashboard Template";

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
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Reporting Template"
            breadcrumbItem="Templates List"
          />
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

export default TemplatesList;
