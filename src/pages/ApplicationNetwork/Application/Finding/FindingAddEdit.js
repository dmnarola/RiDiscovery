import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
} from 'reactstrap';
import * as yup from "yup";
import Breadcrumb from 'components/Common/Breadcrumb';
import RHFAutoCompleteSelect from 'components/form-controls/RHFAutoCompleteSelect';
import { attackComplexityFinding, attackVectorFinding, availabilityFinding, confidentialityFinding, integrityFinding, privilegesRequiredFinding, scopeFinding, statusFinding, userInteractionFinding } from 'constants/mokeData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFTextField from 'components/form-controls/RHFTextField';
import classnames from "classnames";
import RHFButtonGroup from 'components/form-controls/RHFButtonGroup';
import RHFTextEditor from 'components/form-controls/RHFTextEditor';
import RHFDropZone from 'components/form-controls/RHFDropZone';
import RHFButton from 'components/form-controls/RHFButton';


const FindingAddEdit = () => {
    let history = useHistory()

    const findingSchema = yup.object().shape({
        status: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),

        title: yup
            .string()
            .required("Title is required"),
        cwe: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        cve: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        owasp: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        severity: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        attackVector: yup
            .string()
            .required("Select Attack Vector is required"),
        scope: yup
            .string()
            .required("Select Scope is required"),
        confidentiality: yup
            .string()
            .required("Select Confidentiality is required"),
        attackComplexity: yup
            .string()
            .required("Select Attack Complexity is required"),
        privilegesRequired: yup
            .string()
            .required("Select Privileges Required is required"),
        integrity: yup
            .string()
            .required("Select integrity is required"),
        userInteraction: yup
            .string()
            .required("Select User Interaction is required"),
        availability: yup
            .string()
            .required("Select Availability is required"),
        description: yup
            .string()
            .required("Description is required"),
        impact: yup
            .string()
            .required("Impact is required"),
        remediation: yup
            .string()
            .required("Remediation is required"),
        comment: yup
            .string()
            .required("Comment is required"),
    });

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(findingSchema),
    });


    const handleRadioChange = (e) => {
        console.log('object :>> ', e.target.value);
    }

    const onTextEditorChange = (value) => {
        console.log('value :>> ', value);
    }
    const onSubmit = (data) => {
        // setFormData(data);
        console.log('data :>> ', data);
    };
    const handleToggle = () => {
        history.push('/applications')
    }

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumb title="Application" breadcrumbItem="New Finding" />
                <form onSubmit={handleSubmit(onSubmit)}>
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

                                                label="Attack Vector (AV)"
                                                name="attackVector"
                                                data={attackVectorFinding}
                                                id="attackVector"
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <RHFButtonGroup

                                                label="Scope (S)"
                                                name="scope"
                                                data={scopeFinding}
                                                id="scope"
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="6">
                                            <RHFButtonGroup

                                                label="Attack Complexity (AC)"
                                                name="attackComplexity"
                                                data={attackComplexityFinding}
                                                id="attackComplexity"
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <RHFButtonGroup

                                                label="Confidentiality (C)"
                                                name="confidentiality"
                                                data={confidentialityFinding}
                                                id="confidentiality"
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="6">
                                            <RHFButtonGroup

                                                label="Privileges Required (PR)"
                                                name="privilegesRequired "
                                                data={privilegesRequiredFinding}
                                                id="privilegesRequired"
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <RHFButtonGroup

                                                label="Integrity (I)"
                                                name="integrity"
                                                data={integrityFinding}
                                                id="integrity"
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="6">
                                            <RHFButtonGroup

                                                label="User Interaction (UI)"
                                                name-="userInteraction"
                                                data={userInteractionFinding}
                                                id="userInteraction"
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <RHFButtonGroup

                                                label="Availability (A)"
                                                name="availability"
                                                data={availabilityFinding}
                                                id="availability"
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <RHFTextEditor
                                        setValue={setValue}
                                        onTextEditorChange={onTextEditorChange}
                                        placeHolder="Description"
                                        name="description"
                                        id="description"
                                        errorobj={errors}
                                        control={control}
                                    />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <RHFDropZone />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <RHFTextEditor
                                        setValue={setValue}
                                        onTextEditorChange={onTextEditorChange}
                                        placeHolder="Impact"
                                        name="impact"
                                        id="impact"
                                        errorobj={errors}
                                        control={control}
                                    />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <RHFTextEditor
                                        setValue={setValue}
                                        onTextEditorChange={onTextEditorChange}
                                        placeHolder="Remediation"
                                        name="remediation"
                                        id="remediation"
                                        errorobj={errors}
                                        control={control}
                                    />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <RHFTextEditor
                                        setValue={setValue}
                                        onTextEditorChange={onTextEditorChange}
                                        placeHolder="Your Comment"
                                        name="comment"
                                        id="comment"
                                        errorobj={errors}
                                        control={control}
                                    />
                                </CardBody>
                            </Card>
                            <Row>
                                <div className="modal-footer">
                                    <RHFButton
                                        className="mx-2"
                                        btnName="Submit"
                                        type="submit"
                                    />
                                    <RHFButton
                                        btnName="Cancel"
                                        outline={true}
                                        onClick={() => history.push('/applications')}
                                    />
                                </div>
                            </Row>
                        </CardBody>

                    </Card>
                </form>
            </Container>
        </div>
    )
}

export default FindingAddEdit;