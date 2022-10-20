import React from 'react'
import { Container } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb';
import ApplicationDetail from './details';
import Finding from '../Finding'

const Overview = () => {
    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumb title="Application" breadcrumbItem="Application Overview" />
                <ApplicationDetail />
                <Finding />
            </Container>
        </div>
    )
}

export default Overview