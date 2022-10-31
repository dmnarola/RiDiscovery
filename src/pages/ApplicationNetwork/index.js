import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';

import RHFButton from 'components/form-controls/RHFButton';
import Application from './Application';
import Network from './Network';


const ApplicationNetwork = () => {
  let location = useLocation()
  let tabValue = location.state?.activeTab
  const [activeTab, setactiveTab] = useState(tabValue || 1);

  return (
    <div className="page-content">
      <Container fluid>

        <div className='page-title-box'>
          <RHFButton
            btnName="Application"
            onClick={() => setactiveTab(1)}
            outline={activeTab === 1 ? false : true}
          />
          {' '}
          <RHFButton
            btnName="Network"
            onClick={() => setactiveTab(2)}
            outline={activeTab === 2 ? false : true}
          />
        </div>

        {activeTab === 1 ? <Application /> : <Network />}

      </Container>
    </div>

  )
}

export default ApplicationNetwork;
