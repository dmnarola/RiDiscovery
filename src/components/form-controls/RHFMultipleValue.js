import React, { useState } from 'react'
import { Col, Container, Label, Row } from 'reactstrap'
import RHFTextField from './RHFTextField'
import FeatherIcon from 'feather-icons-react';

const RHFMultipleValue = ({ errorobj, control, isController, label, bsSize = "sm", name }) => {
    const [options, setOptions] = useState([{ option: "" }, { option: "" }, { option: "" }])

    const optionHandler = () => {
        setOptions([...options, { option: "" }]);
    };

    const deleteHandler = (e, index) => {
        e.preventDefault();
        const deleteOption = [...options];
        deleteOption.splice(index, 1);
        setOptions(deleteOption);
    };

    return (
        <div className='m-0' style={{ height: "145px", }}>
            <div className='d-flex justify-content-between'>
                {label && (
                    <Label htmlFor="example-text-input" className="form-Label">
                        {label}
                    </Label>
                )}
                <Label onClick={optionHandler} className="form-label" role="button">+ Add Value </Label>
            </div>
            <Container className='' style={{ height: "105px", overflowY: "auto" }}>
                {options.map((option, index) => (
                    <Row className="m-1" key={index}>
                        <Col sm="1" className=''>
                            {options.length > 1 && (
                                <FeatherIcon
                                    icon="x"
                                    size="18"
                                    className="actionBtn ms-2"
                                    onClick={(e) => {
                                        deleteHandler(e, index);
                                    }}
                                />
                            )}
                        </Col>
                        <Col sm="5" className=''>
                            <RHFTextField
                                id={`${name}_${index}:1`}
                                name={`${name}_${index}:1`}
                                errorobj={errorobj}
                                control={control}
                                isController={isController}
                                bsSize={bsSize}
                            />
                        </Col>
                        <Col sm="5" className=''>
                            <RHFTextField
                                id={`${name}_${index}:2`}
                                name={`${name}_${index}:2`}
                                errorobj={errorobj}
                                control={control}
                                isController={isController}
                                bsSize={bsSize}
                            />
                        </Col>
                        <Col sm="1" className=''>
                            <FeatherIcon
                                icon="more-vertical"
                                size="18"
                                className="actionBtn ms-2"
                            />
                        </Col>
                    </Row>
                ))}

            </Container>

        </div>
    )
}

export default RHFMultipleValue