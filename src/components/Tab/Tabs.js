import React, { useEffect } from 'react'
import {
    Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from "classnames";
import { isModulePermisssion } from 'helpers/util';
import { ROLE_PERMISSIONS } from 'constants/RolePermissions';
import Application from 'pages/ApplicationNetwork/Application';
import Network from 'pages/ApplicationNetwork/Network';


const Tabs = (props) => {
    const { navLinkData, activeTab, toggle, children } = props
    {/* {navLinkData.map((data, index) => ( */ }
    return (
        <>
            <Nav tabs className="nav-tabs-custom">
                {/* {navLinkData.filter(o => o.isVisible).map((data, index) => ( */}
                {navLinkData.map((data, index) => (
                    <NavItem key={index} className="tab-navlink">
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: activeTab === data.tabNo,
                            })}
                            onClick={() => {
                                toggle(data.tabNo);
                            }}
                        >
                            {data.tabName}
                        </NavLink>
                    </NavItem>))}
            </Nav>

            <TabContent activeTab={activeTab} className="p-3 text-muted">
                <TabPane tabId={activeTab}>
                    {children}
                </TabPane>
            </TabContent></>
    )
}

export default Tabs
