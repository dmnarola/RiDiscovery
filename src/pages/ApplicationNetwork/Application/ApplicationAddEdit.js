import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Breadcrumb from 'components/Common/Breadcrumb';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import RHFAutoCompleteSelect from 'components/form-controls/RHFAutoCompleteSelect';
import RHFDatePicker from 'components/form-controls/RHFDatePicker';
import RHFButton from 'components/form-controls/RHFButton';
import RHFTextField from 'components/form-controls/RHFTextField';
import { applicationType, assessmentType, commonForAppDropDown, statusApp, tamplateAppData } from 'constants/mokeData';
import RHFCheckbox from 'components/form-controls/RHFCheckbox';
import RHFMultipleValue from 'components/form-controls/RHFMultipleValue';

const ApplicationAddEdit = (props) => {
    let history = useHistory()
    const location = useLocation()
    const [flag, setFlag] = useState(false)
    const editApplicationData = location?.state?.objData
    const isEditMode = editApplicationData ? true : false;

    const applicationSchema = yup.object().shape({
        name: yup
            .string()
            .required("Application Name is required"),
        applicationType: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        securityManager: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        developmentTeam: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            // .nullable()
            .required("Select atleast one option"),
        buTag: yup.string()
            .required("BU Tag is required"),
        template: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        assessmentType: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        developmentManager: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        securityTeam: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        startDate: yup.string().required("Date is required"),
    });

    const kickOffDocSchema = yup.object().shape({
        applicationType: yup
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
        url: yup.string().required("Required field"),
    });

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(!flag ? applicationSchema : kickOffDocSchema),
    });

    const handleCheckboxChange = (val) => {
        console.log('Checkbox Val ->', val);
    };

    const handleAutoComplete = (data, name) => {
        console.log(data, name);
        setValue(name, data);
    }

    const onSubmit = (data) => {
        console.log('data', data)
        setFlag(true)
    };

    const onSubmitKickOff = (data) => {
        console.log('data', data)
        // if (data) {
        //     setFlag(true) // @mmp temporary
        // }
    };


    useEffect(() => {
        if (isEditMode) {
            const formFields = Object.keys(editApplicationData);
            formFields.forEach((field) => {
                setValue(field, editApplicationData[field]);
            });
        }
        else {
            setValue(null)
        }
    }, [editApplicationData]);


    return (
        <div className="page-content">
            <Container fluid>
                {!flag && <Breadcrumb title="Application" breadcrumbItem={!isEditMode ? "Add Application" : ` Edit Application (${editApplicationData?.penId})`} />}
                {flag && <Breadcrumb title="Kick-off Doc" breadcrumbItem="Kick-off Doc:" />}

                {!flag && <Card>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row className="mb-3">
                                <Col sm="12">
                                    <RHFTextField
                                        id="name"
                                        label="Appliaction Name"
                                        name="name"
                                        placeholder="Enter Valid Application Name"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col sm="6">
                                    <RHFAutoCompleteSelect
                                        id="applicationType"
                                        label="Application Type"
                                        name="applicationType"
                                        options={applicationType}
                                        isMultiple={false}
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                        handleOnChange={handleAutoComplete}
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
                                    <RHFAutoCompleteSelect
                                        id="securityManager"
                                        label="Security Manager"
                                        name="securityManager"
                                        options={commonForAppDropDown}
                                        isMultiple={false}
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                                <Col sm="6">
                                    <RHFAutoCompleteSelect
                                        id="developmentManager"
                                        label="Development Manager"
                                        name="developmentManager"
                                        options={commonForAppDropDown}
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
                                        id="securityTeam"
                                        label="Security Team"
                                        name="securityTeam"
                                        options={commonForAppDropDown}
                                        isMultiple={false}
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                                <Col sm="6">
                                    <RHFAutoCompleteSelect
                                        id="developmentTeam"
                                        label="Development Team"
                                        name="developmentTeam"
                                        options={commonForAppDropDown}
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
                                        id="buTag"
                                        label="BU Tag"
                                        name="buTag"
                                        placeholder="Enter Valid BU Tag"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                                <Col sm="6">
                                    <RHFDatePicker
                                        name="startDate"
                                        label="Start Date"
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col sm="12">
                                    <RHFAutoCompleteSelect
                                        id="template"
                                        label="Templates"
                                        name="template"
                                        options={tamplateAppData}
                                        isMultiple={false}
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
                }

                {flag && <Card>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmitKickOff)}>
                            <Row className="mb-3">
                                <Col sm="6">
                                    <RHFAutoCompleteSelect
                                        id="applicationType"
                                        label="Application Type"
                                        name="applicationType"
                                        options={applicationType}
                                        isMultiple={false}
                                        errorobj={errors}
                                        control={control}
                                        isController={true}
                                        handleOnChange={handleAutoComplete}
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
                                    />

                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Card className='p-2' style={{ height: "160px", }}>
                                        <label>Checklist</label>
                                        <div className="form-check">
                                            <RHFCheckbox
                                                name="checkbox"
                                                label="OWASP"
                                                isController={false}
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>
                                        <div className="form-check">
                                            <RHFCheckbox
                                                name="checkbox"
                                                label="CVE"
                                                isController={false}
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>
                                        <div className="form-check">
                                            <RHFCheckbox
                                                name="checkbox"
                                                label="CWE"
                                                isController={false}
                                                onChange={handleCheckboxChange}
                                            />
                                        </div>
                                    </Card>
                                </Col>
                                <Col sm="6">
                                    <Card className='p-2'>
                                        <RHFMultipleValue
                                            label="Scope Details"
                                            name="scopeDetails"
                                            id="scopeDetails"
                                            errorobj={errors}
                                            control={control}
                                            isController={true}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Card className='p-2'>
                                        <RHFMultipleValue
                                            label="App Details"
                                            name="appDetails"
                                            id="appDetails"
                                            errorobj={errors}
                                            control={control}
                                            isController={true}
                                        />
                                    </Card>
                                </Col>
                                <Col sm="6">
                                    <Card className='p-2'>
                                        <RHFMultipleValue
                                            label="Out Of Scope"
                                            name="outOfScope"
                                            id="outOfScope"
                                            errorobj={errors}
                                            control={control}
                                            isController={true}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <Card className='p-2'>
                                        <RHFMultipleValue
                                            label="User Details"
                                            name="userDetails"
                                            id="userDetails"
                                            errorobj={errors}
                                            control={control}
                                            isController={true}
                                        />
                                    </Card>
                                </Col>
                                <Col sm="6">
                                    <Card className='p-2'>
                                        <RHFMultipleValue
                                            label="Server Details"
                                            name="serverDetails"
                                            id="serverDetails"
                                            errorobj={errors}
                                            control={control}
                                            isController={true}
                                        />
                                    </Card>
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
                </Card>}
            </Container>
        </div>

    )
}

export default ApplicationAddEdit
