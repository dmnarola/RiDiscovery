import React from 'react'
import { useFieldArray } from 'react-hook-form';
import { Card, CardBody, CardHeader, Col, Label, Row } from 'reactstrap'
import RHFTextField from './RHFTextField'
import FeatherIcon from 'feather-icons-react';

const RHFMultipleValue = (props) => {
    const { errorobj, control, isController, label, bsSize = "sm", name } = props
    const { append, fields, remove } = useFieldArray({
        control, name,
        fields: [{ key: "1", value: "1" }]
    })

    return (
        <Card className='p-0'>
            <CardHeader className='d-flex justify-content-between my-1 py-1 border-0'> {label && (
                    <Label htmlFor="example-text-input" className="form-Label">
                        {label}
                    </Label>
                )}
                <Label onClick={() => append({ key: "", value: "" })}
                    className="form-label"
                    role="button">
                    + Add Value
                </Label></CardHeader>
            <CardBody className='m-0 p-0' style={{ height: "110px", overflowY: "auto" }}>
                {fields.map((field, index) => {
                    const fieldName = `${name}[${index}]`;
                    return (
                        <Row className="m-1" key={field.id}>
                            <Col sm="1" className=''>
                                <FeatherIcon
                                    icon="x"
                                    size="18"
                                    className="actionBtn ms-2"
                                    onClick={(e) => {
                                        remove(index)
                                    }}
                                />
                            </Col>
                        <Col sm="5" className=''>
                            <RHFTextField
                                    id={`${fieldName}.key`}
                                    name={`${fieldName}.key`}
                                    errorobj={errorobj}
                                    control={control}
                                    isController={isController}
                                    bsSize={bsSize}
                                    defaultValue={field.key}
                            />
                        </Col>
                        <Col sm="5" className=''>
                            <RHFTextField
                                    id={`${fieldName}.value`}
                                    name={`${fieldName}.value`}
                                    errorobj={errorobj}
                                    control={control}
                                    isController={isController}
                                    bsSize={bsSize}
                                    defaultValue={field.value}
                            />
                        </Col>
                            <Col sm="1" className=''>
                            <FeatherIcon
                                icon="more-vertical"
                                size="18"
                                    className="actionBtn"
                            />
                        </Col>
                    </Row>
                    )
                })}
            </CardBody>
        </Card>
    )
}

export default RHFMultipleValue