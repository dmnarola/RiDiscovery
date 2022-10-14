import React, { useState } from 'react';
import FeatherIcon from "feather-icons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import RHFTextField from 'components/form-controls/RHFTextField';
import './AvtarGroup.scss';

const AvtarGroup = (props) => {
    const { users = [], max = 3 } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

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
                    />
                    {users?.map(user => {
                        return (
                            <DropdownItem key={user?.id}>
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

            {users?.slice(0, max)?.map((avtar, index) => {
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