import RHFButton from 'components/form-controls/RHFButton';
import RHFTextField from 'components/form-controls/RHFTextField';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const ChangePasswordForm = (props) => {

    const { handleToggle } = props

    const changePasswordSchema = yup.object().shape({
        oldPassword: yup.string().required("Old Password is required"),
        newPassword: yup.string().required("New Password is required"),
        confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref('newPassword'), null], 'New Passwords and Confirm Password must match'),
    })
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(changePasswordSchema),
    });

    const onSubmit = (values) => {
        console.log('values :>> ', values);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Row className="mb-3">
                <Col>
                    <RHFTextField
                        id="oldPassword"
                        label="Old Password"
                        name="oldPassword"
                        placeholder="Old Password"
                        errorobj={errors}
                        control={control}
                        isController={true}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <RHFTextField
                        id="newPassword"
                        label="New Password"
                        name="newPassword"
                        placeholder="New Password"
                        errorobj={errors}
                        control={control}
                        isController={true}
                    />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <RHFTextField
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        errorobj={errors}
                        control={control}
                        isController={true}
                    />
                </Col>
            </Row>
            <Row>
                <div className="modal-footer">
                    <RHFButton
                        btnName="Update"
                        type="submit"
                    />
                    <RHFButton
                        btnName="Not Now"
                        outline={true}
                        onClick={handleToggle}
                    />
                </div>
            </Row>
        </form>

    )
}

export default ChangePasswordForm
