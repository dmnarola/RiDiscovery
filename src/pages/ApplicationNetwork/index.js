import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';

import RHFButton from 'components/form-controls/RHFButton';
import Application from './Application';
import Network from './Network';
import Tabs from 'components/Tab/Tabs';

const navLinkData = [
  {
    tabNo: "1",
    tabName: "Application"
  }, {
    tabNo: "2",
    tabName: "Network"
  }]


const ApplicationNetwork = () => {
  let location = useLocation()
  let tabValue = location.state?.activeTab
  const [activeTab, setactiveTab] = useState(tabValue || "1");


  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>

        <div className='page-title-box'>
          <Tabs
            navLinkData={navLinkData}
            activeTab={activeTab}
            toggle={toggle}
          />
        </div>

        {activeTab === "1" ? <Application /> : <Network />}

      </Container>
    </div>

  )
}

export default ApplicationNetwork;
