import React, { useState } from "react";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Container } from "reactstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextField from "../../components/form-controls/RHFTextField";
import RHFAutoCompleteSelect from "../../components/form-controls/RHFAutoCompleteSelect";
import RHFDatePicker from "../../components/form-controls/RHFDatePicker";
import RHFSwitch from "../../components/form-controls/RHFSwitch";
import RHFButton from "../../components/form-controls/RHFButton";
import RHFFileUpload from "../../components/form-controls/RHFFileUpload";
import RHFCheckbox from "../../components/form-controls/RHFCheckbox";
import DropdownButton from "../../components/form-controls/DropdownButton";
import { Toast } from "components/Common/Toaster";
import AvtarGroup from "components/form-controls/AvtarGroup";
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "assets/images";

const DmControl = () => {
    document.title = "Dm Control | Minia - React Admin & Dm Control Template";

    const [isActive, setIsActive] = useState(false);
    const [isRemember, setIsRemember] = useState(false);

    const [avtarUsers, setAvtarUsers] = useState([
        { id: 1, name: 'Dipesh Mali', image: avatar1 },
        { id: 2, name: 'Mahesh', image: avatar2 },
        { id: 3, name: 'Foram', image: avatar3 },
        { id: 4, name: 'Pratik', image: avatar4 },
        { id: 5, name: 'Priyal', image: avatar5 },
    ])


    const loginSchema = yup.object().shape({
        email: yup.string().email().max(150).required("Email is required"),
        colors: yup
            .object()
            .shape({ label: yup.string(), value: yup.string() })
            .nullable()
            .required("Select atleast one option"),
        date: yup.date().required("Date is required"),
        userProfile: yup.mixed().required("Profile pic is required"),
        isRemember: yup.bool().required("Field is required"),
    });

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(loginSchema),
    });

    const onLogin = (data) => {
        console.log("Submitted Data->", data);
    };

    const handleOnChange = (data, name) => {
        console.log(name, "--->", data);
        setValue(name, data);
    };

    const handleSwitchChange = (val) => {
        setIsActive(val);
        setValue("isActive", val);
    };

    const handleCheckboxChange = (val) => {
        setIsRemember(val);
        setValue("isRemember", val);
    };

    const getFileData = (fileData) => {
        console.log({ fileData });
    };


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Dm Control" breadcrumbItem="Dm Control" />

                    <form onSubmit={handleSubmit(onLogin)}>
                        <RHFTextField
                            id="email"
                            label="Email"
                            name="email"
                            placeholder="Enter valid email"
                            errorobj={errors}
                            control={control}
                            isController={true}
                        />

                        <RHFAutoCompleteSelect
                            id="colors"
                            label="Colors"
                            name="colors"
                            options={[
                                { value: "ocean", label: "Ocean", color: "#00B8D9" },
                                { value: "blue", label: "Blue", color: "#0052CC" },
                                { value: "purple", label: "Purple", color: "#5243AA" },
                                { value: "red", label: "Red", color: "#FF5630", isFixed: true },
                                { value: "orange", label: "Orange", color: "#FF8B00" },
                                { value: "yellow", label: "Yellow", color: "#FFC400" },
                                { value: "green", label: "Green", color: "#36B37E" },
                                { value: "forest", label: "Forest", color: "#00875A" },
                                { value: "slate", label: "Slate", color: "#253858" },
                                { value: "silver", label: "Silver", color: "#666666" },
                            ]}
                            isMultiple={false}
                            errorobj={errors}
                            control={control}
                            isController={true}
                        // handleOnChange={handleOnChange} // when isController === false
                        />

                        <RHFDatePicker
                            name="date"
                            label="Date"
                            errorobj={errors}
                            control={control}
                            isController={true}
                        />

                        <RHFSwitch
                            name="isActive"
                            label="Is Active"
                            isController={true}
                            checked={isActive}
                            errorobj={errors}
                            control={control}
                            onChange={handleSwitchChange}
                        />

                        <RHFCheckbox
                            name="isRemember"
                            label="Is Remember"
                            checked={isRemember}
                            isController={true}
                            errorobj={errors}
                            control={control}
                            onChange={handleCheckboxChange} // mostly useful when isController === false
                        />

                        <RHFFileUpload
                            name="userProfile"
                            getFileData={getFileData}
                            setValue={setValue}
                            errorobj={errors}
                            isValidate={true}
                        />



                        <br />
                        <br />

                        <RHFButton btnName="Save" type="submit" />

                        <br />
                        <br />

                        <AvtarGroup
                            users={avtarUsers}
                            max={4}
                        />


                        <br />
                        <br />

                        <RHFButton btnName="Toaster" onClick={() => Toast.success('Hello bhai')} />

                        <br />
                        <br />

                        <DropdownButton
                            heading="Dropdown"
                            menuItems={["React", "Vue", "Angular"]}
                            handleClick={(item) => alert(item)}
                        />

                        <br />
                        <br />


                    </form>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default DmControl;
