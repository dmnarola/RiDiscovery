import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import RHFTextField from 'components/form-controls/RHFTextField';
import { Col, Row } from 'reactstrap';
import RHFAutoCompleteSelect from 'components/form-controls/RHFAutoCompleteSelect';
import RHFDatePicker from 'components/form-controls/RHFDatePicker';
import RHFButton from 'components/form-controls/RHFButton';
import { applicationType, assessmentType, commonForAppDropDown, statusApp, tamplateAppData } from 'constants/mokeData';

const ApplicationAddEdit = (props) => {
    const { setFormData, handleToggle, editUserData } = props
    const isEditMode = editUserData ? true : false;


    const applicationSchema = yup.object().shape({
        name: yup
            .string()
            .required("name is required"),
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
        startDate: yup.date().required("Date is required"),
        status: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
    });

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(applicationSchema),
    });

    const handleAutoComplete = (data, name) => {
        console.log(data, name);
        setValue(name, data);
    }

    useEffect(() => {

        if (isEditMode) {
            // const formFields = Object.keys(editUserData);
            // formFields.forEach((field) => {
            //     console.log(field, '  :>> ', editUserData[field]);
            //     setValue(field, editUserData[field]);
            // });

            // setValue('applicationType', {
            //     value: "Web",
            //     label: "Web",
            // })  @Foram >> working on set value fpr edit form  
            console.log('getValues =>', getValues())
        }
        else {
            setValue(null)
        }
    }, [editUserData]);

    const onSubmit = (data) => {
        setFormData(data);

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
                <Col sm="12">
                    <RHFTextField
                        id="name"
                        label="Appliaction Name"
                        name="name"
                        placeholder="Enter valid Application Name"
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
                    // defaultValue={{ value: 'Web', label: 'Web' }}
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
                        id="developmrntManager"
                        label="Application Owner (Developmrnt Manager)"
                        name="developmrntManager"
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
            </Row>

            <Row className="mb-3">
                <Col sm="6">
                    <RHFTextField
                        id="buTag"
                        label="BU Tag"
                        name="buTag"
                        placeholder="Enter valid BU Tag"
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
                <Col sm="6">
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
                <Col sm="6">
                    <RHFAutoCompleteSelect
                        id="status"
                        label="Status"
                        name="status"
                        options={statusApp}
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
                    />
                    <RHFButton
                        btnName="Cancel"
                        outline={true}
                        onClick={handleToggle}
                    />
                </div>
            </Row>
        </form>
    )
}

export default ApplicationAddEdit
