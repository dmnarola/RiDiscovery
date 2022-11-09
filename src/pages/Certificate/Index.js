import FeatherIcon from "feather-icons-react";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import RHFTextField from "../../components/form-controls/RHFTextField";
import Table from "../../components/Tables/Table";
import ActionButtons from "components/form-controls/ActionButtons";
import { isModulePermisssion } from "helpers/util";
import { ROLE_PERMISSIONS } from "constants/RolePermissions";
import { useHistory } from "react-router-dom";

const ProjectList = () => {
  document.title = "Certificate| RiDiscovery";

  const [filterColumns, setFilterColumns] = useState([]);
  const [columnOptions, setColumnOption] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const columnFilter = [...columns];
    setColumnOption([...columns]);
    setFilterColumns(columnFilter.filter(o => o.isVisible && o));
  }, [])


  const downloadHandler = (obj) => {
    console.log({ obj })
  }


  const handleActionClick = (payload, actionType) => {
    const actionMapper = {
      download: downloadHandler
    };

    if (actionMapper[actionType]) {
      actionMapper[actionType](payload);
    }
  };
  const columns = [
    {
      name: "Project Name",
      selector: (row) => row?.projectname,
      isVisible: true,
    },
    {
      name: "Pen ID",
      selector: (row) => row?.penid,
      isVisible: true,
    },
    {
      name: "Action",
      isVisible: true,
      selector: (row) => {
        return (
          <ActionButtons
            download={{
              handleClick: () => handleActionClick(row, 'download'),
            }}
          />
        );
      },
      isVisible: isModulePermisssion(ROLE_PERMISSIONS?.DOWNLOAD_CERTIFICATE),
    }

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
                {isModulePermisssion(ROLE_PERMISSIONS?.CERTIFICATE_LIST) &&
                  <Col md="3">
                    <RHFTextField
                      id="search"
                      name="search"
                      placeholder="Search here"
                      isController={false}
                      handleOnChange={handleOnChange}
                    />
                  </Col>
                }
              </Row>
            </CardHeader>
            {isModulePermisssion(ROLE_PERMISSIONS?.CERTIFICATE_LIST) &&
              <CardBody CardBody >
                <Table columns={filterColumns} data={data} />
              </CardBody>
            }
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProjectList;
