import React, { useState } from 'react';
import FeatherIcon from "feather-icons-react";
<<<<<<< HEAD
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import RHFTextField from 'components/form-controls/RHFTextField';
import './AvtarGroup.scss';

const AvtarGroup = (props) => {
    const { users = [], max = 3 } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
=======
import { Dropdown, DropdownItem, DropdownMenu } from 'reactstrap';
import RHFTextField from 'components/form-controls/RHFTextField';
import './AvtarGroup.scss';

/**
    Logic for assign & remove user is remain bcz its depend on what data i will get from API. so please look into that later on.
    below logic might be change as per need .
**/

const AvtarGroup = (props) => {
    const { users: avtars = [], max = 3 } = props;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => {
        setDropdownOpen((prevState) => !prevState);
        setAvtarUsers(avtars)
    };

    const [avtarUsers, setAvtarUsers] = useState(avtars);


    const handleSearch = (val) => {
        setAvtarUsers(avtars.filter(o => o?.name.toLowerCase()?.indexOf(val.toLowerCase()) > -1))
    }
>>>>>>> f0ad6acbd200ccb078cd33cca597053526d173fb

    return (
        <div className="avatars d-flex flex-row-reverse justify-content-end">
            <div key='add-user' className="avatar" onClick={toggle}>
                <FeatherIcon icon='user-plus' className="rounded-circle avatar-sm user-add" />{" "}
            </div>

            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                <DropdownMenu className="user-list">
                    <RHFTextField
                        isController={false}
                        name="Search"
                        placeholder="Search"
                        backgroundColor="#5156be"
<<<<<<< HEAD
                    />
                    {users?.map(user => {
                        return (
                            <DropdownItem key={user?.id}>
=======
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {avtarUsers?.map(user => {
                        return (
                            <DropdownItem key={user?.id} onMouseOver={() => console.log('hi')}>
>>>>>>> f0ad6acbd200ccb078cd33cca597053526d173fb
                                <div>
                                    <img
                                        src={user?.image}
                                        style={{ borderRadius: "50%" }}
                                        width="30px"
                                        height="30px"
                                        alt="asignee"
                                    />{" "}
                                    <span className="ms-2">{user?.name}</span>
                                </div>
                            </DropdownItem>
                        )
                    })}
                </DropdownMenu>
            </Dropdown>

<<<<<<< HEAD
            {users?.slice(0, max)?.map((avtar, index) => {
=======
            {avtars?.slice(0, max)?.map((avtar, index) => {
>>>>>>> f0ad6acbd200ccb078cd33cca597053526d173fb
                return (
                    <div key={avtar?.id} className="avatar">
                        <img src={avtar?.image} alt="assigned-users" className="rounded-circle avatar-sm" />
                    </div>
                )
            })}

        </div>
    )
}


export default AvtarGroup;