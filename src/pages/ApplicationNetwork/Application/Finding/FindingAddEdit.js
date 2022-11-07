import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import {
    Card,
    CardBody,
    Col,
    Container,
    Label,
    Row,
} from 'reactstrap';
import * as yup from "yup";
import Breadcrumb from 'components/Common/Breadcrumb';
import RHFAutoCompleteSelect from 'components/form-controls/RHFAutoCompleteSelect';
import { attackComplexityFinding, attackVectorFinding, availabilityFinding, confidentialityFinding, integrityFinding, privilegesRequiredFinding, scopeFinding, statusFinding, userInteractionFinding } from 'constants/mokeData';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFTextField from 'components/form-controls/RHFTextField';
import RHFTextEditor from 'components/form-controls/RHFTextEditor';
import RHFDropZone from 'components/form-controls/RHFDropZone';
import RHFButton from 'components/form-controls/RHFButton';
import DialogBox from 'components/Modals/DialogBox';
import PocStepsAddEdit from './PocStepsAddEdit';
import { useEffect } from 'react';
import FeatherIcon from "feather-icons-react";

const FindingAddEdit = () => {
    let history = useHistory()
    const { applicationId } = useParams()
    const { findingid } = useParams()
    console.log('findingid :>> ', findingid);

    const editFindingData
        = {
        id: 1256,
        status: "Open",
        title: 'FIND !',
        cwe: 'Open',
        cve: 'Close',
        owasp: 'Open',
        severity: 'Close',
        description: "<p>description</p>",
        impact: "<p>impact</p>",
        remediation: "<p>remediation</p>",
        reference: "<p>reference</p>",
        comment: "<p>comment</p>",
    }

    const isEditMode = findingid

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
        // attackVector: yup
        //     .string()
        //     .required("Select Attack Vector is required"),
        // scope: yup
        //     .string()
        //     .required("Select Scope is required"),
        // confidentiality: yup
        //     .string()
        //     .required("Select Confidentiality is required"),
        // attackComplexity: yup
        //     .string()
        //     .required("Select Attack Complexity is required"),
        // privilegesRequired: yup
        //     .string()
        //     .required("Select Privileges Required is required"),
        // integrity: yup
        //     .string()
        //     .required("Select integrity is required"),
        // userInteraction: yup
        //     .string()
        //     .required("Select User Interaction is required"),
        // availability: yup
        //     .string()
        //     .required("Select Availability is required"),
        description: yup
            .string()
            .required("Description is required"),
        impact: yup
            .string()
            .required("Impact is required"),
        remediation: yup
            .string()
            .required("Remediation is required"),
        reference: yup
            .string()
            .required("Reference is required"),
        comment: yup
            .string()
            .required("Comment is required"),
    });

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(findingSchema),
    });


    const [isModelOpen, setIsModelOpen] = useState(false);
    const [editPocData, setEditPocData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [pocStepData, setPocStepData] = useState([])
    const [pocStepsImage,] = useState([])

    const handleToggle = () => {
        setIsModelOpen(!isModelOpen);
    };

    useEffect(() => {
        if (formData) {
            setPocStepData(prevState => [...prevState, formData]);
        }
    }, [formData])

    useEffect(() => {
        setValue('poc', pocStepData);
    }, [pocStepData])

    const onSubmit = async (data) => {
        console.log('Finding data :>> ', data);
        history.push(`/application/${applicationId}/overview`)
    };

    const deleteFile = (e) => {
        const deleted = pocStepData.filter((item, index) => index !== e);
        setPocStepData(deleted);
    }

    const uploadFile = (pocdata) => {
        setEditPocData(pocdata)
        handleToggle()
    }

    console.log('editPocData :>> ', editPocData);


    useEffect(() => {
        if (isEditMode) {
            const formFields = Object.keys(editFindingData);
            formFields.forEach((field) => {
                setValue(field, editFindingData[field]);
            });
        }
        else {
            setValue(null)
        }
    }, [editFindingData]);

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
                            {/* <Card>
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
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <RHFButtonGroup
                                                label="Scope (S)"
                                                name="scope"
                                                data={scopeFinding}
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
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <RHFButtonGroup
                                                label="Confidentiality (C)"
                                                name="confidentiality"
                                                data={confidentialityFinding}
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
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <RHFButtonGroup
                                                label="Integrity (I)"
                                                name="integrity"
                                                data={integrityFinding}
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
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <RHFButtonGroup
                                                label="Availability (A)"
                                                name="availability"
                                                data={availabilityFinding}
                                                errorobj={errors}
                                                control={control}
                                            />
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card> */}
                            {/* @Foram COV Radio Buttons Ui */}
                            <Row className="mb-3">
                                <Col sm="12">
                                    <RHFTextEditor
                                        name="description"
                                        id="description"
                                        errorobj={errors}
                                        control={control}
                                        label="Description"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="12">
                                    <div className='d-block justify-content-between'>
                                        <div className='d-flex justify-content-between'>
                                            <Label className='d-block'>POC *</Label>
                                            <div className="poc-new-steps" onClick={() => {
                                                handleToggle();
                                                setFormData(null);
                                            }} >
                                                <span >+ Add New Step</span>
                                            </div>
                                        </div>
                                        <DialogBox
                                            isModelOpen={isModelOpen}
                                            handleToggle={handleToggle}
                                            modelSize="sm-20"
                                            title="Add New Steps"
                                            actions={null}
                                        >
                                            <PocStepsAddEdit
                                                handleToggle={handleToggle}
                                                setFormData={setFormData}
                                                editPocData={editPocData}
                                            />
                                        </DialogBox>
                                    </div>

                                    {pocStepData?.map((pocdata, index) => (
                                        <div className='file-preview' key={index} >
                                            <img
                                                src={pocdata?.images[0]?.preview}
                                                alt="image"
                                                style={{ width: "200px", height: "200px" }}
                                            />
                                            <div>
                                                <FeatherIcon
                                                    className="delete-preview-image" size="25" icon="trash-2"
                                                    onClick={() => { deleteFile(index) }}
                                                />
                                                <FeatherIcon
                                                    className="delete-preview-image" size="25" icon="edit"
                                                    onClick={() => { uploadFile(pocdata) }}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="12">
                                    <RHFTextEditor
                                        name="impact"
                                        id="impact"
                                        errorobj={errors}
                                        control={control}
                                        label="Impact"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="12">
                                    <RHFTextEditor
                                        name="remediation"
                                        id="remediation"
                                        errorobj={errors}
                                        control={control}
                                        label="Remediation"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="12">
                                    <RHFTextEditor
                                        name="reference"
                                        id="reference"
                                        errorobj={errors}
                                        control={control}
                                        label="Reference"
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col sm="12">
                                    <RHFTextEditor
                                        name="comment"
                                        id="comment"
                                        errorobj={errors}
                                        control={control}
                                        label="Comment"
                                    />
                                </Col>
                            </Row>
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