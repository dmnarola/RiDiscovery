import React from "react";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Container } from "reactstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextField from "../../components/form-controls/RHFTextField";
import RHFAutoCompleteSelect from "../../components/form-controls/RHFAutoCompleteSelect";
import RHFDatePicker from "../../components/form-controls/RHFDatePicker";
import RHFSwitch from "../../components/form-controls/RHFSwitch";
import RHFButton from "../../components/form-controls/RHFButton";

const Dashboard = () => {
  document.title = "Dashboard | Minia - React Admin & Dashboard Template";
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
