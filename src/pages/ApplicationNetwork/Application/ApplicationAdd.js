import { ROLE_PERMISSIONS } from 'constants/RolePermissions'
import { isModulePermisssion } from 'helpers/util'
import React, { useState } from 'react'
import ApplicationAddEdit from './ApplicationAddEdit'
import KickoffAddEdit from './KickoffAddEdit'

export const ApplicationAdd = () => {
    const [flag, setFlag] = useState(false)
    const [applicationData, setApplicationData] = useState("")

    return (<React.Fragment>
        {!flag && <ApplicationAddEdit setFlag={setFlag} setApplicationData={setApplicationData} />}
        {flag && <KickoffAddEdit applicationData={applicationData} />}
    </React.Fragment>
    )
}
