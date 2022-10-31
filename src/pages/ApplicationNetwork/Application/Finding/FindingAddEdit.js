import React, { useState } from 'react'
// import { Link, NavLink, useParams } from 'react-router-dom'
import {
    Card,
    CardBody,
    CardText,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb';
import RHFAutoCompleteSelect from 'components/form-controls/RHFAutoCompleteSelect';
import { attackComplexityFinding, attackVectorFinding, availabilityFinding, confidentialityFinding, integrityFinding, privilegesRequiredFinding, scopeFinding, statusFinding, userInteractionFinding } from 'constants/mokeData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFTextField from 'components/form-controls/RHFTextField';
import classnames from "classnames";


import RHFButtonGroup from 'components/form-controls/RHFButtonGroup';
import TextEditor from 'components/form-controls/TextEditor';

const FindingAddEdit = () => {
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(),
    });


    const handleClick = (e) => {
        console.log('object :>> ', e.target.name);

    }



    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumb title="Application" breadcrumbItem="New Finding" />
                <Row className='justify-content-end'>
                    <Col sm="2" className='mb-3'>
                        <RHFAutoCompleteSelect
                            id="status"
                            label="Status"
                            name="status"
                            options={statusFinding}
                            isMultiple={false}
                            errorobj={errors}
                            control={control}
                            isController={true}
                        />
                    </Col>
                </Row>
                <Card>
                    <CardBody>
                        <Row className="mb-3">
                            <Col sm="6">
                                <RHFTextField
                                    id="title"
                                    label="Title"
                                    name="title"
                                    placeholder="Enter valid Title"
                                    errorobj={errors}
                                    control={control}
                                    isController={true}
                                />
                            </Col>
                            <Col sm="6">
                                <RHFAutoCompleteSelect
                                    id="cwe"
                                    label="CWE"
                                    name="cwe"
                                    options={statusFinding}
                                    isMultiple={false}
                                    errorobj={errors}
                                    control={control}
                                    isController={true}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm="6">
                                <RHFAutoCompleteSelect
                                    id="cve"
                                    label="CVE"
                                    name="cve"
                                    options={statusFinding}
                                    isMultiple={false}
                                    errorobj={errors}
                                    control={control}
                                    isController={true}
                                />
                            </Col>
                            <Col sm="6">
                                <RHFAutoCompleteSelect
                                    id="owasp"
                                    label="OWASP"
                                    name="owasp"
                                    options={statusFinding}
                                    isMultiple={false}
                                    errorobj={errors}
                                    control={control}
                                    isController={true}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm="12">
                                <RHFAutoCompleteSelect
                                    id="severity"
                                    label="Severity"
                                    name="severity"
                                    options={statusFinding}
                                    isMultiple={false}
                                    errorobj={errors}
                                    control={control}
                                    isController={true}
                                />
                            </Col>
                        </Row>
                        <Card>
                            <CardBody>
                                <div className='justify-content-between d-flex'>
                                    <div className='font-weight-bold'>
                                        <h5>CVSS 3.1 {" "}
                                            <span className="badge badge-soft-primary bg-warning text-black me-3 p-2 ml-1">medium</span>
                                        </h5>
                                    </div>
                                    <div>
                                        <span className="badge badge-soft-primary bg-warning text-black p-2">6.9</span>
                                    </div>
                                </div>
                                <Row>
                                    <Col sm="6">
                                        <RHFButtonGroup
                                            handleClick={handleClick}
                                            label="Attack Vector (AV)"
                                            name="attackVector"
                                            data={attackVectorFinding}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <RHFButtonGroup
                                            label="Scope (S)"
                                            name="scope"
                                            data={scopeFinding}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <RHFButtonGroup
                                            label="Attack Complexity (AC)"
                                            name="attackComplexity"
                                            data={attackComplexityFinding}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <RHFButtonGroup
                                            label="Confidentiality (C)"
                                            name="confidentiality"
                                            data={confidentialityFinding}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <RHFButtonGroup
                                            label="Privileges Required (PR)"
                                            name="privilegesRequired "
                                            data={privilegesRequiredFinding}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <RHFButtonGroup
                                            label="Integrity (I)"
                                            name="integrity"
                                            data={integrityFinding}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <RHFButtonGroup
                                            label="User Interaction (UI)"
                                            name-="userInteraction"
                                            data={userInteractionFinding}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <RHFButtonGroup
                                            label="Availability (A)"
                                            name="availability"
                                            data={availabilityFinding}
                                        />
                                    </Col>
                                </Row>

                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <TextEditor />
                            </CardBody>
                        </Card>
                    </CardBody>

                </Card>
            </Container>
        </div>
    )
}

export default FindingAddEdit;