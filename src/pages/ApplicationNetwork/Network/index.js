import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb';
import Table from 'components/Tables/Table';
import RHFTextField from 'components/form-controls/RHFTextField';
import AvtarGroup from 'components/form-controls/AvtarGroup';
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "assets/images";
import FilterByStatus from 'components/Common/FilterByStatus';
import RHFButton from 'components/form-controls/RHFButton';

const usersList = [
    { id: 1, name: 'Dipesh Mali', image: avatar1 },
    { id: 2, name: 'Mahesh', image: avatar2 },
    { id: 3, name: 'Foram', image: avatar3 },
    { id: 4, name: 'Pratik', image: avatar4 },
    { id: 5, name: 'Priyal', image: avatar5 },
]

const data = [
    {
        id: 1,
        name: 'ABC',
        type: 'Q1',
        source: 'S1',
        score: '1.1',
        branchUnit: 'Surat',
        startDate: '22-10-2022',
        endDate: '02-11-2022',
        team: []
    },
    {
        id: 2,
        name: 'XYZ',
        type: 'Q2',
        source: 'S2',
        score: '1.5',
        branchUnit: 'Baroda',
        startDate: '25-10-2022',
        endDate: '10-11-2022',
        team: []
    }
];

const Network = () => {


    const [customActiveTab, setcustomActiveTab] = useState(1);

    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };


    const columns = [
        {
            name: "Network Name",
            selector: (row) => row?.name,
        },
        {
            name: "Type",
            selector: (row) => row?.type,
            sortable: true,
        },
        {
            name: "Source",
            selector: (row) => row?.source,
            sortable: true,
        },
        {
            name: "Score",
            selector: (row) => <span className='badge-soft-danger badge fs-6'>{row?.score}</span>,
            sortable: true,
        },
        {
            name: "BU Tag",
            selector: (row) => row?.branchUnit,
            sortable: true,
        },
        {
            name: "Start Date",
            selector: (row) => row?.startDate,
            sortable: true,
        },
        {
            name: "End Date",
            selector: (row) => row?.endDate,
            sortable: true,
        },
        {
            name: "Team",
            selector: (row) => {
                return (
                    <AvtarGroup
                        users={usersList} //  row?.projectManager,
                        max={3}
                    />
                )
            }
        }
    ];


    return (
        <Container fluid>
            <Breadcrumb title="Network" breadcrumbItem="Network" />
            <Row>
                <Col lg={8} xs={12}>
                    <FilterByStatus
                        statusList={[
                            { name: 'All', icon: 'disc' },
                            { name: 'Open', icon: 'target' },
                            { name: 'Scheduled', icon: 'clock' },
                            { name: 'In progress', icon: 'loader' },
                            { name: 'Action Required', icon: 'alert-circle' },
                            { name: 'In Review', icon: 'file-text' },
                            { name: 'Completed', icon: 'check-circle' },
                        ]}
                        toggleCustom={toggleCustom}
                        customActiveTab={customActiveTab}
                    />
                </Col>
            </Row>
            <Card>
                <CardHeader>
                    <Row>
                        <Col xs={6} lg={3}>
                            <RHFTextField
                                id="search"
                                name="search"
                                placeholder="Search here"
                                isController={false}
                            />
                        </Col>
                        <Col xs={6} lg={9}>
                            <div className="col d-flex justify-content-end">
                                <RHFButton
                                    btnName="Add"
                                    icon="plus"
                                />
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Table columns={columns} data={data} />
                </CardBody>
            </Card>
        </Container>
    )
}

export default Network;