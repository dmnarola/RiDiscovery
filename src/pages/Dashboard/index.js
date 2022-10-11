import React, { useState } from 'react';

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
    Container,
} from "reactstrap";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFTextField from '../../components/form-controls/RHFTextField';
import RHFAutoCompleteSelect from '../../components/form-controls/RHFAutoCompleteSelect';
import RHFDatePicker from '../../components/form-controls/RHFDatePicker';
import RHFSwitch from '../../components/form-controls/RHFSwitch';
import RHFButton from '../../components/form-controls/RHFButton';

const Dashboard = () => {
    document.title = "Dashboard | Minia - React Admin & Dashboard Template";

    const [isActive, setIsActive] = useState(false);

    const loginSchema = yup.object().shape({
        email: yup.string().email().max(150).required('Email is required'),
        colors: yup.object().shape({ label: yup.string(), value: yup.string() }).nullable().required('Select atleast one option'),
        date: yup.date().required('Date is required'),
    });

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(loginSchema),
    });

    const onLogin = (data) => {
        console.log('Submitted Data->', data);
    }

    const handleOnChange = (data, name) => {
        console.log(name, "--->", data)
        setValue(name, data)
    }

    const handleSwitchChange = (val) => {
        console.log('Switch Val =>', val)
        setIsActive(val)
        setValue('isActive', val)
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Dashboard" />

                    <form onSubmit={handleSubmit(onLogin)}>

                        <RHFTextField
                            id="email"
                            label="Email"
                            name="email"
                            placeholder="Enter valid email"
                            errorObj={errors}
                            control={control}
                            isController={true}
                        />

                        <RHFAutoCompleteSelect
                            id="colors"
                            label="Colors"
                            name="colors"
                            options={[
                                { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
                                { value: 'blue', label: 'Blue', color: '#0052CC' },
                                { value: 'purple', label: 'Purple', color: '#5243AA' },
                                { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
                                { value: 'orange', label: 'Orange', color: '#FF8B00' },
                                { value: 'yellow', label: 'Yellow', color: '#FFC400' },
                                { value: 'green', label: 'Green', color: '#36B37E' },
                                { value: 'forest', label: 'Forest', color: '#00875A' },
                                { value: 'slate', label: 'Slate', color: '#253858' },
                                { value: 'silver', label: 'Silver', color: '#666666' },
                            ]}
                            isMultiple={false}
                            errorObj={errors}
                            control={control}
                            isController={true}
                        // handleOnChange={handleOnChange} // when isController === false
                        />

                        <RHFDatePicker
                            name="date"
                            label="Date"
                            errorObj={errors}
                            control={control}
                            isController={true}
                        />

                        <RHFSwitch
                            name="isActive"
                            label="Is Active"
                            isController={true}
                            checked={isActive}
                            errorObj={errors}
                            control={control}
                            onChange={handleSwitchChange}
                        />

                        <RHFButton
                            btnName="Save"
                            type='submit'
                        />

                    </form>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;