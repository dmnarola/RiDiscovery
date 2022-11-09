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
  let tabData = []
  let initialTabValue

  const appData = !isModulePermisssion(ROLE_PERMISSIONS?.APPLICATION)
  const networkData = isModulePermisssion(ROLE_PERMISSIONS?.NETWORK)

  const filteredNetworkData = navLinkData.filter(data => data.tabName === "Network")
  const filteredAppData = navLinkData.filter(data => data.tabName === "Application")

  if (appData === false && networkData) {
    tabData = filteredNetworkData
    initialTabValue = "2"
  } else if (appData && networkData === false) {
    tabData = filteredAppData
    initialTabValue = "1"
  } else {
    tabData = navLinkData
    initialTabValue = "1"
  }

  const [activeTab, setactiveTab] = useState(initialTabValue);

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
            navLinkData={tabData}
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
