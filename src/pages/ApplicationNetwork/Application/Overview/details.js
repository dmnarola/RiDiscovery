import React from 'react'
import RHFCheckbox from 'components/form-controls/RHFCheckbox'
import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap'
import FeatherIcon from 'feather-icons-react';
import RHFDatePicker from 'components/form-controls/RHFDatePicker';
import AvtarGroup from 'components/form-controls/AvtarGroup';
import { avtarUsers } from 'constants/mokeData';
import { NavLink } from 'react-router-dom';


const testLink = "https://www.figma.com/proto/fqwZm1SZRGMif2r46lMHxn/29-08-22-Admin-Panel?node-id=6%3A4&starting-point-node-id=6%3A4&scaling=scale-down";

const ApplicationDetail = () => {

    const handleCheckboxChange = (val) => {
        console.log('Checkbox Val ->', val);
    };

    return (
        <Row>
            <Col lg={9}>
                <Row>
                    {/* <Col lg={5}>
                        Pie Chart
                    </Col>
                    <Col lg={7}>
                        line Chart
                    </Col> */}
                </Row>
                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <div className="form-check">
                                    <RHFCheckbox
                                        name="checkbox"
                                        label="OWASP"
                                        // checked={false}
                                        isController={false}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <div className="form-check">
                                    <RHFCheckbox
                                        name="checkbox"
                                        label="CVE"
                                        // checked={false}
                                        isController={false}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <div className="form-check">
                                    <RHFCheckbox
                                        name="checkbox"
                                        label="CWE"
                                        // checked={false}
                                        isController={false}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <div className="form-check">
                                    <RHFCheckbox
                                        name="checkbox"
                                        label="NIST"
                                        // checked={false}
                                        isController={false}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col lg={3}>
                <Card>
                    <CardHeader>
                        <div className='d-flex justify-content-between'>
                            <span className="fs-5">Details</span>
                            <FeatherIcon
                                icon="edit-3"
                                size="22"
                                className="actionBtn"
                            />
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="app-details">
                            <p className="h6 mt-1">Status</p>
                            <p className="fs-6">Completed</p>
                            <div>
                                <RHFDatePicker
                                    name="startDate"
                                    label="Start Date"
                                    isController={false}
                                    disabled={true}
                                />
                                <RHFDatePicker
                                    name="endDate"
                                    label="End Date"
                                    isController={false}
                                    disabled={true}
                                />
                            </div>
                            <div>
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
                                    to={{ pathname: testLink }} target="_blank"
                                >
                                    {testLink}
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