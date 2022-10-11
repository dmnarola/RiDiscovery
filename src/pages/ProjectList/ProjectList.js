import React from "react";
import { Card, CardBody, Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import FeatherIcon from "feather-icons-react";
import Table from "../../components/Tables/Table";

const ProjectList = () => {
  document.title = "Certificate| Minia - React Admin & Dashboard Template";

  const columns = [
    {
      name: "Project Name",
      selector: (row) => row["projectname"],
      sortable: true,
    },
    {
      name: "Pen ID",
      selector: (row) => row["penid"],
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

export default ProjectList;
