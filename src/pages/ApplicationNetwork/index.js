import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card } from 'reactstrap';
import Application from './Application';
import Network from './Network';
import Tabs from 'components/Tab/Tabs';
import { isModulePermisssion } from 'helpers/util';
import { ROLE_PERMISSIONS } from 'constants/RolePermissions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const navLinkData = [
  {
    tabNo: "application",
    tabName: "Application",
    isVisible: true,
  },
  {
    tabNo: "network",
    tabName: "Network",
    isVisible: true,
  }
]
const ApplicationNetwork = () => {

  const { permissions } = useSelector(state => state.Login);

  let location = useLocation()
  let tabValue = location.state?.activeTab //@fas - initialstate for tab

  const [filterColumns, setFilterColumns] = useState([]);
  const [activeTabNo, setActiveTabNo] = useState([])
  const [activeTab, setactiveTab] = useState('');

  let columnFilter = [...navLinkData];

  // let columnFilter = [...navLinkData];

  useEffect(() => {
    const filteredTabs = columnFilter.filter(o => o.isVisible && o);
    setFilterColumns(filteredTabs);
    setactiveTab(filteredTabs.length > 0 ? filteredTabs[0]?.tabNo : '')
  }, [permissions])

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  return (
    <div className="page-content1">
      <div className='page-title-box'>
        <Tabs
          navLinkData={filterColumns}
          activeTab={activeTab}
          toggle={toggle}
        >
          {activeTab === "application" && <Application />}
          {activeTab === "network" && <Network />}

        </Tabs>
      </div>
    </div>
  )
}

export default ApplicationNetwork;
