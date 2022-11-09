import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import {
    Card,
    CardBody,
    Container,
} from 'reactstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Tabs from 'components/Tab/Tabs';
import { tabledata } from './Index';
import UserTab from './UserTab';

const navLinkData = [
    {
        tabNo: "1",
        tabName: "User"
    },
    // {
    //     tabNo: "2",
    //     tabName: "Home"
    // },
    // {
    //     tabNo: "3",
    //     tabName: "Profile"
    // },
    // {
    //     tabNo: "4",
    //     tabName: "Settings"
    // }
] // @Foram >> We can add other tabs in future

const UserDetails = () => {
    const { userId } = useParams();
    const location = useLocation();

    console.log('location=>', location)

    const [userDetails, setUserDetails] = useState(location?.state?.userDetails);

    // useState(() => {
    //     setUserDetails(userDetails.find(obj => {
    //         return obj.id == userId;
    //     }))
    // }, [])

    const [activeTab, setactiveTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

    const columns = [
        {
            name: "Mobile Number",
            selector: (row) => row?.phone,
        },
        {
            name: "Role",
            selector: (row) => row?.roleId,
        },
        // {
        //     name: "Category",
        //     selector: (row) => row?.category,
        // },
        {
            name: "Comapany",
            selector: (row) => row?.companyName ? row?.companyName : '-',
        },
        {
            name: "Start Date",
            selector: (row) => row?.startDate,

        },
        {
            name: "End Date",
            selector: (row) => row?.endDate,

        },
        {
            name: "Status",
            selector: (row) => row?.activated ? "Active" : "Deactive",
        },
    ];


    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="User List" breadcrumbItem="User" />
                <Card>
                    <CardBody>
                        <UserTab columns={columns} userDetails={userDetails} />
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default UserDetails
