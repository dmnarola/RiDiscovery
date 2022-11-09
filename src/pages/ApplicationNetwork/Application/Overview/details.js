import React from 'react'
import RHFCheckbox from 'components/form-controls/RHFCheckbox'
import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap'
import FeatherIcon from 'feather-icons-react';
import RHFDatePicker from 'components/form-controls/RHFDatePicker';
import AvtarGroup from 'components/form-controls/AvtarGroup';
import { avtarUsers } from 'constants/mokeData';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import Finding from '../Finding'
import { useForm } from 'react-hook-form';
import { isModulePermisssion } from 'helpers/util';
import { ROLE_PERMISSIONS } from 'constants/RolePermissions';


const testLink = "https://www.figma.com/proto/fqwZm1SZRGMif2r46lMHxn/29-08-22-Admin-Panel?node-id=6%3A4&starting-point-node-id=6%3A4&scaling=scale-down";

const ApplicationDetail = () => {
    const location = useLocation()
    const history = useHistory()
    const editApplicationData = location?.state?.objData

    const handleCheckboxChange = (val) => {
        console.log('Checkbox Val ->', val);
    };

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({});

    const updateKickOff = isModulePermisssion(ROLE_PERMISSIONS?.UPDATE_KICK_OFF_DOC)

    return (
        <Row>
            <Col lg={9}>
                <Row>
                    <Col lg={4}>
                        <Card>
                            <CardBody style={{ height: "300px" }}>
                                Pie Chart
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={8}>
                        <Card>
                            <CardBody style={{ height: "300px" }}>
                                Line Chart
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Finding editApplicationData={editApplicationData} />
            </Col>
            <Col lg={3}>
                <Card>
                    <CardHeader>
                        <div className='d-flex justify-content-between'>
                            <span className="fs-5">Details</span>
                            {updateKickOff && <FeatherIcon
                                icon="edit-3"
                                size="22"
                                className="actionBtn"
                                onClick={() => {
                                    history.push({ pathname: "/application/add/kickoff", state: { data: editApplicationData } })
                                }}
                            />}
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="app-details">
                            <p className="h6 mt-1">Status</p>
                            <p className="fs-6">{editApplicationData.status}</p>
                            <div>
                                <RHFDatePicker
                                    name="startDate"
                                    label="Start Date"
                                    defaultValue={editApplicationData.startDate}
                                    isController={false}
                                    disabled={true}
                                />
                                <RHFDatePicker
                                    name="endDate"
                                    label="End Date"
                                    defaultValue={editApplicationData.endDate}
                                    isController={false}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <p className='h6 mt-1'>Checklist</p>
                                <div className="form-check">
                                    <RHFCheckbox
                                        name="checkbox"
                                        label="OWASP"
                                        control={control}
                                        checked={editApplicationData.checkList === "OWASP" ? true : false}
                                        isController={true}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <div className="form-check">
                                    <RHFCheckbox
                                        name="checkbox"
                                        label="CVE"
                                        control={control}
                                        checked={editApplicationData.checkList === "CVE" ? true : false}
                                        isController={true}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <div className="form-check">
                                    <RHFCheckbox
                                        name="checkbox"
                                        label="CWE"
                                        control={control}
                                        checked={editApplicationData.checkList === "CWE" ? true : false}
                                        isController={true}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <p className='h6 mt-1'>Assign Pentesters</p>
                                <AvtarGroup
                                    users={avtarUsers}
                                    max={3}
                                />
                                <p className='h6 mt-3'>Assign Developers</p>
                                <AvtarGroup
                                    users={avtarUsers}
                                    max={3}
                                />
                                <p className='h6 mt-3'>Scope</p>
                                <NavLink
                                    to={{ pathname: editApplicationData?.scope }} target="_blank"
                                >
                                    {editApplicationData?.scope}
                                </NavLink>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default ApplicationDetail