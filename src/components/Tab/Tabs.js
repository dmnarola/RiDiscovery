import React from 'react'
import {
    Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import classnames from "classnames";


const Tabs = (props) => {
    const { navLinkData, activeTab, toggle, children } = props
    return (
        <>
            <Nav tabs className="nav-tabs-custom">
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
