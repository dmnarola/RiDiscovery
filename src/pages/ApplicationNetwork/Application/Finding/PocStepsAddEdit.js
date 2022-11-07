import React, { useEffect } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Col, Row } from 'reactstrap';
import RHFTextField from 'components/form-controls/RHFTextField';
import RHFDropZone from 'components/form-controls/RHFDropZone';
import RHFButton from 'components/form-controls/RHFButton';

const PocStepsAddEdit = (props) => {

    const { handleToggle, setFormData, editPocData } = props
    const isEditMode = editPocData ? true : false;

    const PocStepsSchema = yup.object().shape({
        discription: yup.string().required("Discription is required"),
        url: yup.string().required("URL is required"),
        parameter: yup.string().required("Parameter is required"),
        payload: yup.string().required("Payload is required"),
        images: yup.mixed().required('Upload atleast one image'),
    });

    const {
        handleSubmit: handleSubmitpocsteps,
        control: pocControl,
        setValue: pocSetvalue,
        formState: { errors: pocErrors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(
            PocStepsSchema
        ),
    });

    const onSubmitPocSteps = (data) => {
        if (isEditMode || data) {
            setFormData(data)
            handleToggle()

        }
        else {
            console.log('poc data :>> ', data);
            setFormData(data)
            handleToggle()
        }
    };

    useEffect(() => {
        if (isEditMode) {
            const formFields = Object.keys(editPocData);
            formFields.forEach((field) => {
                pocSetvalue(field, editPocData[field]);
            });
        }
        else {
            pocSetvalue(null)
        }
    }, [editPocData]);

    return (
        <form onSubmit={handleSubmitpocsteps(onSubmitPocSteps)}>
            <Row className="mb-2">
                <Col sm="12">
                    <RHFTextField
                        id="discription"
                        label="Discription"
                        name="discription"
                        placeholder="Discription"
                        errorobj={pocErrors}
                        control={pocControl}
                        isController={true}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="12">
                    <RHFTextField
                        id="url"
                        label="URl"
                        name="url"
                        placeholder="URL"
                        errorobj={pocErrors}
                        control={pocControl}
                        isController={true}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="12">
                    <RHFTextField
                        id="parameter"
                        label="Parameter"
                        name="parameter"
                        placeholder="Parameter"
                        errorobj={pocErrors}
                        control={pocControl}
                        isController={true}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="12">
                    <RHFTextField
                        id="payload"
                        label="Payload"
                        name="payload"
                        placeholder="Payload"
                        errorobj={pocErrors}
                        control={pocControl}
                        isController={true}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="12">
                    <RHFDropZone
                        name="images"
                        label="Upload Images"
                        errorobj={pocErrors}
                        control={pocControl}
                        pocSetvalue={pocSetvalue}
                        editPocData={editPocData ? editPocData : null}

                    />
                </Col>
            </Row>
            <Row>
                <div className="modal-footer">
                    <RHFButton
                        btnName="Submit"
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

export default PocStepsAddEdit
