import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';

import Table from 'components/Tables/Table';
import RHFTextField from 'components/form-controls/RHFTextField';
import AvtarGroup from 'components/form-controls/AvtarGroup';
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "assets/images";
import ActionButtons from 'components/form-controls/ActionButtons';
import RHFButton from 'components/form-controls/RHFButton';

import ManageColumns from 'components/Common/ManageColumns';
import TextChip from 'components/Common/TextChip';
import { useHistory } from 'react-router-dom';
import { isModulePermisssion } from 'helpers/util';
import { ROLE_PERMISSIONS } from 'constants/RolePermissions';


const usersList = [
    { id: 1, name: 'Dipesh Mali', image: avatar1 },
    { id: 2, name: 'Mahesh', image: avatar2 },
    { id: 3, name: 'Foram', image: avatar3 },
    { id: 4, name: 'Pratik', image: avatar4 },
    { id: 5, name: 'Priyal', image: avatar5 },
]

const data = [
    {
        id: 1256,
        title: 'Validation Error',
        cweCategory: 'ABC',
        severity: 'Medium',
        score: '1.1',
        assignePentester: [],
    },
    {
        id: 1598,
        title: 'Page Scrash',
        cweCategory: 'XYZ',
        severity: 'High',
        score: '1.5',
        assignePentester: [],
    },
];

const Finding = ({ editApplicationData }) => {
    const history = useHistory()
    const [filterColumns, setFilterColumns] = useState([]);
    const [columnOptions, setColumnOption] = useState([]);


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

    const handleOnChange = (data, name) => {
        console.log({ data, name });
    }

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
            id: 'id', //  @DM  - its required when sorting is true @DM
            name: "Finding Id",
            selector: (row) => row?.id,

            isVisible: true,
        },
        {
            id: 'title',
            name: "Finding Title",
            selector: (row) => row?.title,

            isVisible: true,
        },
        {
            id: 'cweCategory',
            name: "CWE Category",
            selector: (row) => row?.cweCategory,

            isVisible: true,
        },
        {
            id: 'severity',
            name: "Severity",
            selector: (row) => <TextChip text={row?.severity} />,

            isVisible: true,
        },
        {
            id: 'score',
            name: "Score",
            selector: (row) => <span className='badge-soft-danger badge fs-6'>{row?.score}</span>,

            isVisible: true,
        },
        {
            id: 'assignedPentester',
            name: "Assign Pentester",
            minWidth: "130px",
            isVisible: false,
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
            name: "Actions",
            minWidth: "100px",
            isVisible: true,
            selector: (row) => {
                return (
                    <ActionButtons
                        edit={{
                            handleClick: () => handleActionClick(row, 'edit'),
                            isPermission: ROLE_PERMISSIONS?.UPDATE_FINDING,
                        }}
                        delete={{
                            handleClick: () => handleActionClick(row, 'delete'),
                            isPermission: ROLE_PERMISSIONS?.DELETE_FINDING,
                        }}
                    />
                );
            },
        }
    ];

    return (
        <React.Fragment>
            <h5>Finding</h5>
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
                                <div className='me-2'>
                                    <ManageColumns
                                        allColumns={columnOptions}
                                        getCols={getCols}
                                        getFilteredValues={getFilteredValues}
                                    />
                                </div>
                                {isModulePermisssion(ROLE_PERMISSIONS?.ADD_FINDING) &&
                                    <RHFButton
                                        btnName="Add Finding"
                                        icon="plus"
                                        onClick={() => {
                                            history.push(`/application/${editApplicationData?.id}/add-finding`)
                                        }}
                                    />
                                }
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
                {isModulePermisssion(ROLE_PERMISSIONS?.VIEW_FINDING) &&
                    <CardBody>
                        <Table columns={filterColumns} data={data} />
                    </CardBody>
                }
            </Card>
        </React.Fragment>
    )
}

export default Finding;