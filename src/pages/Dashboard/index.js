import React from "react";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Container } from "reactstrap";

const Dashboard = () => {
  document.title = "Dashboard | RiDiscovery";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
