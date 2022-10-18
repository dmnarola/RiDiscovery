import React from 'react'
import { Card, CardBody } from 'reactstrap';
import FeatherIcon from "feather-icons-react";
import classnames from 'classnames';
import './custome-navbar.scss'

const FilterByStatus = (props) => {
    const { statusList = [], customActiveTab, toggleCustom = () => { } } = props;
    return (
        <Card>
            <CardBody>
                <ul className={`custome-navbar d-flex justify-content-between`}>
                    {statusList?.map((status, index) => (
                        <li
                            key={status?.name}
                            onClick={() => {
                                toggleCustom(index + 1);
                            }}
                            className={classnames({ 'active': customActiveTab === index + 1 })}
                        >
                            <span><FeatherIcon size="16" icon={status?.icon} /></span> {status?.name}
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    )
}

export default FilterByStatus