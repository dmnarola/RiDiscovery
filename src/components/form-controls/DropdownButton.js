import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu } from 'reactstrap';
import RHFTextField from 'components/form-controls/RHFTextField';
import RHFButton from 'components/form-controls/RHFButton';


const DropdownButton = (props) => {
    const { menuItems = [], isSearchable = false, handleClick, heading, ...args } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuItemList, setMenuItemList] = useState(menuItems);

    const handleSearch = (val) => {
        setMenuItemList(menuItems?.filter(o => o?.name.toLowerCase()?.indexOf(val.toLowerCase()) > -1))
    }

    const manageHandleClick = (item) => {
        handleClick(item);
    }

    const toggle = () => {
        setDropdownOpen((prevState) => !prevState);
        setMenuItemList(menuItems)
    };


    return (
        <div>
            <div>
                <RHFButton
                    btnName={heading}
                    onClick={toggle}
                />
            </div>

            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="left">  {/* toggle={toggle} */}
                <DropdownMenu {...args}>
                    {isSearchable &&
                        <RHFTextField
                            isController={false}
                            name="Search"
                            placeholder="Search"
                            backgroundColor="#5156be"
                            handleOnChange={handleSearch}
                        />
                    }
                    {menuItemList?.map(item => {
                        return (<DropdownItem onClick={() => manageHandleClick(item)} key={item?.id}>{item?.name}</DropdownItem>)
                    })}
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default DropdownButton