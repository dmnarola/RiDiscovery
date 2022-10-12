import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const DropdownButton = (props) => {
    const {
        heading = 'Dropdown',
        direction = 'down',
        menuItems = [],
        handleClick,
        ...args
    } = props
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
            <DropdownToggle>{heading}  <i className="mdi mdi-chevron-down"></i></DropdownToggle>
            <DropdownMenu {...args}>
                {menuItems?.map((item, i) => <DropdownItem onClick={() => handleClick(item)} key={i}>{item}</DropdownItem>)}
            </DropdownMenu>
        </Dropdown>
    );
}

export default DropdownButton;