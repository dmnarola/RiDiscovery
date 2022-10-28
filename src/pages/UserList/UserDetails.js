import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
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
    const { userId } = useParams()

    const [userDetails, setUserDetails] = useState([])

    useState(() => {
        setUserDetails(tabledata.find(obj => {
            return obj._id == userId;
        }))
    }, [])

    const [activeTab, setactiveTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };
    const columns = [
        {
            name: "Mobile Number",
            selector: (row) => row?.mobileNumber,
        },
        {
            name: "Role",
            selector: (row) => row?.role,
        },
        {
            name: "Category",
            selector: (row) => row?.category,
        },
        {
            name: "Comapany",
            selector: (row) => row?.companyName,
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
            selector: (row) => row?.isActive ? "Active" : "Deactive",
        },
    ];


    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs title="User List" breadcrumbItem="User" />
                <Card>
                    <CardBody>
                        <Tabs
                            navLinkData={navLinkData}
                            activeTab={activeTab}
                            toggle={toggle}
                        >
                            {activeTab === "1" ? <UserTab columns={columns} userDetails={userDetails} /> :
                                activeTab === "3" ? "Tab Profile " : ""}
                        </Tabs>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )
}

export default UserDetails
