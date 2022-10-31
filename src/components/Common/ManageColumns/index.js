import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu } from 'reactstrap';
import RHFTextField from 'components/form-controls/RHFTextField';
import RHFButton from 'components/form-controls/RHFButton';
import RHFCheckbox from 'components/form-controls/RHFCheckbox';


const ManageColumns = (props) => {
    const { allColumns = [], getFilteredValues, getCols, ...args } = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [columnList, setColumnList] = useState(allColumns);

    const handleSearch = (val) => {
        setColumnList(allColumns.filter(o => o?.name.toLowerCase()?.indexOf(val.toLowerCase()) > -1))
    }

    const toggle = () => {
        setDropdownOpen((prevState) => !prevState);
        setColumnList(allColumns)
    };

    const handleChange = (id, isChecked) => {
        console.log({ id, isChecked })
        const filterCols = columnList.map(o => o.id === id ? ({ ...o, isVisible: isChecked }) : o)
        setColumnList(filterCols)
        // getCols(filterCols)
    }

    const handleApply = () => {
        getFilteredValues(columnList);
        setDropdownOpen(false);
    }

    return (
        <div>
            <div>
                <RHFButton
                    btnName="Custom Column"
                    onClick={toggle}
                />
            </div>

            <Dropdown isOpen={dropdownOpen} direction="left">  {/* toggle={toggle} */}
                <DropdownMenu {...args}>
                    <RHFTextField
                        isController={false}
                        name="Search"
                        placeholder="Search"
                        backgroundColor="#5156be"
                        handleOnChange={handleSearch}
                    />
                    {columnList?.map(col => {
                        return (
                            <DropdownItem key={col?.id}>
                                <div className='d-flex justify-content-between'>
                                    <span>{col?.name}</span>
                                    <span className='ms-2'>
                                        {/* <input
                                            name="chk"
                                            type="checkbox"
                                            value={col?.isVisible}
                                            defaultChecked={col?.isVisible}
                                            onChange={(e) => handleChange(col?.id, !col?.isVisible)}
                                        /> */}


                                        <RHFCheckbox
                                            name="chk"
                                            value={col?.isVisible}
                                            defaultChecked={col?.isVisible}
                                            isController={false}
                                            onChange={(e) => handleChange(col?.id, !col?.isVisible)}
                                        />

                                    </span>
                                </div>
                            </DropdownItem>
                        )
                    })}
                    <div className='d-flex justify-content-end'>
                        <RHFButton
                            btnName="Apply"
                            onClick={handleApply}
                        />
                    </div>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default ManageColumns;