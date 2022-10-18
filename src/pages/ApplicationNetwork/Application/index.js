import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb';
import Table from 'components/Tables/Table';
import RHFTextField from 'components/form-controls/RHFTextField';
import AvtarGroup from 'components/form-controls/AvtarGroup';
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "assets/images";
import ActionButtons from 'components/form-controls/ActionButtons';
import FilterByStatus from 'components/Common/FilterByStatus';
import RHFButton from 'components/form-controls/RHFButton';
import DropdownButton from 'components/form-controls/DropdownButton';


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
        penId: 'AIL-1234',
        name: 'ABC',
        score: '1.1',
        assignePentester: [],
        assigneDeveloper: [],
        securityManager: [],
        projectManager: []
    },
    {
        id: 2,
        penId: 'AIL-2365',
        name: 'XYZ',
        score: '1.5',
        assignePentester: [],
        assigneDeveloper: [],
        securityManager: [],
        projectManager: []
    }

];

const Application = () => {

    const [customActiveTab, setcustomActiveTab] = useState(1);

    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };

    const previewHandler = (obj) => {
        console.log({ obj })
    };

    const addeHandler = (obj) => {
        console.log({ obj })
    };

    const deleteHandler = (obj) => {
        console.log({ obj })
    };

    const editHandler = (obj) => {
        console.log({ obj })
    };


    const handleActionClick = (payload, actionType) => {
        const actionMapper = {
            preview: previewHandler,
            add: addeHandler,
            edit: editHandler,
            delete: deleteHandler,
        };

        if (actionMapper[actionType]) {
            actionMapper[actionType](payload);
        }
    };


    const columns = [
        {
            name: "Pen Id",
            selector: (row) => row?.penId,
            sortable: true,
        },
        {
            name: "Application Name",
            selector: (row) => row?.name,
        },
        {
            name: "Score",
            selector: (row) => <span className='badge-soft-danger badge fs-6'>{row?.score}</span>,
            sortable: true,
        },
        {
            name: "Assign Pentester",
            minWidth: "130px",
            selector: (row) => {
                return (
                    <AvtarGroup
                        users={usersList} // row?.assignePentester,
                        max={3}
                    />
                )
            }
        },
        {
            name: "Assign Developer",
            minWidth: "130px",
            selector: (row) => {
                return (
                    <AvtarGroup
                        users={[]} //row?.assigneDeveloper
                        max={3}
                    />
                )
            }
        },
        {
            name: "Security Manager",
            minWidth: "130px",
            selector: (row) => {
                return (
                    <AvtarGroup
                        users={usersList} //  row?.securityManager,
                        max={3}
                    />
                )
            }
        },
        {
            name: "Project Manager",
            minWidth: "130px",
            selector: (row) => {
                return (
                    <AvtarGroup
                        users={usersList} //  row?.projectManager,
                        max={3}
                    />
                )
            }
        },

        {
            name: "Actions",
            minWidth: "150px",
            selector: (row) => {
                return (
                    <ActionButtons
                        preview={{
                            handleClick: () => handleActionClick(row, 'preview'),
                        }}
                        add={{
                            tooltip: 'Add Finding',
                            handleClick: () => handleActionClick(row, 'add'),
                        }}
                        edit={{
                            handleClick: () => handleActionClick(row, 'edit'),
                        }}
                        delete={{
                            handleClick: () => handleActionClick(row, 'delete'),
                        }}
                    />
                );
            },
        }
    ];


    return (
        <Container fluid>
            <Breadcrumb title="Application" breadcrumbItem="Application" />
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
                <Col lg={4} xs={12}>
                    <div className='d-flex justify-content-end'>
                        <div className='me-2'>
                            <DropdownButton
                                heading="Select BU"
                                menuItems={["Surat", "Baroda"]}
                                handleClick={(item) => alert(item)}
                            />
                        </div>
                        <div className='me-2'>
                            <RHFButton
                                btnName="Custom Column"
                            />
                        </div>
                    </div>
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
                            <div className="d-flex justify-content-end">
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
        </Container >
    )
}

export default Application;