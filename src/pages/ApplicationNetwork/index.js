import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'reactstrap';
import Application from './Application';
import Network from './Network';
import Tabs from 'components/Tab/Tabs';
import { isModulePermisssion } from 'helpers/util';
import { ROLE_PERMISSIONS } from 'constants/RolePermissions';

const navLinkData = [
  {
    tabNo: "1",
    tabName: "Application"
  }, {
    tabNo: "2",
    tabName: "Network"
  }]

const ApplicationNetwork = () => {

  const [activeTab, setactiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  return (
    <div className="page-content1">
      <Card>
        <div className='page-title-box'>
          <Tabs
            navLinkData={activeTab}
            activeTab={activeTab}
            toggle={toggle}
          >
            {activeTab === "1" ? <Application /> : <Network />}
          </Tabs>
        </div>
      </Card>
    </div>

  )
}

export default ApplicationNetwork;
