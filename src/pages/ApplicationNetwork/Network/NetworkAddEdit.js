import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import RHFTextField from 'components/form-controls/RHFTextField';
import { Button, Col, Row } from 'reactstrap';
import RHFAutoCompleteSelect from 'components/form-controls/RHFAutoCompleteSelect';
import RHFDatePicker from 'components/form-controls/RHFDatePicker';
import RHFButton from 'components/form-controls/RHFButton';
import { assessmentType } from 'constants/mokeData';
import RHFUpload from 'components/form-controls/RHFUpload';
import { isModulePermisssion } from 'helpers/util';
import { ROLE_PERMISSIONS } from 'constants/RolePermissions';

const NetworkAddEdit = (props) => {
    const { setFormData, handleToggle } = props

    const networkSchema = yup.object().shape({
        title: yup
            .string()
            .required("Title is required"),
        type: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        startDate: yup.string().required("Date is required"),
        endDate: yup.string().required("Date is required"),
        buTag: yup
            .string()
            .required("BU Tag is required"),
        nmapResult:
            isModulePermisssion(ROLE_PERMISSIONS?.IMPORT_NMAP_RESULTS) &&
            yup.mixed().required('File is required'),
        nessuesResult:
            isModulePermisssion(ROLE_PERMISSIONS?.IMPORT_NESSUS_RESULTS) &&
            yup.mixed().required('File is required'),
    });

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(networkSchema),
    });

    const onSubmit = (data) => {
        console.log('data :>> ', data);
        setFormData(data);
    };
    const fileRef = useRef(null);
    const fileRef2 = useRef(null)

    const getFileData = (fileData) => {
        console.log({ fileData });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
                <Col sm="12">
                    <RHFTextField
                        id="title"
                        label="Title"
                        name="title"
                        placeholder="Enter Valid Title"
                        errorobj={errors}
                        control={control}
                        isController={true}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm="12">
                    <RHFAutoCompleteSelect
                        id="type"
                        label="Type"
                        name="type"
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
                    <RHFDatePicker
                        name="startDate"
                        label="Start Date"
                        errorobj={errors}
                        control={control}
                        isController={true}
                    />
                </Col>
                <Col sm="6">
                    <RHFDatePicker
                        name="endDate"
                        label="End Date"
                        errorobj={errors}
                        control={control}
                        isController={true}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col sm="12">
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
            </Row>
            {isModulePermisssion(ROLE_PERMISSIONS?.IMPORT_NMAP_RESULTS) &&
                <Row className="mb-3">
                    <Col sm="12" >
                        <RHFUpload
                            inputRef={fileRef}
                            name="nmapResult"
                            id="nmapResult"
                            label="Import Nmap Results"
                            getFileData={getFileData}
                            setValue={setValue}
                            errorobj={errors}
                            isValidate={true} />

                    </Col>
                </Row>
            }
            {isModulePermisssion(ROLE_PERMISSIONS?.IMPORT_NESSUS_RESULTS) &&
                <Row className="mb-3">
                    <Col sm="12" >
                        <RHFUpload
                            inputRef={fileRef2}
                            name="nessuesResult"
                            id="nessuesResult"
                            label="Import Nessus Results"
                            getFileData={getFileData}
                            setValue={setValue}
                            errorobj={errors}
                            isValidate={true} />
                    </Col>
                </Row>}
            <Row>
                <div className="modal-footer">
                    <RHFButton
                        btnName="Save"
                        type="submit"
                    />
                    <RHFButton
                        btnName="Cancel"
                        outline={true}
                        onClick={handleToggle}
                    />
                </div>
            </Row>
        </form >
    )
}

export default NetworkAddEdit
