import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Breadcrumb from 'components/Common/Breadcrumb';
import { Card, CardBody, CardHeader, Col, Container, FormFeedback, Label, Row } from 'reactstrap';
import RHFAutoCompleteSelect from 'components/form-controls/RHFAutoCompleteSelect';
import RHFButton from 'components/form-controls/RHFButton';
import RHFTextField from 'components/form-controls/RHFTextField';
import { applicationType, assessmentType } from 'constants/mokeData';
import RHFCheckbox from 'components/form-controls/RHFCheckbox';
import RHFMultipleValue from 'components/form-controls/RHFMultipleValue';

const KickoffAddEdit = () => {
    let history = useHistory()
    const location = useLocation()
    const editKickOffdata = location?.state?.data
    const isEditMode = editKickOffdata ? true : false;

    const kickOffDocSchema = yup.object().shape({
        fqdn: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        walkthrough: yup.string().required("Required field"),
        environment: yup.string().required("Required field"),
        assessmentType: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        ip: yup.string().required("Required field"),
        url: yup.object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        checkbox: yup
            .boolean()
            .oneOf([true], 'Select atleast one option...'),
        scopeDetails: yup.array().of(
            yup.object().shape({
                key: yup.string().required("Required..."),
                value: yup.string().required("Required..."),
            })
        ),
        appDetails: yup.array().of(
            yup.object().shape({
                key: yup.string().required("Required"),
                value: yup.string().required("Required"),
            })
        ),
        outOfScope: yup.array().of(
            yup.object().shape({
                key: yup.string().required("Required"),
                value: yup.string().required("Required"),
            })
        ),
        userDetails: yup.array().of(
            yup.object().shape({
                key: yup.string().required("Required"),
                value: yup.string().required("Required"),
            })
        ),
        serverDetails: yup.array().of(
            yup.object().shape({
                key: yup.string().required("Required"),
                value: yup.string().required("Required"),
            })
        ),
    });

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(kickOffDocSchema),
    });

    const handleCheckboxChange = (val) => {
        console.log('Checkbox Val ->', val);
    };

    const handleAutoComplete = (data, name) => {
        console.log(data, name);
        setValue(name, data);
    }

    const onSubmitKickOff = (data) => {
        console.log('data', data)
        if (data) {
            history.push(`/applications`)
        }
    };

    useEffect(() => {
        if (isEditMode) {
            const formFields = Object.keys(editKickOffdata);
            formFields.forEach((field) => {
                setValue(field, editKickOffdata[field]);
            });
        }
        else {
            setValue(null)
        }
    }, [editKickOffdata]);

    // console.log('errors at kickoff Page', errors)
    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumb title="Kick-off Doc" breadcrumbItem="Kick-off Doc" />
                <Card>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmitKickOff)}>
                            <Row className="mb-3">
                                <Col sm="6">
                                    <RHFAutoCompleteSelect
                                        id="fqdn"
                                        label="FQDN"
                                        name="fqdn"
                                        options={applicationType}
                                        isMultiple={false}
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                        handleOnChange={handleAutoComplete}
                                    // defaultValue={{ value: 'Web', label: 'Web' }}
                                    />
                                </Col>
                                <Col sm="6">
                                    <RHFTextField
                                        id="walkthrough"
                                        label="Walkthrough"
                                        name="walkthrough"
                                        placeholder="Walkthrough"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="6">
                                    <RHFTextField
                                        id="environment"
                                        label="Environment"
                                        name="environment"
                                        placeholder="Environment"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                                <Col sm="6">
                                    <RHFAutoCompleteSelect
                                        id="assessmentType"
                                        label="Assessment Type"
                                        name="assessmentType"
                                        options={assessmentType}
                                        isMultiple={false}
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="6">
                                    <RHFTextField
                                        id="ip"
                                        label="IP"
                                        name="ip"
                                        placeholder="IP"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                                <Col sm="6">
                                    <RHFAutoCompleteSelect
                                        id="url"
                                        label="URL"
                                        name="url"
                                        options={applicationType}
                                        isMultiple={false}
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                        handleOnChange={handleAutoComplete}
                                    // defaultValue={{ value: 'Web', label: 'Web' }}
                                    />

                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="6">
                                    <Card className={`${errors?.["checkbox"] ? "border-danger" : null} mb-0`} style={{ height: "155px", }}>
                                        <CardHeader className='d-flex justify-content-between my-1 py-1 border-0'>
                                            <Label htmlFor="example-text-input" className="form-Label">
                                                Checklist
                                            </Label>
                                        </CardHeader>
                                        <CardBody className='mx-2 p-0' style={{ height: "110px" }}>
                                            <div className="form-check">
                                                <RHFCheckbox
                                                    name="checkbox"
                                                    value="OWASP"
                                                    label="OWASP"
                                                    control={control}
                                                    isController={true}
                                                    errorobj={errors}
                                                    // onChange={handleCheckboxChange}
                                                />
                                            </div>
                                            <div className="form-check">
                                                <RHFCheckbox
                                                    name="checkbox"
                                                    value="CVE"
                                                    label="CVE"
                                                    control={control}
                                                    isController={true}
                                                    errorobj={errors}
                                                    // onChange={handleCheckboxChange}
                                                />
                                            </div>
                                            <div className="form-check ">
                                                <RHFCheckbox
                                                    name="checkbox"
                                                    value="CWE"
                                                    label="CWE"
                                                    control={control}
                                                    isController={true}
                                                    errorobj={errors}
                                                    // onChange={handleCheckboxChange}
                                                />
                                            </div>
                                        </CardBody>
                                    </Card>
                                    {errors && (
                                        <FormFeedback type="invalid">{errors?.["checkbox"]?.message}</FormFeedback>
                                    )}
                                </Col>
                                <Col sm="6">
                                    <RHFMultipleValue
                                        label="Scope Details"
                                        name="scopeDetails"
                                        id="scopeDetails"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="6">
                                    <RHFMultipleValue
                                        label="App Details"
                                        name="appDetails"
                                        id="appDetails"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                                <Col sm="6">
                                    <RHFMultipleValue
                                        label="Out Of Scope"
                                        name="outOfScope"
                                        id="outOfScope"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="6">
                                    <RHFMultipleValue
                                        label="User Details"
                                        name="userDetails"
                                        id="userDetails"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                                <Col sm="6">
                                    <RHFMultipleValue
                                        label="Server Details"
                                        name="serverDetails"
                                        id="serverDetails"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <div className="modal-footer">
                                    <RHFButton
                                        btnName="Save"
                                        type="submit"
                                        className="mx-2"
                                    />
                                    <RHFButton
                                        btnName="Cancel"
                                        outline={true}
                                        onClick={() => history.push('/applications')}
                                    />
                                </div>
                            </Row>
                        </form>
                    </CardBody>
                </Card>
            </Container>
        </div>

    )
}

export default KickoffAddEdit
