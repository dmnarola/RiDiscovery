import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb';
import Table from 'components/Tables/Table';
import RHFTextField from 'components/form-controls/RHFTextField';
import AvtarGroup from 'components/form-controls/AvtarGroup';
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "assets/images";
import ActionButtons from 'components/form-controls/ActionButtons';
import FilterByStatus from 'components/Common/FilterByStatus';
import RHFButton from 'components/form-controls/RHFButton';
import DropdownButton from 'components/form-controls/DropdownButton';
import ManageColumns from 'components/Common/ManageColumns';
import DialogBox from 'components/Modals/DialogBox';
import ApplicationAddEdit from './ApplicationAddEdit';


const usersList = [
    { id: 1, name: 'Dipesh Mali', image: avatar1 },
    { id: 2, name: 'Mahesh', image: avatar2 },
    { id: 3, name: 'Foram', image: avatar3 },
    { id: 4, name: 'Pratik', image: avatar4 },
    { id: 5, name: 'Priyal', image: avatar5 },
]

const menuItems = [
    { id: 1, name: 'Surat' },
    { id: 2, name: 'Baroda' },
    { id: 3, name: 'Mumbai' },
    { id: 4, name: 'Pune' },
    { id: 5, name: 'Nashik' }
]

const data = [
    {
        id: 1,
        penId: 'AIL-1234',
        name: 'ABC',
        applicationType: {
            value: "Web",
            label: "Web",
        },
        assessmentType: "Default1",
        developmentTeam: "Foram Sankhavara",
        buTag: "tag 1",
        securityManager: "Dipesh Mali",
        developmentManager: "Mahesh Trapasiya",
        securityTeam: "fas",
        startDate: "2000-06-12",
        template: "Default Template",
        status: 'Active',
        score: '1.1',
        assignePentester: [],
        assigneDeveloper: [],
        projectManager: []

    },
    {
        id: 2,
        penId: 'AIL-2365',
        status: 'Completed',
        name: 'XYZ',
        applicationType: "Mobile",
        assessmentType: "Default1",
        developmentTeam: "Foram Sankhavara",
        buTag: "tag 3",
        securityManager: "Dipesh Mali",
        developmentManager: "Mahesh Trapasiya",
        securityTeam: "dm",
        startDate: "2011-01-18",
        template: "ABC Template",
        status: 'Deactive',
        score: '1.5',
        assignePentester: [],
        assigneDeveloper: [],
        projectManager: []
    },
];


const Application = () => {
    const [customActiveTab, setcustomActiveTab] = useState(1);
    const [filterColumns, setFilterColumns] = useState([]);
    const [columnOptions, setColumnOption] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const columnFilter = [...columns];
        setColumnOption([...columns]);
        setFilterColumns(columnFilter.filter(o => o.isVisible && o));
    }, [])

    const getFilteredValues = (cols) => {
        setColumnOption(cols);
        setFilterColumns(cols.filter(o => o.isVisible && o));
    }


    const getCols = (cols) => {
        setColumnOption(cols);
    }

    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };

    const previewHandler = (obj) => {
        console.log({ obj })
        history.push(`/application/${obj?.id}/overview`)
    };

    const addeHandler = (obj) => {
        console.log({ obj })
        history.push(`/application/${obj?.id}/add-finding`)
    };

    const deleteHandler = (obj) => {
        console.log({ obj })
    };

    const editHandler = (obj) => {
        history.push({ pathname: `/application/add`, state: { objData: obj } })
    };
    const downloadHandler = (obj) => {
        console.log({ obj })
    }

    const handleOnChange = (data, name) => {
        console.log({ data, name });
    }

    const handleActionClick = (payload, actionType) => {
        const actionMapper = {
            preview: previewHandler,
            add: addeHandler,
            edit: editHandler,
            delete: deleteHandler,
            download: downloadHandler
        };

        if (actionMapper[actionType]) {
            actionMapper[actionType](payload);
        }
    };

    const columns = [
        {
            id: 'penId', //  @DM  - its required when sorting is true @DM
            name: "Pen Id",
            selector: (row) => row?.penId,
            sortable: true,
            isVisible: true,
        },
        {
            id: 'name',
            name: "Application Name",
            selector: (row) => row?.name,
            isVisible: true,
        },
        {
            id: 'score',
            name: "Score",
            selector: (row) => <span className='badge-soft-danger badge fs-6'>{row?.score}</span>,
            sortable: true,
            isVisible: true,
        },
        {
            id: 'assignedPentester',
            name: "Assign Pentester",
            minWidth: "130px",
            isVisible: true,
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
            id: 'assignedDeveloper',
            name: "Assign Developer",
            minWidth: "130px",
            isVisible: false,
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
            id: 'securityManager',
            name: "Security Manager",
            minWidth: "130px",
            isVisible: false,
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
            id: 'projectManager',
            name: "Project Manager",
            minWidth: "130px",
            isVisible: false,
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
            id: 'status',
            name: "Status",
            selector: (row) => row?.status,
            isVisible: false,
        },
        {
            name: "Actions",
            minWidth: "150px",
            isVisible: true,
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
        <React.Fragment>
            <Breadcrumb title="Application" breadcrumbItem="Application List" />
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
                            <ManageColumns
                                // allColumns={columns}
                                allColumns={columnOptions}
                                getCols={getCols}
                                getFilteredValues={getFilteredValues}
                            />
                        </div>
                        <div className='me-2'>
                            <DropdownButton
                                heading="Select BU"
                                isSearchable={true}
                                menuItems={menuItems}
                                handleClick={(item) => alert(JSON.stringify(item))} />
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
                                handleOnChange={handleOnChange}
                            />
                        </Col>
                        <Col xs={6} lg={9}>
                            <div className="d-flex justify-content-end">
                                <RHFButton
                                    btnName="Add"
                                    icon="plus"
                                    onClick={() => {
                                        history.push(`/application/add`)
                                    }}
                                />
                                {/* <DialogBox
                                    isModelOpen={isModelOpen}
                                    handleToggle={handleToggle}
                                    modelSize="lg"
                                    title={editUserData === null ? "New Application (AIL-1234)" : "Edit Application (AIL-1234)"}
                                    actions={null}
                                >
                                    <ApplicationAddEdit
                                        setFormData={setFormData}
                                        handleToggle={handleToggle}
                                        editUserData={editUserData}
                                    />
                                </DialogBox> */ }
                                {/* @mmp - For separate the add/edit page */}
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Table columns={filterColumns} data={data} />
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default Application;