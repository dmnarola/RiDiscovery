import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
} from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb';
import RHFAutoCompleteSelect from 'components/form-controls/RHFAutoCompleteSelect';
import { statusFinding } from 'constants/mokeData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFTextField from 'components/form-controls/RHFTextField';

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

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumb title="Application" breadcrumbItem="New Finding" />
                <Row className='justify-content-end'>
                    <Col sm="3" className='mb-3'>
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
                        <div className='justify-content-between d-flex'>
                            <div className='font-weight-bold'>
                                <span>CVSS 3.1</span>
                                <span className="badge badge-soft-primary bg-warning text-black me-3">medium</span>
                            </div>
                            <div>
                                <Link to="#" className="badge badge-soft-primary bg-warning text-black">6.9</Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </div >
    )
}

export default FindingAddEdit;